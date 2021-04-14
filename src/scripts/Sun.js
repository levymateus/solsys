import { Vector3 } from 'three';
import * as ECS from '../ecs';

const velocity = new Vector3(1, -1, 0);

export class Sun extends ECS.GameObjectAbstract {
  onUpdate(delta) {
    this.translation.rotation.y += delta * velocity.y * 0.5;
  }
}

Sun.components = [
  [ECS.Translation],
  [ECS.Geometry, {
    primitive: 'Sphere',
    radius: 1,
    widthSegments: 64,
    heightSegments: 64,
  }],
  [ECS.Material, {
    name: 'Sun - Material',
    type: 'MeshBasicMaterial',
    wireframe: false,
    map: '/textures/sun_texture.jpg',
    color: [1, 1, 1],
  }],
];

export default Sun;
