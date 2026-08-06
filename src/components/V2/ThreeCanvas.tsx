import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

useGLTF.preload('/models/HEFESTO_FABRICA.glb');

// Global mouse tracker ref so canvas reacts even when pointer-events-none is on container
const globalMouse = { x: 0, y: 0 };
if (typeof window !== 'undefined') {
  window.addEventListener('pointermove', (e) => {
    globalMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    globalMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
}

function ModelLoader({ roughness, metalness, modelColor, autoRotate, scrollProgress, isClean }: any) {
  const modelRef = useRef<THREE.Group>(null);
  
  // Hook call at top level
  const gltf = useGLTF('/models/HEFESTO_FABRICA.glb');

  // Clone scene so multiple canvas instances render separate copies without stealing Object3D
  const clonedScene = useMemo(() => {
    if (!gltf || !gltf.scene) return null;
    const clone = gltf.scene.clone(true);
    clone.traverse((child: any) => {
      if (child.isMesh) {
        if (isClean) {
          child.material = new THREE.MeshStandardMaterial({
            color: '#080808', // very dark tone for rim light
            roughness: 0.3,
            metalness: 0.8,
          });
        } else {
          child.material = new THREE.MeshStandardMaterial({
            color: modelColor || '#d8d8d8',
            roughness: roughness ?? 0.25,
            metalness: metalness ?? 0.75,
            emissive: new THREE.Color('#151515'),
            emissiveIntensity: 0.1,
            map: null,
            envMapIntensity: 1.0,
          });
        }
      }
    });
    return clone;
  }, [gltf, modelColor, roughness, metalness, isClean]);

  useFrame((state, delta) => {
    const px = globalMouse.x || state.pointer.x;
    const py = globalMouse.y || state.pointer.y;

    let targetScale = (isClean ? 2.5 : 2.8) + (scrollProgress || 0) * 8.0;
    let targetY = (isClean ? -0.4 : -0.5) - (scrollProgress || 0) * 1.5;
    
    if (modelRef.current) {
      modelRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
      modelRef.current.position.lerp(new THREE.Vector3(0.0, targetY, 0), 0.05);

      if (autoRotate) {
        modelRef.current.rotation.y += delta * 0.5;
      } else {
        if (isClean) {
          // Repulsive mouse effect
          modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, -0.8 - (px * Math.PI) / 4, 0.05);
          modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, (py * Math.PI) / 6, 0.05);
        } else {
          // Attractive mouse effect
          modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, -0.8 + (px * Math.PI) / 4, 0.05);
          modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, -(py * Math.PI) / 6 - ((scrollProgress || 0) * 0.3), 0.05);
        }
      }
    }
  });

  if (clonedScene) {
    return (
      <group ref={modelRef} position={[0, -0.4, 0]} rotation={[0, -0.8, 0]} scale={isClean ? 2.5 : 2.8}>
        <primitive object={clonedScene} />
      </group>
    );
  }

  return null;
}

function SceneContent(props: any) {
  const isClean = props.renderClean;
  return (
    <>
      {isClean ? (
        <>
          <ambientLight intensity={0.5} />
          {/* Main front light (dimmed) */}
          <directionalLight position={[0, 4, 5]} intensity={2} color="#ffffff" />
          
          {/* Rim Light: Left side, slightly behind, pointing towards the face/shoulder */}
          <directionalLight position={[-8, 3, -4]} intensity={35} color="#ff5500" />
          <pointLight position={[-6, 2, -3]} intensity={50} distance={15} color="#ff6600" />
        </>
      ) : (
        <>
          <ambientLight intensity={3.0} />
          <directionalLight position={[6, 8, 6]} intensity={8} color="#ffffff" />
          <directionalLight position={[-6, -4, -4]} intensity={5} color="#ffffff" />
          <pointLight position={[0, 0, 5]} intensity={8} color="#ffffff" distance={25} />
          <pointLight position={[0, 4, -2]} intensity={6} color="#ffffff" distance={25} />
        </>
      )}
      
      <ModelLoader {...props} isClean={isClean} />
    </>
  );
}

