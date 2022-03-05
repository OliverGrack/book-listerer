// ==UserScript==
// @name        book-listerer
// @namespace   https://olii.dev/
// @version     0.0.2
// @author      Oliver Grack <hello@olii.dev>
// @source      https://github.com/Trim21/webpack-userscript-template
// @match       https://www.thalia.at/*
// @require     file://C:\Users\ogstoettenbauer\pr\book-listerer\dist\index.prod.user.js
// @grant       GM.xmlHttpRequest
// @connect     httpbin.org
// @run-at      document-end
// ==/UserScript==


/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/book-detail-parser.ts":
/*!***********************************!*\
  !*** ./src/book-detail-parser.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseBookDetails": () => (/* binding */ parseBookDetails)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

function parseBookDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const detailContainer = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.s)(document, '[component="artikelbeschreibung-und-details"] .details-overlay');
        const detailsElements = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.sAll)(detailContainer, '.artikeldetail');
        return Object.fromEntries(detailsElements.map(detailElement => {
            var _a, _b, _c, _d;
            return [
                (0,_utils__WEBPACK_IMPORTED_MODULE_0__.trimSpacesAndNewLines)((_b = (_a = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.s)(detailElement, 'b')) === null || _a === void 0 ? void 0 : _a.innerText) !== null && _b !== void 0 ? _b : ''),
                (0,_utils__WEBPACK_IMPORTED_MODULE_0__.trimSpacesAndNewLines)((_d = (_c = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.s)(detailElement, ':nth-child(2)')) === null || _c === void 0 ? void 0 : _c.innerText) !== null && _d !== void 0 ? _d : ''),
            ];
        }));
    });
}


/***/ }),

/***/ "./src/csv-formatter.ts":
/*!******************************!*\
  !*** ./src/csv-formatter.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "recordsToCsv": () => (/* binding */ recordsToCsv)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");

const csvValueRegex = /"/g;
function escapeCsvValue(value) {
    if (value.includes(",") || value.includes('"')) {
        return `"${value.replace(csvValueRegex, '\\"')}"`;
    }
    else {
        return value;
    }
}
function formatCsvRow(strings) {
    return strings.map(str => `${escapeCsvValue(str)}`).join(";");
}
function recordsToCsv(records) {
    const keys = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.uniqueBy)(records.flatMap(it => Object.keys(it)));
    const titleRow = formatCsvRow(keys);
    const recordRows = records.map(record => {
        return formatCsvRow(keys.map(key => { var _a; return (_a = record[key]) !== null && _a !== void 0 ? _a : ''; }));
    });
    return [titleRow, ...recordRows].join('\n');
}


/***/ }),

/***/ "./src/elements.ts":
/*!*************************!*\
  !*** ./src/elements.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createResultDisplay": () => (/* binding */ createResultDisplay),
/* harmony export */   "getOrCreateButtonContainer": () => (/* binding */ getOrCreateButtonContainer),
/* harmony export */   "createButton": () => (/* binding */ createButton)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");

function createResultDisplay(content) {
    const box = document.createElement('textarea');
    box.style.cssText = `
            position: fixed;
            inset: 5rem;
            padding: 1rem;
            border-radius: 1rem;
            border: 2px solid blue;
        `;
    box.value = content;
    document.body.appendChild(box);
}
function getOrCreateButtonContainer() {
    const existing = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.s)(document, '.export-button-container');
    if (existing) {
        return existing;
    }
    const container = document.createElement('div');
    container.classList.add('export-button-container');
    container.style.cssText = `
            position: fixed;
            top: 1rem;
            left: 1rem;
        `;
    document.body.appendChild(container);
    return container;
}
function createButton(text, action) {
    const container = getOrCreateButtonContainer();
    const button = document.createElement('button');
    button.style.cssText = `
            padding: 1rem;
            margin: 0.5rem;
            border-radius: 1rem;
            border: 2px solid blue;
        `;
    button.innerText = text;
    button.onclick = action;
    container.appendChild(button);
}


/***/ }),

/***/ "./src/local-storage.ts":
/*!******************************!*\
  !*** ./src/local-storage.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "storageGet": () => (/* binding */ storageGet),
/* harmony export */   "storageSet": () => (/* binding */ storageSet)
/* harmony export */ });
function storageGet(key) {
    const text = localStorage.getItem(key);
    if (text) {
        return JSON.parse(text);
    }
    else {
        return undefined;
    }
}
function storageSet(key, value) {
    if (value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    else {
        localStorage.removeItem(key);
    }
}


/***/ }),

/***/ "./src/main-list-parser.ts":
/*!*********************************!*\
  !*** ./src/main-list-parser.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseMainList": () => (/* binding */ parseMainList)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

