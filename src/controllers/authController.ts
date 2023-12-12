import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.modal";

// User Registeration;
export const registerUser = async (req: Request, res: Response) => {
  const payload = req.body;

  try {
    const userExists = await User.findOne({ email: payload.email });
    if (userExists) {
      res.status(409).json({ msg: "Email is already in use" });
    } else {
      bcrypt.hash(payload.password, 5, async (err, hash) => {
        if (hash) {
          const newData = { ...payload, password: hash };
          const user = new User(newData);
          await user.save();
          res.status(200).json({ msg: "Successful registration done" });
        } else {
          res.status(404).json({ msg: "something went wrong!", err });
        }
      });
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ msg: "No user found" });
    } else {
      bcrypt.compare(password, user.password as string, async (err, result) => {
        if (result) {
          // authentication using JWT
          res.status(200).send({
            msg: "logged in successfully",
            token: jwt.sign(
              { userId: user._id },
              process.env.JWTSECRET as string
            ),
          });
        } else {
          res.status(401).send({ msg: "password didn't match", err });
        }
      });
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};
