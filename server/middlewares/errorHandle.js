// Error handling middleware for use in app.js after routes but before app.listen
const errorHandler = (error, _req, res, _next) => {
  console.error("=== Global Error Handler ===");
  console.error("Error:", error);
  
  // Multer errors
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ 
      message: "File too large", 
      maxSize: "50MB" 
    });
  }
  
  if (error.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({ 
      message: "Unexpected file field" 
    });
  }
  
  // Cloudinary errors
  if (error.message && error.message.includes('cloudinary') || error.http_code) {
    return res.status(500).json({ 
      message: "File upload service error",
      error: error.message 
    });
  }
  
  // Default error
  res.status(500).json({ 
    message: "Internal server error",
    error: error.message 
  });
};

// 404 handler middleware
const notFoundHandler = (_req, res) => {
  res.status(404).json({ message: "Route not found" });
};

export { errorHandler, notFoundHandler };