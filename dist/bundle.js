/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/battle.js":
/*!***********************!*\
  !*** ./src/battle.js ***!
  \***********************/
/***/ ((module) => {

eval("class Ship {\n  constructor(x1, y1, x2, y2, size) {\n    this.hitCounter = 0;\n    this.x1 = x1;\n    this.x2 = x2;\n    this.y1 = y1;\n    this.y2 = y2;\n    this.size = Math.max(y2 - y1, x2 - x1) + 1;\n  }\n  getSize() {\n    return this.size;\n  }\n  getHitCounter() {\n    return this.hitCounter;\n  }\n  hit() {\n    this.hitCounter += 1;\n  }\n  isSunk() {\n    return this.hitCounter === this.size;\n  }\n  coordinateArray() {\n    let arr = [];\n    for (let i = 0; i < this.size; i++) {\n      if (this.y2 - this.y1 > this.x2 - this.x1) {\n        arr.push([this.x2, this.y1 + i]);\n      } else {\n        arr.push([this.x1 + i, this.y2]);\n      }\n    }\n    return arr;\n  }\n}\nclass Gameboard {\n  constructor() {\n    this.attackList = [];\n    this.shipList = [];\n    let carrier = new Ship(1, 1, 5, 1);\n    let battleship = new Ship(1, 2, 1, 5);\n    let cruiser = new Ship(6, 5, 8, 5);\n    let submarine = new Ship(7, 8, 7, 10);\n    let patrol = new Ship(1, 9, 1, 10);\n    this.shipList.push(carrier);\n    this.shipList.push(battleship);\n    this.shipList.push(cruiser);\n    this.shipList.push(submarine);\n    this.shipList.push(patrol);\n  }\n  recieveAttack(x, y) {\n    this.attackList.push([x, y]);\n    for (const ship of this.shipList) {\n      let coordinates = ship.coordinateArray();\n      // console.log(coordinates);\n      console.log(`hitCounter: ${ship.getHitCounter()}`);\n      if (coordinates.some(pair => pair[0] == x && pair[1] == y)) {\n        ship.hit();\n        return true;\n      }\n    }\n    return false;\n  }\n  allSink() {\n    let counter = 0;\n    for (const ship of this.shipList) {\n      console.log(`counter: ${counter} `);\n      console.log(`hitCounter: ${ship.getHitCounter()}`);\n      if (ship.isSunk()) {\n        counter += 1;\n        console.log(`Ship: ${ship}`);\n      }\n    }\n    if (counter == 5) {\n      return true;\n    } else {\n      return false;\n    }\n  }\n  getCoordinateList() {\n    return this.coordinateList;\n  }\n  getAttackList() {\n    return this.attackList;\n  }\n}\nclass Player {\n  constructor() {\n    let gameboard = new Gameboard();\n    this.gameboard = gameboard;\n  }\n}\nmodule.exports = {\n  Ship,\n  Gameboard,\n  Player\n};\n\n//# sourceURL=webpack://battleship/./src/battle.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _battle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./battle.js */ \"./src/battle.js\");\n/* harmony import */ var _battle_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_battle_js__WEBPACK_IMPORTED_MODULE_0__);\n\nconsole.log(\"testing\");\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;