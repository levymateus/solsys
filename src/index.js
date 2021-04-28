import { Engine } from './ecs';

import './global.css';

const devTools = false;
const isEnvDevelopment = process.env.NODE_ENV === 'development';

/**
 * enable/disable remote devtools.
 * https://blog.mozvr.com/ecsy-developer-tools/
 */
const remoteDevtools = isEnvDevelopment && devTools;

const canvas = document.querySelector('canvas.webgl');
document.title = 'Three.js | SolarSystem';

const engine = new Engine({ remoteDevtools, canvas });
engine.start();

// TODO: fix children system

engine.addGameObject(import('./scripts/Earth'), null, []);
engine.addGameObject(import('./scripts/Sun'));
