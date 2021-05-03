import * as THREE from 'three';
import { MainScene } from './ecs';
import {
  Translation, Geometry, Material, Orbit, Particles, Path,
} from './ecs/Components';

import './global.css';

const devTools = false;
const isEnvDevelopment = process.env.NODE_ENV === 'development';

/**
 * enable/disable remote devtools.
 * https://blog.mozvr.com/ecsy-developer-tools/
 */
const remoteDevtools = isEnvDevelopment && devTools;

const canvas = document.querySelector('canvas.webgl');
document.title = 'Three.js | SolarSystem';

const mainScene = new MainScene({ remoteDevtools, canvas }).start();

mainScene.add({ name: 'Starfield' })
  .addComponent(Particles, { count: 250000 });

mainScene.add({ name: 'EathOrbitPath' })
  .addComponent(Path, {
    radius: 5,
    d: new THREE.Vector3(1, 1, 2),
    visible: true,
  });

// planet
mainScene.add({ name: 'Sun' })
  .addComponent(Translation, {
    position: new THREE.Vector3(0, 0, 0),
  })
  .addComponent(Geometry, {
    primitive: 'Sphere',
    radius: 1,
    widthSegments: 64,
    heightSegments: 64,
  })
  .addComponent(Material, {
    name: 'SunAtmosphere',
    type: 'MeshBasicMaterial',
    wireframe: false,
    map: '/textures/sun_texture.jpg',
    color: [1, 1, 1],
  });
// end planet

// earth
const Earth = mainScene.add({ name: 'Earth' })
  .addComponent(Translation, {
    rotation: new THREE.Vector3(0, 1, 0),
  })
  .addComponent(Geometry, {
    primitive: 'Sphere',
    radius: 0.2,
    widthSegments: 64,
    heightSegments: 64,
  })
  .addComponent(Material, {
    name: 'EarthAtmosphere',
    map: '/textures/earth_texture.jpg',
    color: [1, 1, 1],
  })
  .addComponent(Orbit, {
    center: new THREE.Vector3(0, 0, 0),
    radius: 5,
    d: new THREE.Vector3(1, 1, 2),
  });
// end earth

mainScene.add({ name: 'MoonOrbitPath', parent: Earth })
  .addComponent(Path, {
    radius: 1,
    visible: true,
  });

// moon
mainScene.add({ name: 'Moon', parent: Earth })
  .addComponent(Translation, {
    rotation: new THREE.Vector3(0, -2, 0),
  })
  .addComponent(Geometry, {
    primitive: 'Sphere',
    radius: 0.2 / 2,
    widthSegments: 64,
    heightSegments: 64,
  })
  .addComponent(Material, {
    name: 'EarthAtmosphere',
    map: '/textures/moon_texture.jpg',
    color: [1, 1, 1],
  })
  .addComponent(Orbit, {
    radius: 1,
  });
// end moon
