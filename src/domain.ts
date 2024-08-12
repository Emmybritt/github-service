export interface GithubRepositoryInfo {
  name: string;
  description: string;
  html_url: string;
  language: string;
  forks_count: number;
  stargazers_count: number;
  open_issues_count: number;
  watchers_count: number;
  created_at: string;
  updated_at: string;
}

export interface CommitInfo {
  commit: { message: string; author: { name: string; date: string } };
  html_url: string;
}
