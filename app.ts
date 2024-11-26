import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import Memberrouter from "./src/routes/UserRoute";
import GetInTouchRouter from "./src/routes/GetIntouchRoute";
import HireHallRouter from "./src/routes/HireHallRoute";
import SliderRouter from "./src/routes/ImageSliderRoutes";
import ArticlesRouter from "./src/routes/ArticleRoutes";
import path from "path";

const app = express();
dotenv.config({ path: "./env" });

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: ["https://chelsfieldcc.co.uk", "http://localhost:3000"],
    credentials: true,
  })
);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use("/api/v1", Memberrouter);
app.use("/api/v1", GetInTouchRouter);
app.use("/api/v1", HireHallRouter);
app.use("/api/v1", SliderRouter);
app.use("/api/v1", ArticlesRouter);
app.use("/api/v1", HireHallRouter);