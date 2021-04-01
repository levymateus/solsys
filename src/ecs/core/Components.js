/* eslint-disable max-classes-per-file */
import { Component, SystemStateComponent, Types as ECSYTypes } from 'ecsy';
import { ThreeTypes } from 'ecsy-three';
import * as THREE from 'three';

export class Rotation extends Component {}

Rotation.schema = {
  value: { default: new THREE.Vector3(), type: ThreeTypes.Vector3 },
};

export class Velocity extends Component {}

Velocity.schema = {
  value: { default: new THREE.Vector3(), type: ThreeTypes.Vector3 },
};

export class Position extends Component {}

Position.schema = {
  value: { type: ThreeTypes.Vector3, default: new THREE.Vector3() },
};

export class StateComponentGeometry extends SystemStateComponent {}

StateComponentGeometry.schema = {
  meshRef: { type: ECSYTypes.Ref },
};

export class Geometry extends Component {}

Geometry.schema = {
  primitive: { type: ECSYTypes.String, default: 'Box' },
  textureUrl: { type: ECSYTypes.String },
};

export class Node extends Component {}

Node.schema = {
  parent: { type: ECSYTypes.Ref },
  children: { type: ECSYTypes.Ref },
};

export class GameObject extends Component {}

GameObject.schema = {
  module: { type: ECSYTypes.Ref },
};

export class AxesHelper extends Component {}

AxesHelper.schema = {
  ref: { type: ECSYTypes.Ref, default: new THREE.AxesHelper() },
  name: { type: ECSYTypes.String, default: 'AxesHelper' },
  visible: { type: ECSYTypes.Boolean, default: true },
};
