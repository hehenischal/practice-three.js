import * as THREE from "three"
import "./style.css"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from "gsap"

//scene
const scene = new THREE.Scene()

//create our sphere
const geometry = new THREE.SphereGeometry(4,100,100)
const material = new THREE.MeshPhongMaterial({
  color: "#00ff29",
  shininess: 100, // Adjust this value to control the shininess
});

const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh);

//sizes
const sizes = {
  width: window.innerWidth,
  height : window.innerHeight,
}

// Replace the point light with a directional light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1); // Direction of the light
scene.add(light);


//camera 
const camera = new THREE.PerspectiveCamera(
  70,
  sizes.width/sizes.height,
  0.1,
  100
)
camera.position.z = 20
scene.add(camera)



//Renderer

const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(3)
renderer.render(scene,camera)

//controls 
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.enablePan = true
controls.enableZoom = false
controls.autoRotate =  true
controls.autoRotateSpeed = 10

//resizer
window.addEventListener("resize", () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //update camera
  camera.aspect = sizes.width/sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width,sizes.height)
   
})

const loop = () => {
  controls.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
}
loop()

//timeline magic

const tl = gsap.timeline({defaults: {
  duration:1
}})
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1}) 
tl.fromTo('nav', { y:'-100%'}, {y:'0%'})
tl.fromTo('.title',{opacity:.002},{opacity:1})



//mouse animation color

let mousedown = false;
let rgb = [255,255,255];

window.addEventListener("mousedown", () => (mousedown = true))
window.addEventListener("mouseup", () => (mousedown = false))

window.addEventListener("mousemove", (e) => {
  if (mousedown) {
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      255,
    ]
    //let's animate
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color, { r: newColor.r, g: newColor.g, b: newColor.b })
  }
  console.log(rbg)
} )
