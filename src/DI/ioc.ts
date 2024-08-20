import { asFunction, createContainer } from 'awilix';

import { useRepositoriesListViewModel } from '@/app/repositories/[username]/_components/repositories/useRepositoriesList.view-model';
import { githubRepositoryDataServiceAdapter } from '@/infra/adapters/data-services/repository/github/github-repository';

const dependencyInjectionContainer = createContainer();

function setupDependencyInjectionContainerRegistry() {
  dependencyInjectionContainer.register({
    repositoryDataService: asFunction(githubRepositoryDataServiceAdapter),
    useRepositoriesListViewModel: asFunction(useRepositoriesListViewModel),
  });
}

export { dependencyInjectionContainer, setupDependencyInjectionContainerRegistry };
