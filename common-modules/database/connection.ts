import mongoose from "mongoose";
import { ApiConfig } from "../config";

mongoose
  .connect(process.env.DB_CONNECTION_URL || ApiConfig.DEFAULT_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.info("db connected");
  })
  .catch(() => {
    console.error("db not connected");
  });
