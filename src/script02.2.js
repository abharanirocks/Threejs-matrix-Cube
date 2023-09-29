import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

/**
 * Base
 */
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
  new THREE.ConeGeometry(1, 1.5, 3),
  new THREE.MeshBasicMaterial({ color: "yellow" })
);
group.add(cube1);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "red" })
);
cube3.position.x = 2;
group.add(cube3);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

const sizes = {
  width: 800,
  height: 700,
};
//camera(point of view)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 4;
camera.position.x = 1.5;

scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas,
});

// let time = Date.now();
gsap.to(group.position, { duration: 1, delay: 1, x: 2 });
gsap.to(group.position, { duration: 1, delay: 2, x: 0 });
gsap.to(group.position, { duration: 1, delay: 3, y: 2 });
const tick = () => {
  // camera.lookAt(group.position);
  // group.rotation.x -= 0.02;
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

//renderer

renderer.setSize(sizes.width, sizes.height);
