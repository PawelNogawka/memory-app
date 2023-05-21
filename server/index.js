import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import 'dotenv/config';


import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/auth", authRoutes);
//console.log(process.env.CONNECTION_URL)
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = 5001;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  )
  .catch((error) => console.error(error.message));
