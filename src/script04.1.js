import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const group = new THREE.Group();

scene.add(group);

// const cube1 = new THREE.Mesh(
//   new THREE.ConeGeometry(1, 1, 3, 2, 2, 2),
//   new THREE.MeshBasicMaterial({ color: "yellow", wireframe: true })
// );
const geometry = new THREE.Geometry();

// const vertex1 = new THREE.Vector3(0, 0, 0);
// geometry.vertices.push(vertex1);

// const vertex2 = new THREE.Vector3(0, 1, 0);
// geometry.vertices.push(vertex2);

// const vertex3 = new THREE.Vector3(1, 0, 0);
// geometry.vertices.push(vertex3);

// const face = new THREE.Face3(0, 1, 2);
// geometry.faces.push(face);

for (let i = 0; i < 50; i++) {
  for (let j = 0; j < 3; j++) {
    //3 vertices
    geometry.vertices.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * 4, //x
        (Math.random() - 0.5) * 4, //y
        (Math.random() - 0.5) * 4 //z
      )
    );
  }
  const verticesIndex = i * 3;
  geometry.faces.push(
    new THREE.Face3(verticesIndex, verticesIndex + 1, verticesIndex + 2)
  );
}

const material = new THREE.MeshBasicMaterial({
  color: "yellow",
  wireframe: true,
});
const cube1 = new THREE.Mesh(geometry, material);
group.add(cube1);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 2, 2, 2),
  new THREE.MeshBasicMaterial({ color: "red", wireframe: true })
);
cube3.position.x = 2;
group.add(cube3);

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

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
//camera(point of view)
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.z = 3;
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
