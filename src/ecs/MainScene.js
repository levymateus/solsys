import * as THREE from 'three';
import * as ECSYTHREE from 'ecsy-three';
import { enableRemoteDevtools } from 'ecsy';

import * as Components from './Components';

import World from './World';
import TranslationSystem from './systems/TranslationSystem';
import GeometrySystem from './systems/GeometrySystem';
import MaterialSystem from './systems/MaterialSystem';
import OrbitSystem from './systems/OrbitSystem';
import StartFieldSystem from './systems/StarfieldSystem';
import PathSystem from './systems/PathSystem';
import TextSystem from './systems/TextSystem';
import TweenSystem from './systems/TweenSystem';

export class MainScene {
  constructor({
    remoteDevtools = false, antialias = true, canvas = undefined, gui, stats,
  }) {
    this.world = null;
    this.scene = null;
    this.camera = null;
    this.sceneEntity = null;
    this.gui = gui;

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
    const near = 1;
    const far = 1000;
    this.orthoCamera = new THREE.OrthographicCamera(-size, size, size, -size, near, far);

    this.stats = stats;
    if (this.stats) {
      document.body.appendChild(this.stats.dom);
    }

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
    this.webGLRenderer.setClearColor(0x000000, 1);

    // The Game loop
    const animationLoop = () => {
      if (this.stats) this.stats.update();
      this.world.execute(this.clock.getDelta(), this.clock.elapsedTime);
    };

    const options = { animationLoop, camera: this.orthoCamera, renderer: this.webGLRenderer };
    const ecsThree = ECSYTHREE.initialize(new World(), options);

    this.world = ecsThree.world;
    this.scene = ecsThree.scene;
    this.camera = ecsThree.camera;
    this.sceneEntity = ecsThree.sceneEntity;

    // Lights
    const pointLigth = new THREE.PointLight(new THREE.Color(252 * 0.01, 227 * 0.01, 167 * 0.01), 1);
    pointLigth.position.set(0, 0, 0);
    this.scene.add(pointLigth);

    // Components
    this.world.registerComponent(Components.Translation);
    this.world.registerComponent(Components.Particles);
    this.world.registerComponent(Components.Geometry);
    this.world.registerComponent(Components.Material);
    this.world.registerComponent(Components.Orbit);
    this.world.registerComponent(Components.Path);
    this.world.registerComponent(Components.Text);
    this.world.registerComponent(Components.Camera);
    this.world.registerComponent(Components.Tween);

    this.world.registerComponent(Components.StateComponentPath);
    this.world.registerComponent(Components.StateComponentParticles);
    this.world.registerComponent(Components.StateComponentMaterial);
    this.world.registerComponent(Components.StateComponentGeometry);
    this.world.registerComponent(Components.StateComponentText);

    // Systems
    this.world.registerSystem(TranslationSystem);
    this.world.registerSystem(GeometrySystem);
    this.world.registerSystem(MaterialSystem);
    this.world.registerSystem(OrbitSystem);
    this.world.registerSystem(StartFieldSystem);
    this.world.registerSystem(PathSystem);
    this.world.registerSystem(TextSystem);
    this.world.registerSystem(TweenSystem);

    this.add({ name: 'Camera', parent: this.sceneEntity })
      .addComponent(Components.Camera, { ref: this.camera });

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
