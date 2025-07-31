import express from "express";
import { uploadFile } from "../controllers/fileController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();
// router.post("/upload", upload.single("file"), uploadFile);
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    await uploadFile(req, res);
  } catch (error) {
    console.error("Error in file upload route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
export default router;

