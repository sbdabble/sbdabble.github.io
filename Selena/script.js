import * as THREE from 'https://unpkg.com/three@0.157.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.157.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.157.0/examples/jsm/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0d0d0d);

// Camera
const camera = new THREE.PerspectiveCamera(
  45, window.innerWidth / window.innerHeight, 0.1, 100
);
camera.position.set(0, 2, 5);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xff00cc, 1, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Load Models
const loader = new GLTFLoader();

// Selena_Text.glb
loader.load('models/Selena_Text.glb', (gltf) => {
  const selenaText = gltf.scene;

  selenaText.position.set(0, 1, -2);
  selenaText.scale.set(1.5, 1.5, 1.5);

  selenaText.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      // Neon emissive glow
      if (child.material) {
        child.material.emissive = new THREE.Color(0xff4fbf);
        child.material.emissiveIntensity = 1.5;
      }
    }
  });

  scene.add(selenaText);
}, undefined, (error) => {
  console.error('Error loading Selena_Text.glb:', error);
});

// selena-signature.glb
loader.load('models/selena-signature.glb', (gltf) => {
  const signature = gltf.scene;
  signature.position.set(-1.5, 0, 0);
  scene.add(signature);
});

// selena-head.glb
loader.load('models/selena-head.glb', (gltf) => {
  const head = gltf.scene;
  head.position.set(1.5, 0, 0);
  scene.add(head);
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Responsive
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
