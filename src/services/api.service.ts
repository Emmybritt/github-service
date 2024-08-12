import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const githubApi = axios.create({
  baseURL: "https://api.github.com/",
  headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
});

export const getRepositoryInfo = async (repoName: string) => {
  try {
    const response = await githubApi.get(`/repos/${repoName}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch repository information.");
  }
};

export const getRepositoryCommits = async (
  repoName: string,
  since: string = "1970-01-01T00:00:00Z"
) => {
  try {
    const response = await githubApi.get(`/repos/${repoName}/commits`, {
      params: { since },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch commits.");
  }
};
