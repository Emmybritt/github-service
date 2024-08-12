import { fetchCommitsByRepoName } from "../services/db.service";

const fetchCommitsByRepositoryName = async (repoName: string) => {
  try {
    const commits = await fetchCommitsByRepoName(repoName);
    const result = commits.map(
      (commit: Record<string, any>) => commit.dataValues
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const repoName = "chromium";
fetchCommitsByRepositoryName(repoName);
