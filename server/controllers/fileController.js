import ModelFile from "../models/ModelFile.js";

export const uploadFile = async (req, res) => {
  console.log("File upload request received:", req.file);
  console.log("File details:")
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const ext = req.file.originalname.split('.').pop().toLowerCase();

    const newModel = new ModelFile({
      filename: req.file.originalname,
      format: ext,
      cloudinaryUrl: req.file.path, 
      size: req.file.size,
    });

    const savedModel = await newModel.save();

    res.status(200).json({
      message: "File uploaded successfully",
      file: {
        id: savedModel._id,
        filename: savedModel.filename,
        format: savedModel.format,
        url: savedModel.cloudinaryUrl,
        size: savedModel.size,
        uploadedAt: savedModel.createdAt
      }
    });

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ 
      message: "Upload failed", 
      error: error.message 
    });
  }
};