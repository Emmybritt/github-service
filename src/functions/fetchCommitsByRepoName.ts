import { fetchCommitsByRepoName } from "../services/db.service";

const fetchCommitsByRepositoryName = async (repoName: string) => {
  try {
    const commits = await fetchCommitsByRepoName(repoName);
    console.log(commits, "commits");
  } catch (error) {
    console.log(error);
  }
};

const repoName = "chromium";
fetchCommitsByRepositoryName(repoName);
