import "./style.css";
//not all codes are here that was used in the tutorial
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import typeface from "fonts/helvetiker_regular.typeface.json";
// Canvas
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const group = new THREE.Group();

const fontLoader = new THREE.FontLoader();
const matcaptexture = new THREE.TextureLoader().load("/matcaps/3.png");

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new THREE.TextGeometry("dataCamp", {
    font,
    size: 0.4,
    height: 0.2,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 3,
  });
  // textGeometry.computeBoundingBox();
  // textGeometry.translate(
  //   -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
  //   -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
  //   -(textGeometry.boundingBox.max.z - 0.03) * 0.5
  // );
  // console.log(textGeometry.boundingBox);
  textGeometry.center();
  const Material = new THREE.MeshMatcapMaterial({
    matcap: matcaptexture,
    wireframe: false,
  });
  const text = new THREE.Mesh(textGeometry, Material);
  // text.position.set(0.5, -1, 0);
  scene.add(text);

  const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);

  console.time("donut");
  for (let i = 0; i < 200; i++) {
    const donut = new THREE.Mesh(donutGeometry, Material);
    donut.position.x = Math.random();
    donut.position.y = -7;
    scene.add(donut);

    const donutMaterial2 = new THREE.MeshMatcapMaterial({
      matcap: matcaptexture,
    });
    const donut2 = new THREE.Mesh(donutGeometry, donutMaterial2);
    donut2.position.x = (Math.random() - 0.5) * 10;
    donut2.position.y = (Math.random() - 0.5) * 10;
    donut2.position.z = (Math.random() - 0.5) * 10;
    donut2.rotation.x = Math.random() * Math.PI;
    donut2.rotation.y = Math.random() * Math.PI;
    const scale = Math.random();
    donut2.scale.set(scale, scale, scale);
    scene.add(donut2);
  }
  console.timeEnd("donut");
});
// Scene

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

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

//renderer

renderer.setSize(sizes.width, sizes.height);
