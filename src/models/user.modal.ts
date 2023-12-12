import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, require: [true, "Name is missing!"] },
    email: {
      type: String,
      require: [true, "Provide your email"],
      unique: [true, "Email is already in use"],
    },
    password: {
      type: String,
      require: [true, "Password is missing"],
      unique: true,
    },
    profilePicture: { type: String, default: "" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("user", UserSchema);

export default User;
