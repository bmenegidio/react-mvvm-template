import { useState } from 'react';

import { RepositoryModel } from '@/core/models/repository/repository';
import { RepositoryDataService } from '@/core/protocols/data-services/repository/repository';
import { repositoryDataServiceInjectionToken } from '@/core/protocols/data-services/repository/repository-data-service-injection-token';

type Dependencies = {
  [repositoryDataServiceInjectionToken]: RepositoryDataService;
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
