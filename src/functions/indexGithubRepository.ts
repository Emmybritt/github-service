import { saveCommits, saveRepository } from "../services/db.service";

import dotenv from "dotenv";
import {
  getRepositoryCommits,
  getRepositoryInfo,
} from "../services/api.service";

dotenv.config();

export const indexRepository = async (repoName: string, startDate?: string) => {
  try {
    const repoInfo = await getRepositoryInfo(repoName);
    const repository = await saveRepository(repoInfo);

    const initialCommits = await getRepositoryCommits(repoName, startDate);
    await saveCommits(repository.dataValues.id, initialCommits);
    console.log("saved commits");

    const intervalId = setInterval(async () => {
      try {
        console.log("fetching new commits");
        const commits = await getRepositoryCommits(
          repoName,
          new Date().toISOString()
        );
        await saveCommits(repository.dataValues.id, commits);
      } catch (error) {
        console.error("Error fetching new commits:", error);
      }
    }, 3600000);

    return intervalId;
  } catch (error) {}
};

const startDate = "2023-01-01T00:00:00Z";
const githubRepoPath = "chromium/chromium";

indexRepository(githubRepoPath, startDate);
