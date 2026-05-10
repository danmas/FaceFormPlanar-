import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import { LightState } from '../types';

interface HeadCanvasProps {
  pitch: number;
  yaw: number;
  lights: LightState[];
  setLights: (v: LightState[]) => void;
  selectedLightId: string | null;
  setSelectedLightId: (v: string | null) => void;
  fidelity: 'LOW' | 'MID' | 'FULL';
  wireframe: boolean;
  guides: boolean;
  setPitch: (v: number) => void;
  setYaw: (v: number) => void;
  customModelUrl?: string | null;
  materialColor: string;
  roughness: number;
  metalness: number;
  ambientIntensity: number;
  showLights: boolean;
  fixLightToCamera: boolean;
}

function LowFidelityHead({ wireframe, guides, color, roughness, metalness }: { wireframe: boolean, guides: boolean, color: string, roughness: number, metalness: number }) {
  const craniumMat = new THREE.MeshStandardMaterial({ 
    color: wireframe ? '#d4af37' : color,
    metalness: metalness,
    roughness: roughness,
    wireframe: wireframe,
    transparent: true,
    opacity: wireframe ? 0.4 : 1
  });
  
  const jawMat = new THREE.MeshStandardMaterial({ 
    color: wireframe ? '#d4af37' : color,
    metalness: metalness,
    roughness: roughness,
    wireframe: wireframe,
    transparent: true,
    opacity: wireframe ? 0.4 : 1
  });

  return (
    <group position={[0, 1, 0]}>
      {/* Cranial Sphere */}
      <mesh material={craniumMat} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
      </mesh>
      
      {/* Jaw block */}
      <mesh position={[0, -0.7, 0.35]} material={jawMat} castShadow receiveShadow>
        <cylinderGeometry args={[0.9, 0.5, 1.2, 32]} />
      </mesh>

      {/* Guides */}
      <group visible={guides}>
           {/* Center line */}
           <mesh position={[0, -0.4, 0]} rotation={[0, 0, 0]}>
             <torusGeometry args={[1.01, 0.015, 16, 64]} />
             <meshBasicMaterial color="#808080" depthTest={false} transparent opacity={0.5} />
           </mesh>
           <mesh position={[0, -0.4, 0]} rotation={[0, Math.PI/2, 0]}>
             <torusGeometry args={[1.01, 0.015, 16, 64]} />
             <meshBasicMaterial color="#808080" depthTest={false} transparent opacity={0.5} />
           </mesh>
           <mesh position={[0, -0.4, 0]} rotation={[Math.PI/2, 0, 0]}>
             <torusGeometry args={[1.01, 0.015, 16, 64]} />
             <meshBasicMaterial color="#d4af37" depthTest={false} transparent opacity={0.8} />
           </mesh>
           
           {/* Side circle */}
           <mesh position={[0.85, 0, 0]} rotation={[0, Math.PI/2, 0]}>
             <torusGeometry args={[0.55, 0.015, 16, 64]} />
             <meshBasicMaterial color="#808080" depthTest={false} transparent opacity={0.5} />
           </mesh>
           <mesh position={[-0.85, 0, 0]} rotation={[0, Math.PI/2, 0]}>
             <torusGeometry args={[0.55, 0.015, 16, 64]} />
             <meshBasicMaterial color="#808080" depthTest={false} transparent opacity={0.5} />
           </mesh>
           
           {/* Cross on side circle */}
           <mesh position={[0.85, 0, 0]} rotation={[0, 0, 0]}>
             <cylinderGeometry args={[0.01, 0.01, 1.1, 8]} />
             <meshBasicMaterial color="#d4af37" depthTest={false} />
           </mesh>
           <mesh position={[0.85, 0, 0]} rotation={[Math.PI/2, 0, 0]}>
             <cylinderGeometry args={[0.01, 0.01, 1.1, 8]} />
             <meshBasicMaterial color="#d4af37" depthTest={false} />
           </mesh>

           <mesh position={[-0.85, 0, 0]} rotation={[0, 0, 0]}>
             <cylinderGeometry args={[0.01, 0.01, 1.1, 8]} />
             <meshBasicMaterial color="#d4af37" depthTest={false} />
           </mesh>
           <mesh position={[-0.85, 0, 0]} rotation={[Math.PI/2, 0, 0]}>
             <cylinderGeometry args={[0.01, 0.01, 1.1, 8]} />
             <meshBasicMaterial color="#d4af37" depthTest={false} />
           </mesh>

           {/* Front face tick marks */}
           <mesh position={[0, -0.3, 0.95]} rotation={[0, 0, Math.PI/2]}>
             <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
             <meshBasicMaterial color="#d4af37" depthTest={false} />
           </mesh>
           <mesh position={[0, -0.9, 0.85]} rotation={[0, 0, Math.PI/2]}>
             <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
             <meshBasicMaterial color="#d4af37" depthTest={false} />
           </mesh>
      </group>
    </group>
  );
}

