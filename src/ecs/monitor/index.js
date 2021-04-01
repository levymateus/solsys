/* eslint-disable max-classes-per-file */
export class Monitor {
  // eslint-disable-next-line class-methods-use-this
  update() {
    throw new Error('no implemented');
  }

  // eslint-disable-next-line class-methods-use-this
  dispose() {
    throw new Error('no implemented');
  }
}

export class Performance extends Monitor {
  constructor() {
    super();
    this.frames = 1;
    this.listners = [];

    this.init();
  }

  init() {
    this.listners.push({
      eventType: 'interval',
      id: window.setInterval(() => {
        this.frames = 0;
      }, 1000),
    });
  }

  update() {
    this.frames += 1;
  }

  dispose() {
    this.listners.forEach(({ eventType, id }) => {
      if (eventType === 'interval') {
        window.clearInterval(id);
      }
    });
  }
}

export class ECSMonitor extends Monitor {
  constructor() {
    super();
    this.performance = new Performance();
  }

  update() {
    this.performance.update();
  }

  dispose() {
    this.performance.dispose();
  }
}

export default ECSMonitor;
