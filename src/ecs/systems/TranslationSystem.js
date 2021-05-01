import { System } from 'ecsy';
import { Object3DComponent } from 'ecsy-three';
import { Translation } from '../Components';

class TranslationSystem extends System {
  execute(delta) {
    this.queries.entities.results.forEach((entity) => {
      const object3d = entity.getObject3D();
      const translation = entity.getComponent(Translation);

      object3d.rotation.x += delta * translation.rotation.x;
      object3d.rotation.y += delta * translation.rotation.y;
      object3d.rotation.z += delta * translation.rotation.z;

      object3d.position.x = delta * translation.position.x;
      object3d.position.y = delta * translation.position.y;
      object3d.position.z = delta * translation.position.z;
    });
  }
}

TranslationSystem.queries = {
  entities: {
    components: [Translation, Object3DComponent],
  },
};

export default TranslationSystem;
