import { Object3DComponent } from 'ecsy-three';
import * as THREE from 'three';
import { GUI } from 'dat.gui';
import { MainScene } from './ecs';
import Tween from './ecs/Tween';
import {
  Translation, Geometry, Material, Orbit, Particles, Path, Text, Tween as TweenComponent,
} from './ecs/Components';
import Stats from './ecs/Stats';

import './styles/index.css';

document.title = 'Solsys';

const devTools = false;
const isEnvDevelopment = process.env.NODE_ENV === 'development';

/**
 * enable/disable remote devtools.
 * https://blog.mozvr.com/ecsy-developer-tools/
 */
const remoteDevtools = isEnvDevelopment && devTools;

const canvas = document.querySelector('canvas.webgl');
const showOrbitPaths = false;
const scale = 1 / 100000000;
const scaleKmToMeters = (km) => (km * 1000) * scale;
const starsCount = 10000000;

const distScale = 1 / 80;
const planetsScale = 6;

let rootGui = null;
let stats = null;

if (isEnvDevelopment) {
  stats = new Stats();
  rootGui = new GUI({
    name: 'MainSceneGUI',
  });
}

const scene = new MainScene({
  remoteDevtools,
  canvas,
  gui: rootGui,
  stats,
});

scene.camera.position.set(0, 0, 375);
scene.camera.zoom = 0;
scene.camera.lookAt(0, 0, 0);

scene.add({ name: 'Starfield' })
  .addComponent(Particles, { count: starsCount, density: 1 });

window.addEventListener('load', () => {
  window.setTimeout(() => {
    const cameraZoomTween = new Tween();
    cameraZoomTween.interpolateProperty(scene.camera, 'zoom', scene.camera.zoom, 25, 10).start();
    cameraZoomTween.addEventListener('interpolate_property', (evt) => {
      evt.target.object.updateProjectionMatrix();
    });
    scene.add({ name: 'CameraZoomTween' })
      .addComponent(TweenComponent, { ref: cameraZoomTween });
  }, 2000);
});

// Sun
const sunRadius = scaleKmToMeters(696340);
scene.add({ name: 'Sun' })
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
const mercuryRadius = scaleKmToMeters(2439 * planetsScale);
const mercuryDistFromSun = scaleKmToMeters(58000000 * distScale);
scene.add({ name: 'Mercury' })
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
scene.add({ name: 'MercuryOrbitPath' })
  .addComponent(Path, {
    radius: mercuryDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    visible: showOrbitPaths,
  });
scene.add({ name: 'MercuryLegend', parent: null })
  .addComponent(Orbit, {
    center: new THREE.Vector3(0, 0, 0),
    radius: mercuryDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    step: 0.08,
  })
  .addComponent(Text, {
    text: 'Mercury',
    size: 0.5,
    position: new THREE.Vector3(0, 1, 0),
  });
// end mercury

// venus
const venusRadius = scaleKmToMeters(6051 * planetsScale);
const venusDistFromSun = scaleKmToMeters(108000000 * distScale);
scene.add({ name: 'Venus' })
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
scene.add({ name: 'VenusOrbitPath' })
  .addComponent(Path, {
    radius: venusDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    visible: showOrbitPaths,
  });
scene.add({ name: 'VenusLegend', parent: null })
  .addComponent(Orbit, {
    center: new THREE.Vector3(),
    radius: venusDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    step: 0.07,
  })
  .addComponent(Text, {
    text: 'Venus',
    size: 0.5,
    position: new THREE.Vector3(-1, 1, 0),
  });
// end venus

// earth
const earthRadius = scaleKmToMeters(6371 * planetsScale);
const earthDistFromSun = scaleKmToMeters(149600000 * distScale);
const Earth = scene.add({ name: 'Earth' })
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

scene.add({ name: 'EathOrbitPath' })
  .addComponent(Path, {
    radius: earthDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    visible: showOrbitPaths,
  });
scene.add({ name: 'EarthLegend', parent: null })
  .addComponent(Orbit, {
    center: new THREE.Vector3(0, 0, 0),
    radius: earthDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    step: 0.06,
  })
  .addComponent(Text, {
    text: 'Earth',
    size: 0.5,
    position: new THREE.Vector3(-1, 1, 0),
  });
