import { System } from 'ecsy';
import { Tween } from '../Components';

class TweenSystem extends System {
  execute(delta) {
    this.queries.q.results.forEach((entity) => {
      const tween = entity.getComponent(Tween);
      tween.ref.interpolate(delta);
    });
  }
}

TweenSystem.queries = {
  q: {
    components: [Tween],
  },
};

export default TweenSystem;
