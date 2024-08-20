import { asFunction, createContainer } from 'awilix';

import { useRepositoriesListViewModel } from '@/app/repositories/[username]/_components/repositories/useRepositoriesList.view-model';
import { useRepositoriesListViewModelInjectionToken } from '@/app/repositories/[username]/_components/repositories/view-model-injection-token';
import { repositoryDataServiceInjectionToken } from '@/core/protocols/data-services/repository/repository-data-service-injection-token';
import { githubRepositoryDataServiceAdapter } from '@/infra/adapters/data-services/repository/github/github-repository';

const dependencyInjectionContainer = createContainer();

function setupDependencyInjectionContainerRegistry() {
  dependencyInjectionContainer.register({
    [repositoryDataServiceInjectionToken]: asFunction(githubRepositoryDataServiceAdapter),
    [useRepositoriesListViewModelInjectionToken]: asFunction(useRepositoriesListViewModel),
  });
}

export { dependencyInjectionContainer, setupDependencyInjectionContainerRegistry };
