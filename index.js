import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/", (req, res) => {
  res.status(200).json("Hello I'm API");
});

const port = process.env.PORT;
const mongoURL = process.env.DB_URL;

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () => console.log(`Server running on port ${port}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
// app.use(express.json());

// const posts = [
//   {
//     username: "John",
//     title: "Post 1",
//   },
// ];

// app.get("/posts", (req, res) => {
//   res.json(posts);
// });

// app.post("/login", (req, res) => {
//   //authenticate
//   const username = req.body.username;
//   const user = { name: username };
//   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//   res.send(JSON.stringify({ accessToken: accessToken }));
// });

// app.listen(port);
