var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  mockStaticServer: () => mockStaticServer
});

// src/mock.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_isomorphic_fetch = require("isomorphic-fetch");
var import_jest_fetch_mock = __toESM(require("jest-fetch-mock"));
var import_utils = require("@garfish/utils");
function mockStaticServer({
  baseDir,
  filterKeywords,
  customerHeaders = {},
  timeConsuming
}) {
  const match = (input) => {
    return Array.isArray(filterKeywords) ? !filterKeywords.some((words) => input.url.includes(words)) : true;
  };
  import_jest_fetch_mock.default.enableMocks();
  import_jest_fetch_mock.default.doMock();
  import_jest_fetch_mock.default.mockIf(match, (req) => {
    let pathname = req.url;
    if ((0, import_utils.isAbsolute)(req.url)) {
      pathname = new URL(req.url).pathname;
    }
    const fullDir = import_path.default.resolve(baseDir, `./${pathname}`);
    const { ext } = import_path.default.parse(fullDir);
    const mimeType = ext === ".html" ? "text/html" : ext === ".js" ? "text/javascript" : ext === ".css" ? "text/css" : "text/plain";
    return new Promise((resolve) => {
      const res = {
        url: req.url,
        body: import_fs.default.readFileSync(fullDir, "utf-8"),
        headers: __spreadValues({
          "Content-Type": mimeType
        }, customerHeaders[pathname] || {})
      };
      if (timeConsuming) {
        setTimeout(() => resolve(res), timeConsuming);
      } else {
        resolve(res);
      }
    });
  });
}
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mockStaticServer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9tb2NrLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgKiBmcm9tICcuL21vY2snO1xuIiwgImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAnaXNvbW9ycGhpYy1mZXRjaCc7XG5pbXBvcnQgZmV0Y2hNb2NrIGZyb20gJ2plc3QtZmV0Y2gtbW9jayc7XG5pbXBvcnQgeyBpc0Fic29sdXRlIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuXG4vLyBVbml0IHRlc3Qgc2VydmVyXG5leHBvcnQgZnVuY3Rpb24gbW9ja1N0YXRpY1NlcnZlcih7XG4gIGJhc2VEaXIsXG4gIGZpbHRlcktleXdvcmRzLFxuICBjdXN0b21lckhlYWRlcnMgPSB7fSxcbiAgdGltZUNvbnN1bWluZyxcbn06IHtcbiAgYmFzZURpcjogc3RyaW5nO1xuICB0aW1lQ29uc3VtaW5nPzogbnVtYmVyO1xuICBmaWx0ZXJLZXl3b3Jkcz86IEFycmF5PHN0cmluZz47XG4gIGN1c3RvbWVySGVhZGVycz86IFJlY29yZDxzdHJpbmcsIFJlY29yZDxzdHJpbmcsIGFueT4+O1xufSkge1xuICBjb25zdCBtYXRjaCA9IChpbnB1dDogUmVxdWVzdCkgPT4ge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KGZpbHRlcktleXdvcmRzKVxuICAgICAgPyAhZmlsdGVyS2V5d29yZHMuc29tZSgod29yZHMpID0+IGlucHV0LnVybC5pbmNsdWRlcyh3b3JkcykpXG4gICAgICA6IHRydWU7XG4gIH07XG5cbiAgZmV0Y2hNb2NrLmVuYWJsZU1vY2tzKCk7XG4gIGZldGNoTW9jay5kb01vY2soKTtcblxuICBmZXRjaE1vY2subW9ja0lmKG1hdGNoLCAocmVxKSA9PiB7XG4gICAgbGV0IHBhdGhuYW1lID0gcmVxLnVybDtcbiAgICBpZiAoaXNBYnNvbHV0ZShyZXEudXJsKSkge1xuICAgICAgcGF0aG5hbWUgPSBuZXcgVVJMKHJlcS51cmwpLnBhdGhuYW1lO1xuICAgIH1cbiAgICBjb25zdCBmdWxsRGlyID0gcGF0aC5yZXNvbHZlKGJhc2VEaXIsIGAuLyR7cGF0aG5hbWV9YCk7XG4gICAgY29uc3QgeyBleHQgfSA9IHBhdGgucGFyc2UoZnVsbERpcik7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3QgbWltZVR5cGUgPVxuICAgICAgZXh0ID09PSAnLmh0bWwnXG4gICAgICAgID8gJ3RleHQvaHRtbCdcbiAgICAgICAgOiBleHQgPT09ICcuanMnXG4gICAgICAgICAgPyAndGV4dC9qYXZhc2NyaXB0J1xuICAgICAgICAgIDogZXh0ID09PSAnLmNzcydcbiAgICAgICAgICAgID8gJ3RleHQvY3NzJ1xuICAgICAgICAgICAgOiAndGV4dC9wbGFpbic7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGNvbnN0IHJlcyA9IHtcbiAgICAgICAgdXJsOiByZXEudXJsLFxuICAgICAgICBib2R5OiBmcy5yZWFkRmlsZVN5bmMoZnVsbERpciwgJ3V0Zi04JyksXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogbWltZVR5cGUsXG4gICAgICAgICAgLi4uKGN1c3RvbWVySGVhZGVyc1twYXRobmFtZV0gfHwge30pLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGlmICh0aW1lQ29uc3VtaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZShyZXMpLCB0aW1lQ29uc3VtaW5nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0FBLGdCQUFlO0FBQ2Ysa0JBQWlCO0FBQ2pCLDhCQUFPO0FBQ1AsNkJBQXNCO0FBQ3RCLG1CQUEyQjtBQUdwQiwwQkFBMEI7QUFBQSxFQUMvQjtBQUFBLEVBQ0E7QUFBQSxFQUNBLGtCQUFrQjtBQUFBLEVBQ2xCO0FBQUEsR0FNQztBQUNELFFBQU0sUUFBUSxDQUFDLFVBQW1CO0FBQ2hDLFdBQU8sTUFBTSxRQUFRLGtCQUNqQixDQUFDLGVBQWUsS0FBSyxDQUFDLFVBQVUsTUFBTSxJQUFJLFNBQVMsVUFDbkQ7QUFBQTtBQUdOLGlDQUFVO0FBQ1YsaUNBQVU7QUFFVixpQ0FBVSxPQUFPLE9BQU8sQ0FBQyxRQUFRO0FBQy9CLFFBQUksV0FBVyxJQUFJO0FBQ25CLFFBQUksNkJBQVcsSUFBSSxNQUFNO0FBQ3ZCLGlCQUFXLElBQUksSUFBSSxJQUFJLEtBQUs7QUFBQTtBQUU5QixVQUFNLFVBQVUsb0JBQUssUUFBUSxTQUFTLEtBQUs7QUFDM0MsVUFBTSxFQUFFLFFBQVEsb0JBQUssTUFBTTtBQUUzQixVQUFNLFdBQ0osUUFBUSxVQUNKLGNBQ0EsUUFBUSxRQUNOLG9CQUNBLFFBQVEsU0FDTixhQUNBO0FBRVYsV0FBTyxJQUFJLFFBQVEsQ0FBQyxZQUFZO0FBQzlCLFlBQU0sTUFBTTtBQUFBLFFBQ1YsS0FBSyxJQUFJO0FBQUEsUUFDVCxNQUFNLGtCQUFHLGFBQWEsU0FBUztBQUFBLFFBQy9CLFNBQVM7QUFBQSxVQUNQLGdCQUFnQjtBQUFBLFdBQ1osZ0JBQWdCLGFBQWE7QUFBQTtBQUdyQyxVQUFJLGVBQWU7QUFDakIsbUJBQVcsTUFBTSxRQUFRLE1BQU07QUFBQSxhQUMxQjtBQUNMLGdCQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7IiwKICAibmFtZXMiOiBbXQp9Cg==
