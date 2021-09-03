import * as THREE from "three";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise";
console.log(ImprovedNoise);

const Colors = Object.freeze({
  GROUND: 0xff69b4,
  ATMOSPHERE: 0x6f9ceb,
  SUN: 0xc7f0bd,
});

const CAMERA_DISTANCE = 800;
const CAMERA_HEIGHT = 300;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(Colors.ATMOSPHERE, 0.001);

const aspectRatio = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(60, aspectRatio, 1, 1e4);
camera.position.set(0, CAMERA_HEIGHT);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const WORLD_WIDTH = 256;
const WORLD_HEIGHT = 256;

const geometry = new THREE.PlaneGeometry(
  WORLD_WIDTH * 10,
  WORLD_HEIGHT * 10,
  WORLD_WIDTH - 1,
  WORLD_HEIGHT - 1
);

const material = new THREE.MeshBasicMaterial({
  color: "hotpink",
  side: THREE.DoubleSide,
});

geometry.rotateX(-Math.PI / 2);
let vertices = geometry.attributes.position.array;
let data = generateHeight(WORLD_WIDTH, WORLD_HEIGHT);
for (let i = 0, j = 0; i < vertices.length; i++, j += 3) {
  vertices[j + 1] = data[i] * 5;
}

const terrain = new THREE.Mesh(geometry, material);
terrain.position.y = -400;
scene.add(terrain);

const clock = new THREE.Clock();
(function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  camera.position.x = CAMERA_DISTANCE * Math.sin(10);
  camera.position.z = CAMERA_DISTANCE * Math.cos(10);
  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
})();

function onWindowResize() {}

function generateHeight(width, height) {
  let seed = Math.PI / 4;
  window.Math.random = function () {
    const x = Math.sin(seed++) * 1e4;
    return x - Math.floor(x);
  };
  const size = width * height;
  let data = new Uint8Array(size);
  const perlin = new ImprovedNoise();
  const z = Math.random() * 100;

  let quality = 1;
  Array.from(new Array(4)).forEach(() => {
    for (let i = 0; i < size; i++) {
      const x = i % width,
        y = ~~(i / width);
      data[i] += Math.abs(
        perlin.noise(x / quality, y / quality, z) * quality * 1.75
      );
    }
    quality *= 5;
  });
  return data;
}
