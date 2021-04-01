import { System } from 'ecsy';
import { Object3DComponent } from 'ecsy-three';
import { Node } from '../core/Components';

export class SceneGraphSystem extends System {
  execute() {
    this.queries.entities.results.forEach((entity) => {
      const object3D = entity.getObject3D();
      const node = entity.getComponent(Node);
      node.children.forEach((childObject) => {
        const child = childObject;
        child.name = childObject.type;
        object3D.add(child);
      });
    });
  }
}

SceneGraphSystem.queries = {
  entities: {
    components: [Node, Object3DComponent],
  },
};

export default SceneGraphSystem;
