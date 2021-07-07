'use strict'

const NODE_ENV = process.env.NODE_ENV

if (!NODE_ENV) {
  throw new Error("Enviroment variable NODE_ENV was not provided!");
}

const dotenv = require('dotenv');
dotenv.config({ debug: process.env.NODE_ENV === 'development' });

if (!process.env.PORT) {
  throw new Error("Enviroment variable PORT was not provided!");
}