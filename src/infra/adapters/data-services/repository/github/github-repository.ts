import { RepositoryModel } from '@/core/models/repository/repository';
import { RepositoryDataService } from '@/core/protocols/data-services/repository/repository';
import { GithubResponse } from '@/infra/adapters/data-services/repository/github/github-response';

function toModel(githubRepositories: GithubResponse[]): RepositoryModel[] {
  return githubRepositories.map((githubRepo) => ({
    id: String(githubRepo.id),
    name: githubRepo.name,
    description: githubRepo.description,
    isFork: githubRepo.fork,
    owner: {
      username: githubRepo.owner.login,
      avatarUrl: githubRepo.owner.avatar_url,
    },
    keywords: githubRepo.topics.join(','),
    hasKeywords: githubRepo.topics.length > 0,
  }));
}

export function githubRepositoryDataServiceAdapter(): RepositoryDataService {
  async function fetchByUsername(username: string): Promise<RepositoryModel[]> {
    const httpResponse = await fetch(`https://api.github.com/users/${username}/repos`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const jsonData = (await httpResponse.json()) as GithubResponse[];
    return toModel(jsonData);
  }

  return {
    fetchByUsername,
  };
}
