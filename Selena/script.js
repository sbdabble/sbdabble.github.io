let scene, camera, renderer, model;

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 2;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('container').appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(2, 2, 2);
  scene.add(light);

  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  const loader = new THREE.GLTFLoader();
  loader.load(
    'model/Head6.glb', // Put your 3D model file here
    gltf => {
      model = gltf.scene;
      model.scale.set(1, 1, 1);
      scene.add(model);
    },
    undefined,
    error => {
      console.error('Error loading model:', error);
    }
  );

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('scroll', onScroll, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onScroll() {
  if (model) {
    const scrollY = window.scrollY || window.pageYOffset;
    model.rotation.y = scrollY * 0.005;
  }
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
