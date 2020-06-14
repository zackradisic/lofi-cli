"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _ytdlCore = _interopRequireDefault(require("ytdl-core"));

var _fluentFfmpeg = _interopRequireDefault(require("fluent-ffmpeg"));

var _jimp = _interopRequireDefault(require("jimp"));

var _tesseract = require("tesseract.js");

var _util = require("util");

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var stats = (0, _util.promisify)(_fs["default"].stat);

var detectSong = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var videoPath, imgPath, croppedPath;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            videoPath = getFilePath('video', 'mp4');
            imgPath = getFilePath('img', 'png');
            croppedPath = getFilePath('cropped', 'png');
            _context.prev = 3;
            _context.next = 6;
            return getVideo(videoPath);

          case 6:
            _context.next = 8;
            return createThumbnail(videoPath, imgPath);

          case 8:
            _context.next = 10;
            return prepareThumbnail(imgPath);

          case 10:
            _context.next = 12;
            return recognizeText(croppedPath);

          case 12:
            return _context.abrupt("return", _context.sent);

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](3);
            console.log(_context.t0);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 15]]);
  }));

  return function detectSong() {
    return _ref.apply(this, arguments);
  };
}();

var recognizeText = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(imgPath) {
    var worker, _yield$worker$recogni, text;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            worker = (0, _tesseract.createWorker)({
              cacheMethod: 'refresh'
            });
            _context2.next = 3;
            return worker.load();

          case 3:
            _context2.next = 5;
            return worker.loadLanguage('eng');

          case 5:
            _context2.next = 7;
            return worker.initialize('eng');

          case 7:
            _context2.next = 9;
            return worker.recognize(imgPath);

          case 9:
            _yield$worker$recogni = _context2.sent;
            text = _yield$worker$recogni.data.text;
            _context2.next = 13;
            return worker.terminate();

          case 13:
            return _context2.abrupt("return", text);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function recognizeText(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var getVideo = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(videoPath) {
    var stream, maxRetries, retries, stat;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            stream = (0, _ytdlCore["default"])(_config.URL, {
              filter: function filter(format) {
                return format.container === 'mp4';
              }
            }).pipe(_fs["default"].createWriteStream(videoPath));
            maxRetries = 5;
            retries = 0;

          case 3:
            if (!true) {
              _context3.next = 16;
              break;
            }

            _context3.next = 6;
            return sleep(2000);

          case 6:
            _context3.next = 8;
            return stats(videoPath);

          case 8:
            stat = _context3.sent;

            if (!(stat.size / 1000000 >= 1)) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt("break", 16);

          case 11:
            retries++;

            if (!(retries >= maxRetries)) {
              _context3.next = 14;
              break;
            }

            throw new Error('Error reading video');

          case 14:
            _context3.next = 3;
            break;

          case 16:
            stream.close();
            return _context3.abrupt("return", new Promise(function (resolve, reject) {
              stream.on('close', resolve);
              stream.on('error', function (err) {
                return reject(err);
              });
            }));

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getVideo(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var prepareThumbnail = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(imgPath) {
    var img;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _jimp["default"].read(imgPath);

          case 2:
            img = _context4.sent;
            img.crop(0, 0, 1440, 78).color([{
              apply: 'greyscale',
              params: []
            }]).posterize(100).invert().write(getFilePath('cropped', 'png'));

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function prepareThumbnail(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

var createThumbnail = function createThumbnail(videoPath, imgPath) {
  var getThumbnail = (0, _fluentFfmpeg["default"])(videoPath);
  getThumbnail.addOutputOption('-vframes').addOutput('1').addOutput(imgPath);
  getThumbnail.run();
  return new Promise(function (resolve, reject) {
    getThumbnail.on('end', resolve);
    getThumbnail.on('err', function (err) {
      return reject(err);
    });
  });
};

var getFilePath = function getFilePath(name, ext) {
  return _path["default"].join(__dirname, '../', _config.DOWNLOADS_DIR_NAME, "".concat(name, ".").concat(ext));
};

var sleep = function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

var _default = detectSong;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZXRlY3Qtc29uZy5qcyJdLCJuYW1lcyI6WyJzdGF0cyIsImZzIiwic3RhdCIsImRldGVjdFNvbmciLCJ2aWRlb1BhdGgiLCJnZXRGaWxlUGF0aCIsImltZ1BhdGgiLCJjcm9wcGVkUGF0aCIsImdldFZpZGVvIiwiY3JlYXRlVGh1bWJuYWlsIiwicHJlcGFyZVRodW1ibmFpbCIsInJlY29nbml6ZVRleHQiLCJjb25zb2xlIiwibG9nIiwid29ya2VyIiwiY2FjaGVNZXRob2QiLCJsb2FkIiwibG9hZExhbmd1YWdlIiwiaW5pdGlhbGl6ZSIsInJlY29nbml6ZSIsInRleHQiLCJkYXRhIiwidGVybWluYXRlIiwic3RyZWFtIiwiVVJMIiwiZmlsdGVyIiwiZm9ybWF0IiwiY29udGFpbmVyIiwicGlwZSIsImNyZWF0ZVdyaXRlU3RyZWFtIiwibWF4UmV0cmllcyIsInJldHJpZXMiLCJzbGVlcCIsInNpemUiLCJFcnJvciIsImNsb3NlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvbiIsImVyciIsImppbXAiLCJyZWFkIiwiaW1nIiwiY3JvcCIsImNvbG9yIiwiYXBwbHkiLCJwYXJhbXMiLCJwb3N0ZXJpemUiLCJpbnZlcnQiLCJ3cml0ZSIsImdldFRodW1ibmFpbCIsImFkZE91dHB1dE9wdGlvbiIsImFkZE91dHB1dCIsInJ1biIsIm5hbWUiLCJleHQiLCJwYXRoIiwiam9pbiIsIl9fZGlybmFtZSIsIkRPV05MT0FEU19ESVJfTkFNRSIsIm1zIiwic2V0VGltZW91dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUVBOzs7Ozs7OztBQUVBLElBQU1BLEtBQUssR0FBRyxxQkFBVUMsZUFBR0MsSUFBYixDQUFkOztBQUVBLElBQU1DLFVBQVU7QUFBQSxxRUFBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDVEMsWUFBQUEsU0FEUyxHQUNHQyxXQUFXLENBQUMsT0FB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O0FBQ3BDYSxJQUFBQSxZQUFZLENBQUNaLEVBQWIsQ0FBZ0IsS0FBaEIsRUFBdUJGLE9BQXZCO0FBQ0FjLElBQUFBLFlBQVksQ0FBQ1osRUFBYixDQUFnQixLQUFoQixFQUF1QixVQUFBQyxHQUFHO0FBQUEsYUFBSUYsTUFBTSxDQUFDRSxHQUFELENBQVY7QUFBQSxLQUExQjtBQUNILEdBSE0sQ0FBUDtBQUlILENBZEQ7O0FBZ0JBLElBQU1uQyxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFDa0QsSUFBRCxFQUFPQyxHQUFQO0FBQUEsU0FBZUMsaUJBQUtDLElBQUwsQ0FBVUMsU0FBVixFQUFxQixLQUFyQixFQUE0QkMsMEJBQTVCLFlBQW1ETCxJQUFuRCxjQUEyREMsR0FBM0QsRUFBZjtBQUFBLENBQXBCOztBQUVBLElBQU14QixLQUFLLEdBQUcsU0FBUkEsS0FBUSxDQUFBNkIsRUFBRTtBQUFBLFNBQUksSUFBSXpCLE9BQUosQ0FBWSxVQUFBQyxPQUFPO0FBQUEsV0FBSXlCLFVBQVUsQ0FBQ3pCLE9BQUQsRUFBVXdCLEVBQVYsQ0FBZDtBQUFBLEdBQW5CLENBQUo7QUFBQSxDQUFoQjs7ZUFFZTFELFUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IHl0ZGwgZnJvbSAneXRkbC1jb3JlJ1xuaW1wb3J0IGZmbXBlZyBmcm9tICdmbHVlbnQtZmZtcGVnJ1xuaW1wb3J0IGppbXAgZnJvbSAnamltcCdcblxuaW1wb3J0IHsgY3JlYXRlV29ya2VyIH0gZnJvbSAndGVzc2VyYWN0LmpzJ1xuaW1wb3J0IHsgcHJvbWlzaWZ5IH0gZnJvbSAndXRpbCdcblxuaW1wb3J0IHsgRE9XTkxPQURTX0RJUl9OQU1FLCBVUkwgfSBmcm9tICcuL2NvbmZpZydcblxuY29uc3Qgc3RhdHMgPSBwcm9taXNpZnkoZnMuc3RhdClcblxuY29uc3QgZGV0ZWN0U29uZyA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCB2aWRlb1BhdGggPSBnZXRGaWxlUGF0aCgndmlkZW8nLCAnbXA0JylcbiAgICBjb25zdCBpbWdQYXRoID0gZ2V0RmlsZVBhdGgoJ2ltZycsICdwbmcnKVxuICAgIGNvbnN0IGNyb3BwZWRQYXRoID0gZ2V0RmlsZVBhdGgoJ2Nyb3BwZWQnLCAncG5nJylcblxuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGdldFZpZGVvKHZpZGVvUGF0aCkgLy8gU3RlcCAxLiBEb3dubG9hZCBhIHNuaXBwZXQgb2YgdGhlIHN0cmVhbVxuICAgICAgICBhd2FpdCBjcmVhdGVUaHVtYm5haWwodmlkZW9QYXRoLCBpbWdQYXRoKSAvLyBTdGVwIDIuIEdlbmVyYXRlIGEgcGljdHVyZSBvZiBhIGZyYW1lXG4gICAgICAgIGF3YWl0IHByZXBhcmVUaHVtYm5haWwoaW1nUGF0aCkgLy8gU3RlcCAzLiBQcmVwYXJlIHRodW1ibmFpbCBmb3IgdGV4dCByZWNvZ25pdGlvbjogZ3JleXNjYWxlLCBjcm9wLCBldGMuXG4gICAgICAgIHJldHVybiBhd2FpdCByZWNvZ25pemVUZXh0KGNyb3BwZWRQYXRoKVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgfVxufVxuXG5jb25zdCByZWNvZ25pemVUZXh0ID0gYXN5bmMgaW1nUGF0aCA9PiB7XG4gICAgY29uc3Qgd29ya2VyID0gY3JlYXRlV29ya2VyKHtcbiAgICAgICAgY2FjaGVNZXRob2Q6ICdyZWZyZXNoJ1xuICAgIH0pXG4gICAgYXdhaXQgd29ya2VyLmxvYWQoKVxuICAgIGF3YWl0IHdvcmtlci5sb2FkTGFuZ3VhZ2UoJ2VuZycpXG4gICAgYXdhaXQgd29ya2VyLmluaXRpYWxpemUoJ2VuZycpXG4gICAgY29uc3QgeyBkYXRhOiB7IHRleHQgfSB9ID0gYXdhaXQgd29ya2VyLnJlY29nbml6ZShpbWdQYXRoKVxuICAgIGF3YWl0IHdvcmtlci50ZXJtaW5hdGUoKVxuICAgIHJldHVybiB0ZXh0XG59XG5cbmNvbnN0IGdldFZpZGVvID0gYXN5bmMgdmlkZW9QYXRoID0+IHtcbiAgICBjb25zdCBzdHJlYW0gPSB5dGRsKFVSTCwgeyBmaWx0ZXI6IChmb3JtYXQpID0+IGZvcm1hdC5jb250YWluZXIgPT09ICdtcDQnIH0pLnBpcGUoZnMuY3JlYXRlV3JpdGVTdHJlYW0odmlkZW9QYXRoKSlcblxuICAgIGNvbnN0IG1heFJldHJpZXMgPSA1XG4gICAgbGV0IHJldHJpZXMgPSAwXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgYXdhaXQgc2xlZXAoMjAwMClcbiAgICAgICAgY29uc3Qgc3RhdCA9IGF3YWl0IHN0YXRzKHZpZGVvUGF0aClcbiAgICAgICAgaWYgKHN0YXQuc2l6ZSAvIDEwMDAwMDAgPj0gMSkgYnJlYWtcbiAgICAgICAgcmV0cmllcysrXG4gICAgICAgIGlmIChyZXRyaWVzID49IG1heFJldHJpZXMpIHRocm93IG5ldyBFcnJvcignRXJyb3IgcmVhZGluZyB2aWRlbycpXG4gICAgfVxuICAgIHN0cmVhbS5jbG9zZSgpXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgc3RyZWFtLm9uKCdjbG9zZScsIHJlc29sdmUpXG4gICAgICAgIHN0cmVhbS5vbignZXJyb3InLCBlcnIgPT4gcmVqZWN0KGVycikpXG4gICAgfSlcbn1cblxuY29uc3QgcHJlcGFyZVRodW1ibmFpbCA9IGFzeW5jIGltZ1BhdGggPT4ge1xuICAgIGNvbnN0IGltZyA9IGF3YWl0IGppbXAucmVhZChpbWdQYXRoKVxuICAgIGltZ1xuICAgICAgICAuY3JvcCgwLCAwLCAxNDQwLCA3OClcbiAgICAgICAgLmNvbG9yKFtcbiAgICAgICAgICAgIHsgYXBwbHk6ICdncmV5c2NhbGUnLCBwYXJhbXM6IFtdIH1cbiAgICAgICAgXSlcbiAgICAgICAgLnBvc3Rlcml6ZSgxMDApXG4gICAgICAgIC5pbnZlcnQoKVxuICAgICAgICAud3JpdGUoZ2V0RmlsZVBhdGgoJ2Nyb3BwZWQnLCAncG5nJykpXG59XG5cbmNvbnN0IGNyZWF0ZVRodW1ibmFpbCA9ICh2aWRlb1BhdGgsIGltZ1BhdGgpID0+IHtcbiAgICBjb25zdCBnZXRUaHVtYm5haWwgPSBmZm1wZWcodmlkZW9QYXRoKVxuXG4gICAgZ2V0VGh1bWJuYWlsXG4gICAgICAgIC5hZGRPdXRwdXRPcHRpb24oJy12ZnJhbWVzJylcbiAgICAgICAgLmFkZE91dHB1dCgnMScpXG4gICAgICAgIC5hZGRPdXRwdXQoaW1nUGF0aClcblxuICAgIGdldFRodW1ibmFpbC5ydW4oKVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZ2V0VGh1bWJuYWlsLm9uKCdlbmQnLCByZXNvbHZlKVxuICAgICAgICBnZXRUaHVtYm5haWwub24oJ2VycicsIGVyciA9PiByZWplY3QoZXJyKSlcbiAgICB9KVxufVxuXG5jb25zdCBnZXRGaWxlUGF0aCA9IChuYW1lLCBleHQpID0+IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi8nLCBET1dOTE9BRFNfRElSX05BTUUsIGAke25hbWV9LiR7ZXh0fWApXG5cbmNvbnN0IHNsZWVwID0gbXMgPT4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSlcblxuZXhwb3J0IGRlZmF1bHQgZGV0ZWN0U29uZ1xuIl19