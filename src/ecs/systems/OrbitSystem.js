import { System } from 'ecsy';
import { Object3DComponent } from 'ecsy-three';
import { Orbit } from '../Components';

class OrbitSystem extends System {
  execute(delta) {
    this.queries.onUpdate.results.forEach((entity) => {
      const object3d = entity.getObject3D();
      const {
        center, radius, d, thetaStart, step,
      } = entity.getComponent(Orbit);

      if (!object3d.userData?.theta) {
        object3d.userData.theta = thetaStart;
      }

      object3d.userData.theta += step * delta;
      if (object3d.userData.theta >= (2 * Math.PI + thetaStart)) {
        object3d.userData.theta = 0;
      }

      object3d.position.x = center.x + radius * Math.cos(object3d.userData.theta) * d.x;
      object3d.position.z = center.z + radius * Math.sin(object3d.userData.theta) * d.z;
    });
  }
}

OrbitSystem.queries = {
  onUpdate: { components: [Orbit, Object3DComponent] },
};

export default OrbitSystem;
