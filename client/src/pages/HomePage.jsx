import FileUpload from "@/components/ui/FileUpload"
import ModelViewer from "@/components/ui/ModelView"
import React, { useState } from "react"

const HomePage = () => {
  const [modelUrl, setModelUrl] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-400 via-blue-50 to-blue-100">
      <nav className="flex justify-center items-center px-6 py-4 shadow-md">
        <div className="flex items-center space-x-2">
          <img
            src="https://infusory.in/wp-content/uploads/LogoBlue-Copy.png"
            alt="Infusory Logo"
            className="h-10 w-auto"
          />
          <span className="text-blue-950 text-4xl font-bold">3D view</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center mt-16 gap-12 px-6">
        <div className="max-w-md text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Welcome to Infusory 3D
          </h1>
          <p className="text-gray-600 text-lg">
            Explore interactive 3D models right in your browser. Built with React,
            Vite, Tailwind and ShadCN UI.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white shadow-lg rounded-xl flex items-center justify-center border-2 border-dashed border-gray-400">
          <FileUpload onUploaded={setModelUrl} />
        </div>
      </section>

      {/* Model Viewer Section */}
      {modelUrl && (
        <section className="px-6 mt-12">
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
            Preview Your 3D Model
          </h2>
          <ModelViewer modelUrl={modelUrl} />
        </section>

      )}
      
    </div>
  )
}

export default HomePage
