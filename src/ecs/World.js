import { ECSYThreeWorld } from 'ecsy-three';
import * as THREE from 'three';
import { Entity } from './Entity';

export class ECSWorld extends ECSYThreeWorld {
  constructor(options) {
    super({ entityClass: Entity, ...options });
  }

  add(name, parent) {
    return this.entityManager
      .createEntity(name)
      .addObject3DComponent(new THREE.Object3D(), parent);
  }
}

export default ECSWorld;
