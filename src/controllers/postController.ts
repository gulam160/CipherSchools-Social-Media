import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Posts } from "../models/post.modal";
import User from "../models/user.modal";

interface Decoded extends JwtPayload {
  userId: string;
}

// Creating a post (can be done by user who posted)
export const handlePostSave = async (req: Request, res: Response) => {
  const payload = req.body;
  const token = req.headers.authorization?.split(" ")[1] as string;
  try {
    if (token) {
      jwt.verify(
        token,
        process.env.JWTSECRET as string,
        async (err, decoded) => {
          if (!decoded) {
            res.status(401).send({ msg: "Invalid token", err });
          } else {
            const { userId } = decoded as Decoded;
            const dataToSave = { ...payload, userInfo: userId };
            const post = new Posts(dataToSave);
            await post.save();
            res.status(200).send("Post created successfully");
          }
        }
      );
    } else {
      res.status(404).send({ msg: "token not found" });
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

// Retrieve a list of posts (recent one comes on top).
export const getAllPost = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1] as string;
  try {
    if (token) {
      jwt.verify(
        token,
        process.env.JWTSECRET as string,
        async (err, decoded) => {
          if (!decoded) {
            res.status(401).send({ msg: "Invalid token", err });
          } else {
            const { userId } = decoded as Decoded;
            const post = await Posts.find({ userInfo: userId })
              .sort({
                createdAt: -1,
              })
              .exec();
            res.status(200).json({ data: post, length: post.length });
          }
        }
      );
    } else {
      res.status(404).send({ msg: "token not found" });
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

// Delete a post (can be done by user who posted)
export const handleDeletePost = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1] as string;
  try {
    if (token) {
      jwt.verify(
        token,
        process.env.JWTSECRET as string,
        async (err, decoded) => {
          if (!decoded) {
            res.status(401).send({ msg: "Invalid token", err });
          } else {
            const { userId } = decoded as Decoded;
            const postToDelete = req.params.postId;
            const response = await Posts.findOneAndDelete({
              _id: postToDelete,
              userInfo: userId,
            });
            if (response) {
              res.status(200).json({ msg: "post deleted successfully" });
            } else {
              res.status(404).json({ msg: "Post not found" });
            }
          }
        }
      );
    } else {
      res.status(404).send({ msg: "Token not found" });
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

// Search for posts by username or hashtag.
export const searchPost = async (req: Request, res: Response) => {
  const searchTerms = req.query.search as string;
  try {
    if (!searchTerms) {
      res.status(400).json({ msg: "Please provide a query parameter" });
    } else {
      let query;
      if (searchTerms.startsWith("#")) {
        query = { hashtags: searchTerms };
      } else {
        const user = await User.findOne({ name: searchTerms });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        } else {
          query = { userInfo: user._id };
        }
      }
      const posts = await Posts.find(query);
      res.status(200).json({ data: posts, length: posts.length });
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};
