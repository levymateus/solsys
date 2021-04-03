import { Vector3 } from 'three';
import * as ECS from '../ecs';

export class Box3 extends ECS.GameObject {
  onUpdate(delta) {
    this.Rotation.value.setY(
      this.Rotation.value.y + delta * this.Velocity.value.y * 0.2,
    );
  }
}

const vertexShader = document.getElementById('vertexShader').innerText;
const fragmentShader = document.getElementById('fragmentShader').innerText;

Box3.components = [
  [ECS.Position, { value: new Vector3(0, 0, 0) }],
  [ECS.Velocity, { value: new Vector3(0, -1, 0) }],
  [ECS.Rotation, { value: new Vector3(0, 0, 0) }],
  [ECS.Geometry, { primitive: 'Box' }],
  [ECS.Material, {
    wireframe: false,
    vertexShader,
    fragmentShader,
  }],
];

Box3.speed = new Vector3(0, 1, 0);

export default Box3;
