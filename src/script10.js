import "./style.css";
//not all codes are here that was used in the tutorial
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const group = new THREE.Group();

scene.add(group);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
directionalLight.position.set(2, 3, 4);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
// scene.add(hemisphereLight);
const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 3);
pointLight.position.set(1, 0.5, 1);
// scene.add(pointLight);

const spotLight = new THREE.SpotLight(
  0x78ff00,
  0.5,
  10,
  Math.PI * 0.05,
  0.25,
  1
);
// spotLight.position.set(0, 2, 3);
// scene.add(spotLight);

// spotLight.target.position.x = -0.75;
// console.log(spotLight.target);
// scene.add(spotLight.target);
// console.log(spotLight.target);

const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 16, 16),
  material
);
sphere.position.x = -2;
sphere.castShadow = true;

const torus = new THREE.Mesh(
  new THREE.TorusBufferGeometry(0.3, 0.2, 16, 32),
  material
);
torus.position.x = 1.5;
torus.position.y = 0;
torus.castShadow = true;

const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;
plane.receiveShadow = true;
group.add(sphere, torus);

const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
// console.log(geometry.attributes.uv);

group.add(cube, plane);

const axesHelper = new THREE.AxesHelper(3);
// scene.add(axesHelper);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//camera(point of view)
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.z = 2;
camera.position.x = 1;
camera.position.y = 1;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.shadowMap.enabled = true;

const clock = new THREE.Clock();

const tick = () => {
  group.children[0].rotation.y += 0.01;
  group.children[1].rotation.y += 0.01;
  group.children[2].rotation.y += 0.01;
  group.children[0].rotation.x += 0.01;
  group.children[1].rotation.x += 0.01;
  group.children[2].rotation.x += 0.01;
  // group.rotation.x += 0.01;
  // group.rotation.y += 0.01;
  const elapsedTime = clock.getElapsedTime();

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

//renderer

renderer.setSize(sizes.width, sizes.height);
