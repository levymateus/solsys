/* eslint-disable max-classes-per-file */
import { Component, SystemStateComponent, Types as ECSYTypes } from 'ecsy';
import { ThreeTypes } from 'ecsy-three';
import * as THREE from 'three';

export class Translation extends Component {}

Translation.schema = {
  position: { default: new THREE.Vector3(), type: ThreeTypes.Vector3 },
  rotation: { default: new THREE.Vector3(), type: ThreeTypes.Vector3 },
};

export class StateComponentGeometry extends SystemStateComponent {}

StateComponentGeometry.schema = {
  ref: { type: ECSYTypes.Ref },
};

export class StateComponentMaterial extends SystemStateComponent {}

StateComponentMaterial.schema = {
  ref: { type: ECSYTypes.Ref },
};

export class Material extends Component {}

Material.schema = {
  name: { type: ECSYTypes.String, default: 'Material' },
  type: { type: ECSYTypes.String, default: 'MeshStandardMaterial' },
  wireframe: { type: ECSYTypes.Boolean, default: false },
  map: { type: ECSYTypes.String, default: null },
  normalMap: { type: ECSYTypes.String, default: null },
  metalness: { type: ECSYTypes.Number, default: 0.7 },
  roughness: { type: ECSYTypes.Number, default: 0.7 },
  color: { type: ECSYTypes.Array, default: [1, 1, 1] },
  side: { type: ECSYTypes.Ref },
  transparent: { type: ECSYTypes.Boolean, default: false },
};

export class Geometry extends Component {}

Geometry.schema = {
  name: { type: ECSYTypes.String, default: 'Geometry' },
  type: { type: ECSYTypes.String, default: 'SphereBufferGeometry' },
  primitive: { type: ECSYTypes.String, default: 'Sphere' },
  radius: { type: ECSYTypes.Number, default: 0.5 },
  widthSegments: { type: ECSYTypes.Number, default: 64 },
  heightSegments: { type: ECSYTypes.Number, default: 64 },
  innerRadius: { type: ECSYTypes.Number, default: 0.5 },
  outerRadius: { type: ECSYTypes.Number, default: 1 },
  thetaSegments: { type: ECSYTypes.Number, default: 8 },
};

export class Orbit extends Component {}

Orbit.schema = {
  radius: { type: ECSYTypes.Number, default: 1 },
  center: { type: ThreeTypes.Vector3, default: new THREE.Vector3() },
  d: { type: ThreeTypes.Vector3, default: new THREE.Vector3(1, 1, 1) },
  thetaStart: { type: ECSYTypes.Number, default: 0 },
  step: { type: ECSYTypes.Number, default: 0.09 },
};

export class Particles extends Component {}

Particles.schema = {
  count: { type: ECSYTypes.Number, default: 1 },
  desity: { type: ECSYTypes.Number, default: 1024 },
};

export class StateComponentParticles extends SystemStateComponent {}

StateComponentParticles.schema = {
  ref: { type: ECSYTypes.Ref },
};

export class Path extends Component {}

Path.schema = {
  color: { type: ECSYTypes.Array, default: [1, 1, 1] },
  center: { type: ThreeTypes.Vector3, default: new THREE.Vector3() },
  radius: { type: ECSYTypes.Number, default: 1 },
  d: { type: ThreeTypes.Vector3, default: new THREE.Vector3(1, 1, 1) },
  visible: { type: ECSYTypes.Boolean, default: true },
};

export class StateComponentPath extends Component {}

StateComponentPath.schema = {
  ref: { type: ECSYTypes.Ref },
};

export class StateComponentText extends SystemStateComponent {}

StateComponentText.schema = {
  ref: { type: ECSYTypes.Ref },
};

export class Text extends Component {}

Text.schema = {
  text: { type: ECSYTypes.String, default: 'Text' },
  size: { type: ECSYTypes.Number, default: 12 },
  height: { type: ECSYTypes.Number, default: 1 },
  position: { type: ThreeTypes.Vector3, default: new THREE.Vector3() },
  fontURL: {
    type: ECSYTypes.String,
    default: 'fonts/helvetiker_regular.typeface.json',
  },
  color: { type: ThreeTypes.Color, default: new THREE.Color(0xffffff) },
};

export class Camera extends Component {}

Camera.schema = {
  ref: { type: ECSYTypes.Ref, default: null },
};

export class Tween extends Component {}

Tween.schema = {
  ref: { type: ECSYTypes.Ref, default: null },
};
