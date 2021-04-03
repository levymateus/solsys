import * as THREE from 'three';
import * as ECSYTHREE from 'ecsy-three';
import { enableRemoteDevtools } from 'ecsy';

import * as COMPS from './Components';

import World from './World';
import { ECSMonitor } from '../monitor';
import { RotationSystem } from '../systems/RotationSystem';
import { PositionSystem } from '../systems/PositionSystem';
import { GameObjectSystem } from '../systems/GameObjectSystem';
import { SceneGraphSystem } from '../systems/SceneGraphSystem';
import GeometrySystem from '../systems/GeometrySystem';

export class Engine {
  constructor(params) {
    this.world = null;
    this.scene = null;
    this.camera = null;
    this.input = null;
    this.sceneEntity = null;
    this.aspect = window.innerWidth / window.innerHeight;

    this.webGLRenderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.clock = new THREE.Clock();
    this.monitor = new ECSMonitor();
    this.perspectiveCamera = new THREE.PerspectiveCamera(75, this.aspect, 1, 1000);

    if (params && params?.remoteDevtools) {
      enableRemoteDevtools();
    }
  }

  /**
   * Initialize the engine and starts the game loop
   */
  initialize() {
    this.webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.webGLRenderer.domElement);

    // The Game loop
    const loop = () => {
      if (this.monitor && this.world) {
        this.monitor.update();
        this.world.execute(this.clock.getDelta(), this.clock.elapsedTime);
      }
    };

    const {
      world, scene, sceneEntity, camera,
    } = ECSYTHREE.initialize(new World(), {
      animationLoop: loop,
      camera: this.perspectiveCamera,
      renderer: this.webGLRenderer,
    });

    this.world = world;
    this.scene = scene;
    this.sceneEntity = sceneEntity;
    this.camera = camera;

    world.registerComponent(COMPS.Node);
    world.registerComponent(COMPS.Rotation);
    world.registerComponent(COMPS.Velocity);
    world.registerComponent(COMPS.Position);
    world.registerComponent(COMPS.Geometry);
    world.registerComponent(COMPS.GameObject);
    world.registerComponent(COMPS.Material);
    world.registerComponent(COMPS.StateComponentGeometry);

    world.registerSystem(RotationSystem);
    world.registerSystem(GeometrySystem);
    world.registerSystem(PositionSystem);
    world.registerSystem(GameObjectSystem);
    world.registerSystem(SceneGraphSystem);

    camera.position.z = 3;

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
      this.dispose();
      this.stop();
      throw new Error(error);
    }
    return this;
  }

  dispose() {
    if (this.scene) this.scene.dispose();
    if (this.camera) this.camera.dispose();
    if (this.monitor) this.monitor.dispose();
    if (this.webGLRenderer) this.webGLRenderer.dispose();
  }

  pause() {
    throw new Error(`[${this.name}] pause() Method no implemented!`);
  }

  stop() {
    if (this.world) {
      this.world.stop();
    }
  }

  addGameObject(gameObjectPromise, parent, children) {
    if (this.world) {
      gameObjectPromise
        .then((gameObject) => {
          this.world.createGameObject(gameObject.default, parent || this.sceneEntity, children);
        })
        .catch((error) => { throw new Error(error); });
    }
  }
}

export default Engine;
