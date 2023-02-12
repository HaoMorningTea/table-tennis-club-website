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

//torus 
const geometry = new THREE.TorusGeometry(10, 3,  16, 100)
const material = new THREE.MeshStandardMaterial({color: 0xFF6374});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

//light
const pointLight = new THREE.PointLight(0xffffff)
const ambientLight = new THREE.AmbientLight(0xffffff)
pointLight.position.set(20,20,20)
scene.add(pointLight)

//helper & control
/*const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);*/

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
//torus.position.setZ(-30);
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  torus.rotation.x += 0.05;
  torus.rotation.y += 0.05;
  torus.rotation.z += 0.05;
  camera.position.z = t*-0.01;
  camera.position.x = t*-0.0002;
  camera.position.y = t*-0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

//animate
function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x+=0.01;
  torus.rotation.y+=0.005;
  torus.rotation.z+=0.005;
  //controls.update();
  renderer.render(scene, camera);
}
animate();