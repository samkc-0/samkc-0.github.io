const figures = document.getElementsByClassName("figure");

const fig = figures[0];
// Ensure THREE is loaded before using it
if (typeof THREE === "undefined") {
  console.error("Three.js failed to load.");
} else {
  console.log("Three.js loaded successfully.");
}

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
fig.appendChild(renderer.domElement);

// Helper to create a node (a sphere)
function createNode(x, y, z) {
  const geometry = new THREE.SphereGeometry(0.4, 16, 16);
  const material = new THREE.MeshBasicMaterial({ color: 0x0077ff });
  const node = new THREE.Mesh(geometry, material);
  node.position.set(x, y, z);
  scene.add(node);
  return node;
}

// Helper to create an edge (a line)
function createEdge(p1, p2) {
  const material = new THREE.LineBasicMaterial({ color: 0x000000 });
  const points = [p1.clone(), p2.clone()];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, material);
  scene.add(line);
}

// Creating a simple binary search tree:
// Level 0 (Root)
const root = createNode(0, 2, 0);
// Level 1
const left = createNode(-2, 0, 0);
const right = createNode(2, 0, 0);
// Level 2
const leftLeft = createNode(-3, -2, 0);
const leftRight = createNode(-1, -2, 0);
const rightLeft = createNode(1, -2, 0);
const rightRight = createNode(3, -2, 0);

// Draw edges
createEdge(root.position, left.position);
createEdge(root.position, right.position);
createEdge(left.position, leftLeft.position);
createEdge(left.position, leftRight.position);
createEdge(right.position, rightLeft.position);
createEdge(right.position, rightRight.position);

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Adjust on resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
