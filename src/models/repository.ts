import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";
import Commit from "./commit";

export interface RepositoryAttribute {
  id: string;
  name: string;
  description?: string;
  url: string;
  language?: string;
  forksCount: number;
  starsCount: number;
  openIssuesCount: number;
  watchersCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export class RepositoryModel extends Model<RepositoryAttribute> {}

RepositoryModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    forksCount: {
      type: DataTypes.INTEGER,
    },
    starsCount: {
      type: DataTypes.INTEGER,
    },
    openIssuesCount: {
      type: DataTypes.INTEGER,
    },
    watchersCount: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "repositories",
  }
);

RepositoryModel.hasMany(Commit, { foreignKey: "repositoryId", as: "commits" });
Commit.belongsTo(RepositoryModel, {
  foreignKey: "repositoryId",
  as: "repository",
});

export default RepositoryModel;
