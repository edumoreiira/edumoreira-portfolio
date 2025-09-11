import { Project } from '../models/project.model';
import { parseReadmeSection, parseMainDescription } from '../utils/readme-parser';

// Interface para a resposta da API
interface GithubRepoNode {
  id: string;
  name: string;
  createdAt: string;
  homepageUrl: string;
  description: string;
  object: {
    text: string;
  } | null;
  defaultBranchRef: {
    target: {
      history: {
        totalCount: number;
      };
    };
  } | null;
}

// A função principal que busca e processa os projetos
export async function getProjects(): Promise<Project[]> {
  const token = process.env['GITHUB_TOKEN'];
  if (!token) {
    throw new Error('GITHUB_TOKEN não encontrado nas variáveis de ambiente.');
  }

  const username = 'edumoreiira';

  const query = `
    query($username: String!) {
      user(login: $username) {
        # Busca os repositórios fixados
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              id
            }
          }
        }
        # Busca a lista geral de repositórios
        repositories(
          first: 20,
          orderBy: { field: CREATED_AT, direction: DESC },
          privacy: PUBLIC,
          isFork: false
        ) {
          nodes {
            id
            name
            createdAt
            homepageUrl
            description
            object(expression: "HEAD:README.md") {
              ... on Blob {
                text
              }
            }
            defaultBranchRef {
              target {
                ... on Commit {
                  history {
                    totalCount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables: { username },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Erro na API do GitHub: ${response.statusText} - ${errorBody}`);
  }

  const json = await response.json();
  const userData = json.data.user;

  // Extrai os IDs dos repositórios fixados
  const pinnedRepoIds = new Set(userData.pinnedItems.nodes.map((item: { id: string }) => item.id));

  const repos = userData.repositories.nodes as GithubRepoNode[];

  // Mapeia os dados da API para a interface Project
  return repos.map((node): Project => {
    const readme = node.object?.text ?? '';
    return {
      id: node.id,
      title: node.name,
      created_at: new Date(node.createdAt),
      commit_count: node.defaultBranchRef?.target.history.totalCount ?? 0,
      description: parseMainDescription(readme) || node.description,
      functionalities: parseReadmeSection(readme, '✨ Funcionalidades'),
      good_practices: parseReadmeSection(readme, '🤝 Boas Práticas e Convenções'),
      site_url: node.homepageUrl,
      is_highlight: pinnedRepoIds.has(node.id),
    };
  });
}