import { System, Not } from 'ecsy';
import { Clock } from 'three';
import { Object3DComponent } from 'ecsy-three';
import { GameObject } from '../Components';
import { camelize } from '../utils';

export class GameObjectSystem extends System {
  init() {
    this.clock = new Clock();
  }

  execute() {
    this.queries.normal.results.forEach((entity) => {
      const gameObject = entity.getComponent(GameObject).module;

      Object.values(entity.getComponents()).forEach((component) => {
        const keys = Object.keys(component);
        gameObject.prototype.constructor[
          camelize(component.getName())
        ] = keys.length === 1 ? component[keys[0]] : component;
      });

      const thisArg = { ...gameObject.prototype.constructor };
      gameObject.prototype.onUpdate?.call(
        thisArg,
        this.clock.getDelta(),
        this.clock.elapsedTime,
      );
    });
  }
}

GameObjectSystem.queries = {
  added: { components: [GameObject, Not(Object3DComponent)] },
  normal: { components: [GameObject] },
};

export default GameObjectSystem;
