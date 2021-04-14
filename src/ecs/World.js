/* eslint-disable no-proto */
/* eslint-disable no-param-reassign */
import { ECSYThreeWorld } from 'ecsy-three';
import * as THREE from 'three';
import { Entity } from './Entity';
import * as COMPS from './Components';

export class ECSWorld extends ECSYThreeWorld {
  constructor(options) {
    super({ entityClass: Entity, ...options });
  }

  createGameObject(gameObject, parent, children = []) {
    const entity = this.entityManager.createEntity(gameObject);

    entity.addComponent(COMPS.Node, { parent, children });
    entity.addComponent(COMPS.GameObject, { module: gameObject });

    const object3D = new THREE.Object3D();
    object3D.name = gameObject.name;
    entity.addObject3DComponent(object3D, parent);

    gameObject.components.forEach((value) => {
      if (Array.isArray(value)) {
        const [component, values] = value;
        entity.addComponent(component, values);
      } else {
        entity.addComponent(value);
      }
    });

    delete gameObject.components;

    gameObject.prototype.onStart?.call();
    return entity;
  }
}

export default ECSWorld;
