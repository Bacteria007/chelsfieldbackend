const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const { connectDB } = require("./src/db/database");
const app = express();
dotenv.config({ path: "./.env" });
connectDB()


const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const Memberrouter = require("./src/routes/UserRoute");
const GetInTouchRouter = require("./src/routes/GetInTouchRoute");
const HireHallRouter = require("./src/routes/HireHallRoute");
const SliderRouter = require("./src/routes/ImageSliderRoutes");
const ArticlesRouter = require("./src/routes/ArticleRoutes");

app.use(
  cors({
    // origin: "*", // Allow all origins
    // credentials: false, // No credentials needed when using "*"
    origin: ["https://chelsfieldcc.co.uk", "http://localhost:5173"],
    // credentials: true,
    methods: ["GET", "POST"],
  })
);

app.get("/health", (req, res) => {
  res.status(200).send("Server is running");
});
app.use("/api/v1", Memberrouter);
app.use("/api/v1", GetInTouchRouter);
app.use("/api/v1", HireHallRouter);
app.use("/api/v1", SliderRouter);
app.use("/api/v1", ArticlesRouter);
app.use("/api/v1", HireHallRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});