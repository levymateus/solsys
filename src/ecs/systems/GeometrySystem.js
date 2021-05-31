/* eslint-disable class-methods-use-this */
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
        case 'RingBufferGeometry':
          buffer = this.createRingBufferGeometry(geometry);
          break;
        default:
          buffer = new THREE.BufferGeometry();
          break;
      }

      const object3D = entity.getObject3D();
      const mesh = new THREE.Mesh(buffer, material.ref);

      mesh.name = geometry.name;
      entity.addComponent(StateComponentGeometry, { ref: mesh });
      object3D.add(mesh);
    });
  }

  createRingBufferGeometry({ innerRadius, outerRadius, thetaSegments }) {
    const buffer = new THREE.RingBufferGeometry(innerRadius, outerRadius, thetaSegments);
    const pos = buffer.attributes.position;
    const v3 = new THREE.Vector3();
    for (let i = 0; i < pos.count; i += 1) {
      v3.fromBufferAttribute(pos, i);
      buffer.attributes.uv.setXY(i, v3.length() < innerRadius + 0.1 ? 0 : 1, 1);
    }
    return buffer;
  }
}

GeometrySystem.queries = {
  added: {
    components: [
      Geometry, StateComponentMaterial, Not(StateComponentGeometry),
    ],
  },
};

export default GeometrySystem;
