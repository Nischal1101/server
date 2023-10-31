import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config";
import db from "./db/connect";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import listingRouter from "./routes/listing.routes";
import { error } from "./utils/error";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

declare global {
  namespace Express {
    interface Request {
      user: {
        _id: string;
        password: string;
        username: string;
        avatar: string;
      };
    }
  }
}
app.use(error);
app.all("*", (req, res, next) => {
  res.status(404).json({ message: `${req.originalUrl} not Found` });
});

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
