import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import gsap from 'gsap';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/loaders/GLTFLoader.js';
/* 
    Actividad
    - Cambiar imagenes por modelos(puede ser el mismo modelo)
    - Limitar el scroll
 */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  5000,
);
const renderer = new THREE.WebGLRenderer();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

let y = 0;
let position = 0;
let car1;
let car2;
let car3;
let car4;
let hlight;
let directionalLight;
let light;
let light2;
let light3;
let light4;
let objs = [];

document.body.onload = () => {
  main();
};

window.onresize = () => {
  scene.background = new THREE.Color(0x581845);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight, true);
};

window.addEventListener('wheel', onMouseWheel);

function main() {
  // Configurracion inicial
  scene.background = new THREE.Color(0x581845);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 10;
  scene.add(camera);

  // Lights
  setupLights();

  animate();
  
  let loader = new GLTFLoader();

  loader.load(
    'assets/scene.gltf',
    function (gltf) { 
      car1 = gltf.scene.children[0];
      car1.position.y = 10;
      car1.position.x = 0;
      car1.position.z = 2;
      scene.add(gltf.scene);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );
 

  loader.load(
    'assets/scene.gltf',
    function (gltf) {
      car2 = gltf.scene.children[0];
      car2.position.y = 12;
      car2.position.x = 0;
      car2.position.z = 2;
      scene.add(gltf.scene);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );
 

  loader.load(
    'assets/scene.gltf',
    function (gltf) {
      car3 = gltf.scene.children[0];
      car3.position.y = 14;
      car3.position.x = 0;
      car3.position.z = 2;
      scene.add(gltf.scene);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );
 

  loader.load(
    'assets/scene.gltf',
    function (gltf) {
      car4 = gltf.scene.children[0];
      car4.position.y = 16;
      car4.position.x = 0;
      car4.position.z = 2;
      scene.add(gltf.scene);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );

}

function animate() {
  requestAnimationFrame(animate);
  updateElements();
  renderer.render(scene, camera);
}

function setupLights() {
  hlight = new THREE.AmbientLight(0x404040, 100);
  scene.add(hlight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  light = new THREE.PointLight(0xc4c4c4, 5);
  light.position.set(0, 300, 500);
  scene.add(light);

  light2 = new THREE.PointLight(0xc4c4c4, 5);
  light2.position.set(500, 100, 0);
  scene.add(light2);

  light3 = new THREE.PointLight(0xc4c4c4, 5);
  light3.position.set(0, 100, -500);
  scene.add(light3);

  light4 = new THREE.PointLight(0x000000, 5);
  light4.position.set(-500, 300, 500);
  scene.add(light4);
}

function onMouseWheel(event) {
  y = -event.deltaY * 0.0007;
}

function updateElements() {
  position += y;
  y *= 0.9;

  // Raycaster
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(objs);

  for (const intersect of intersects) {
    gsap.to(intersect.object.scale, { x: 1.7, y: 1.7 });
    gsap.to(intersect.object.rotation, { y: -0.5 });
    gsap.to(intersect.object.position, { z: -0.9 });
  }

  for (const object of objs) {
    if (!intersects.find((intersect) => intersect.object === object)) {
      gsap.to(object.scale, { x: 1, y: 1 });
      gsap.to(object.rotation, { y: 300 });
      gsap.to(object.position, { z: 0 });
    }
  }

  if(position>16.5){
    position=16.5;
  }else if(position<10.0){
    position=10.0;
  }

  camera.position.y = position;
}
