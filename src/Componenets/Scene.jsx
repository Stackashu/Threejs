import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function Scene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    scene.add(camera)

   const renderer = new THREE.WebGLRenderer({
         canvas: canvasRef.current,
        antialias: true
      });


    renderer.setSize( window.innerWidth, window.innerHeight );

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 3, 32);
    // const cylinderMaterial = new THREE.MeshBasicMaterial({ color: "purple" });
    // const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    // scene.add(cylinder);
    // cylinder.position.x = 2;
    
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);


    camera.position.z = 5;

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.update();
    controls.autoRotate=true;
    controls.enableDamping = true;
    controls.dampingFactor=.01;

    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
    //   cube.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ width: '100%', height: '100vh' }} />
  );
}

export default Scene;