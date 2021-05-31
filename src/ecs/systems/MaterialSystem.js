import { System, Not } from 'ecsy';
import * as THREE from 'three';
import { StateComponentMaterial, Material } from '../Components';

class MaterialSystem extends System {
  execute() {
    this.queries.added.results.forEach((entity) => {
      const material = entity.getComponent(Material);

      const loader = new THREE.TextureLoader();
      const normalMap = material.normalMap && loader.load(material.normalMap);
      const map = material.map && loader.load(material.map);

      let mesh = null;
      switch (material.type) {
        case 'MeshBasicMaterial':
          mesh = new THREE.MeshBasicMaterial({
            color: material.color,
            transparent: material.transparent,
            side: material.side,
          });
          break;
        default:
          mesh = new THREE.MeshStandardMaterial();
          break;
      }

      const [r, g, b] = material.color;
      mesh.color = new THREE.Color(r, g, b);
      mesh.map = map;
      mesh.normalMap = normalMap;
      mesh.metalness = material.metalness;
      mesh.roughness = material.roughness;
      mesh.wireframe = material.wireframe;

      entity.addComponent(StateComponentMaterial, {
        ref: mesh,
      });
    });
  }
}

MaterialSystem.queries = {
  added: { components: [Material, Not(StateComponentMaterial)] },
  remove: { components: [Not(Material), StateComponentMaterial] },
  normal: { components: [Material, StateComponentMaterial] },
};

export default MaterialSystem;
