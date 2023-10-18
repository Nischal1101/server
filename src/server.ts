import express from "express";
import { PORT } from "./config";
import db from "./db/connect";
import userRouter from "./routes/user.routes";
const app = express();

app.use("/api/user",userRouter);

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
