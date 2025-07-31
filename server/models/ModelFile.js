
import mongoose from "mongoose";

const modelFileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
    trim: true,
  },
  format: {
    type: String,
    required: true,
    enum: ["glb", "gltf", "obj", "fbx"],
    lowercase: true,
  },
  cloudinaryUrl: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const ModelFile = mongoose.model("ModelFile", modelFileSchema);

export default ModelFile;