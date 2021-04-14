/* eslint-disable class-methods-use-this */
import { EventDispatcher, Raycaster, Vector2 } from 'three';

class MousePicking extends EventDispatcher {
  constructor() {
    super();
    this.raycaster = new Raycaster();
    this.mouse = new Vector2(0, 0);
    window.addEventListener('click', (evt) => {
      this.mouse.x = (evt.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(evt.clientY / window.innerHeight) * 2 + 1;

      this.dispatchEvent({ type: 'click' });
    }, true);
  }

  test(camera, scene) {
    this.raycaster.setFromCamera(this.mouse, camera);
    const intersects = this.raycaster.intersectObjects(scene.children, true);
    return intersects;
  }
}

export default MousePicking;
