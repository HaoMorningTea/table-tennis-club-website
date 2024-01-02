import './css/style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

//perspective 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(10);

renderer.render(scene, camera);

//ball 
//const geometry = new THREE.ballGeometry(10, 3,  16, 100)
const ballTexture = new THREE.TextureLoader().load('/assets/uva4.jpg');

const geometry = new THREE.SphereGeometry( 15, 64, 32 );
const material = new THREE.MeshStandardMaterial({map: ballTexture,});
const ball = new THREE.Mesh(geometry, material);

//const geometry2 = new THREE.CylinderGeometry( 2, 2, 15, 32);
//const material2 = new THREE.MeshStandardMaterial({color: 0xFF6374});
//const handle = new THREE.Mesh(geometry2, material2);

scene.add(ball);
ball.position.set(0, 0, -50);

//light
const pointLight = new THREE.PointLight(0xffffff)
const ambientLight = new THREE.AmbientLight(0xffffff)
pointLight.position.set(20,20,20)
scene.add(pointLight)

//add star
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material);

  const [x,z] = Array(2).fill().map(() => THREE.MathUtils.randFloatSpread(300));
  const y = THREE.MathUtils.randFloatSpread(1200);
  star.position.set(x, y, z);
  scene.add(star)
}

Array(500).fill().forEach(addStar)

// Set up initial velocity and acceleration for the ball
let ballVelocity = new THREE.Vector3(0, 0, -0.5);
let ballAcceleration = new THREE.Vector3(0, -0.001, 0);

//make ball look at mouse
var target = new THREE.Vector3();
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove( event ) {

  mouseX = ( event.clientX - windowHalfX );
  mouseY = ( event.clientY - windowHalfY );

}

// Add event listener for mouse movement
window.addEventListener('mousemove', onDocumentMouseMove);

function moveCamera(){
  const mouseXNormalized = (mouseX / window.innerWidth) * 2 ;
  const mouseYNormalized = (mouseY / window.innerHeight) * 2 ;

  const maxShift = 10; // Adjust this value to control the maximum shift

  const cameraTarget = new THREE.Vector3(mouseXNormalized * maxShift, -window.scrollY / 10 -mouseYNormalized * maxShift, -50);
  // Calculate the offset caused by the ball's position
  //const ballOffset = new THREE.Vector3().subVectors(ball.position, cameraTarget);
  // Apply the offset to the camera target
  //cameraTarget.add(ballOffset);
 
  camera.lookAt(cameraTarget);
}


// Define a function for debouncing the scroll event
function debounce(func, delay) {
  let timer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}

// Function to update the camera position based on scroll position
function updateCameraPosition() {
  const scrollPos = window.scrollY;
  camera.position.set(0, -scrollPos / 10, 0);
}

// Add the debounced event listener for scroll
window.addEventListener('scroll', updateCameraPosition);


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Update window half values
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
}

// Call it once after the renderer is created
renderer.setSize(window.innerWidth, window.innerHeight);

// Add an event listener to update renderer size on window resize
window.addEventListener('resize', onWindowResize);

function animate(){
  //update camera and renderer
  requestAnimationFrame(animate);
  target.x += ( mouseX - target.x ) * .005;
  target.y += ( - mouseY - target.y ) * .005;
  target.z = camera.position.z; // assuming the camera is located at ( 0, 0, z );
  ball.position.add(new THREE.Vector3((mouseX - target.x) * 0.0001, (-mouseY - target.y) * 0.0001, 0));
  ball.lookAt( target );
  ball.rotateY(- (Math.PI / 2));

  //camera.aspect = window.innerWidth / window.innerHeight;
  //camera.updateProjectionMatrix();

  // Calculate the scroll position of the webpage
  //const scrollPos = window.scrollY;

  moveCamera();
  updateCameraPosition()
  // Update the position of camera based on the scroll position
  //camera.position.set(0, -scrollPos / 10, 0);
  
  renderer.render(scene, camera);
}

animate();
