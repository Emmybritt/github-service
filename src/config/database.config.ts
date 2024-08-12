import { Sequelize } from "sequelize";
import config from "./env.config";

const db = new Sequelize(config.databaseUrl, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ...(config.nodeEnv === "production" && {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }),
  },
});

// Connect to DB
export const syncDB = async () => {
  try {
    await db.sync();
  } catch (error) {
    console.log("Error Caught", error);
  }
};
syncDB();

export default db;
