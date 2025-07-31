import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../utils/cloudinary.js";

const allowedExtensions = ["glb", "gltf", "obj", "fbx"];

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "3d-models",
    resource_type: "raw",
    format: async (req, file) => {
      const ext = file.originalname.split(".").pop().toLowerCase();
      if (allowedExtensions.includes(ext)) {
        return ext;
      }
      
      console.error("Invalid file type:", ext);
      throw new Error(`Invalid file type: ${ext}. Allowed: ${allowedExtensions.join(", ")}`);
    },
  },
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    console.log("File filter check:", file.originalname, file.mimetype);
    const ext = file.originalname.split(".").pop().toLowerCase();
    
    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type: ${ext}`), false);
    }
  }
});

export default upload;