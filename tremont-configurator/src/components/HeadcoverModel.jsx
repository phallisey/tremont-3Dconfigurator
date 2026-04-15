import { useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'

const MODEL_URL =
  'https://raw.githubusercontent.com/phallisey/tremont-3Dconfigurator/main/Tremont%203D%20Custom%20Product%20Builder%20Files/Models/French%20Seam%20Wood%20Cover%20WIP2.gltf'

export function HeadcoverModel({ config }) {
  const { scene } = useGLTF(MODEL_URL)

  // Deep-clone scene + materials so we never mutate the loader cache
  const model = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((child) => {
      if (!child.isMesh) return
      if (Array.isArray(child.material)) {
        child.material = child.material.map((m) => m.clone())
      } else {
        child.material = child.material.clone()
      }
    })
    return clone
  }, [scene])

  // Apply color config whenever it changes
  useEffect(() => {
    model.traverse((child) => {
      if (!child.isMesh) return

      const apply = (mat) => {
        const n = mat.name
        if (n.includes('Top Pebble')) {
          mat.color.set(config.topLeather)
        } else if (n.includes('Back Pebble') || n.includes('Bottom Pebble')) {
          mat.color.set(config.bottomLeather)
        } else if (n.includes('Fleece')) {
          mat.color.set(config.fleece)
        } else if (n.includes('Topstitch')) {
          // "Copy 4" is the contrast/accent stitch
          if (n.includes('Copy 4')) {
            mat.color.set(config.stitchAccent)
          } else {
            mat.color.set(config.stitching)
          }
        }
        // T embroidery and Tremont Type keep their original appearance
      }

      if (Array.isArray(child.material)) {
        child.material.forEach(apply)
      } else {
        apply(child.material)
      }
    })
  }, [model, config])

  return (
    <primitive
      object={model}
      rotation={[0, Math.PI * 0.1, 0]}
    />
  )
}

useGLTF.preload(MODEL_URL)
