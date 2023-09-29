import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
/**
 * Base
 */

const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  // cursor.x = event.clientX / sizes.width - 0.5;
  // cursor.y = -(event.clientY / sizes.height - 0.5);
  // console.log(cursor.x);
});
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const group = new THREE.Group();

scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.ConeGeometry(1, 1, 3),
  new THREE.MeshBasicMaterial({ color: "yellow" })
);
group.add(cube1);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: "red" })
);
cube3.position.x = 2;
group.add(cube3);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

const sizes = {
  width: 800,
  height: 600,
};
//camera(point of view)
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.z = 3;
// camera.position.x = 1.5;
// console.log(camera.position.length());
camera.lookAt(group.position);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.keyPanSpeed = 8;

// controls.autoRotate = true;
// controls.autoRotateSpeed = 5;
// controls.dampingFactor = 1;
// controls.target.x = 1;
// controls.update();

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
