import { EventDispatcher } from 'three';

class Tween extends EventDispatcher {
  constructor() {
    super();
    this.isRunning = false;
    this.object = null;
    this.prop = null;
    this.initialValue = null;
    this.finalValue = null;
    this.duration = null;
    this.type = '';
  }

  interpolateProperty(object, prop, initialValue, finalValue, duration) {
    this.object = object;
    this.prop = prop;
    this.initialValue = initialValue;
    this.finalValue = finalValue;
    this.duration = duration;
    this.type = 'interpolate_property';
    return this;
  }

  start() {
    this.isRunning = true;
    if (this.object && this.prop) {
      this.object[this.prop] = this.initialValue;
    }
  }

  interpolate(delta) {
    if (this.isRunning && this.type === 'interpolate_property' && this.object && this.prop && this.object[this.prop] <= this.finalValue) {
      const value = (this.initialValue + delta * (this.finalValue - this.initialValue));
      this.object[this.prop] += value / this.duration;
      return this.dispatchEvent({ type: this.type });
    }
    return this.complete();
  }

  complete() {
    this.isRunning = false;
    this.dispatchEvent({ type: 'complete', object: this.object });
  }
}

export default Tween;
