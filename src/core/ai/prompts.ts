export function promptExplainCode(filename: string, code: string) {
  return `
Explique o código do arquivo "${filename}" de forma extremamente curta e objetiva.

Regras:
- Máximo 5 linhas.
- Use tópicos curtos.
- Nada de explicações longas.

\`\`\`js
${code}
\`\`\`
`;
}

export function promptRefactorCode(filename: string, code: string) {
  return `
Refatore o código do arquivo "${filename}" para uma versão mais limpa e moderna.

Regras:
- Responda SOMENTE com o código final.
- Sem explicações.
- Formatação limpa.

\`\`\`js
${code}
\`\`\`
`;
}

export function promptGenerateTests(filename: string, code: string) {
  return `
Gere no máximo 3 testes unitários em Jest para o arquivo "${filename}".

Regras:
- Apenas código dos testes.
- Sem explicações.

Código alvo:
\`\`\`js
${code}
\`\`\`
`;
}

export function promptFindBugs(filename: string, code: string) {
  return `
Liste os principais bugs e problemas no arquivo "${filename}".

Regras:
- Use bullets.
- Máximo 5 pontos.
- Sem explicações longas.

Código:
\`\`\`js
${code}
\`\`\`
`;
}
