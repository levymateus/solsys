import { Vector3 } from 'three';
import * as ECS from '../ecs';

export class Box3 extends ECS.GameObject {
  onUpdate(delta) {
    this.Rotation.value.setY(
      this.Rotation.value.y + delta * this.Velocity.value.y * this.speed.y,
    );
  }
}

Box3.components = [
  [ECS.Position, { value: new Vector3(0, 0, 0) }],
  [ECS.Velocity, { value: new Vector3(0, -1, 0) }],
  [ECS.Rotation, { value: new Vector3(0, 0, 0) }],
  [ECS.Geometry, { primitive: 'Box' }],
];

Box3.speed = new Vector3(0, 1, 0);

export default Box3;
