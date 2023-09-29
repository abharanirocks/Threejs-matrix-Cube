import "./style.css";
import * as THREE from "three";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// //cube
const geometry = new THREE.BoxGeometry(1, 1, 2);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const cube = new THREE.Mesh(geometry, material);
// cube.position.z = 1;
// cube.position.x = 1;
cube.position.set(-0.1, -0.4, 0.5);
scene.add(cube);
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);
//console.log(cube.position.length());
//console.log(cube.position.distanceTo(new THREE.Vector3(0, 1, 2)));
cube.position.normalize();
// cube.scale.x = 2;
// cube.scale.y = 0.6;
// cube.scale.z = 0.1;
cube.scale.set(2, 0.6, 0.1);
cube.rotation.reorder("yxz");
cube.rotation.y = Math.PI * 0.25;
cube.rotation.x = Math.PI * 0.25;

const sizes = {
  width: 800,
  height: 600,
};
//camera(point of view)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
// camera.lookAt(new THREE.Vector3(2, 0, 0));
camera.lookAt(cube.position);
// camera.position.x = 1;
// camera.position.y = 1;
//console.log(cube.position.distanceTo(camera.position));
//camera.position.x = 2;
scene.add(camera);

//renderer

const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
