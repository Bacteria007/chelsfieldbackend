import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import Memberrouter from "./src/routes/UserRoute";
import GetInTouchRouter from "./src/routes/GetIntouchRoute";
import HireHallRouter from "./src/routes/HireHallRoute";
import SliderRouter from "./src/routes/ImageSliderRoutes";
import ArticlesRouter from "./src/routes/ArticleRoutes";

const app = express()
dotenv.config({path: "./env"});

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: ['https://chelsfieldcc.co.uk','http://localhost:3000'],
    credentials: true
}));
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
app.use("/api/v1",Memberrouter)
app.use("/api/v1",GetInTouchRouter)
app.use("/api/v1",HireHallRouter)
app.use("/api/v1",SliderRouter)
app.use("/api/v1",ArticlesRouter)
app.use("/api/v1",HireHallRouter)




// MONGODB_URL = "mongodb+srv://GujranwalaZone:alihasan331229@cluster1.3v4ng8w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
// MONGODB_URI = "mongodb://localhost:27017"
// CORS_ORIGIN = http://localhost:5173
// SMPT_HOST=smtp.gmail.com
// SMPT_PORT=587
// SMPT_SERVICE=gmail
// SMPT_MAIL=alihasan331229@gmail.com
// SMPT_PASSWORD=djsh kvcj cqgq bcnw

// SMTP_HOST=email-smtp.us-east-1.amazonaws.com
// SMTP_PORT=465
// SMTP_USERNAME=AKIAVK32KAKMIJVDPWE
// SMTP_PASSWORD=BM9U40gg7ngv+335/MAYMjIY/6AGPrY22e2yaEw//oa
// # SMTP_FROM_EMAIL=admin@chelsfieldcc.co.uk
// SMTP_FROM_EMAIL=info@chelsfieldcc.co.uk
