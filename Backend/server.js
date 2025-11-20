import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import whatsappRoutes from "./routes/whatsapp.js";
import Review from "./models/Review.js";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


connectDB();


app.use("/", whatsappRoutes);


app.get("/api/reviews", async (req, res) => {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
