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
const clock = new THREE.Clock();

const tick = () => {
  //method 1
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time;
  // time = currentTime;
  // // console.log(deltaTime);
  // // console.log("gameloop");
  // group.rotation.y += 0.002 * deltaTime;
  // // group.rotation.x -= 0.02;
  //method 2
  const elapsedTime = clock.getElapsedTime();

  // group.rotation.y = elapsedTime * Math.PI * 2;
  // group.rotation.y = Math.sin(elapsedTime);
  // group.rotation.x = Math.cos(elapsedTime);
  group.position.y = Math.sin(elapsedTime);
  group.position.x = Math.cos(elapsedTime);
  camera.lookAt(group.position);
  // group.rotation.x -= 0.02;
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

//renderer

renderer.setSize(sizes.width, sizes.height);
