import express from "express";
import { PORT } from "./config";
import db from "./db/connect";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import { error } from "./utils/error";
const app = express();

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);


app.use(error);

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
