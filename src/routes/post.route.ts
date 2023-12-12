import {
  getAllPost,
  handleDeletePost,
  handlePostSave,
  searchPost,
} from "../controllers/postController";
import express from "express";

const postRoute = express.Router();

postRoute.post("/posts", handlePostSave);
postRoute.get("/posts", getAllPost);
postRoute.delete("/posts/:postId", handleDeletePost);
postRoute.get("/posts/search", searchPost);

export { postRoute };
