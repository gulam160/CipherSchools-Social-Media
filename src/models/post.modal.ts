import mongoose from "mongoose";

const PostsModal = new mongoose.Schema(
  {
    userInfo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    post_text: { type: String },
    image_links: [{ type: String }],
    hashtags: [{ type: String }],
    comments: [
      {
        content: { type: String },
        user: { type: mongoose.Schema.Types.ObjectId },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Posts = mongoose.model("post", PostsModal);
