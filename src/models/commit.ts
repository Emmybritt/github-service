import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

interface CommitsAttributes {
  id: string;
  repositoryId: string;
  message: string;
  author: string;
  date: Date;
  url: string;
}

export class Commit extends Model<CommitsAttributes> {}

Commit.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    repositoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "commits",
    indexes: [
      {
        unique: true,
        fields: ["repositoryId", "message", "date"],
      },
    ],
  }
);

export default Commit;
