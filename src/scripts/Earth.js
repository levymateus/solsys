import { Vector3 } from 'three';
import * as ECS from '../ecs';

const velocity = new Vector3(1, -1, 0);
const radius = 8;
const pivot = new Vector3(0, 0, 0);
const translationSpeed = 0.25;

let theta = 0;

export class Earth extends ECS.GameObjectAbstract {
  onUpdate(delta) {
    this.translation.rotation.y += delta * velocity.y * 0.7;

    this.translation.position.set(5, 0, 0);

    theta += delta * translationSpeed;
    if (theta >= 2 * Math.PI) {
      theta = 0;
    }

    const pos = new Vector3(
      pivot.x + radius * Math.cos(theta) * 1,
      pivot.y,
      pivot.z + radius * Math.sin(theta) * 0.8,
    );
    this.translation.position = pos;
  }
}

Earth.components = [
  [ECS.Translation],
  [ECS.Geometry, {
    primitive: 'Sphere',
    radius: 0.5,
    widthSegments: 64,
    heightSegments: 64,
  }],
  [ECS.Material, {
    name: 'Earth - Material',
    map: '/textures/earth_texture.jpg',
    // normalMap: '/textures/earth_normal_map.png',
    color: [1, 1, 1],
  }],
];

export default Earth;
