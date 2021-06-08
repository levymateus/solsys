import { Object3DComponent } from 'ecsy-three';
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
document.title = 'Three.js | Solar System';

const mainScene = new MainScene({ remoteDevtools, canvas, zoom: 0.09 });
const showOrbitPaths = false;

const scale = 1 / 100000000;
const scaleKmToMeters = (km) => (km * 1000) * scale;
const starsCount = 100000;

const distScale = 1 / 80;

mainScene.add({ name: 'Starfield' })
  .addComponent(Particles, { count: starsCount });

// Sun
const sunRadius = scaleKmToMeters(696340);
mainScene.add({ name: 'Sun' })
  .addComponent(Translation, { position: new THREE.Vector3() })
  .addComponent(Geometry, {
    primitive: 'Sphere',
    radius: sunRadius,
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
// end sun

// mecury
const mercuryRadius = scaleKmToMeters(2439);
const mercuryDistFromSun = scaleKmToMeters(58000000 * distScale);
mainScene.add({ name: 'Mercury' })
  .addComponent(Translation, { rotation: new THREE.Vector3(0, 1, 0) })
  .addComponent(Geometry, {
    primitive: 'Sphere',
    radius: mercuryRadius,
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
    radius: mercuryDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    step: 0.08,
  });
mainScene.add({ name: 'MercuryOrbitPath' })
  .addComponent(Path, {
    radius: mercuryDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    visible: showOrbitPaths,
  });
// end mercury

// venus
const venusRadius = scaleKmToMeters(6051);
const venusDistFromSun = scaleKmToMeters(108000000 * distScale);
mainScene.add({ name: 'Venus' })
  .addComponent(Translation, {
    rotation: new THREE.Vector3(0, 1, 0),
  })
  .addComponent(Geometry, {
    primitive: 'Sphere',
    radius: venusRadius,
    widthSegments: 64,
    heightSegments: 64,
  })
  .addComponent(Material, {
    name: 'VenusAtmosphere',
    map: '/textures/venus_texture.jpg',
    color: [1, 1, 1],
  })
  .addComponent(Orbit, {
    center: new THREE.Vector3(),
    radius: venusDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    step: 0.07,
  });
mainScene.add({ name: 'VenusOrbitPath' })
  .addComponent(Path, {
    radius: venusDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    visible: showOrbitPaths,
  });
// end venus

// earth
const earthRadius = scaleKmToMeters(6371);
const earthDistFromSun = scaleKmToMeters(149600000 * distScale);
const Earth = mainScene.add({ name: 'Earth' })
  .addComponent(Translation, {
    rotation: new THREE.Vector3(0, 1, 0),
  })
  .addComponent(Geometry, {
    primitive: 'Sphere',
    radius: earthRadius,
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
    radius: earthDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    step: 0.06,
  });

mainScene.add({ name: 'EathOrbitPath' })
  .addComponent(Path, {
    radius: earthDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    visible: showOrbitPaths,
  });
// end earth

// moon
const moonRadius = scaleKmToMeters(1.737);
mainScene.add({ name: 'Moon', parent: Earth })
  .addComponent(Translation, {
    rotation: new THREE.Vector3(0, -2, 0),
  })
  .addComponent(Geometry, {
    primitive: 'Sphere',
    radius: moonRadius,
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
    step: 0.01,
  });
mainScene.add({ name: 'MoonOrbitPath', parent: Earth })
  .addComponent(Path, {
    radius: 0.7,
    visible: showOrbitPaths,
  });
// end moon

// mars
const marsRadius = scaleKmToMeters(3.389);
const marsDistFromSun = scaleKmToMeters(228000000 * distScale);
mainScene.add({ name: 'Mars' })
  .addComponent(Translation, {
    rotation: new THREE.Vector3(0, 2, 0),
  })
  .addComponent(Geometry, {
    primitive: 'Sphere',
    radius: marsRadius,
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
    radius: marsDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    step: 0.05,
  });
mainScene.add({ name: 'MarsOrbitPath' })
  .addComponent(Path, {
    radius: marsDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    visible: showOrbitPaths,
  });
// end mars

// jupiter
const jupiterRadius = scaleKmToMeters(69911);
const jupiterDistFromSun = scaleKmToMeters(778000000 * distScale);
mainScene.add({ name: 'Jupiter' })
  .addComponent(Translation, {
    rotation: new THREE.Vector3(0, 2, 0),
  })
  .addComponent(Geometry, {
    primitive: 'Sphere',
    radius: jupiterRadius,
    widthSegments: 64,
    heightSegments: 64,
  })
  .addComponent(Material, {
    name: 'MarsAtmosphere',
    map: '/textures/jupiter_texture.jpg',
    color: [1, 1, 1],
  })
  .addComponent(Orbit, {
    center: new THREE.Vector3(0, 0, 0),
    radius: jupiterDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    step: 0.04,
  });
mainScene.add({ name: 'JupiterOrbitPath' })
  .addComponent(Path, {
    radius: jupiterDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    visible: showOrbitPaths,
  });
// end jupiter

// saturn
const saturnRadius = scaleKmToMeters(58232);
const saturnDistFromSun = scaleKmToMeters(14000000000 * distScale);
const Saturn = mainScene.add({ name: 'Saturn' })
  .addComponent(Translation, {
    rotation: new THREE.Vector3(0, 2, 0),
  })
  .addComponent(Geometry, {
    primitive: 'Sphere',
    radius: saturnRadius,
    widthSegments: 64,
    heightSegments: 64,
  })
  .addComponent(Material, {
    name: 'SaturnAtmosphere',
    map: '/textures/saturn_texture.jpg',
    color: [1, 1, 1],
  })
  .addComponent(Orbit, {
    center: new THREE.Vector3(0, 0, 0),
    radius: saturnDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    step: 0.03,
  });

const SaturnRings = mainScene.add({ name: 'SaturnRings', parent: Saturn })
  .addComponent(Translation, {
    rotation: new THREE.Vector3(0, 0, 0),
  })
  .addComponent(Geometry, {
    type: 'RingBufferGeometry',
    innerRadius: 0.6,
    outerRadius: 1.6,
    thetaSegments: 64.0,
    phiSegments: 8.0,
    thetaLength: 360.0,
  })
  .addComponent(Material, {
    type: 'MeshBasicMaterial',
    name: 'SaturnRingMaterial',
    map: '/textures/saturn_ring_texture.png',
    side: THREE.DoubleSide,
    color: [1, 1, 1],
    transparent: true,
  });
SaturnRings.getComponent(Object3DComponent).value.rotation.set(Math.PI / 2, 0, 0);

mainScene.add({ name: 'SaturnOrbitPath' })
  .addComponent(Path, {
    radius: saturnDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    visible: showOrbitPaths,
  });
// end saturn

// Uranus
const uranusRadius = scaleKmToMeters(25362);
const uranusDistFromSun = scaleKmToMeters(29000000000 * distScale);
mainScene.add({ name: 'Uranus' })
  .addComponent(Translation, {
    rotation: new THREE.Vector3(0, 2, 0),
  })
  .addComponent(Geometry, {
    primitive: 'Sphere',
    radius: uranusRadius,
    widthSegments: 64,
    heightSegments: 64,
  })
  .addComponent(Material, {
    name: 'UranusAtmosphere',
    map: '/textures/uranus_texture.jpg',
    color: [1, 1, 1],
  })
  .addComponent(Orbit, {
    center: new THREE.Vector3(0, 0, 0),
    radius: uranusDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    step: 0.02,
  });
mainScene.add({ name: 'UranusPath' })
  .addComponent(Path, {
    radius: uranusDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    visible: showOrbitPaths,
  });
// end uranus

// Neptune
const neptuneRadius = scaleKmToMeters(24622);
const neptuneDistFromSun = scaleKmToMeters(2781622982 * distScale);
mainScene.add({ name: 'Neptune' })
  .addComponent(Translation, {
    rotation: new THREE.Vector3(0, 2, 0),
  })
  .addComponent(Geometry, {
    primitive: 'Sphere',
    radius: neptuneRadius,
    widthSegments: 64,
    heightSegments: 64,
  })
  .addComponent(Material, {
    name: 'UranusAtmosphere',
    map: '/textures/neptune_texture.jpg',
    color: [1, 1, 1],
  })
  .addComponent(Orbit, {
    center: new THREE.Vector3(0, 0, 0),
    radius: neptuneDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    step: 0.01,
  });
mainScene.add({ name: 'NeptunePath' })
  .addComponent(Path, {
    radius: neptuneDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    visible: showOrbitPaths,
  });
// end neptune
