import type { LogType } from "./types";

let lastListener: ((event: MessageEvent) => void) | null = null;
let lastIframe: HTMLIFrameElement | null = null;

export function runCodeInSandbox(
  code: string,
  onMessage: (type: LogType, message: string) => void
) {
  if (typeof window === "undefined") return;

  // 🧹 Limpando runtime anterior
  if (lastListener) {
    window.removeEventListener("message", lastListener);
    lastListener = null;
  }
  if (lastIframe && lastIframe.parentNode) {
    lastIframe.remove();
    lastIframe = null;
  }

  const iframe = document.createElement("iframe");
  lastIframe = iframe;

  iframe.setAttribute("sandbox", "allow-scripts");
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  const listener = (event: MessageEvent) => {
    if (!event.data || event.data.source !== "sandbox") return;

    const { type, message } = event.data as {
      source: string;
      type: LogType;
      message: string;
    };

    onMessage(type, message);
  };

  // Registrar novo listener e salvar referência global
  window.addEventListener("message", listener);
  lastListener = listener;

  const escapedCode = code.replace(/<\/script/gi, "<\\/script");

  iframe.srcdoc = `
<!DOCTYPE html>
<html>
  <body>
    <script>
      function send(type, message) {
        window.parent.postMessage(
          { source: "sandbox", type, message },
          "*"
        );
      }

      const originalLog = console.log;
      const originalError = console.error;

      console.log = (...args) => {
        send("log", args.map(a => String(a)).join(" "));
        originalLog(...args);
      };

      console.error = (...args) => {
        send("error", args.map(a => String(a)).join(" "));
        originalError(...args);
      };

      window.onerror = function (msg, url, line, col, err) {
        send("error", msg + " (linha " + line + ")");
      };

      try {
        ${escapedCode}
      } catch (e) {
        console.error(e && e.stack ? e.stack : e.toString());
      }
    <\/script>
  </body>
</html>
`;
}
