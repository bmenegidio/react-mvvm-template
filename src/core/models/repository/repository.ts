export type RepositoryModel = {
  id: string;
  name: string;
  description: string;
  isFork: boolean;
  owner: {
    username: string;
    avatarUrl: string;
  };
  keywords?: string;
  hasKeywords: boolean;
};