function parseMainList() {
    return __awaiter(this, void 0, void 0, function* () {
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.sAll)(document, 'footer, .zuletzt-angesehen-und-mehr').forEach(it => {
            var _a;
            (_a = it === null || it === void 0 ? void 0 : it.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(it);
        });
        const loadMoreButton = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.s)(document, 'button[interaction="eintraege-nachladen"]');
        const statusTextElement = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.s)(document, 'p.ergebnisanzeige');
        let alreadyLoaded = 0;
        let total = Number.MAX_VALUE;
        while (alreadyLoaded < total) {
            const [alreadyLoadedStr, _, totalStr, ...__] = statusTextElement.innerText.split(' ');
            alreadyLoaded = parseInt(alreadyLoadedStr);
            total = parseInt(totalStr);
            console.log({ alreadyLoaded, total });
            yield (0,_utils__WEBPACK_IMPORTED_MODULE_0__.wait)(100);
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.scrollToBottom)();
            if (loadMoreButton.dataset.status === 'sichtbar') {
                loadMoreButton.click();
            }
        }
        const listItems = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.sAll)(document, '.merkzettel-eintrag');
        return listItems.map(listItem => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const id = listItem.getAttribute('product-id').toString();
            const name = (_b = (_a = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.s)(listItem, '.artikeldetails h2')) === null || _a === void 0 ? void 0 : _a.innerText) !== null && _b !== void 0 ? _b : '';
            const author = (_d = (_c = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.s)(listItem, '.artikeldetails p:nth-child(2)')) === null || _c === void 0 ? void 0 : _c.innerText) !== null && _d !== void 0 ? _d : '';
            const link = (_f = (_e = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.s)(listItem, 'a')) === null || _e === void 0 ? void 0 : _e.href) !== null && _f !== void 0 ? _f : '';
            const price = ((_h = (_g = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.s)(listItem, '.preis')) === null || _g === void 0 ? void 0 : _g.innerText) === null || _h === void 0 ? void 0 : _h.split('€')[0]) + '€';
            return { id, name, author, price, link };
        });
    });
}


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "s": () => (/* binding */ s),
/* harmony export */   "sAll": () => (/* binding */ sAll),
/* harmony export */   "wait": () => (/* binding */ wait),
/* harmony export */   "scrollToBottom": () => (/* binding */ scrollToBottom),
/* harmony export */   "trimSpacesAndNewLines": () => (/* binding */ trimSpacesAndNewLines),
/* harmony export */   "uniqueBy": () => (/* binding */ uniqueBy),
/* harmony export */   "downloadTextFile": () => (/* binding */ downloadTextFile)
/* harmony export */ });
function s(parent, selector) {
    return parent.querySelector(selector);
}
function sAll(parent, selector) {
    return [...parent.querySelectorAll(selector)];
}
function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'instant',
    });
}
function trimSpacesAndNewLines(str) {
    return str.replace(/^\s+|\s+$/g, '');
}
function uniqueBy(array, getter = it => it) {
    const seen = new Set();
    const arrayWithoutDuplicates = [];
    array.forEach(it => {
        const property = getter(it);
        if (!seen.has(property)) {
            seen.add(property);
            arrayWithoutDuplicates.push(it);
        }
    });
    return arrayWithoutDuplicates;
}
function downloadTextFile(fileName, content) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(content);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", fileName);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}


/***/ }),

/***/ "./src/visit-next-book.ts":
/*!********************************!*\
  !*** ./src/visit-next-book.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "visitNextBook": () => (/* binding */ visitNextBook)
/* harmony export */ });
/* harmony import */ var _local_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./local-storage */ "./src/local-storage.ts");

function visitNextBook() {
    var _a;
    const notScannedIds = (_a = (0,_local_storage__WEBPACK_IMPORTED_MODULE_0__.storageGet)('notScannedIds')) !== null && _a !== void 0 ? _a : [];
    const nextId = notScannedIds[0];
    if (nextId) {
        window.location.href = 'https://www.thalia.at/shop/home/artikeldetails/' + nextId;
    }
}


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main_list_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main-list-parser */ "./src/main-list-parser.ts");
/* harmony import */ var _local_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./local-storage */ "./src/local-storage.ts");
/* harmony import */ var _book_detail_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./book-detail-parser */ "./src/book-detail-parser.ts");
/* harmony import */ var _visit_next_book__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./visit-next-book */ "./src/visit-next-book.ts");
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./elements */ "./src/elements.ts");
/* harmony import */ var _csv_formatter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./csv-formatter */ "./src/csv-formatter.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