// end earth

// moon
const moonRadius = scaleKmToMeters(1737 * planetsScale);
scene.add({ name: 'Moon', parent: Earth })
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
    radius: 2,
    step: 0.01,
  });
scene.add({ name: 'MoonOrbitPath', parent: Earth })
  .addComponent(Path, {
    radius: 2,
    visible: showOrbitPaths,
  });
// end moon

// mars
const marsRadius = scaleKmToMeters(3389 * planetsScale);
const marsDistFromSun = scaleKmToMeters(228000000 * distScale);
scene.add({ name: 'Mars' })
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
scene.add({ name: 'MarsOrbitPath' })
  .addComponent(Path, {
    radius: marsDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    visible: showOrbitPaths,
  });
scene.add({ name: 'MarsLegend', parent: null })
  .addComponent(Orbit, {
    center: new THREE.Vector3(0, 0, 0),
    radius: marsDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    step: 0.05,
  })
  .addComponent(Text, {
    text: 'Mars',
    size: 0.25,
    position: new THREE.Vector3(-1, 1, 0),
  });
// end mars

// jupiter
const jupiterRadius = scaleKmToMeters(69911 * planetsScale);
const jupiterDistFromSun = scaleKmToMeters(778000000 * distScale);
scene.add({ name: 'Jupiter' })
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
scene.add({ name: 'JupiterOrbitPath' })
  .addComponent(Path, {
    radius: jupiterDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    visible: showOrbitPaths,
  });
scene.add({ name: 'JupiterLegend', parent: null })
  .addComponent(Orbit, {
    center: new THREE.Vector3(0, 0, 0),
    radius: jupiterDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    step: 0.04,
  })
  .addComponent(Text, {
    text: 'Jupiter',
    size: 1,
    position: new THREE.Vector3(0, 5, 0),
  });
// end jupiter

// saturn
const saturnRadius = scaleKmToMeters(58232 * planetsScale);
const saturnDistFromSun = scaleKmToMeters(14000000000 * distScale);
const Saturn = scene.add({ name: 'Saturn' })
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
scene.add({ name: 'SaturnLegend', parent: null })
  .addComponent(Orbit, {
    center: new THREE.Vector3(0, 0, 0),
    radius: saturnDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    step: 0.03,
  })
  .addComponent(Text, {
    text: 'Saturn',
    size: 1,
    position: new THREE.Vector3(0, 5, 0),
  });

const SaturnRings = scene.add({ name: 'SaturnRings', parent: Saturn })
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

scene.add({ name: 'SaturnOrbitPath' })
  .addComponent(Path, {
    radius: saturnDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    visible: showOrbitPaths,
  });
// end saturn

// Uranus
const uranusRadius = scaleKmToMeters(25362 * planetsScale);
const uranusDistFromSun = scaleKmToMeters(29000000000 * distScale);
scene.add({ name: 'Uranus' })
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
scene.add({ name: 'UranusPath' })
  .addComponent(Path, {
    radius: uranusDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    visible: showOrbitPaths,
  });
scene.add({ name: 'UranusLegend', parent: null })
  .addComponent(Orbit, {
    center: new THREE.Vector3(0, 0, 0),
    radius: uranusDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    step: 0.02,
  })
  .addComponent(Text, {
    text: 'Uranus',
    size: 1,
    position: new THREE.Vector3(0, 5, 0),
  });

// end uranus

// Neptune
const neptuneRadius = scaleKmToMeters(24622 * planetsScale);
const neptuneDistFromSun = scaleKmToMeters(2781622982 * distScale);
scene.add({ name: 'Neptune' })
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
scene.add({ name: 'NeptunePath' })
  .addComponent(Path, {
    radius: neptuneDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    visible: showOrbitPaths,
  });
scene.add({ name: 'NeptuneLegend', parent: null })
  .addComponent(Orbit, {
    center: new THREE.Vector3(0, 0, 0),
    radius: neptuneDistFromSun,
    d: new THREE.Vector3(1, 1, 2),
    step: 0.01,
  })
  .addComponent(Text, {
    text: 'Neptune',
    size: 1,
    position: new THREE.Vector3(0, 5, 0),
  });
// end neptune
