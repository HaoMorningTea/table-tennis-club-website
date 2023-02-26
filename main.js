import './style.css'
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
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

//ball 
//const geometry = new THREE.ballGeometry(10, 3,  16, 100)
const ballTexture = new THREE.TextureLoader().load('uva4.jpg');

const geometry = new THREE.SphereGeometry( 15, 64, 32 );
const material = new THREE.MeshStandardMaterial({map: ballTexture,});
const ball = new THREE.Mesh(geometry, material);

//const geometry2 = new THREE.CylinderGeometry( 2, 2, 15, 32);
//const material2 = new THREE.MeshStandardMaterial({color: 0xFF6374});
//const handle = new THREE.Mesh(geometry2, material2);

scene.add(ball);

//light
const pointLight = new THREE.PointLight(0xffffff)
const ambientLight = new THREE.AmbientLight(0xffffff)
pointLight.position.set(20,20,20)
scene.add(pointLight)

//helper & control
/*const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)
*/
//const controls = new THREE.OrbitControls(camera, renderer.domElement);

//add star
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star)
}

Array(40).fill().forEach(addStar)

//scroll interaction
//ball.position.setZ(-30);
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  ball.rotation.x += 0.01;
  ball.rotation.y += 0.15;
  ball.rotation.z += 0.01;
  camera.position.z = t*-0.01;
  camera.position.x = t*-0.0002;
  camera.position.y = t*-0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

//animate
function animate(){
  requestAnimationFrame(animate);
  ball.rotation.x+=0;
  ball.rotation.y+=0.005;
  ball.rotation.z+=0;
  //controls.addEventListener( 'change', ()=>{renderer.render(scene, camera)} );
  //controls.update();
  renderer.render(scene, camera);
}
animate();