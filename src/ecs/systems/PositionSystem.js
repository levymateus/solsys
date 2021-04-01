import { System } from 'ecsy';
import { Object3DComponent } from 'ecsy-three';
import { Position } from '../core/Components';

export class PositionSystem extends System {
  execute() {
    this.queries.entities.results.forEach((entity) => {
      const object3d = entity.getObject3D();
      const position = entity.getComponent(Position).value;
      object3d.position.x = position.x;
      object3d.position.y = position.y;
      object3d.position.z = position.z;
    });
  }
}

PositionSystem.queries = {
  entities: {
    components: [Position, Object3DComponent],
  },
};

export default PositionSystem;
