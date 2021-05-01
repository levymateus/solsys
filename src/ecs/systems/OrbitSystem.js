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
      const orbit = entity.getComponent(Orbit);

      this.theta += delta * 0.09;
      if (this.theta >= 2 * Math.PI) {
        this.theta = 0;
      }

      object3d.position.x = orbit.center.x + orbit.radius * Math.cos(this.theta) * 1;
      object3d.position.z = orbit.center.z + orbit.radius * Math.sin(this.theta) * 0.8;
    });
  }
}

OrbitSystem.queries = {
  onUpdate: { components: [Orbit, Object3DComponent] },
};

export default OrbitSystem;
