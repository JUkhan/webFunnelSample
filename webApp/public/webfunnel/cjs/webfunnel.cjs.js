'use strict';

const core = require('./core-43a6e2e5.js');

core.patchBrowser().then(options => {
  return core.bootstrapLazy([["web-funnel.cjs",[[0,"web-funnel",{"apiUrl":[1,"api-url"],"getTitles":[1,"get-titles"],"saveData":[1,"save-data"],"logoImgPath":[1,"logo-img-path"],"state":[32]}]]]], options);
});
