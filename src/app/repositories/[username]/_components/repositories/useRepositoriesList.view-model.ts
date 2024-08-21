import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useDeferredValue, useMemo, useState } from 'react';

import { RepositoryModel } from '@/core/models/repository/repository';
import { RepositoryDataService } from '@/core/protocols/data-services/repository/repository';
import { repositoryDataServiceInjectionToken } from '@/core/protocols/data-services/repository/repository-data-service-injection-token';

type Dependencies = {
  username: string;
  [repositoryDataServiceInjectionToken]: RepositoryDataService;
};

export function useRepositoriesListViewModel({ username, repositoryDataService }: Dependencies) {
  const {
    data: repositoriesList,
    isError,
    isLoading,
  } = useQuery<RepositoryModel[]>({
    queryKey: ['repositories', username],
    queryFn: () => repositoryDataService.fetchByUsername(username),
  });

  const [filter, setFilter] = useState('');
  const deferredFilter = useDeferredValue(filter);
  const filteredRepositories = useMemo(() => {
    if (!Array.isArray(repositoriesList)) return [];
    if (!deferredFilter) return repositoriesList;

    return repositoriesList.filter(
      (repo) =>
        repo.name?.toLowerCase().includes(deferredFilter.toLowerCase()) ||
        repo.description?.toLowerCase().includes(deferredFilter.toLowerCase()),
    );
  }, [repositoriesList, deferredFilter]);

  function handleFilterChange(event: ChangeEvent<HTMLInputElement>) {
    setFilter(event.target.value);
  }

  return {
    repositories: filteredRepositories,
    isError,
    isLoading,
    handleFilterChange,
  };
}
