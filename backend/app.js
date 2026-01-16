import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { erroMiddleware } from "./utils/errorHandler.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// message router
import messageRouter from "./routes/message.route.js";
app.use("/auth/v1/message", messageRouter);

// user router
import userRouter from "./routes/user.route.js";
app.use("/auth/v1/user", userRouter);

// skill router
import skillRouter from "./routes/skill.route.js";
app.use("/auth/v1/skills", skillRouter);

// Project router
import projectRouter from "./routes/project.route.js";
app.use("/auth/v1/project", projectRouter);

// TimeLine router
import timeLineRouter from "./routes/timeLine.route.js"
app.use("/auth/v1/timeline", timeLineRouter)

app.use(erroMiddleware);
export { app };
