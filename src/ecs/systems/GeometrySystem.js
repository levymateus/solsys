/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { System, Not } from 'ecsy';
import * as THREE from 'three';
import { Geometry, StateComponentGeometry, Material } from '../core/Components';

class GeometrySystem extends System {
  execute(delta, time) {
    this.queries.added.results.forEach((entity) => {
      const geoComp = entity.getComponent(Geometry);
      const materialComp = entity.getComponent(Material);

      const uniforms = {
        time,
      };

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: materialComp?.vertexShader,
        fragmentShader: materialComp?.fragmentShader,
        wireframe: !!materialComp?.wireframe,
        vertexColors: !!materialComp?.vertexColors,
      });

      if (geoComp.textureUrl) {
        material.map = new THREE.TextureLoader().load(geoComp.textureUrl);
      }

      let geometry = null;
      switch (geoComp.primitive) {
        case 'Box':
          geometry = new THREE.BoxGeometry(1, 1, 1);
          break;
        case 'Sphere':
          geometry = new THREE.SphereGeometry(5, 32, 32);
          break;
        default:
          throw new Error(`${geoComp.primitive} needs to be implemented`);
      }

      const object3D = entity.getObject3D();
      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = `${geoComp.primitive}Geometry`;

      entity.addComponent(StateComponentGeometry, {
        meshRef: mesh,
      });

      object3D.add(mesh);
    });

    this.queries.normal.results.forEach((entity) => {
      const stateGeometry = entity.getComponent(StateComponentGeometry);
      if (stateGeometry.meshRef.geometry.material) {
        stateGeometry.meshRef.geometry.material.uniforms.time = time;
      }
    });
  }
}

GeometrySystem.queries = {
  added: { components: [Geometry, Not(StateComponentGeometry)] },
  remove: { components: [Not(Geometry), StateComponentGeometry] },
  normal: { components: [Geometry, StateComponentGeometry] },
};

export default GeometrySystem;
