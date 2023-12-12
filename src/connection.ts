import mongoose from "mongoose";

const connection = mongoose.connect(process.env.DBURI as string);

export default connection;
