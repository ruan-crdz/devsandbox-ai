import ts from "typescript";

export function transpileForRuntime(filename: string, code: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();

  if (ext === "ts" || ext === "tsx") {
    const result = ts.transpileModule(code, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2020,
        jsx: ts.JsxEmit.React,
      },
      fileName: filename,
    });
    return result.outputText;
  }

  // por enquanto, outras linguagens não executam — só JS puro
  return code;
}
