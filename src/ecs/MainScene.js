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

export class MainScene {
  constructor({
    remoteDevtools = false, antialias = true, canvas = undefined,
  }) {
    this.world = null;
    this.scene = null;
    this.camera = null;
    this.input = null;
    this.sceneEntity = null;
    this.controls = {};
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
    this.perspectiveCamera = new THREE.PerspectiveCamera(75, this.aspect, 1, 1000);

    this.intersected = null;

    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);

    if (remoteDevtools) {
      enableRemoteDevtools();
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
      this.controls.orbit.update();
      this.stats.update();
      this.world.execute(this.clock.getDelta(), this.clock.elapsedTime);
    };

    const updateCamera = () => {
      this.camera?.updateProjectionMatrix();
    };

    const {
      world, scene, sceneEntity, camera,
    } = ECSYTHREE.initialize(new World(), {
      animationLoop,
      camera: this.perspectiveCamera,
      renderer: this.webGLRenderer,
    });

    this.world = world;
    this.scene = scene;
    this.sceneEntity = sceneEntity;
    this.camera = camera;

    this.controls.orbit = new OrbitControls(this.camera, this.canvas);
    this.controls.orbit.update();

    // Cameras
    this.camera.position.set(5, 5, 3);
    this.camera.lookAt(0, 0, 0);
    this.camera.zoom = 0.7;

    const cameraGUI = this.gui.addFolder('Camera');
    cameraGUI.add(this.camera, 'fov')
      .min(1)
      .max(180)
      .step(0.01)
      .name('fov')
      .setValue(75)
      .onChange(updateCamera);
    cameraGUI.add(this.camera, 'zoom', 0, 1)
      .step(0.0001)
      .name('zoom')
      .setValue(0.7)
      .onChange(updateCamera);
    cameraGUI.open();

    // Lights
    const pointLigth = new THREE.PointLight(
      new THREE.Color(252 * 0.01, 227 * 0.01, 167 * 0.01),
      1,
    );
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
    world.registerComponent(COMPS.Translation);
    world.registerComponent(COMPS.Particles);
    world.registerComponent(COMPS.Geometry);
    world.registerComponent(COMPS.Material);
    world.registerComponent(COMPS.Orbit);

    world.registerComponent(COMPS.StateComponentParticles);
    world.registerComponent(COMPS.StateComponentMaterial);
    world.registerComponent(COMPS.StateComponentGeometry);

    // Systems
    world.registerSystem(TranslationSystem);
    world.registerSystem(GeometrySystem);
    world.registerSystem(MaterialSystem);
    world.registerSystem(OrbitSystem);
    world.registerSystem(StartFieldSystem);

    // Events Listners
    window.addEventListener('resize', () => {
      this.aspect = window.innerWidth / window.innerHeight;
      this.camera.aspect = this.aspect;
      this.webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    }, true);
  }

  start() {
    try {
      this.initialize();
    } catch (error) {
      this.stop();
      throw new Error(error);
    }
    return this;
  }

  stop() {
    this.world?.stop();
  }

  add({ name, parent }) {
    return this.world?.add(name, parent || this.sceneEntity);
  }
}

export default MainScene;