function main() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const currentUrl = window.location.href;
        if (currentUrl.includes('/merkliste/')) {
            // -- MAIN LIST PAGE -- button to parse
            (0,_elements__WEBPACK_IMPORTED_MODULE_4__.createButton)('Export', (ev) => __awaiter(this, void 0, void 0, function* () {
                ev.preventDefault();
                const list = yield (0,_main_list_parser__WEBPACK_IMPORTED_MODULE_0__.parseMainList)();
                const map = Object.fromEntries(list.map(it => [it.id, it]));
                (0,_local_storage__WEBPACK_IMPORTED_MODULE_1__.storageSet)('overviews', map);
                (0,_local_storage__WEBPACK_IMPORTED_MODULE_1__.storageSet)('notScannedIds', list.filter(it => it.link !== "").map(it => it.id));
                console.log(JSON.stringify(list));
                console.log(list);
                continueScan();
            }));
        }
        else if (currentUrl.includes('/artikeldetails/')) {
            const urlSplit = currentUrl.split('/');
            const bookId = urlSplit[urlSplit.length - 1];
            console.log(bookId);
            const notScannedIds = new Set((0,_local_storage__WEBPACK_IMPORTED_MODULE_1__.storageGet)('notScannedIds'));
            console.log(notScannedIds);
            if (notScannedIds && notScannedIds.has(bookId)) {
                console.log('Scanning book details');
                const bookDetails = yield (0,_book_detail_parser__WEBPACK_IMPORTED_MODULE_2__.parseBookDetails)();
                const allBookDetails = (_a = (0,_local_storage__WEBPACK_IMPORTED_MODULE_1__.storageGet)("details")) !== null && _a !== void 0 ? _a : {};
                allBookDetails[bookId] = bookDetails;
                (0,_local_storage__WEBPACK_IMPORTED_MODULE_1__.storageSet)('details', allBookDetails);
                console.log(allBookDetails);
                notScannedIds.delete(bookId);
                (0,_local_storage__WEBPACK_IMPORTED_MODULE_1__.storageSet)('notScannedIds', Array.from(notScannedIds));
                continueScan();
            }
        }
        else if (currentUrl === "https://www.thalia.at/") {
            // thalia redirected to start page, since book not available anymore.
            const [_, ...notScannedIds] = (_b = (0,_local_storage__WEBPACK_IMPORTED_MODULE_1__.storageGet)('notScannedIds')) !== null && _b !== void 0 ? _b : [''];
            (0,_local_storage__WEBPACK_IMPORTED_MODULE_1__.storageSet)('notScannedIds', notScannedIds);
            continueScan();
        }
    });
}
function continueScan() {
    var _a, _b, _c;
    const notScannedIds = (_a = (0,_local_storage__WEBPACK_IMPORTED_MODULE_1__.storageGet)('notScannedIds')) !== null && _a !== void 0 ? _a : [];
    const allBookDetails = (_b = (0,_local_storage__WEBPACK_IMPORTED_MODULE_1__.storageGet)('details')) !== null && _b !== void 0 ? _b : {};
    if (notScannedIds.length === 0) {
        const bookOverviews = (_c = (0,_local_storage__WEBPACK_IMPORTED_MODULE_1__.storageGet)('overviews')) !== null && _c !== void 0 ? _c : {};
        const bookAllData = Object.entries(bookOverviews).map(([bookId, bookOverview]) => {
            var _a;
            return Object.assign(Object.assign({}, bookOverview), ((_a = allBookDetails[bookId]) !== null && _a !== void 0 ? _a : {}));
        });
        console.log(JSON.stringify(bookAllData));
        console.log(bookAllData);
        (0,_elements__WEBPACK_IMPORTED_MODULE_4__.createResultDisplay)(JSON.stringify(bookAllData, null, 2));
        // createResultDisplay(recordsToCsv(bookAllData));
        const date = new Date().toISOString();
        (0,_elements__WEBPACK_IMPORTED_MODULE_4__.createButton)('Download as CSV', () => {
            (0,_utils__WEBPACK_IMPORTED_MODULE_6__.downloadTextFile)(`book-listerer-export-${date}.csv`, (0,_csv_formatter__WEBPACK_IMPORTED_MODULE_5__.recordsToCsv)(bookAllData));
        });
        (0,_elements__WEBPACK_IMPORTED_MODULE_4__.createButton)('Download as JSON', () => {
            (0,_utils__WEBPACK_IMPORTED_MODULE_6__.downloadTextFile)(`book-listerer-export-${date}.json`, JSON.stringify(bookAllData, null, 2));
        });
    }
    else {
        (0,_elements__WEBPACK_IMPORTED_MODULE_4__.createResultDisplay)(`${notScannedIds.length} books remaining`);
        (0,_visit_next_book__WEBPACK_IMPORTED_MODULE_3__.visitNextBook)();
    }
}
main().catch(e => {
    console.log(e);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFpRCxtRkFBbUY7QUFDcEksU0FBUztBQUNUO0FBQ0E7QUFDQSxRQUFRLDhEQUFtQjtBQUMzQjtBQUNBO0FBQ0EsUUFBUSx1REFBWTtBQUNwQixZQUFZLHdEQUFnQix5QkFBeUIsS0FBSyxPQUFPLDREQUFZO0FBQzdFLFNBQVM7QUFDVCxRQUFRLHVEQUFZO0FBQ3BCLFlBQVksd0RBQWdCLHlCQUF5QixLQUFLO0FBQzFELFNBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBUSw4REFBbUIsSUFBSSxzQkFBc0I7QUFDckQsUUFBUSwrREFBYTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ib29rLWxpc3RlcmVyLy4vc3JjL2Jvb2stZGV0YWlsLXBhcnNlci50cyIsIndlYnBhY2s6Ly9ib29rLWxpc3RlcmVyLy4vc3JjL2Nzdi1mb3JtYXR0ZXIudHMiLCJ3ZWJwYWNrOi8vYm9vay1saXN0ZXJlci8uL3NyYy9lbGVtZW50cy50cyIsIndlYnBhY2s6Ly9ib29rLWxpc3RlcmVyLy4vc3JjL2xvY2FsLXN0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vYm9vay1saXN0ZXJlci8uL3NyYy9tYWluLWxpc3QtcGFyc2VyLnRzIiwid2VicGFjazovL2Jvb2stbGlzdGVyZXIvLi9zcmMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vYm9vay1saXN0ZXJlci8uL3NyYy92aXNpdC1uZXh0LWJvb2sudHMiLCJ3ZWJwYWNrOi8vYm9vay1saXN0ZXJlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ib29rLWxpc3RlcmVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ib29rLWxpc3RlcmVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYm9vay1saXN0ZXJlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Jvb2stbGlzdGVyZXIvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5pbXBvcnQgeyBzLCBzQWxsLCB0cmltU3BhY2VzQW5kTmV3TGluZXMgfSBmcm9tICcuL3V0aWxzJztcclxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQm9va0RldGFpbHMoKSB7XHJcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIGNvbnN0IGRldGFpbENvbnRhaW5lciA9IHMoZG9jdW1lbnQsICdbY29tcG9uZW50PVwiYXJ0aWtlbGJlc2NocmVpYnVuZy11bmQtZGV0YWlsc1wiXSAuZGV0YWlscy1vdmVybGF5Jyk7XHJcbiAgICAgICAgY29uc3QgZGV0YWlsc0VsZW1lbnRzID0gc0FsbChkZXRhaWxDb250YWluZXIsICcuYXJ0aWtlbGRldGFpbCcpO1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoZGV0YWlsc0VsZW1lbnRzLm1hcChkZXRhaWxFbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xyXG4gICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgdHJpbVNwYWNlc0FuZE5ld0xpbmVzKChfYiA9IChfYSA9IHMoZGV0YWlsRWxlbWVudCwgJ2InKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlubmVyVGV4dCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogJycpLFxyXG4gICAgICAgICAgICAgICAgdHJpbVNwYWNlc0FuZE5ld0xpbmVzKChfZCA9IChfYyA9IHMoZGV0YWlsRWxlbWVudCwgJzpudGgtY2hpbGQoMiknKSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmlubmVyVGV4dCkgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogJycpLFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0pKTtcclxuICAgIH0pO1xyXG59XHJcbiIsImltcG9ydCB7IHVuaXF1ZUJ5IH0gZnJvbSAnLi91dGlscyc7XHJcbmNvbnN0IGNzdlZhbHVlUmVnZXggPSAvXCIvZztcclxuZnVuY3Rpb24gZXNjYXBlQ3N2VmFsdWUodmFsdWUpIHtcclxuICAgIGlmICh2YWx1ZS5pbmNsdWRlcyhcIixcIikgfHwgdmFsdWUuaW5jbHVkZXMoJ1wiJykpIHtcclxuICAgICAgICByZXR1cm4gYFwiJHt2YWx1ZS5yZXBsYWNlKGNzdlZhbHVlUmVnZXgsICdcXFxcXCInKX1cImA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZm9ybWF0Q3N2Um93KHN0cmluZ3MpIHtcclxuICAgIHJldHVybiBzdHJpbmdzLm1hcChzdHIgPT4gYCR7ZXNjYXBlQ3N2VmFsdWUoc3RyKX1gKS5qb2luKFwiO1wiKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcmVjb3Jkc1RvQ3N2KHJlY29yZHMpIHtcclxuICAgIGNvbnN0IGtleXMgPSB1bmlxdWVCeShyZWNvcmRzLmZsYXRNYXAoaXQgPT4gT2JqZWN0LmtleXMoaXQpKSk7XHJcbiAgICBjb25zdCB0aXRsZVJvdyA9IGZvcm1hdENzdlJvdyhrZXlzKTtcclxuICAgIGNvbnN0IHJlY29yZFJvd3MgPSByZWNvcmRzLm1hcChyZWNvcmQgPT4ge1xyXG4gICAgICAgIHJldHVybiBmb3JtYXRDc3ZSb3coa2V5cy5tYXAoa2V5ID0+IHsgdmFyIF9hOyByZXR1cm4gKF9hID0gcmVjb3JkW2tleV0pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICcnOyB9KSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBbdGl0bGVSb3csIC4uLnJlY29yZFJvd3NdLmpvaW4oJ1xcbicpO1xyXG59XHJcbiIsImltcG9ydCB7IHMgfSBmcm9tICcuL3V0aWxzJztcclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlc3VsdERpc3BsYXkoY29udGVudCkge1xyXG4gICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcclxuICAgIGJveC5zdHlsZS5jc3NUZXh0ID0gYFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICAgICAgICAgIGluc2V0OiA1cmVtO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAxcmVtO1xyXG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxcmVtO1xyXG4gICAgICAgICAgICBib3JkZXI6IDJweCBzb2xpZCBibHVlO1xyXG4gICAgICAgIGA7XHJcbiAgICBib3gudmFsdWUgPSBjb250ZW50O1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChib3gpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRPckNyZWF0ZUJ1dHRvbkNvbnRhaW5lcigpIHtcclxuICAgIGNvbnN0IGV4aXN0aW5nID0gcyhkb2N1bWVudCwgJy5leHBvcnQtYnV0dG9uLWNvbnRhaW5lcicpO1xyXG4gICAgaWYgKGV4aXN0aW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nO1xyXG4gICAgfVxyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZXhwb3J0LWJ1dHRvbi1jb250YWluZXInKTtcclxuICAgIGNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gYFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICAgICAgICAgIHRvcDogMXJlbTtcclxuICAgICAgICAgICAgbGVmdDogMXJlbTtcclxuICAgICAgICBgO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQnV0dG9uKHRleHQsIGFjdGlvbikge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZ2V0T3JDcmVhdGVCdXR0b25Db250YWluZXIoKTtcclxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgYnV0dG9uLnN0eWxlLmNzc1RleHQgPSBgXHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDFyZW07XHJcbiAgICAgICAgICAgIG1hcmdpbjogMC41cmVtO1xyXG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxcmVtO1xyXG4gICAgICAgICAgICBib3JkZXI6IDJweCBzb2xpZCBibHVlO1xyXG4gICAgICAgIGA7XHJcbiAgICBidXR0b24uaW5uZXJUZXh0ID0gdGV4dDtcclxuICAgIGJ1dHRvbi5vbmNsaWNrID0gYWN0aW9uO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIHN0b3JhZ2VHZXQoa2V5KSB7XHJcbiAgICBjb25zdCB0ZXh0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgIGlmICh0ZXh0KSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGV4dCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzdG9yYWdlU2V0KGtleSwgdmFsdWUpIHtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XHJcbiAgICB9XHJcbn1cclxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5pbXBvcnQgeyBzLCBzQWxsLCBzY3JvbGxUb0JvdHRvbSwgd2FpdCB9IGZyb20gJy4vdXRpbHMnO1xyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VNYWluTGlzdCgpIHtcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgc0FsbChkb2N1bWVudCwgJ2Zvb3RlciwgLnp1bGV0enQtYW5nZXNlaGVuLXVuZC1tZWhyJykuZm9yRWFjaChpdCA9PiB7XHJcbiAgICAgICAgICAgIHZhciBfYTtcclxuICAgICAgICAgICAgKF9hID0gaXQgPT09IG51bGwgfHwgaXQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGl0LnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmVDaGlsZChpdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgbG9hZE1vcmVCdXR0b24gPSBzKGRvY3VtZW50LCAnYnV0dG9uW2ludGVyYWN0aW9uPVwiZWludHJhZWdlLW5hY2hsYWRlblwiXScpO1xyXG4gICAgICAgIGNvbnN0IHN0YXR1c1RleHRFbGVtZW50ID0gcyhkb2N1bWVudCwgJ3AuZXJnZWJuaXNhbnplaWdlJyk7XHJcbiAgICAgICAgbGV0IGFscmVhZHlMb2FkZWQgPSAwO1xyXG4gICAgICAgIGxldCB0b3RhbCA9IE51bWJlci5NQVhfVkFMVUU7XHJcbiAgICAgICAgd2hpbGUgKGFscmVhZHlMb2FkZWQgPCB0b3RhbCkge1xyXG4gICAgICAgICAgICBjb25zdCBbYWxyZWFkeUxvYWRlZFN0ciwgXywgdG90YWxTdHIsIC4uLl9fXSA9IHN0YXR1c1RleHRFbGVtZW50LmlubmVyVGV4dC5zcGxpdCgnICcpO1xyXG4gICAgICAgICAgICBhbHJlYWR5TG9hZGVkID0gcGFyc2VJbnQoYWxyZWFkeUxvYWRlZFN0cik7XHJcbiAgICAgICAgICAgIHRvdGFsID0gcGFyc2VJbnQodG90YWxTdHIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh7IGFscmVhZHlMb2FkZWQsIHRvdGFsIH0pO1xyXG4gICAgICAgICAgICB5aWVsZCB3YWl0KDEwMCk7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvQm90dG9tKCk7XHJcbiAgICAgICAgICAgIGlmIChsb2FkTW9yZUJ1dHRvbi5kYXRhc2V0LnN0YXR1cyA9PT0gJ3NpY2h0YmFyJykge1xyXG4gICAgICAgICAgICAgICAgbG9hZE1vcmVCdXR0b24uY2xpY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsaXN0SXRlbXMgPSBzQWxsKGRvY3VtZW50LCAnLm1lcmt6ZXR0ZWwtZWludHJhZycpO1xyXG4gICAgICAgIHJldHVybiBsaXN0SXRlbXMubWFwKGxpc3RJdGVtID0+IHtcclxuICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaDtcclxuICAgICAgICAgICAgY29uc3QgaWQgPSBsaXN0SXRlbS5nZXRBdHRyaWJ1dGUoJ3Byb2R1Y3QtaWQnKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gKF9iID0gKF9hID0gcyhsaXN0SXRlbSwgJy5hcnRpa2VsZGV0YWlscyBoMicpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaW5uZXJUZXh0KSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAnJztcclxuICAgICAgICAgICAgY29uc3QgYXV0aG9yID0gKF9kID0gKF9jID0gcyhsaXN0SXRlbSwgJy5hcnRpa2VsZGV0YWlscyBwOm50aC1jaGlsZCgyKScpKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuaW5uZXJUZXh0KSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiAnJztcclxuICAgICAgICAgICAgY29uc3QgbGluayA9IChfZiA9IChfZSA9IHMobGlzdEl0ZW0sICdhJykpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5ocmVmKSAhPT0gbnVsbCAmJiBfZiAhPT0gdm9pZCAwID8gX2YgOiAnJztcclxuICAgICAgICAgICAgY29uc3QgcHJpY2UgPSAoKF9oID0gKF9nID0gcyhsaXN0SXRlbSwgJy5wcmVpcycpKSA9PT0gbnVsbCB8fCBfZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2cuaW5uZXJUZXh0KSA9PT0gbnVsbCB8fCBfaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2guc3BsaXQoJ+KCrCcpWzBdKSArICfigqwnO1xyXG4gICAgICAgICAgICByZXR1cm4geyBpZCwgbmFtZSwgYXV0aG9yLCBwcmljZSwgbGluayB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIHMocGFyZW50LCBzZWxlY3Rvcikge1xyXG4gICAgcmV0dXJuIHBhcmVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc0FsbChwYXJlbnQsIHNlbGVjdG9yKSB7XHJcbiAgICByZXR1cm4gWy4uLnBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKV07XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHdhaXQobXMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzY3JvbGxUb0JvdHRvbSgpIHtcclxuICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgdG9wOiBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCxcclxuICAgICAgICBiZWhhdmlvcjogJ2luc3RhbnQnLFxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHRyaW1TcGFjZXNBbmROZXdMaW5lcyhzdHIpIHtcclxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB1bmlxdWVCeShhcnJheSwgZ2V0dGVyID0gaXQgPT4gaXQpIHtcclxuICAgIGNvbnN0IHNlZW4gPSBuZXcgU2V0KCk7XHJcbiAgICBjb25zdCBhcnJheVdpdGhvdXREdXBsaWNhdGVzID0gW107XHJcbiAgICBhcnJheS5mb3JFYWNoKGl0ID0+IHtcclxuICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IGdldHRlcihpdCk7XHJcbiAgICAgICAgaWYgKCFzZWVuLmhhcyhwcm9wZXJ0eSkpIHtcclxuICAgICAgICAgICAgc2Vlbi5hZGQocHJvcGVydHkpO1xyXG4gICAgICAgICAgICBhcnJheVdpdGhvdXREdXBsaWNhdGVzLnB1c2goaXQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGFycmF5V2l0aG91dER1cGxpY2F0ZXM7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRvd25sb2FkVGV4dEZpbGUoZmlsZU5hbWUsIGNvbnRlbnQpIHtcclxuICAgIHZhciBkYXRhU3RyID0gXCJkYXRhOnRleHQvanNvbjtjaGFyc2V0PXV0Zi04LFwiICsgZW5jb2RlVVJJQ29tcG9uZW50KGNvbnRlbnQpO1xyXG4gICAgdmFyIGRvd25sb2FkQW5jaG9yTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgIGRvd25sb2FkQW5jaG9yTm9kZS5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIGRhdGFTdHIpO1xyXG4gICAgZG93bmxvYWRBbmNob3JOb2RlLnNldEF0dHJpYnV0ZShcImRvd25sb2FkXCIsIGZpbGVOYW1lKTtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG93bmxvYWRBbmNob3JOb2RlKTsgLy8gcmVxdWlyZWQgZm9yIGZpcmVmb3hcclxuICAgIGRvd25sb2FkQW5jaG9yTm9kZS5jbGljaygpO1xyXG4gICAgZG93bmxvYWRBbmNob3JOb2RlLnJlbW92ZSgpO1xyXG59XHJcbiIsImltcG9ydCB7IHN0b3JhZ2VHZXQgfSBmcm9tICcuL2xvY2FsLXN0b3JhZ2UnO1xyXG5leHBvcnQgZnVuY3Rpb24gdmlzaXROZXh0Qm9vaygpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGNvbnN0IG5vdFNjYW5uZWRJZHMgPSAoX2EgPSBzdG9yYWdlR2V0KCdub3RTY2FubmVkSWRzJykpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFtdO1xyXG4gICAgY29uc3QgbmV4dElkID0gbm90U2Nhbm5lZElkc1swXTtcclxuICAgIGlmIChuZXh0SWQpIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdodHRwczovL3d3dy50aGFsaWEuYXQvc2hvcC9ob21lL2FydGlrZWxkZXRhaWxzLycgKyBuZXh0SWQ7XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbmltcG9ydCB7IHBhcnNlTWFpbkxpc3QgfSBmcm9tICcuL21haW4tbGlzdC1wYXJzZXInO1xyXG5pbXBvcnQgeyBzdG9yYWdlR2V0LCBzdG9yYWdlU2V0IH0gZnJvbSAnLi9sb2NhbC1zdG9yYWdlJztcclxuaW1wb3J0IHsgcGFyc2VCb29rRGV0YWlscyB9IGZyb20gJy4vYm9vay1kZXRhaWwtcGFyc2VyJztcclxuaW1wb3J0IHsgdmlzaXROZXh0Qm9vayB9IGZyb20gJy4vdmlzaXQtbmV4dC1ib29rJztcclxuaW1wb3J0IHsgY3JlYXRlQnV0dG9uLCBjcmVhdGVSZXN1bHREaXNwbGF5IH0gZnJvbSAnLi9lbGVtZW50cyc7XHJcbmltcG9ydCB7IHJlY29yZHNUb0NzdiB9IGZyb20gJy4vY3N2LWZvcm1hdHRlcic7XHJcbmltcG9ydCB7IGRvd25sb2FkVGV4dEZpbGUgfSBmcm9tICcuL3V0aWxzJztcclxuZnVuY3Rpb24gbWFpbigpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRVcmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuICAgICAgICBpZiAoY3VycmVudFVybC5pbmNsdWRlcygnL21lcmtsaXN0ZS8nKSkge1xyXG4gICAgICAgICAgICAvLyAtLSBNQUlOIExJU1QgUEFHRSAtLSBidXR0b24gdG8gcGFyc2VcclxuICAgICAgICAgICAgY3JlYXRlQnV0dG9uKCdFeHBvcnQnLCAoZXYpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0ID0geWllbGQgcGFyc2VNYWluTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWFwID0gT2JqZWN0LmZyb21FbnRyaWVzKGxpc3QubWFwKGl0ID0+IFtpdC5pZCwgaXRdKSk7XHJcbiAgICAgICAgICAgICAgICBzdG9yYWdlU2V0KCdvdmVydmlld3MnLCBtYXApO1xyXG4gICAgICAgICAgICAgICAgc3RvcmFnZVNldCgnbm90U2Nhbm5lZElkcycsIGxpc3QuZmlsdGVyKGl0ID0+IGl0LmxpbmsgIT09IFwiXCIpLm1hcChpdCA9PiBpdC5pZCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobGlzdCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobGlzdCk7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZVNjYW4oKTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50VXJsLmluY2x1ZGVzKCcvYXJ0aWtlbGRldGFpbHMvJykpIHtcclxuICAgICAgICAgICAgY29uc3QgdXJsU3BsaXQgPSBjdXJyZW50VXJsLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJvb2tJZCA9IHVybFNwbGl0W3VybFNwbGl0Lmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhib29rSWQpO1xyXG4gICAgICAgICAgICBjb25zdCBub3RTY2FubmVkSWRzID0gbmV3IFNldChzdG9yYWdlR2V0KCdub3RTY2FubmVkSWRzJykpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhub3RTY2FubmVkSWRzKTtcclxuICAgICAgICAgICAgaWYgKG5vdFNjYW5uZWRJZHMgJiYgbm90U2Nhbm5lZElkcy5oYXMoYm9va0lkKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1NjYW5uaW5nIGJvb2sgZGV0YWlscycpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYm9va0RldGFpbHMgPSB5aWVsZCBwYXJzZUJvb2tEZXRhaWxzKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhbGxCb29rRGV0YWlscyA9IChfYSA9IHN0b3JhZ2VHZXQoXCJkZXRhaWxzXCIpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB7fTtcclxuICAgICAgICAgICAgICAgIGFsbEJvb2tEZXRhaWxzW2Jvb2tJZF0gPSBib29rRGV0YWlscztcclxuICAgICAgICAgICAgICAgIHN0b3JhZ2VTZXQoJ2RldGFpbHMnLCBhbGxCb29rRGV0YWlscyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhbGxCb29rRGV0YWlscyk7XHJcbiAgICAgICAgICAgICAgICBub3RTY2FubmVkSWRzLmRlbGV0ZShib29rSWQpO1xyXG4gICAgICAgICAgICAgICAgc3RvcmFnZVNldCgnbm90U2Nhbm5lZElkcycsIEFycmF5LmZyb20obm90U2Nhbm5lZElkcykpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWVTY2FuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFVybCA9PT0gXCJodHRwczovL3d3dy50aGFsaWEuYXQvXCIpIHtcclxuICAgICAgICAgICAgLy8gdGhhbGlhIHJlZGlyZWN0ZWQgdG8gc3RhcnQgcGFnZSwgc2luY2UgYm9vayBub3QgYXZhaWxhYmxlIGFueW1vcmUuXHJcbiAgICAgICAgICAgIGNvbnN0IFtfLCAuLi5ub3RTY2FubmVkSWRzXSA9IChfYiA9IHN0b3JhZ2VHZXQoJ25vdFNjYW5uZWRJZHMnKSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogWycnXTtcclxuICAgICAgICAgICAgc3RvcmFnZVNldCgnbm90U2Nhbm5lZElkcycsIG5vdFNjYW5uZWRJZHMpO1xyXG4gICAgICAgICAgICBjb250aW51ZVNjYW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBjb250aW51ZVNjYW4oKSB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYztcclxuICAgIGNvbnN0IG5vdFNjYW5uZWRJZHMgPSAoX2EgPSBzdG9yYWdlR2V0KCdub3RTY2FubmVkSWRzJykpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFtdO1xyXG4gICAgY29uc3QgYWxsQm9va0RldGFpbHMgPSAoX2IgPSBzdG9yYWdlR2V0KCdkZXRhaWxzJykpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IHt9O1xyXG4gICAgaWYgKG5vdFNjYW5uZWRJZHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgY29uc3QgYm9va092ZXJ2aWV3cyA9IChfYyA9IHN0b3JhZ2VHZXQoJ292ZXJ2aWV3cycpKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiB7fTtcclxuICAgICAgICBjb25zdCBib29rQWxsRGF0YSA9IE9iamVjdC5lbnRyaWVzKGJvb2tPdmVydmlld3MpLm1hcCgoW2Jvb2tJZCwgYm9va092ZXJ2aWV3XSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGJvb2tPdmVydmlldyksICgoX2EgPSBhbGxCb29rRGV0YWlsc1tib29rSWRdKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB7fSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGJvb2tBbGxEYXRhKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYm9va0FsbERhdGEpO1xyXG4gICAgICAgIGNyZWF0ZVJlc3VsdERpc3BsYXkoSlNPTi5zdHJpbmdpZnkoYm9va0FsbERhdGEsIG51bGwsIDIpKTtcclxuICAgICAgICAvLyBjcmVhdGVSZXN1bHREaXNwbGF5KHJlY29yZHNUb0Nzdihib29rQWxsRGF0YSkpO1xyXG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcbiAgICAgICAgY3JlYXRlQnV0dG9uKCdEb3dubG9hZCBhcyBDU1YnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGRvd25sb2FkVGV4dEZpbGUoYGJvb2stbGlzdGVyZXItZXhwb3J0LSR7ZGF0ZX0uY3N2YCwgcmVjb3Jkc1RvQ3N2KGJvb2tBbGxEYXRhKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY3JlYXRlQnV0dG9uKCdEb3dubG9hZCBhcyBKU09OJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBkb3dubG9hZFRleHRGaWxlKGBib29rLWxpc3RlcmVyLWV4cG9ydC0ke2RhdGV9Lmpzb25gLCBKU09OLnN0cmluZ2lmeShib29rQWxsRGF0YSwgbnVsbCwgMikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY3JlYXRlUmVzdWx0RGlzcGxheShgJHtub3RTY2FubmVkSWRzLmxlbmd0aH0gYm9va3MgcmVtYWluaW5nYCk7XHJcbiAgICAgICAgdmlzaXROZXh0Qm9vaygpO1xyXG4gICAgfVxyXG59XHJcbm1haW4oKS5jYXRjaChlID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGUpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9