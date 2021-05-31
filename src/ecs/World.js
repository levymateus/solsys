import { ECSYThreeWorld } from 'ecsy-three';
import * as THREE from 'three';
import { Entity } from './Entity';

export class ECSWorld extends ECSYThreeWorld {
  constructor(options) {
    super({ entityClass: Entity, ...options });
  }

  add(name, parent) {
    const object = new THREE.Object3D();
    object.name = name;
    return this.entityManager
      .createEntity(name)
      .addObject3DComponent(object, parent);
  }
}

export default ECSWorld;
