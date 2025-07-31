import React, { useState } from "react"
// import axios from "@/api/axios"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import instance from "@/api/axios"

export default function FileUpload({ onUploaded }) {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a 3D model file")

    const formData = new FormData()
    formData.append("file", file)

    try {
      setUploading(true)
      const res = await instance.post("/files/upload", formData)
      const cloudUrl = res?.data?.file?.url
      if (cloudUrl) {
        toast.success("File uploaded successfully")
        if (onUploaded) onUploaded(cloudUrl)
      }
    } catch (err) {
      console.error("Upload failed", err)
      toast.error("Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center cursor-pointer">
          <FileIcon className="w-12 h-12" />
          <span className="text-xs text-gray-500">
            Upload .glb, .gltf, .obj, or .fbx
          </span>
        </div>
        <div className="space-y-2 text-sm">
          <Label htmlFor="file" className="text-sm font-medium">
            File
          </Label>
          <Input
            id="file"
            type="file"
            accept=".glb,.gltf,.fbx,.obj"
            onChange={handleFileChange}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button size="lg" onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </CardFooter>
    </Card>
  )
}

function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}