// Mid Fidelity: Icosahedron simulating planar structures
function MidFidelityHead({ wireframe, guides, color, roughness, metalness }: { wireframe: boolean, guides: boolean, color: string, roughness: number, metalness: number }) {
  const material = new THREE.MeshStandardMaterial({ 
    color: wireframe ? '#d4af37' : color, 
    roughness: roughness,
    metalness: metalness,
    flatShading: true,
    wireframe: wireframe,
    transparent: true,
    opacity: wireframe ? 0.3 : 1
  });

  return (
    <group position={[0, 1, 0]}>
      {/* Base Cranium */}
      <mesh material={material} castShadow receiveShadow>
        <icosahedronGeometry args={[1, 1]} />
      </mesh>
      {/* Lower Face planes */}
      <mesh position={[0, -0.6, 0.3]} material={material} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 0.4, 1.2, 6]} />
      </mesh>
      {/* Nose plane proxy */}
      <mesh position={[0, -0.1, 0.9]} rotation={[0.2, 0, 0]} material={material} castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.6, 0.4]} />
      </mesh>
      
      {guides && (
        <group>
           <mesh position={[0, 0, 1]} rotation={[Math.PI/2, 0, 0]}>
             <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
             <meshBasicMaterial color="#808080" />
           </mesh>
           <mesh position={[0, -0.3, 1]} rotation={[0, 0, 0]}>
             <cylinderGeometry args={[0.02, 0.02, 2.5, 8]} />
             <meshBasicMaterial color="#d4af37" />
           </mesh>
        </group>
      )}
    </group>
  );
}

// Full Fidelity: Smoother denser geometry
function FullFidelityHead({ wireframe, guides, color, roughness, metalness }: { wireframe: boolean, guides: boolean, color: string, roughness: number, metalness: number }) {
  const material = new THREE.MeshStandardMaterial({ 
    color: wireframe ? '#d4af37' : color, 
    roughness: roughness,
    metalness: metalness,
    wireframe: wireframe,
    transparent: true,
    opacity: wireframe ? 0.3 : 1
  });

  return (
    <group position={[0, 1, 0]}>
       {/* Use a higher poly count object that somewhat resembles a bust */}
       <mesh material={material} castShadow receiveShadow>
         {/* Since we don't have a GLB, we'll use a denser sphere joined with a neck */}
         <sphereGeometry args={[1, 64, 64]} />
       </mesh>
       <mesh position={[0, -0.9, 0.2]} material={material} castShadow receiveShadow>
         <cylinderGeometry args={[0.9, 0.6, 1.2, 32]} />
       </mesh>
       <mesh position={[0, -1.8, 0]} material={material} castShadow receiveShadow>
          <cylinderGeometry args={[0.5, 0.7, 1, 32]} />
       </mesh>

       {guides && (
        <group>
           <mesh position={[0, 0, 1]} rotation={[Math.PI/2, 0, 0]}>
             <cylinderGeometry args={[0.015, 0.015, 2, 8]} />
             <meshBasicMaterial color="#808080" />
           </mesh>
           <mesh position={[0, -0.3, 1]} rotation={[0, 0, 0]}>
             <cylinderGeometry args={[0.015, 0.015, 2.5, 8]} />
             <meshBasicMaterial color="#d4af37" />
           </mesh>
        </group>
      )}
    </group>
  );
}

function CustomModel({ url, wireframe, color, roughness, metalness }: { url: string, wireframe: boolean, color: string, roughness: number, metalness: number }) {
  const { scene } = useGLTF(url);
  
  // Override the original material with our dark theme clay material
  useEffect(() => {
    const themeMaterial = new THREE.MeshStandardMaterial({
      color: wireframe ? '#d4af37' : color,
      roughness: roughness,
      metalness: metalness,
      wireframe: wireframe,
      transparent: true,
      opacity: wireframe ? 0.3 : 1,
      flatShading: true,
    });

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = themeMaterial;
      }
    });
  }, [scene, wireframe, color, roughness, metalness]);

  return <primitive object={scene} scale={[1.5, 1.5, 1.5]} position={[0, -0.5, 0]} />;
}