function EffectPass({ pixelFactor, brightness, smearIntensity, scrollProgress = 0, isEmbedded = false }: any) {
  const { gl, scene, camera, size } = useThree();
  
  const target = useMemo(() => {
    return new THREE.WebGLRenderTarget(
      Math.floor(size.width / pixelFactor),
      Math.floor(size.height / pixelFactor),
      {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
      }
    );
  }, [pixelFactor, size]);

  useEffect(() => {
    target.setSize(Math.floor(size.width / pixelFactor), Math.floor(size.height / pixelFactor));
  }, [size, pixelFactor, target]);

  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const quadScene = useMemo(() => new THREE.Scene(), []);
  const quadCamera = useMemo(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), []);

  useFrame((state) => {
    // Render main scene to offscreen target
    gl.setRenderTarget(target);
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    // Update uniforms
    if (materialRef.current) {
      materialRef.current.uniforms.tDiffuse.value = target.texture;
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      materialRef.current.uniforms.uPixelFactor.value = pixelFactor;
      materialRef.current.uniforms.uBrightness.value = brightness;
      materialRef.current.uniforms.uSmear.value = smearIntensity;
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Map pointer from [-1, 1] to [0, 1]
      materialRef.current.uniforms.uMouse.value.set(
        (state.pointer.x + 1.0) / 2.0,
        (state.pointer.y + 1.0) / 2.0
      );
      
      // Calculate scroll fade opacity for statue dots
      const opacityVal = isEmbedded ? 1.0 : Math.max(0.75, 1.0 - scrollProgress * 0.35);
      materialRef.current.uniforms.uOpacity.value = opacityVal;
    }

    // Render quad to screen
    gl.render(quadScene, quadCamera);
  }, 1);

  const uniforms = useMemo(() => ({
    tDiffuse: { value: null },
    uResolution: { value: new THREE.Vector2() },
    uPixelFactor: { value: 6.0 },
    uBrightness: { value: 1.0 },
    uSmear: { value: 0.3 },
    uTime: { value: 0.0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uOpacity: { value: 1.0 }
  }), []);

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform sampler2D tDiffuse;
    uniform vec2 uResolution;
    uniform float uPixelFactor;
    uniform float uBrightness;
    uniform float uSmear;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uOpacity;
    
    varying vec2 vUv;

    float rand(vec2 co){
      return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;
      
      // Calculate dot grid
      vec2 d = uPixelFactor / uResolution;
      
      vec2 pixelUv = floor(uv / d) * d + (d * 0.5);
      vec2 fractUv = fract(uv / d);
      
      // Add slow continuous horizontal drift instead of blinking noise
      float drift = sin(pixelUv.y * 10.0 + uTime * 0.5) * 0.5 + sin(pixelUv.y * 25.0 - uTime * 0.2) * 0.5;
      pixelUv.x += drift * uSmear * 0.015;
      
      vec4 texColor = texture2D(tDiffuse, pixelUv);
      
      // Calculate luma based on the rendered scene (which includes the dark background)
      float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114)) * uBrightness;
      
      vec2 cuv = fractUv - 0.5;
      float r = length(cuv);
      
      // ASCII-like shapes based on luminance. Ignore dark background.
      float shape = 0.0;
      if (luma > 0.015) {
        if (luma > 0.5) {
          // Plus
          shape = step(abs(cuv.x), 0.06) * step(abs(cuv.y), 0.25) + step(abs(cuv.y), 0.06) * step(abs(cuv.x), 0.25);
        } else if (luma > 0.3) {
          // Minus
          shape = step(abs(cuv.y), 0.06) * step(abs(cuv.x), 0.25);
        } else if (luma > 0.15) {
          // Small plus
          shape = step(abs(cuv.x), 0.05) * step(abs(cuv.y), 0.15) + step(abs(cuv.y), 0.05) * step(abs(cuv.x), 0.15);
        } else if (luma > 0.06) {
          // Small dot
          shape = step(r, 0.1);
        } else {
          // Tiny dot
          shape = step(r, 0.06);
        }
      }
      
      // Calculate aspect-corrected distance to mouse for circular hover effect
      vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
      float dist = distance(uv * aspect, uMouse * aspect);
      
      // Base color for dots: cleaner grays
      vec3 baseCol = vec3(clamp(luma * 1.3, 0.1, 0.75));
      
      // Hover effect: blend in bright orange glow when near mouse
      float hoverRadius = 0.12;
      if (dist < hoverRadius) {
        float hoverIntensity = smoothstep(hoverRadius, 0.0, dist);
        baseCol = mix(baseCol, vec3(1.0, 0.35, 0.08), hoverIntensity * 0.9);
      }
      
      // The background color of the canvas
      vec3 bgCol = vec3(0.0, 0.0, 0.0); 
      
      // Final color: mix background with dot color based on the shape and opacity
      vec3 finalCol = mix(bgCol, baseCol, shape * uOpacity);
      
      gl_FragColor = vec4(finalCol, 1.0);
    }
  `;

  return (
    <mesh
      onUpdate={(self) => quadScene.add(self)}
      onRemove={(self) => quadScene.remove(self)}
    >
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
        transparent={true}
      />
    </mesh>
  );
}

export default function ThreeCanvas(props: any) {
  if (props.isEmbedded) {
    return (
      <div className={`w-full h-full relative overflow-hidden pointer-events-auto ${props.className || ''}`}>
        <Canvas
          camera={{ position: [0, 0, props.cameraZ || 6.5], fov: props.cameraFOV || 45 }}
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={[props.bgColor || '#050505']} />
          
          <React.Suspense fallback={null}>
            <SceneContent {...props} />
          </React.Suspense>
          
          {!props.renderClean && <EffectPass {...props} />}
        </Canvas>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 0, props.cameraZ || 7], fov: props.cameraFOV || 45 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={[props.bgColor || '#050505']} />
        
        <React.Suspense fallback={null}>
          <SceneContent {...props} />
        </React.Suspense>
        
        {!props.renderClean && <EffectPass {...props} />}
      </Canvas>
    </div>
  );
}
