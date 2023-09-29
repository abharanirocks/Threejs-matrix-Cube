import "./style.css";
import * as THREE from "three";

/**
 * Base
 */
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
  // console.log(cursor.x);
});
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const group = new THREE.Group();
// group.position.y = 1;
// group.scale.y = 2;
// group.rotation.y = 1;
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
// const aspectratio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -1,
//   1,
//   1 * aspectratio,
//   -1 * aspectratio,
//   0.1,
//   100
// );
camera.position.z = 3;
// camera.position.x = 1.5;
// console.log(camera.position.length());

scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas,
});

const tick = () => {
  // group.rotation.x += 0.02;
  //simple camera control not visible back side
  // camera.position.x = cursor.x * 10;
  // camera.position.y = cursor.y * 10;
  //sine cos camnera control
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  camera.position.y = cursor.y * 5;
  camera.lookAt(group.position);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

//renderer

renderer.setSize(sizes.width, sizes.height);
