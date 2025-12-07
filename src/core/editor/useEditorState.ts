import { useState } from "react";

export function useEditorState() {
  const [code, setCode] = useState(`// Bem-vindo ao DevSandbox AI\n\nconsole.log("Hello, world!");`);

  return {
    code,
    setCode,
  };
}
