import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import connection from "./connection";
import { authRoute } from "./routes/auth.route";
import { postRoute } from "./routes/post.route";
import authMiddleware from "./middlewares/authMiddleware";
import validateRequest from "./middlewares/validationMiddleware";

const port = process.env.SERVER_PORT || 5200;

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("common"));

// Routes
app.use("/", validateRequest, authRoute);
app.use("/", authMiddleware, validateRequest, postRoute);

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (error) {
    console.error((error as Error).message);
  }
  console.log(`Server is running at port ${port}`);
});
