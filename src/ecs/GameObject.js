/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

/**
 * The Game Object is an abstraction of a object of game in a world.
 * This holds all the game object behaviours and logic.
 */
export class GameObjectAbstract {
  onStart() {}

  /**
   *
   * @param {number} delta - delta
   * @param {number} time - delapse time
   */
  onUpdate(delta, time) {}
}

GameObjectAbstract.components = [];

export default GameObjectAbstract;
