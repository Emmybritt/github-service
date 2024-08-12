# GitHub Repository Indexer

## Overview

This service indexes GitHub repository commits and metadata, storing them in a PostgreSQL database. It continuously monitors the repository for new commits and avoids duplicates.

## Project Structure

- src/config/: Contains the database configuration (database.config.ts) and environment configuration (env.config.ts).
- src/**tests**/: Contains the unit tests for the project.
- src/functions/: Contains the main functions for the service, including indexing and commit fetching.
- src/models/: Contains the Sequelize models that define the database schema.
- src/services/: Contains the service files for API interactions (api.service.ts) and database interactions (db.service.ts).

## Setup

### Requirements

- Node.js
- PostgreSQL

### Installation

1. Clone the repository.

```sh
  git clone https://github.com/yourusername/github-repository-indexer.git
  cd github-repository-indexer
```

2. Install dependencies: `npm install`.
3. Configure environment variables in `.env`.

```sh
  DB_HOST=localhost
  DB_PORT=5432
  DB_USER=your_db_user
  DB_PASSWORD=your_db_password
  DB_NAME=your_db_name
  GITHUB_API_TOKEN=your_github_api_token
```

4. Run the migrations

```sh
  npx sequelize-cli db:migrate
```

## Usage

### Available Scripts

Here is a list of the available npm scripts and what they do:

- **`npm start`**: Starts the main indexing function, which indexes the specified GitHub repository and continuously monitors it for new commits.

- **`npm run fetch:commitsByRepoName`**: Fetches all commits from the specified repository. This script executes the `fetchCommitsByRepoName.ts` function.

- **`npm run fetch:topNAuthorCommitCounts`**: Fetches the top N authors by commit count for the specified repository. This script executes the `fetchTopAuthorCommitCounts.ts` function.

- **`npm run migrate:create`**: Creates a new migration file. You'll need to provide the name of the migration after `--name`. For example:

  ```bash
  npm run migrate:create --name create-commits-table
  ```

  ### Function Explanations

- **`indexRepository`** (`src/functions/indexGithubRepository.ts`):

  This is the main function that starts the indexing process. It fetches repository information, saves it to the database, and retrieves commits starting from a specific date. The function also sets up a regular interval to check for new commits every hour.

- **`fetchCommitsByRepoName`** (`src/functions/fetchCommitsByRepoName.ts`):

  Fetches all commits for a given repository and prints them out. This can be useful for debugging or batch processing commits outside of the regular interval.

- **`fetchTopAuthorCommitCounts`** (`src/functions/fetchTopAuthorCommitCounts.ts`):

  Fetches the top N authors by commit count from the specified repository. This function is useful for analytics and reporting purposes.

## Testing

Run tests using Jest: `npm test`.
