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
};

export class Geometry extends Component {}

Geometry.schema = {
  name: { type: ECSYTypes.String, default: 'Geometry' },
  type: { type: ECSYTypes.String, default: 'SphereBufferGeometry' },
  primitive: { type: ECSYTypes.String, default: 'Box' },
  radius: { type: ECSYTypes.Number, default: 0.5 },
  widthSegments: { type: ECSYTypes.Number, default: 64 },
  heightSegments: { type: ECSYTypes.Number, default: 64 },
};

export class Orbit extends Component {}

Orbit.schema = {
  radius: { type: ECSYTypes.Number, default: 1 },
  center: { type: ThreeTypes.Vector3, default: new THREE.Vector3() },
};
