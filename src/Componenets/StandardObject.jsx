// in this i learn about lights and textures


import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';


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

 
    //   const geometry = new THREE.BoxGeometry(1, 1, 1);
    //     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    //     const cube = new THREE.Mesh(geometry, material);
    //     scene.add(cube);
    

const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 50);
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: "pink"});
cylinderMaterial.metalness=0.9;
cylinderMaterial.roughness=0.5;
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
scene.add(cylinder);


const rectLight = new THREE.RectAreaLight(0xffffff, 2, 4, 3); // color, intensity, width, height
rectLight.position.set(5, 5, 0); // Set position
rectLight.lookAt(5, 0, 0); // Make the light face the origin (or any target)
scene.add(rectLight);

const rectLightHelper = new RectAreaLightHelper(rectLight);
scene.add(rectLightHelper);

// const rectAreaLightHelper = new THREE.RectAreaLightHelper(rectAreaLight, 1);
// scene.add(rectAreaLightHelper);
// cylinder.position.x = 2;

// const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
// hemisphereLight.position.set(0, 5, 0);
// scene.add(hemisphereLight);

// const backPanelGeometry = new THREE.PlaneGeometry(4, 3); // Same dimensions as the light
// const backPanelMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 1 }); // Black, semi-transparent material
// const backPanel = new THREE.Mesh(backPanelGeometry, backPanelMaterial);
// backPanel.position.copy(rectLight.position); // Position the panel at the light's position
// backPanel.lookAt(rectLight.position.clone().add(rectLight.position).normalize()); // Align it with the light's direction
// backPanel.translateZ(-0.01); // Slightly offset behind the light
// scene.add(backPanel);

const ambientLight = new THREE.AmbientLight("black", 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight("white", 1, 100);
pointLight.position.set(0, 5, 0);
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5,5,5);
scene.add(directionalLight);


// const ambientLightHelper = new THREE.AmbientLightHelper(ambientLight, 1);
// scene.add(ambientLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(pointLightHelper);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(directionalLightHelper);


    camera.position.z = 5;

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.update();
    // controls.autoRotate=true;
    controls.enableDamping = true;
    controls.dampingFactor=.01;

    function animate() {
      requestAnimationFrame(animate);
    //   cube.rotation.x += 0.01;
      cylinder.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <canvas ref={canvasRef} className='w-full h-full' />
  );
}

export default Scene;