function Scene({ pitch, yaw, lights, setLights, selectedLightId, setSelectedLightId, fidelity, wireframe, guides, customModelUrl, setPitch, setYaw, materialColor, roughness, metalness, ambientIntensity, showLights, fixLightToCamera }: HeadCanvasProps) {
  const groupRef = useRef<THREE.Group>(null);
  const lightsGroupRef = useRef<THREE.Group>(null);
  const controlsRef = useRef<any>(null);

  // Sync external state (sliders) to group rotation
  useEffect(() => {
    if (groupRef.current) {
      // Sliders drive the object's explicit rotation wrapper
      groupRef.current.rotation.x = THREE.MathUtils.degToRad(pitch);
      groupRef.current.rotation.y = THREE.MathUtils.degToRad(yaw);
    }
  }, [pitch, yaw]);

  useFrame((state) => {
    if (lightsGroupRef.current) {
      if (fixLightToCamera) {
        // Tie lights rotation to camera so they orbit relative to the screen
        lightsGroupRef.current.quaternion.copy(state.camera.quaternion);
      } else {
        // Reset to world
        lightsGroupRef.current.quaternion.identity();
      }
    }
  });

  // Handle orbit controls updating sliders
  const handleControlChange = () => {
    // Left empty intentionally.
  };

  return (
    <>
      <group ref={lightsGroupRef}>
        <ambientLight intensity={ambientIntensity} />
        
        {lights.map(light => {
          const radius = light.distance;
          const phi = THREE.MathUtils.degToRad(light.elevation);
          const theta = THREE.MathUtils.degToRad(light.azimuth);
          const lx = radius * Math.cos(phi) * Math.sin(theta);
          const ly = radius * Math.sin(phi);
          const lz = radius * Math.cos(phi) * Math.cos(theta);
          
          const isSelected = selectedLightId === light.id;

          return (
            <group key={light.id}>
              {light.type === 'directional' ? (
                <directionalLight 
                  position={[lx, ly, lz]} 
                  intensity={light.intensity} 
                  color={light.color}
                  castShadow 
                  shadow-mapSize-width={1024} 
                  shadow-mapSize-height={1024} 
                />
              ) : (
                <pointLight 
                  position={[lx, ly, lz]} 
                  color={light.color} 
                  intensity={light.intensity} 
                  distance={light.distance * 2} // let decay happen
                />
              )}
              
              {showLights && (
                <mesh 
                  position={[lx, ly, lz]} 
                  onClick={(e) => { e.stopPropagation(); setSelectedLightId(light.id); }}
                  onPointerOver={(e) => { document.body.style.cursor = 'pointer'; }}
                  onPointerOut={(e) => { document.body.style.cursor = 'auto'; }}
                >
                  <sphereGeometry args={[isSelected ? 0.25 : 0.15, 16, 16]} />
                  <meshBasicMaterial 
                    color={light.color} 
                    transparent 
                    opacity={isSelected ? 1 : 0.7} 
                    wireframe={isSelected}
                  />
                  {isSelected && (
                    <pointLight color={light.color} intensity={0.5} distance={1} /> 
                  )}
                </mesh>
              )}
            </group>
          );
        })}
      </group>

      <group ref={groupRef}>
        {customModelUrl ? (
          <Suspense fallback={null}>
            <CustomModel url={customModelUrl} wireframe={wireframe} color={materialColor} roughness={roughness} metalness={metalness} />
          </Suspense>
        ) : (
          <>
            {fidelity === 'LOW' && <LowFidelityHead wireframe={wireframe} guides={guides} color={materialColor} roughness={roughness} metalness={metalness} />}
            {fidelity === 'MID' && <MidFidelityHead wireframe={wireframe} guides={guides} color={materialColor} roughness={roughness} metalness={metalness} />}
            {fidelity === 'FULL' && <FullFidelityHead wireframe={wireframe} guides={guides} color={materialColor} roughness={roughness} metalness={metalness} />}
          </>
        )}
      </group>

      <ContactShadows position={[0, -1.2, 0]} opacity={0.6} scale={10} blur={2} far={4} />
      
      <OrbitControls 
        ref={controlsRef}
        onChange={handleControlChange}
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={20}
      />
    </>
  );
}

export default function HeadCanvas(props: HeadCanvasProps) {
  return (
    <Canvas shadows camera={{ position: [0, 1, 6], fov: 45 }} onPointerMissed={() => props.setSelectedLightId(null)}>
      <Scene {...props} />
    </Canvas>
  );
}
