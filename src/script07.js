import "./style.css";
//not all codes are here that was used in the tutorial
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import gsap from "gsap";

const textureLoader = new THREE.TextureLoader();
const colortexture = textureLoader.load("/door/color.jpg");
const roughnesstexture = textureLoader.load("/door/roughness.jpg");
const normaltexture = textureLoader.load("/door/normal.jpg");
const alphatexture = textureLoader.load("/door/alpha.jpg");
const metalnesstexture = textureLoader.load("/door/metalness.jpg");
const ambientOcclusiontexture = textureLoader.load(
  "/door/ambientOcclusion.jpg"
);
const matcaptexture = textureLoader.load("/matcaps/8.png");
const gradientstexture = textureLoader.load("/gradients/3.jpg");

const gui = new dat.GUI({ closed: true, width: 200 });
const parameters = {
  color: 0xff0000,
  spin: () => {
    gsap.to(group.rotation, { duration: 1, y: group.rotation.y + 10 });
  },
};

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const group = new THREE.Group();

scene.add(group);

// const material = new THREE.MeshBasicMaterial({
//   color: "white",
//   wireframe: false,
// });
// material.map = matcaptexture;
//material.color = new THREE.Color("red");
// material.color.set("pink");
// material.wireframe = true;
// material.transparent = true;
// material.alphaMap = colortexture;
// material.opacity = 0.5;
// material.side = THREE.DoubleSide;

// const material = new THREE.MeshNormalMaterial();
const material = new THREE.MeshMatcapMaterial();
material.matcap = matcaptexture;

const cube = new THREE.Mesh(new THREE.ConeGeometry(1, 1, 4), material);
gui.add(cube.position, "y", -3, 3, 0.01);
group.add(cube);

const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 16, 16),
  material
);
sphere.position.x = -2;

const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), material);
plane.position.x = -1.5;
plane.position.y = -1.5;

const torus = new THREE.Mesh(
  new THREE.TorusBufferGeometry(0.3, 0.2, 16, 32),
  material
);
torus.position.x = 1.5;
torus.position.y = 1.5;
group.add(plane, sphere, torus);

const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
const cube3 = new THREE.Mesh(geometry, material);
// console.log(geometry.attributes.uv);
cube3.position.x = 2;
group.add(cube3);

gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

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

camera.position.z = 4;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas,
});

const clock = new THREE.Clock();

const tick = () => {
  // group.rotation.x += 0.02;
  const elapsedTime = clock.getElapsedTime();

  group.children[0].rotation.y = 0.1 * elapsedTime;
  group.children[1].rotation.y = 0.1 * elapsedTime;
  group.children[2].rotation.y = 0.1 * elapsedTime;
  group.children[3].rotation.y = 0.1 * elapsedTime;
  group.children[4].rotation.y = 0.1 * elapsedTime;

  group.children[0].rotation.x = 0.15 * elapsedTime;
  group.children[1].rotation.x = 0.15 * elapsedTime;
  group.children[2].rotation.x = 0.15 * elapsedTime;
  group.children[3].rotation.x = 0.15 * elapsedTime;
  group.children[4].rotation.x = 0.15 * elapsedTime;
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

//renderer

renderer.setSize(sizes.width, sizes.height);
