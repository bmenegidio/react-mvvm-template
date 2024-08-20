export type GithubResponse = {
  id: number;
  name: string;
  description: string;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    url: string;
  };
  fork: boolean;
  url: string;
  topics: string[];
};
