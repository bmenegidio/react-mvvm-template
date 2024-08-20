import { useQuery } from '@tanstack/react-query';

import { RepositoryModel } from '@/core/models/repository/repository';
import { RepositoryDataService } from '@/core/protocols/data-services/repository/repository';
import { repositoryDataServiceInjectionToken } from '@/core/protocols/data-services/repository/repository-data-service-injection-token';

type Dependencies = {
  username: string;
  [repositoryDataServiceInjectionToken]: RepositoryDataService;
};

export function useRepositoriesListViewModel({ username, repositoryDataService }: Dependencies) {
  const {
    data: repositories,
    isError,
    isLoading,
  } = useQuery<RepositoryModel[]>({
    queryKey: ['repositories', username],
    queryFn: () => repositoryDataService.fetchByUsername(username),
  });

  return {
    repositories,
    isError,
    isLoading,
  };
}
