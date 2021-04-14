// import { GUI } from 'dat.gui';
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
          mesh = new THREE.MeshBasicMaterial();
          break;
        default:
          mesh = new THREE.MeshStandardMaterial();
          break;
      }

      mesh.color = new THREE.Color(
        material.color[0],
        material.color[1],
        material.color[2],
      );
      mesh.map = map;
      mesh.normalMap = normalMap;
      mesh.metalness = material.metalness;
      mesh.roughness = material.roughness;
      mesh.wireframe = material.wireframe;

      // const gui = new GUI({ name: material.name });
      // const materialGUI = gui.addFolder(material.name);
      // const palette = { rgb: [255, 255, 255] };
      // materialGUI.addColor(palette, 'rgb')
      //   .listen()
      //   .name('color')
      //   .onChange(([r, g, b]) => {
      //     mesh.color.setRGB(r / 255, g / 255, b / 255);
      //   });

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
