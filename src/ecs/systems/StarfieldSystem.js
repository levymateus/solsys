import { System, Not } from 'ecsy';
import * as THREE from 'three';
import { Particles, StateComponentParticles } from '../Components';

class StartFieldSystem extends System {
  execute() {
    this.queries.onStart.results.forEach((entity) => {
      const { count } = entity.getComponent(Particles);
      const positions = new Float32Array(count * 3);
      const geometry = new THREE.BufferGeometry();

      for (let i = 0; i < count * 3; i += 1) {
        positions[i] = (Math.random() - 0.5) * 100;
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        size: 0.005,
      });

      const mesh = new THREE.Points(geometry, material);

      entity.getObject3D().add(mesh);
      entity.addComponent(StateComponentParticles, {
        ref: mesh,
      });
    });
  }
}

StartFieldSystem.queries = {
  onStart: { components: [Particles, Not(StateComponentParticles)] },
};

export default StartFieldSystem;
