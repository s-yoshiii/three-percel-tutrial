import * as THREE from "three";
import earthTexture from "./images/earthmap1k.jpg";
class EarthObject {
  constructor() {
    this.width = 960;
    this.height = 540;
    this.rot = 0;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.geometry = null;
    this.material = null;
    this.earth = null;
    this.canvas = null;
    this.texture = null;
    this.el = document.getElementById("app");
    this.init();
  }
  setup() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.el });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  createMesh() {
    this.geometry = new THREE.SphereGeometry(300, 30, 30);
    this.texture = new THREE.TextureLoader().load(earthTexture);
    this.material = new THREE.MeshStandardMaterial({ map: this.texture });
    this.earth = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.earth);
  }
  lightSet() {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);
    const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
    pointLight.position.set(
      500 * Math.sin(Date.now() / 500),
      500 * Math.sin(Date.now() / 1000),
      500 * Math.cos(Date.now() / 500)
    );
    this.scene.add(pointLight);
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
    this.scene.add(pointLightHelper);
  }
  tick() {
    this.rot += 0.5;
    const radian = (this.rot * Math.PI) / 180;
    // 角度に応じてカメラの位置を変更する
    this.camera.position.x = 1000 * Math.sin(radian);
    this.camera.position.z = 2000 * Math.cos(radian);

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.tick());
  }
  init() {
    this.setup();
    this.createMesh();
    this.lightSet();
    this.tick();
  }
}

new EarthObject();
