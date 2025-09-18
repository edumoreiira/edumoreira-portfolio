/**
 * Extrai o conteúdo de uma seção específica de um README.md.
 * @param readmeContent O conteúdo completo do arquivo README.
 * @param sectionTitle O título da seção a ser extraída (ex: "Funcionalidades").
 * @returns O conteúdo da seção em formato de string.
 */
function parseReadmeSection(readmeContent: string, sectionTitle: string): string {
  // Regex para encontrar o conteúdo entre um título de seção (## Título) e o próximo (##) ou o fim do arquivo.
  const regex = new RegExp(`## ${sectionTitle}\\n([\\s\\S]*?)(?=\\n## |$)`, 'i');
  const match = readmeContent.match(regex);
  return match ? match[1].trim() : '';
}

/**
 * Extrai a descrição principal (texto após o título # e antes do primeiro ##).
 * @param readmeContent O conteúdo completo do arquivo README.
 * @returns A descrição principal.
 */
function parseMainDescription(readmeContent: string): string {
  const regex = new RegExp(`^# [^\\n]+\\n([\\s\\S]*?)(?=\\n## |$)`, 'i');
  const match = readmeContent.match(regex);
  return match ? match[1].trim() : '';
}

/**
 * Extrai o título principal do repositório (o texto da primeira linha que começa com #).
 * @param readmeContent O conteúdo completo do arquivo README.
 * @returns O título do repositório.
 */
function parseRepoTitle(readmeContent: string): string {
  // a new comment explaining the regex
  // regex to find the text of the first line starting with #
  const match = readmeContent.match(/^# (.*)/);
  return match ? match[1].trim() : '';
}


export { parseReadmeSection, parseMainDescription, parseRepoTitle };