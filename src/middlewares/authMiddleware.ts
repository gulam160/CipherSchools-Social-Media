import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1] as string;

  if (token) {
    const decoded = jwt.verify(token, process.env.JWTSECRET as string);
    if (decoded) {
      next();
    } else {
      res.status(400).send({ msg: "token expired" });
    }
  } else {
    res.status(400).send({ msg: "Please login first" });
  }
};

export default authMiddleware;
