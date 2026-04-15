import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Center, Html, useProgress } from '@react-three/drei'
import { HeadcoverModel } from './components/HeadcoverModel'
import { ConfigPanel } from './components/ConfigPanel'
import './App.css'

const DEFAULT_CONFIG = {
  topLeather:    '#111111',
  bottomLeather: '#1b2a4a',
  fleece:        '#0f0f0f',
  stitching:     '#1b2a4a',
  stitchAccent:  '#8c8c8c',
}

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="loader">
        <div className="loader-track">
          <div className="loader-bar" style={{ width: `${progress}%` }} />
        </div>
        <p className="loader-label">Loading Model&ensp;{Math.round(progress)}%</p>
      </div>
    </Html>
  )
}

// Reset icon SVG
function ResetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
    </svg>
  )
}

export default function App() {
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const [panelOpen, setPanelOpen] = useState(true)

  return (
    <div className="app">
      {/* Full-screen 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0.28, 0.65], fov: 42 }}
        gl={{ antialias: true }}
        shadows={false}
      >
        <color attach="background" args={['#080808']} />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 5, 3]} intensity={1.2} />
        <directionalLight position={[-3, 2, -2]} intensity={0.3} />
        <Environment preset="studio" />

        {/* Model */}
        <Suspense fallback={<Loader />}>
          <Center>
            <HeadcoverModel config={config} />
          </Center>
        </Suspense>

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={0.35}
          maxDistance={1.4}
          enableDamping
          dampingFactor={0.06}
          target={[0, 0.22, 0]}
          maxPolarAngle={Math.PI * 0.85}
          minPolarAngle={Math.PI * 0.1}
        />
      </Canvas>

      {/* Brand header */}
      <header className="header">
        <span className="brand-wordmark">TREMONT</span>
        <span className="brand-divider" />
        <span className="brand-tagline">Custom Product Builder</span>
      </header>

      {/* Config panel */}
      <ConfigPanel
        config={config}
        onChange={setConfig}
        open={panelOpen}
        onToggle={() => setPanelOpen((p) => !p)}
      />

      {/* Floating reset button */}
      <div className="controls-dock">
        <button
          className="dock-btn"
          onClick={() => setConfig(DEFAULT_CONFIG)}
          title="Reset to defaults"
        >
          <ResetIcon />
          <span>Reset</span>
        </button>
      </div>
    </div>
  )
}
