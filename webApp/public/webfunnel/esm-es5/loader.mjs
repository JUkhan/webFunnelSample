import { a as patchEsm, b as bootstrapLazy } from './core-a8ec883a.js';
var defineCustomElements = function (win, options) {
    return patchEsm().then(function () {
        bootstrapLazy([["web-funnel", [[0, "web-funnel", { "apiUrl": [1, "api-url"], "getTitles": [1, "get-titles"], "saveData": [1, "save-data"], "logoImgPath": [1, "logo-img-path"], "state": [32] }]]]], options);
    });
};
export { defineCustomElements };
