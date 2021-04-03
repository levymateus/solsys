import { Engine } from './ecs';

import './global.css';

const devTools = false;
const isEnvDevelopment = process.env.NODE_ENV === 'development';

/**
 * enable/disable remote devtools.
 * https://blog.mozvr.com/ecsy-developer-tools/
 */
const remoteDevtools = isEnvDevelopment && devTools;

const engine = new Engine({ remoteDevtools }).start();

if (isEnvDevelopment) {
  engine.addGameObject(import('./game/Box3'));
}

if (!isEnvDevelopment) {
  engine.addGameObject(import('./game/Box3'));
}
