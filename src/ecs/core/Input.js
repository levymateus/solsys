import { EventDispatcher } from 'ecsy';

export class Input extends EventDispatcher {
  constructor() {
    super();
    window.addEventListener('keydown', (event) => {
      this.dispatchEvent(event);
    });
  }
}

export default Input;
