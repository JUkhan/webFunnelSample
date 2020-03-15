'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-43a6e2e5.js');

const defineCustomElements = (win, options) => {
  return core.patchEsm().then(() => {
    core.bootstrapLazy([["web-funnel.cjs",[[0,"web-funnel",{"apiUrl":[1,"api-url"],"getTitles":[1,"get-titles"],"saveData":[1,"save-data"],"logoImgPath":[1,"logo-img-path"],"state":[32]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
