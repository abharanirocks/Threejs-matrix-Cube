import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const group = new THREE.Group();

scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.ConeGeometry(1, 1, 4),
  new THREE.MeshBasicMaterial({ color: "yellow", wireframe: false })
);
group.add(cube1);

const cube3 = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "red", wireframe: false })
);
cube3.position.x = 1.5;
group.add(cube3);

const cube4 = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "red", wireframe: false })
);
cube4.position.y = 1;
group.add(cube4);

const cube5 = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "red", wireframe: false })
);

cube5.position.x = -1.5;
group.add(cube5);

const geometry = new THREE.PlaneGeometry(2, 2);
const material = new THREE.MeshBasicMaterial({
  color: "blue",
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(geometry, material);
// plane.translate(1, 1, 1);
plane.translateY = 0.3;
plane.position.y = -1.5;
group.add(plane);

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
  group.rotation.x += 0.02;
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

//renderer

renderer.setSize(sizes.width, sizes.height);
