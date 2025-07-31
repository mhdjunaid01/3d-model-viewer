import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/db.js";
import fileRoute from "./routes/fileRoute.js";
import { errorHandler, notFoundHandler} from "./middlewares/errorHandle.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [process.env.CLIENT_URL|| "*"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}))

// Database connection
connectDB();
// Middleware
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

// Multer middleware for file uploadsapp.use(morgan("dev"));


// Routes
app.use("/api/files", fileRoute);




app.use(errorHandler)
app.use(notFoundHandler);
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

export default app;
