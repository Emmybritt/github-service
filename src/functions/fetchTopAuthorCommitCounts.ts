import { fetchTopNCommitAuthors } from "../services/db.service";

const fetchTopAuthorCommitCount = async (repoId: string, topN: number) => {
  try {
    const authors = await fetchTopNCommitAuthors(repoId, topN);
    console.log(authors);
  } catch (error) {
    console.log(error);
  }
};

const repoId = "0093b222-ce17-4fa8-a9e7-f8b1860d1e67";
const topN = 3;

fetchTopAuthorCommitCount(repoId, topN);
