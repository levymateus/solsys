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
const showOrbitPaths = true;

mainScene.add({ name: 'Starfield' })
  .addComponent(Particles, { count: 250000 });

// planet
mainScene.add({ name: 'Sun' })
  .addComponent(Translation, {
    position: new THREE.Vector3(0, 0, 0),
  })
  .addComponent(Geometry, {
    primitive: 'Sphere',
    radius: 1.7,
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

// mecury
mainScene.add({ name: 'Mercury' })
  .addComponent(Translation, {
    rotation: new THREE.Vector3(0, 1, 0),
  })
  .addComponent(Geometry, {
    primitive: 'Sphere',
    radius: 0.09,
    widthSegments: 64,
    heightSegments: 64,
  })
  .addComponent(Material, {
    name: 'MercuryAtmosphere',
    map: '/textures/mercury_texture.jpg',
    color: [1, 1, 1],
  })
  .addComponent(Orbit, {
    center: new THREE.Vector3(0, 0, 0),
    radius: 2,
    d: new THREE.Vector3(1, 1, 2),
  });
mainScene.add({ name: 'MercuryOrbitPath' })
  .addComponent(Path, {
    radius: 2,
    d: new THREE.Vector3(1, 1, 2),
    visible: showOrbitPaths,
  });
// end mercury

// venus
mainScene.add({ name: 'Venus' })
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
    name: 'VenusAtmosphere',
    map: '/textures/venus_texture.jpg',
    color: [1, 1, 1],
  })
  .addComponent(Orbit, {
    center: new THREE.Vector3(0, 0, 0),
    radius: 3,
    d: new THREE.Vector3(1, 1, 2),
  });
mainScene.add({ name: 'VenusOrbitPath' })
  .addComponent(Path, {
    radius: 3,
    d: new THREE.Vector3(1, 1, 2),
    visible: showOrbitPaths,
  });
// end venus

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

mainScene.add({ name: 'EathOrbitPath' })
  .addComponent(Path, {
    radius: 5,
    d: new THREE.Vector3(1, 1, 2),
    visible: showOrbitPaths,
  });
// end earth

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
    radius: 0.7,
  });
mainScene.add({ name: 'MoonOrbitPath', parent: Earth })
  .addComponent(Path, {
    radius: 0.7,
    visible: showOrbitPaths,
  });
// end moon

// mars
mainScene.add({ name: 'Mars' })
  .addComponent(Translation, {
    rotation: new THREE.Vector3(0, 2, 0),
  })
  .addComponent(Geometry, {
    primitive: 'Sphere',
    radius: 0.09,
    widthSegments: 64,
    heightSegments: 64,
  })
  .addComponent(Material, {
    name: 'MarsAtmosphere',
    map: '/textures/mars_texture.jpg',
    color: [1, 1, 1],
  })
  .addComponent(Orbit, {
    center: new THREE.Vector3(0, 0, 0),
    radius: 7,
    d: new THREE.Vector3(1, 1, 2),
  });
mainScene.add({ name: 'MarsOrbitPath' })
  .addComponent(Path, {
    radius: 7,
    d: new THREE.Vector3(1, 1, 2),
    visible: showOrbitPaths,
  });
// end mars

