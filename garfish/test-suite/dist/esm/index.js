var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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

// src/mock.ts
import fs from "fs";
import path from "path";
import "isomorphic-fetch";
import fetchMock from "jest-fetch-mock";
import { isAbsolute } from "@garfish/utils";
function mockStaticServer({
  baseDir,
  filterKeywords,
  customerHeaders = {},
  timeConsuming
}) {
  const match = (input) => {
    return Array.isArray(filterKeywords) ? !filterKeywords.some((words) => input.url.includes(words)) : true;
  };
  fetchMock.enableMocks();
  fetchMock.doMock();
  fetchMock.mockIf(match, (req) => {
    let pathname = req.url;
    if (isAbsolute(req.url)) {
      pathname = new URL(req.url).pathname;
    }
    const fullDir = path.resolve(baseDir, `./${pathname}`);
    const { ext } = path.parse(fullDir);
    const mimeType = ext === ".html" ? "text/html" : ext === ".js" ? "text/javascript" : ext === ".css" ? "text/css" : "text/plain";
    return new Promise((resolve) => {
      const res = {
        url: req.url,
        body: fs.readFileSync(fullDir, "utf-8"),
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
export {
  mockStaticServer
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL21vY2sudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAnaXNvbW9ycGhpYy1mZXRjaCc7XG5pbXBvcnQgZmV0Y2hNb2NrIGZyb20gJ2plc3QtZmV0Y2gtbW9jayc7XG5pbXBvcnQgeyBpc0Fic29sdXRlIH0gZnJvbSAnQGdhcmZpc2gvdXRpbHMnO1xuXG4vLyBVbml0IHRlc3Qgc2VydmVyXG5leHBvcnQgZnVuY3Rpb24gbW9ja1N0YXRpY1NlcnZlcih7XG4gIGJhc2VEaXIsXG4gIGZpbHRlcktleXdvcmRzLFxuICBjdXN0b21lckhlYWRlcnMgPSB7fSxcbiAgdGltZUNvbnN1bWluZyxcbn06IHtcbiAgYmFzZURpcjogc3RyaW5nO1xuICB0aW1lQ29uc3VtaW5nPzogbnVtYmVyO1xuICBmaWx0ZXJLZXl3b3Jkcz86IEFycmF5PHN0cmluZz47XG4gIGN1c3RvbWVySGVhZGVycz86IFJlY29yZDxzdHJpbmcsIFJlY29yZDxzdHJpbmcsIGFueT4+O1xufSkge1xuICBjb25zdCBtYXRjaCA9IChpbnB1dDogUmVxdWVzdCkgPT4ge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KGZpbHRlcktleXdvcmRzKVxuICAgICAgPyAhZmlsdGVyS2V5d29yZHMuc29tZSgod29yZHMpID0+IGlucHV0LnVybC5pbmNsdWRlcyh3b3JkcykpXG4gICAgICA6IHRydWU7XG4gIH07XG5cbiAgZmV0Y2hNb2NrLmVuYWJsZU1vY2tzKCk7XG4gIGZldGNoTW9jay5kb01vY2soKTtcblxuICBmZXRjaE1vY2subW9ja0lmKG1hdGNoLCAocmVxKSA9PiB7XG4gICAgbGV0IHBhdGhuYW1lID0gcmVxLnVybDtcbiAgICBpZiAoaXNBYnNvbHV0ZShyZXEudXJsKSkge1xuICAgICAgcGF0aG5hbWUgPSBuZXcgVVJMKHJlcS51cmwpLnBhdGhuYW1lO1xuICAgIH1cbiAgICBjb25zdCBmdWxsRGlyID0gcGF0aC5yZXNvbHZlKGJhc2VEaXIsIGAuLyR7cGF0aG5hbWV9YCk7XG4gICAgY29uc3QgeyBleHQgfSA9IHBhdGgucGFyc2UoZnVsbERpcik7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3QgbWltZVR5cGUgPVxuICAgICAgZXh0ID09PSAnLmh0bWwnXG4gICAgICAgID8gJ3RleHQvaHRtbCdcbiAgICAgICAgOiBleHQgPT09ICcuanMnXG4gICAgICAgICAgPyAndGV4dC9qYXZhc2NyaXB0J1xuICAgICAgICAgIDogZXh0ID09PSAnLmNzcydcbiAgICAgICAgICAgID8gJ3RleHQvY3NzJ1xuICAgICAgICAgICAgOiAndGV4dC9wbGFpbic7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGNvbnN0IHJlcyA9IHtcbiAgICAgICAgdXJsOiByZXEudXJsLFxuICAgICAgICBib2R5OiBmcy5yZWFkRmlsZVN5bmMoZnVsbERpciwgJ3V0Zi04JyksXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogbWltZVR5cGUsXG4gICAgICAgICAgLi4uKGN1c3RvbWVySGVhZGVyc1twYXRobmFtZV0gfHwge30pLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGlmICh0aW1lQ29uc3VtaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZShyZXMpLCB0aW1lQ29uc3VtaW5nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR08sMEJBQTBCO0FBQUEsRUFDL0I7QUFBQSxFQUNBO0FBQUEsRUFDQSxrQkFBa0I7QUFBQSxFQUNsQjtBQUFBLEdBTUM7QUFDRCxRQUFNLFFBQVEsQ0FBQyxVQUFtQjtBQUNoQyxXQUFPLE1BQU0sUUFBUSxrQkFDakIsQ0FBQyxlQUFlLEtBQUssQ0FBQyxVQUFVLE1BQU0sSUFBSSxTQUFTLFVBQ25EO0FBQUE7QUFHTixZQUFVO0FBQ1YsWUFBVTtBQUVWLFlBQVUsT0FBTyxPQUFPLENBQUMsUUFBUTtBQUMvQixRQUFJLFdBQVcsSUFBSTtBQUNuQixRQUFJLFdBQVcsSUFBSSxNQUFNO0FBQ3ZCLGlCQUFXLElBQUksSUFBSSxJQUFJLEtBQUs7QUFBQTtBQUU5QixVQUFNLFVBQVUsS0FBSyxRQUFRLFNBQVMsS0FBSztBQUMzQyxVQUFNLEVBQUUsUUFBUSxLQUFLLE1BQU07QUFFM0IsVUFBTSxXQUNKLFFBQVEsVUFDSixjQUNBLFFBQVEsUUFDTixvQkFDQSxRQUFRLFNBQ04sYUFDQTtBQUVWLFdBQU8sSUFBSSxRQUFRLENBQUMsWUFBWTtBQUM5QixZQUFNLE1BQU07QUFBQSxRQUNWLEtBQUssSUFBSTtBQUFBLFFBQ1QsTUFBTSxHQUFHLGFBQWEsU0FBUztBQUFBLFFBQy9CLFNBQVM7QUFBQSxVQUNQLGdCQUFnQjtBQUFBLFdBQ1osZ0JBQWdCLGFBQWE7QUFBQTtBQUdyQyxVQUFJLGVBQWU7QUFDakIsbUJBQVcsTUFBTSxRQUFRLE1BQU07QUFBQSxhQUMxQjtBQUNMLGdCQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7IiwKICAibmFtZXMiOiBbXQp9Cg==
