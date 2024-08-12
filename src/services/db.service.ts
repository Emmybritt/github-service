import { Op, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Commit from "../models/commit";
import { RepositoryModel } from "../models/repository";
import { CommitInfo, GithubRepositoryInfo } from "../domain";

export const saveRepository = async (repoData: GithubRepositoryInfo) => {
  try {
    const existingRepository = await RepositoryModel.findOne({
      where: { name: repoData.name },
    });

    if (existingRepository) {
      return existingRepository;
    }

    const repository = await RepositoryModel.create({
      id: uuidv4(),
      name: repoData.name,
      description: repoData.description,
      url: repoData.html_url,
      language: repoData.language,
      forksCount: repoData.forks_count,
      starsCount: repoData.stargazers_count,
      openIssuesCount: repoData.open_issues_count,
      watchersCount: repoData.watchers_count,
      createdAt: new Date(repoData.created_at),
      updatedAt: new Date(repoData.updated_at),
    });

    return repository;
  } catch (error) {
    throw new Error("Failed to save repository.");
  }
};

export const saveCommits = async (repoId: string, commits: CommitInfo[]) => {
  try {
    const commitRecords = commits.map((commit) => ({
      id: uuidv4(),
      repositoryId: repoId,
      message: commit.commit.message,
      author: commit.commit.author.name,
      date: new Date(commit.commit.author.date),
      url: commit.html_url,
    }));

    await Promise.all(
      commitRecords.map((record) =>
        Commit.upsert(record, {
          conflictFields: ["repositoryId", "message", "date"],
        })
      )
    );
  } catch (error) {
    throw new Error("Failed to save commits.");
  }
};

export const fetchCommitsByRepoAndDateRange = async (
  repoId: string,
  startDate: Date,
  endDate: Date
) => {
  return await Commit.findAll({
    where: {
      repositoryId: repoId,
      date: {
        [Op.between]: [startDate, endDate],
      },
    },
  });
};

export const fetchTopNCommitAuthors = async (repoId: string, topN: number) => {
  try {
    const authorsWithCount = await Commit.findAll({
      where: { repositoryId: repoId },
      attributes: [
        "author",
        [Sequelize.fn("COUNT", Sequelize.col("author")), "commitCount"],
      ],
      group: ["author"],
      order: [[Sequelize.fn("COUNT", Sequelize.col("author")), "DESC"]],
      limit: topN,
    });

    return authorsWithCount.map((author: Record<string, any>) => ({
      author: author.getDataValue("author"),
      commitCount: author.getDataValue("commitCount"),
    }));
  } catch (error) {
    throw new Error("Failed to fetch top commit authors.");
  }
};

export const fetchCommitsByRepoName = async (repoName: string) => {
  try {
    const repository: Record<string, any> | null =
      await RepositoryModel.findOne({
        where: { name: repoName },
        include: [
          {
            model: Commit,
            as: "commits",
            required: true,
          },
        ],
      });

    if (!repository) {
      throw new Error(`Repository with name "${repoName}" not found.`);
    }

    return repository.commits;
  } catch (error) {
    throw new Error("Failed to fetch commits by repository name.");
  }
};
