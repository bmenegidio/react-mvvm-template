import { useState } from 'react';

import { RepositoryModel } from '@/core/models/repository/repository';
import { RepositoryDataService } from '@/core/protocols/data-services/repository/repository';

type Dependencies = {
  repositoryDataService: RepositoryDataService;
};

export function useRepositoriesListViewModel({ repositoryDataService }: Dependencies) {
  const [repositories, setRepositories] = useState<RepositoryModel[]>([]);

  async function handleFetchRepositoriesByUsername(username: string) {
    setRepositories(await repositoryDataService.fetchByUsername(username));
  }

  return {
    repositories,
    handleFetchRepositoriesByUsername,
  };
}
