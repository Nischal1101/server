import express from "express";
import { PORT } from "./config";
import db from "./db/connect";
const app = express();

db()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
  })
  .catch((e) => {
    console.log(e);
  });

