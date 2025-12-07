export function getFileIcon(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "js":
    case "jsx":
      return "📜";
    case "ts":
    case "tsx":
      return "📘";
    case "json":
      return "🧾";
    case "html":
      return "🌐";
    case "css":
      return "🎨";
    case "md":
      return "📝";
    case "sql":
      return "🗄️";
    default:
      return "📄";
  }
}
