import { System, Not } from 'ecsy';
import * as THREE from 'three';
import { Geometry, StateComponentGeometry, StateComponentMaterial } from '../Components';

class GeometrySystem extends System {
  execute() {
    this.queries.added.results.forEach((entity) => {
      const geometry = entity.getComponent(Geometry);
      const material = entity.getComponent(StateComponentMaterial);

      let buffer = null;
      switch (geometry.type) {
        case 'SphereBufferGeometry':
          buffer = new THREE.SphereBufferGeometry(
            geometry.radius,
            geometry.widthSegments,
            geometry.heightSegments,
          );
          break;
        default:
          buffer = new THREE.BufferGeometry();
          break;
      }

      const object3D = entity.getObject3D();
      const mesh = new THREE.Mesh(buffer, material.ref);

      mesh.name = geometry.name;

      entity.addComponent(StateComponentGeometry, {
        ref: mesh,
      });

      object3D.add(mesh);
    });
  }
}

GeometrySystem.queries = {
  added: { components: [Geometry, StateComponentMaterial, Not(StateComponentGeometry)] },
};

export default GeometrySystem;
