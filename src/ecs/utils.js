/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
export const warning = (message) => console.warn(message);

export const randomInteger = (start = 0, end = 1) => Math.trunc(Math.random() * end) + start;
