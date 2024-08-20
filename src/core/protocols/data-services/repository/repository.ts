import { RepositoryModel } from '@/core/models/repository/repository';

export interface RepositoryDataService {
  fetchByUsername(username: string): Promise<RepositoryModel[]>;
}
