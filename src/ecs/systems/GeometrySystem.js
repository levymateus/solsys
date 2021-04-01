import { System, Not } from 'ecsy';
import * as THREE from 'three';
import { Geometry, StateComponentGeometry } from '../core/Components';

class GeometrySystem extends System {
  execute() {
    this.queries.added.results.forEach((entity) => {
      const geoComp = entity.getComponent(Geometry);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

      if (geoComp.textureUrl) {
        material.map = new THREE.TextureLoader().load(geoComp.textureUrl);
      }

      let geometry = null;
      switch (geoComp.primitive) {
        case 'Box':
          geometry = new THREE.BoxGeometry(1, 1, 1);
          break;
        case 'Sphere':
          geometry = new THREE.SphereGeometry();
          break;
        // TODO: write the other primitives
        default:
          geometry = new THREE.BoxGeometry();
          break;
      }

      const object3D = entity.getObject3D();
      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = `${geoComp.primitive}Geometry`;

      entity.addComponent(StateComponentGeometry, {
        meshRef: mesh,
      });

      object3D.add(mesh);
    });
  }
}

GeometrySystem.queries = {
  added: { components: [Geometry, Not(StateComponentGeometry)] },
  remove: { components: [Not(Geometry), StateComponentGeometry] },
  normal: { components: [Geometry, StateComponentGeometry] },
};

export default GeometrySystem;
