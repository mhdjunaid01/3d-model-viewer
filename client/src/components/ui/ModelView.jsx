/* eslint-disable react-hooks/rules-of-hooks */
import React, { Suspense, useMemo } from "react"
import { Canvas } from "@react-three/fiber"
import { ErrorBoundary } from "react-error-boundary"
import { useLoader } from "@react-three/fiber"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import {
  OrbitControls,
  useFBX,
  useGLTF,
  useBounds,
  Bounds,
  Environment,
  Html,
} from "@react-three/drei"

// Loader 
function Loader() {
  return (
    <Html center>
      <span className="text-white">Loading...</span>
    </Html>
  )
}

// Error Boundary

function ErrorFallback() {
  return (
    <p className="text-red-500 text-center">
      Something went wrong in the 3D viewer.
    </p>
  )
}

// Dynamic model loader
function Model({ url }) {
  const extension = useMemo(() => url.split(".").pop().toLowerCase(), [url])

  if (extension === "fbx") {
    const fbx = useFBX(url)
    return <primitive object={fbx} scale={1} />
  }

  if (extension === "glb" || extension === "gltf") {
    const { scene } = useGLTF(url)
    return <primitive object={scene} scale={1} />
  }

  if (extension === "obj") {
    const obj = useLoader(OBJLoader, url)
    return <primitive object={obj} scale={1} />
  }

  return (
    <Html center>
      <span className="text-red-400">
        Unsupported file format: {extension}
      </span>
    </Html>
  )
}

// Auto fit model on load
function BoundsWrapper({ children }) {
  const bounds = useBounds()

  return (
    <group
      onClick={() => bounds?.refresh().fit()}
      onPointerMissed={() => bounds?.refresh().fit()}
    >
      {children}
    </group>
  )
}

// Main viewer
export default function ModelView({ modelUrl }) {
  return (
    <div className="w-full h-[550px] bg-black rounded-4xl mb-10">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Canvas camera={{ position: [0, 2, 8], fov: 45, near: 0.01, far: 1000 }} shadows>
          <Suspense fallback={<Loader />}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Environment preset="apartment" background={false} />
            <OrbitControls makeDefault enablePan enableZoom enableRotate />

            <Bounds fit clip observe margin={1.2}> 
              <BoundsWrapper>
                <Model url={modelUrl} />
              </BoundsWrapper>
            </Bounds>
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  )
}
