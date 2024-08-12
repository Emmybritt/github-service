import { saveCommits, saveRepository } from "../../src/services/db.service";
import {
  getRepositoryCommits,
  getRepositoryInfo,
} from "../../src/services/api.service";
import { indexRepository } from "../functions/indexGithubRepository";
import dotenv from "dotenv";

dotenv.config();

jest.mock("../../src/services/db.service");
jest.mock("../../src/services/api.service");

describe("indexRepository", () => {
  const repoName = "chromium/chromium";
  const startDate = "2023-01-01T00:00:00Z";
  const repoInfoMock = {
    id: "repo123",
    name: repoName,
  };
  const commitsMock = [
    { id: "commit1", message: "Initial commit", author: "author1" },
    { id: "commit2", message: "Second commit", author: "author2" },
  ];

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it("should save repository info and initial commits", async () => {
    (getRepositoryInfo as jest.Mock).mockResolvedValue(repoInfoMock);
    (saveRepository as jest.Mock).mockResolvedValue({
      dataValues: repoInfoMock,
    });
    (getRepositoryCommits as jest.Mock).mockResolvedValue(commitsMock);
    (saveCommits as jest.Mock).mockResolvedValue(undefined);

    const intervalId = await indexRepository(repoName, startDate);

    expect(getRepositoryInfo).toHaveBeenCalledWith(repoName);
    expect(saveRepository).toHaveBeenCalledWith(repoInfoMock);
    expect(getRepositoryCommits).toHaveBeenCalledWith(repoName, startDate);
    expect(saveCommits).toHaveBeenCalledWith(repoInfoMock.id, commitsMock);

    clearInterval(intervalId);
  });
});
