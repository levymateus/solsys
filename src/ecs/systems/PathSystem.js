import * as THREE from 'three';
import { System, Not } from 'ecsy';
import { Path, StateComponentPath } from '../Components';

class PathSystem extends System {
  execute() {
    this.queries.onStart.results.forEach((entity) => {
      const {
        color, center, radius, d, visible,
      } = entity.getComponent(Path);
      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color(color[0], color[1], color[2]),
        linewidth: 1,
      });
      const points = [];
      for (let theta = 0; theta <= Math.PI * 2; theta += 0.007) {
        points.push(
          new THREE.Vector3(
            center.x + radius * Math.cos(theta) * d.x,
            0 * d.y,
            center.y + radius * Math.sin(theta) * d.z,
          ),
        );
      }

      points.push(
        new THREE.Vector3(
          center.x + radius * Math.cos(Math.PI * 2) * d.x,
          0 * d.y,
          center.y + radius * Math.sin(Math.PI * 2) * d.z,
        ),
      );

      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const line = new THREE.Line(geometry, material);

      line.visible = visible;

      entity.getObject3D().add(line);
      entity.addComponent(StateComponentPath, {
        ref: line,
      });
    });
  }
}

PathSystem.queries = {
  onStart: { components: [Path, Not(StateComponentPath)] },
};

export default PathSystem;
