import { System } from 'ecsy';
import { Object3DComponent } from 'ecsy-three';
import { Orbit } from '../Components';

class OrbitSystem extends System {
  init() {
    this.theta = 0;
  }

  execute(delta) {
    this.queries.onUpdate.results.forEach((entity) => {
      const object3d = entity.getObject3D();
      const { center, radius, d } = entity.getComponent(Orbit);

      this.theta += delta * 0.025;
      if (this.theta >= 2 * Math.PI) {
        this.theta = 0;
      }

      object3d.position.x = center.x + radius * Math.cos(this.theta) * d.x;
      object3d.position.z = center.z + radius * Math.sin(this.theta) * d.z;
    });
  }
}

OrbitSystem.queries = {
  onUpdate: { components: [Orbit, Object3DComponent] },
};

export default OrbitSystem;
