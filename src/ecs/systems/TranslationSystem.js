import { System } from 'ecsy';
import { Object3DComponent } from 'ecsy-three';
import { Translation } from '../Components';

class TranslationSystem extends System {
  execute() {
    this.queries.entities.results.forEach((entity) => {
      const object3d = entity.getObject3D();
      const translation = entity.getComponent(Translation);

      object3d.rotation.x = translation.rotation.x;
      object3d.rotation.y = translation.rotation.y;
      object3d.rotation.z = translation.rotation.z;

      object3d.position.x = translation.position.x;
      object3d.position.y = translation.position.y;
      object3d.position.z = translation.position.z;
    });
  }
}

TranslationSystem.queries = {
  entities: {
    components: [Translation, Object3DComponent],
  },
};

export default TranslationSystem;
