import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import gsap from "gsap";

// const image = new Image();
// const texture = new THREE.Texture(image);
// image.onload = () => {
//   texture.needsUpdate = true;
// };
// image.src = "/door/color.jpg";
const loadingManager = new THREE.LoadingManager();
// loadingManager.onStart = () => {
//   console.log("loading started");
// };
// loadingManager.onLoad = () => {
//   console.log("loading fin");
// };
// loadingManager.onProgress = () => {
//   console.log("loading prog");
// };
// loadingManager.onError = () => {
//   console.log("loading err");
// };
const textureLoader = new THREE.TextureLoader(loadingManager);
const colortexture = textureLoader.load("/door/color.jpg");
const roughnesstexture = textureLoader.load("/door/roughness.jpg");

// colortexture.repeat.x = 2;
// colortexture.repeat.y = 3;
// colortexture.wrapS = THREE.RepeatWrapping;
// colortexture.wrapT = THREE.RepeatWrapping;
// colortexture.wrapS = THREE.MirroredRepeatWrapping;
// colortexture.wrapT = THREE.MirroredRepeatWrapping;
// colortexture.offset.x = 0.5;

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
gui.add(group.position, "y", -3, 3, 0.01);
gui.add(group.position, "x").min(-3).max(3).step(0.01).name("eleva");
gui.add(group, "visible");
// gui.add(Material, "wireframe");
gui.add(parameters, "spin");

const cube1 = new THREE.Mesh(
  new THREE.ConeGeometry(1, 1, 4),
  new THREE.MeshBasicMaterial({ map: roughnesstexture, wireframe: false })
);
gui.add(cube1.position, "y", -3, 3, 0.01);
group.add(cube1);

const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  map: colortexture,
  wireframe: false,
});
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

const tick = () => {
  // group.rotation.x += 0.02;
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

//renderer

renderer.setSize(sizes.width, sizes.height);
