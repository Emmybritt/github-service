import dotenv from "dotenv";
dotenv.config();

const config = {
  host: process.env.HOST || "",
  port: process.env.PORT || "",
  nodeEnv: process.env.NODE_ENV || "",
  databaseUrl: process.env.DATABASE_URL || "",
  dialect: process.env.DB_DIALECT || "postgres",
};

export default config;
