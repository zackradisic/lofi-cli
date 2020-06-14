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
    var videoPath, imgPath, croppedPath, text;
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
            return cropThumbnail(imgPath);

          case 10:
            _context.next = 12;
            return recognizeText(croppedPath);

          case 12:
            text = _context.sent;
            console.log(text);
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](3);
            console.log(_context.t0);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 16]]);
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

var cropThumbnail = /*#__PURE__*/function () {
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
            img.crop(0, 0, 1440, 64).write(getFilePath('cropped', 'png'));

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function cropThumbnail(_x3) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZXRlY3Qtc29uZy5qcyJdLCJuYW1lcyI6WyJzdGF0cyIsImZzIiwic3RhdCIsImRldGVjdFNvbmciLCJ2aWRlb1BhdGgiLCJnZXRGaWxlUGF0aCIsImltZ1BhdGgiLCJjcm9wcGVkUGF0aCIsImdldFZpZGVvIiwiY3JlYXRlVGh1bWJuYWlsIiwiY3JvcFRodW1ibmFpbCIsInJlY29nbml6ZVRleHQiLCJ0ZXh0IiwiY29uc29sZSIsImxvZyIsIndvcmtlciIsImNhY2hlTWV0aG9kIiwibG9hZCIsImxvYWRMYW5ndWFnZSIsImluaXRpYWxpemUiLCJyZWNvZ25pemUiLCJkYXRhIiwidGVybWluYXRlIiwic3RyZWFtIiwiVVJMIiwiZmlsdGVyIiwiZm9ybWF0IiwiY29udGFpbmVyIiwicGlwZSIsImNyZWF0ZVdyaXRlU3RyZWFtIiwibWF4UmV0cmllcyIsInJldHJpZXMiLCJzbGVlcCIsInNpemUiLCJFcnJvciIsImNsb3NlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvbiIsImVyciIsImppbXAiLCJyZWFkIiwiaW1nIiwiY3JvcCIsIndyaXRlIiwiZ2V0VGh1bWJuYWlsIiwiYWRkT3V0cHV0T3B0aW9uIiwiYWRkT3V0cHV0IiwicnVuIiwibmFtZSIsImV4dCIsInBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwiRE9XTkxPQURTX0RJUl9OQU1FIiwibXMiLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBRUE7Ozs7Ozs7O0FBRUEsSUFBTUEsS0FBSyxHQUFHLHFCQUFVQyxlQUFHQyxJQUFiLENBQWQ7O0FBRUEsSUFBTUMsVUFBVTtBQUFBLHFFQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNUQyxZQUFBQSxTQURTLEdBQ0dDLFdBQVcsQ0FBQyxPQUFELEVBQVUsS0FBVixDQURkO0FBRVRDLFlBQUFBLE9BRlMsR0FFQ0QsV0FBVyxDQUFD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QUFBQSxhQUFJRixNQUFNLENBQUNFLEdBQUQsQ0FBVjtBQUFBLEtBQTFCO0FBQ0gsR0FITSxDQUFQO0FBSUgsQ0FkRDs7QUFnQkEsSUFBTW5DLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUM2QyxJQUFELEVBQU9DLEdBQVA7QUFBQSxTQUFlQyxpQkFBS0MsSUFBTCxDQUFVQyxTQUFWLEVBQXFCLEtBQXJCLEVBQTRCQywwQkFBNUIsWUFBbURMLElBQW5ELGNBQTJEQyxHQUEzRCxFQUFmO0FBQUEsQ0FBcEI7O0FBRUEsSUFBTW5CLEtBQUssR0FBRyxTQUFSQSxLQUFRLENBQUF3QixFQUFFO0FBQUEsU0FBSSxJQUFJcEIsT0FBSixDQUFZLFVBQUFDLE9BQU87QUFBQSxXQUFJb0IsVUFBVSxDQUFDcEIsT0FBRCxFQUFVbUIsRUFBVixDQUFkO0FBQUEsR0FBbkIsQ0FBSjtBQUFBLENBQWhCOztlQUVlckQsVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgeXRkbCBmcm9tICd5dGRsLWNvcmUnXG5pbXBvcnQgZmZtcGVnIGZyb20gJ2ZsdWVudC1mZm1wZWcnXG5pbXBvcnQgamltcCBmcm9tICdqaW1wJ1xuXG5pbXBvcnQgeyBjcmVhdGVXb3JrZXIgfSBmcm9tICd0ZXNzZXJhY3QuanMnXG5pbXBvcnQgeyBwcm9taXNpZnkgfSBmcm9tICd1dGlsJ1xuXG5pbXBvcnQgeyBET1dOTE9BRFNfRElSX05BTUUsIFVSTCB9IGZyb20gJy4vY29uZmlnJ1xuXG5jb25zdCBzdGF0cyA9IHByb21pc2lmeShmcy5zdGF0KVxuXG5jb25zdCBkZXRlY3RTb25nID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHZpZGVvUGF0aCA9IGdldEZpbGVQYXRoKCd2aWRlbycsICdtcDQnKVxuICAgIGNvbnN0IGltZ1BhdGggPSBnZXRGaWxlUGF0aCgnaW1nJywgJ3BuZycpXG4gICAgY29uc3QgY3JvcHBlZFBhdGggPSBnZXRGaWxlUGF0aCgnY3JvcHBlZCcsICdwbmcnKVxuXG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgZ2V0VmlkZW8odmlkZW9QYXRoKSAvLyBTdGVwIDEuIERvd25sb2FkIGEgc25pcHBldCBvZiB0aGUgc3RyZWFtXG4gICAgICAgIGF3YWl0IGNyZWF0ZVRodW1ibmFpbCh2aWRlb1BhdGgsIGltZ1BhdGgpIC8vIFN0ZXAgMi4gR2VuZXJhdGUgYSBwaWN0dXJlIG9mIGEgZnJhbWVcbiAgICAgICAgYXdhaXQgY3JvcFRodW1ibmFpbChpbWdQYXRoKSAvLyBTdGVwIDMuIENyb3AgdGh1bWJuYWlsIGZvciB0ZXh0IHJlY29nbml0aW9uXG4gICAgICAgIGNvbnN0IHRleHQgPSBhd2FpdCByZWNvZ25pemVUZXh0KGNyb3BwZWRQYXRoKVxuICAgICAgICBjb25zb2xlLmxvZyh0ZXh0KVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgfVxufVxuXG5jb25zdCByZWNvZ25pemVUZXh0ID0gYXN5bmMgaW1nUGF0aCA9PiB7XG4gICAgY29uc3Qgd29ya2VyID0gY3JlYXRlV29ya2VyKHtcbiAgICAgICAgY2FjaGVNZXRob2Q6ICdyZWZyZXNoJ1xuICAgIH0pXG4gICAgYXdhaXQgd29ya2VyLmxvYWQoKVxuICAgIGF3YWl0IHdvcmtlci5sb2FkTGFuZ3VhZ2UoJ2VuZycpXG4gICAgYXdhaXQgd29ya2VyLmluaXRpYWxpemUoJ2VuZycpXG4gICAgY29uc3QgeyBkYXRhOiB7IHRleHQgfSB9ID0gYXdhaXQgd29ya2VyLnJlY29nbml6ZShpbWdQYXRoKVxuICAgIGF3YWl0IHdvcmtlci50ZXJtaW5hdGUoKVxuICAgIHJldHVybiB0ZXh0XG59XG5cbmNvbnN0IGdldFZpZGVvID0gYXN5bmMgdmlkZW9QYXRoID0+IHtcbiAgICBjb25zdCBzdHJlYW0gPSB5dGRsKFVSTCwgeyBmaWx0ZXI6IChmb3JtYXQpID0+IGZvcm1hdC5jb250YWluZXIgPT09ICdtcDQnIH0pLnBpcGUoZnMuY3JlYXRlV3JpdGVTdHJlYW0odmlkZW9QYXRoKSlcblxuICAgIGNvbnN0IG1heFJldHJpZXMgPSA1XG4gICAgbGV0IHJldHJpZXMgPSAwXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgYXdhaXQgc2xlZXAoMjAwMClcbiAgICAgICAgY29uc3Qgc3RhdCA9IGF3YWl0IHN0YXRzKHZpZGVvUGF0aClcbiAgICAgICAgaWYgKHN0YXQuc2l6ZSAvIDEwMDAwMDAgPj0gMSkgYnJlYWtcbiAgICAgICAgcmV0cmllcysrXG4gICAgICAgIGlmIChyZXRyaWVzID49IG1heFJldHJpZXMpIHRocm93IG5ldyBFcnJvcignRXJyb3IgcmVhZGluZyB2aWRlbycpXG4gICAgfVxuICAgIHN0cmVhbS5jbG9zZSgpXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgc3RyZWFtLm9uKCdjbG9zZScsIHJlc29sdmUpXG4gICAgICAgIHN0cmVhbS5vbignZXJyb3InLCBlcnIgPT4gcmVqZWN0KGVycikpXG4gICAgfSlcbn1cblxuY29uc3QgY3JvcFRodW1ibmFpbCA9IGFzeW5jIGltZ1BhdGggPT4ge1xuICAgIGNvbnN0IGltZyA9IGF3YWl0IGppbXAucmVhZChpbWdQYXRoKVxuICAgIGltZy5jcm9wKDAsIDAsIDE0NDAsIDY0KS53cml0ZShnZXRGaWxlUGF0aCgnY3JvcHBlZCcsICdwbmcnKSlcbn1cblxuY29uc3QgY3JlYXRlVGh1bWJuYWlsID0gKHZpZGVvUGF0aCwgaW1nUGF0aCkgPT4ge1xuICAgIGNvbnN0IGdldFRodW1ibmFpbCA9IGZmbXBlZyh2aWRlb1BhdGgpXG5cbiAgICBnZXRUaHVtYm5haWxcbiAgICAgICAgLmFkZE91dHB1dE9wdGlvbignLXZmcmFtZXMnKVxuICAgICAgICAuYWRkT3V0cHV0KCcxJylcbiAgICAgICAgLmFkZE91dHB1dChpbWdQYXRoKVxuXG4gICAgZ2V0VGh1bWJuYWlsLnJ1bigpXG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBnZXRUaHVtYm5haWwub24oJ2VuZCcsIHJlc29sdmUpXG4gICAgICAgIGdldFRodW1ibmFpbC5vbignZXJyJywgZXJyID0+IHJlamVjdChlcnIpKVxuICAgIH0pXG59XG5cbmNvbnN0IGdldEZpbGVQYXRoID0gKG5hbWUsIGV4dCkgPT4gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uLycsIERPV05MT0FEU19ESVJfTkFNRSwgYCR7bmFtZX0uJHtleHR9YClcblxuY29uc3Qgc2xlZXAgPSBtcyA9PiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKVxuXG5leHBvcnQgZGVmYXVsdCBkZXRlY3RTb25nXG4iXX0=