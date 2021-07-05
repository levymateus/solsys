import { System, Not } from 'ecsy';
import * as THREE from 'three';
import {
  Text, StateComponentText,
} from '../Components';

class TextSystem extends System {
  execute() {
    this.queries.mount.results.forEach((entity) => {
      const text = entity.getComponent(Text);
      const loader = new THREE.FontLoader();

      loader.load(text.fontURL, (font) => {
        const textBuffer = new THREE.TextGeometry(text.text, {
          font,
          size: text.size,
          height: text.height,
          curveSegments: 12,
          bevelEnabled: false,
          bevelThickness: 0,
          bevelSize: 0,
          bevelOffset: 0,
          bevelSegments: 0,
        });

        const object3D = entity.getObject3D();
        const material = new THREE.MeshBasicMaterial({ color: text.color });
        const mesh = new THREE.Mesh(textBuffer, material);

        object3D.position.set(
          text.position.x,
          text.position.y,
          text.position.z,
        );
        mesh.name = textBuffer.name;

        entity.addComponent(StateComponentText, { ref: textBuffer });
        object3D.add(mesh);
      });
    });
  }
}

TextSystem.queries = {
  mount: {
    components: [
      Text, Not(StateComponentText),
    ],
  },
};

export default TextSystem;
