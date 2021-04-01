import { System } from 'ecsy';
import { Object3DComponent } from 'ecsy-three';
import { Rotation } from '../core/Components';

export class RotationSystem extends System {
  execute() {
    this.queries.entities.results.forEach((entity) => {
      const object3d = entity.getObject3D();
      const rotate = entity.getComponent(Rotation).value;
      object3d.rotation.x = rotate.x;
      object3d.rotation.y = rotate.y;
      object3d.rotation.z = rotate.z;
    });
  }
}

RotationSystem.queries = {
  entities: {
    components: [Rotation, Object3DComponent],
  },
};

export default RotationSystem;
