import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as ECSYTHREE from 'ecsy-three';
import { enableRemoteDevtools } from 'ecsy';
import { GUI } from 'dat.gui';
import Stats from 'stats.js';

import * as COMPS from './Components';

import World from './World';
import TranslationSystem from './systems/TranslationSystem';
import GeometrySystem from './systems/GeometrySystem';
import MaterialSystem from './systems/MaterialSystem';
import OrbitSystem from './systems/OrbitSystem';
import StartFieldSystem from './systems/StarfieldSystem';
import PathSystem from './systems/PathSystem';

export class MainScene {
  constructor({
    remoteDevtools = false, antialias = true, canvas = undefined, zoom = 0.1,
  }) {
    this.world = null;
    this.scene = null;
    this.camera = null;
    this.input = null;
    this.sceneEntity = null;
    this.controls = {};
    this.zoom = zoom;
    this.gui = new GUI();

    this.canvas = canvas;
    this.aspect = window.innerWidth / window.innerHeight;

    if (!this.canvas) {
      this.canvas = this.webGLRenderer.domElement;
      document.body.appendChild(this.webGLRenderer.domElement);
    }

    this.webGLRenderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias,
      alpha: true,
    });
    this.webGLRenderer.setPixelRatio(window.devicePixelRatio);

    this.clock = new THREE.Clock();

    const size = 1;
    const near = 5;
    const far = 1000;
    this.perspectiveCamera = new THREE.OrthographicCamera(-size, size, size, -size, near, far);

    this.intersected = null;

    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);

    if (remoteDevtools) {
      enableRemoteDevtools();
    }

    try {
      this.initialize();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Initialize the engine and starts the game loop
   */
  initialize() {
    this.webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    this.webGLRenderer.setClearColor(new THREE.Color(0, 0, 0), 1);

    // The Game loop
    const animationLoop = () => {
      this.stats.update();
      this.controls.orbit.update();
      this.world.execute(this.clock.getDelta(), this.clock.elapsedTime);
    };

    const updateCamera = () => this.camera?.updateProjectionMatrix();

    const options = { animationLoop, camera: this.perspectiveCamera, renderer: this.webGLRenderer };
    const ecsThree = ECSYTHREE.initialize(new World(), options);

    this.world = ecsThree.world;
    this.scene = ecsThree.scene;
    this.camera = ecsThree.camera;
    this.sceneEntity = ecsThree.sceneEntity;

    this.controls.orbit = new OrbitControls(this.camera, this.canvas);
    this.controls.orbit.update();

    // Cameras
    this.camera.position.set(5, 10, 3);
    this.camera.lookAt(0, 0, 0);
    this.camera.zoom = this.zoom;

    const cameraGUI = this.gui.addFolder('Camera');
    cameraGUI.add(this.camera, 'zoom', -100, 100)
      .step(0.001)
      .name('zoom')
      .setValue(this.zoom)
      .onChange(updateCamera);
    cameraGUI.open();

    // Lights
    const pointLigth = new THREE.PointLight(new THREE.Color(252 * 0.01, 227 * 0.01, 167 * 0.01), 1);
    pointLigth.position.set(0, 0, 0);
    this.scene.add(pointLigth);

    const pointLightGUI = this.gui.addFolder('Light');
    pointLightGUI.add(pointLigth.position, 'x', 0, 10, 0.01).setValue(0);
    pointLightGUI.add(pointLigth.position, 'y', 0, 10, 0.01).setValue(0);
    pointLightGUI.add(pointLigth.position, 'z', 0, 10, 0.01).setValue(0);
    pointLightGUI.add(pointLigth, 'intensity', 0, 100, 0.01).setValue(1);

    const pointLightHelper = new THREE.PointLightHelper(pointLigth, 0.5);
    pointLightHelper.position.set(0, 0, 0);
    this.scene.add(pointLightHelper);

    // Controls
    this.controls.orbit = new OrbitControls(this.camera, this.canvas);
    this.controls.orbit.update();

    // Components
    this.world.registerComponent(COMPS.Translation);
    this.world.registerComponent(COMPS.Particles);
    this.world.registerComponent(COMPS.Geometry);
    this.world.registerComponent(COMPS.Material);
    this.world.registerComponent(COMPS.Orbit);
    this.world.registerComponent(COMPS.Path);

    this.world.registerComponent(COMPS.StateComponentPath);
    this.world.registerComponent(COMPS.StateComponentParticles);
    this.world.registerComponent(COMPS.StateComponentMaterial);
    this.world.registerComponent(COMPS.StateComponentGeometry);

    // Systems
    this.world.registerSystem(TranslationSystem);
    this.world.registerSystem(GeometrySystem);
    this.world.registerSystem(MaterialSystem);
    this.world.registerSystem(OrbitSystem);
    this.world.registerSystem(StartFieldSystem);
    this.world.registerSystem(PathSystem);

    // Events Listners
    window.addEventListener('resize', () => {
      this.aspect = window.innerWidth / window.innerHeight;
      this.camera.aspect = this.aspect;
      this.webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    }, true);
  }

  stop() {
    this.world?.stop();
  }

  add({ name, parent }) {
    const parentNode = parent || this.sceneEntity;
    return this.world?.add(name, parentNode);
  }
}

export default MainScene;
