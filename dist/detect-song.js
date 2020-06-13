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

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
            return getThumbnail(videoPath, imgPath);

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

var getVideo = function getVideo(videoPath) {
  var stream = (0, _ytdlCore["default"])(_config.URL, {
    filter: function filter(format) {
      return format.container === 'mp4';
    }
  }).pipe(_fs["default"].createWriteStream(videoPath)); // Right now we are waiting 3 seconds to wait until sufficient data has been
  // downloaded to take a screenshot with ffmpeg. In the future it is probably
  // best to run getThumbnail() in a loop and if an error occures, wait a short
  // time interval and retry.

  setTimeout(function () {
    stream.close();
  }, 3000);
  return new Promise(function (resolve, reject) {
    stream.on('close', resolve);
    stream.on('error', function (err) {
      return reject(err);
    });
  });
};

var cropThumbnail = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(imgPath) {
    var img;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _jimp["default"].read(imgPath);

          case 2:
            img = _context3.sent;
            img.crop(0, 0, 1440, 64).write(getFilePath('cropped', 'png'));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function cropThumbnail(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var getThumbnail = function getThumbnail(videoPath, imgPath) {
  console.log('Creating thumnbnail: ' + imgPath);
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

var _default = detectSong;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZXRlY3Qtc29uZy5qcyJdLCJuYW1lcyI6WyJkZXRlY3RTb25nIiwidmlkZW9QYXRoIiwiZ2V0RmlsZVBhdGgiLCJpbWdQYXRoIiwiY3JvcHBlZFBhdGgiLCJnZXRWaWRlbyIsImdldFRodW1ibmFpbCIsImNyb3BUaHVtYm5haWwiLCJyZWNvZ25pemVUZXh0IiwidGV4dCIsImNvbnNvbGUiLCJsb2ciLCJ3b3JrZXIiLCJjYWNoZU1ldGhvZCIsImxvYWQiLCJsb2FkTGFuZ3VhZ2UiLCJpbml0aWFsaXplIiwicmVjb2duaXplIiwiZGF0YSIsInRlcm1pbmF0ZSIsInN0cmVhbSIsIlVSTCIsImZpbHRlciIsImZvcm1hdCIsImNvbnRhaW5lciIsInBpcGUiLCJmcyIsImNyZWF0ZVdyaXRlU3RyZWFtIiwic2V0VGltZW91dCIsImNsb3NlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvbiIsImVyciIsImppbXAiLCJyZWFkIiwiaW1nIiwiY3JvcCIsIndyaXRlIiwiYWRkT3V0cHV0T3B0aW9uIiwiYWRkT3V0cHV0IiwicnVuIiwibmFtZSIsImV4dCIsInBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwiRE9XTkxPQURTX0RJUl9OQU1FIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7O0FBRUEsSUFBTUEsVUFBVTtBQUFBLHFFQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNUQyxZQUFBQSxTQURTLEdBQ0dDLFdBQVcsQ0FBQyxPQUFELEVBQVUsS0FBVixDQURkO0FBRVRDLFlBQUFBLE9BRlMsR0FFQ0QsV0FBVyxDQUFDLEtBQUQsRUFBUSxLQUFSLENBRlo7QUFHVEUsWUFBQUEsV0FIUyxHQUdLRixXQUFXLENBQUMsU0FBRCxFQUFZLEtBQVosQ0FIaEI7QUFBQTtBQUFBO0FBQUEsbUJBTUxHLFFBQVEsQ0FBQ0osU0FBRCxDQU5IOztBQUFBO0FBQUE7QUFBQSxtQkFPTEssWUFBWSxDQUFDTCxTQUFELEVBQVlFLE9BQVosQ0FQUDs7QUFBQTtBQUFBO0FBQUEsbUJBUUxJLGFBQWEsQ0FBQ0osT0FBRCxDQVJSOztBQUFBO0FBQUE7QUFBQSxtQkFTUUssYUFBYSxDQUFDSixXQUFELENBVHJCOztBQUFBO0FBU0xLLFlBQUFBLElBVEs7QUFVWEMsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlGLElBQVo7QUFWVztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQVlYQyxZQUFBQSxPQUFPLENBQUNDLEdBQVI7O0FBWlc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBVlgsVUFBVTtBQUFBO0FBQUE7QUFBQSxHQUFoQjs7QUFnQkEsSUFBTVEsYUFBYTtBQUFBLHNFQUFHLGtCQUFNTCxPQUFOO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDWlMsWUFBQUEsTUFEWSxHQUNILDZCQUFhO0FBQ3hCQyxjQUFBQSxXQUFXLEVBQUU7QUFEVyxhQUFiLENBREc7QUFBQTtBQUFBLG1CQUlaRCxNQUFNLENBQUNFLElBQVAsRUFKWTs7QUFBQTtBQUFBO0FBQUEsbUJBS1pGLE1BQU0sQ0FBQ0csWUFBUCxDQUFvQixLQUFwQixDQUxZOztBQUFBO0FBQUE7QUFBQSxtQkFNWkgsTUFBTSxDQUFDSSxVQUFQLENBQWtCLEtBQWxCLENBTlk7O0FBQUE7QUFBQTtBQUFBLG1CQU9lSixNQUFNLENBQUNLLFNBQVAsQ0FBaUJkLE9BQWpCLENBUGY7O0FBQUE7QUFBQTtBQU9GTSxZQUFBQSxJQVBFLHlCQU9WUyxJQVBVLENBT0ZULElBUEU7QUFBQTtBQUFBLG1CQVFaRyxNQUFNLENBQUNPLFNBQVAsRUFSWTs7QUFBQTtBQUFBLDhDQVNYVixJQVRXOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQWJELGFBQWE7QUFBQTtBQUFBO0FBQUEsR0FBbkI7O0FBWUEsSUFBTUgsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQUosU0FBUyxFQUFJO0FBQzFCLE1BQU1tQixNQUFNLEdBQUcsMEJBQUtDLFdBQUwsRUFBVTtBQUFFQyxJQUFBQSxNQUFNLEVBQUUsZ0JBQUNDLE1BQUQ7QUFBQSxhQUFZQSxNQUFNLENBQUNDLFNBQVAsS0FBcUIsS0FBakM7QUFBQTtBQUFWLEdBQVYsRUFBOERDLElBQTlELENBQW1FQyxlQUFHQyxpQkFBSCxDQUFxQjFCLFNBQXJCLENBQW5FLENBQWYsQ0FEMEIsQ0FHMUI7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EyQixFQUFBQSxVQUFVLENBQUMsWUFBTTtBQUFFUixJQUFBQSxNQUFNLENBQUNTLEtBQVA7QUFBZ0IsR0FBekIsRUFBMkIsSUFBM0IsQ0FBVjtBQUVBLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQ1osSUFBQUEsTUFBTSxDQUFDYSxFQUFQLENBQVUsT0FBVixFQUFtQkYsT0FBbkI7QUFDQVgsSUFBQUEsTUFBTSxDQUFDYSxFQUFQLENBQVUsT0FBVixFQUFtQixVQUFBQyxHQUFHO0FBQUEsYUFBSUYsTUFBTSxDQUFDRSxHQUFELENBQVY7QUFBQSxLQUF0QjtBQUNILEdBSE0sQ0FBUDtBQUlILENBYkQ7O0FBZUEsSUFBTTNCLGFBQWE7QUFBQSxzRUFBRyxrQkFBTUosT0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNBZ0MsaUJBQUtDLElBQUwsQ0FBVWpDLE9BQVYsQ0FEQTs7QUFBQTtBQUNaa0MsWUFBQUEsR0FEWTtBQUVsQkEsWUFBQUEsR0FBRyxDQUFDQyxJQUFKLENBQVMsQ0FBVCxFQUFZLENBQVosRUFBZSxJQUFmLEVBQXFCLEVBQXJCLEVBQXlCQyxLQUF6QixDQUErQnJDLFdBQVcsQ0FBQyxTQUFELEVBQVksS0FBWixDQUExQzs7QUFGa0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBYkssYUFBYTtBQUFBO0FBQUE7QUFBQSxHQUFuQjs7QUFLQSxJQUFNRCxZQUFZLEdBQUcsc0JBQUNMLFNBQUQsRUFBWUUsT0FBWixFQUF3QjtBQUN6Q08sRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksMEJBQTBCUixPQUF0QztBQUVBLE1BQU1HLFlBQVksR0FBRyw4QkFBT0wsU0FBUCxDQUFyQjtBQUVBSyxFQUFBQSxZQUFZLENBQ1BrQyxlQURMLENBQ3FCLFVBRHJCLEVBRUtDLFNBRkwsQ0FFZSxHQUZmLEVBR0tBLFNBSEwsQ0FHZXRDLE9BSGY7QUFLQUcsRUFBQUEsWUFBWSxDQUFDb0MsR0FBYjtBQUVBLFNBQU8sSUFBSVosT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQzFCLElBQUFBLFlBQVksQ0FBQzJCLEVBQWIsQ0FBZ0IsS0FBaEIsRUFBdUJGLE9BQXZCO0FBQ0F6QixJQUFBQSxZQUFZLENBQUMyQixFQUFiLENBQWdCLEtBQWhCLEVBQXVCLFVBQUFDLEdBQUc7QUFBQSxhQUFJRixNQUFNLENBQUNFLEdBQUQsQ0FBVjtBQUFBLEtBQTFCO0FBQ0gsR0FITSxDQUFQO0FBSUgsQ0FoQkQ7O0FBa0JBLElBQU1oQyxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFDeUMsSUFBRCxFQUFPQyxHQUFQO0FBQUEsU0FBZUMsaUJBQUtDLElBQUwsQ0FBVUMsU0FBVixFQUFxQixLQUFyQixFQUE0QkMsMEJBQTVCLFlBQW1ETCxJQUFuRCxjQUEyREMsR0FBM0QsRUFBZjtBQUFBLENBQXBCOztlQUVlNUMsVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgeXRkbCBmcm9tICd5dGRsLWNvcmUnXG5pbXBvcnQgZmZtcGVnIGZyb20gJ2ZsdWVudC1mZm1wZWcnXG5pbXBvcnQgamltcCBmcm9tICdqaW1wJ1xuaW1wb3J0IHsgY3JlYXRlV29ya2VyIH0gZnJvbSAndGVzc2VyYWN0LmpzJ1xuXG5pbXBvcnQgeyBET1dOTE9BRFNfRElSX05BTUUsIFVSTCB9IGZyb20gJy4vY29uZmlnJ1xuXG5jb25zdCBkZXRlY3RTb25nID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHZpZGVvUGF0aCA9IGdldEZpbGVQYXRoKCd2aWRlbycsICdtcDQnKVxuICAgIGNvbnN0IGltZ1BhdGggPSBnZXRGaWxlUGF0aCgnaW1nJywgJ3BuZycpXG4gICAgY29uc3QgY3JvcHBlZFBhdGggPSBnZXRGaWxlUGF0aCgnY3JvcHBlZCcsICdwbmcnKVxuXG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgZ2V0VmlkZW8odmlkZW9QYXRoKSAvLyBTdGVwIDEuIERvd25sb2FkIGEgc25pcHBldCBvZiB0aGUgc3RyZWFtXG4gICAgICAgIGF3YWl0IGdldFRodW1ibmFpbCh2aWRlb1BhdGgsIGltZ1BhdGgpIC8vIFN0ZXAgMi4gR2VuZXJhdGUgYSBwaWN0dXJlIG9mIGEgZnJhbWVcbiAgICAgICAgYXdhaXQgY3JvcFRodW1ibmFpbChpbWdQYXRoKSAvLyBTdGVwIDMuIENyb3AgdGh1bWJuYWlsIGZvciB0ZXh0IHJlY29nbml0aW9uXG4gICAgICAgIGNvbnN0IHRleHQgPSBhd2FpdCByZWNvZ25pemVUZXh0KGNyb3BwZWRQYXRoKVxuICAgICAgICBjb25zb2xlLmxvZyh0ZXh0KVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgfVxufVxuXG5jb25zdCByZWNvZ25pemVUZXh0ID0gYXN5bmMgaW1nUGF0aCA9PiB7XG4gICAgY29uc3Qgd29ya2VyID0gY3JlYXRlV29ya2VyKHtcbiAgICAgICAgY2FjaGVNZXRob2Q6ICdyZWZyZXNoJ1xuICAgIH0pXG4gICAgYXdhaXQgd29ya2VyLmxvYWQoKVxuICAgIGF3YWl0IHdvcmtlci5sb2FkTGFuZ3VhZ2UoJ2VuZycpXG4gICAgYXdhaXQgd29ya2VyLmluaXRpYWxpemUoJ2VuZycpXG4gICAgY29uc3QgeyBkYXRhOiB7IHRleHQgfSB9ID0gYXdhaXQgd29ya2VyLnJlY29nbml6ZShpbWdQYXRoKVxuICAgIGF3YWl0IHdvcmtlci50ZXJtaW5hdGUoKVxuICAgIHJldHVybiB0ZXh0XG59XG5cbmNvbnN0IGdldFZpZGVvID0gdmlkZW9QYXRoID0+IHtcbiAgICBjb25zdCBzdHJlYW0gPSB5dGRsKFVSTCwgeyBmaWx0ZXI6IChmb3JtYXQpID0+IGZvcm1hdC5jb250YWluZXIgPT09ICdtcDQnIH0pLnBpcGUoZnMuY3JlYXRlV3JpdGVTdHJlYW0odmlkZW9QYXRoKSlcblxuICAgIC8vIFJpZ2h0IG5vdyB3ZSBhcmUgd2FpdGluZyAzIHNlY29uZHMgdG8gd2FpdCB1bnRpbCBzdWZmaWNpZW50IGRhdGEgaGFzIGJlZW5cbiAgICAvLyBkb3dubG9hZGVkIHRvIHRha2UgYSBzY3JlZW5zaG90IHdpdGggZmZtcGVnLiBJbiB0aGUgZnV0dXJlIGl0IGlzIHByb2JhYmx5XG4gICAgLy8gYmVzdCB0byBydW4gZ2V0VGh1bWJuYWlsKCkgaW4gYSBsb29wIGFuZCBpZiBhbiBlcnJvciBvY2N1cmVzLCB3YWl0IGEgc2hvcnRcbiAgICAvLyB0aW1lIGludGVydmFsIGFuZCByZXRyeS5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHsgc3RyZWFtLmNsb3NlKCkgfSwgMzAwMClcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHN0cmVhbS5vbignY2xvc2UnLCByZXNvbHZlKVxuICAgICAgICBzdHJlYW0ub24oJ2Vycm9yJywgZXJyID0+IHJlamVjdChlcnIpKVxuICAgIH0pXG59XG5cbmNvbnN0IGNyb3BUaHVtYm5haWwgPSBhc3luYyBpbWdQYXRoID0+IHtcbiAgICBjb25zdCBpbWcgPSBhd2FpdCBqaW1wLnJlYWQoaW1nUGF0aClcbiAgICBpbWcuY3JvcCgwLCAwLCAxNDQwLCA2NCkud3JpdGUoZ2V0RmlsZVBhdGgoJ2Nyb3BwZWQnLCAncG5nJykpXG59XG5cbmNvbnN0IGdldFRodW1ibmFpbCA9ICh2aWRlb1BhdGgsIGltZ1BhdGgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnQ3JlYXRpbmcgdGh1bW5ibmFpbDogJyArIGltZ1BhdGgpXG5cbiAgICBjb25zdCBnZXRUaHVtYm5haWwgPSBmZm1wZWcodmlkZW9QYXRoKVxuXG4gICAgZ2V0VGh1bWJuYWlsXG4gICAgICAgIC5hZGRPdXRwdXRPcHRpb24oJy12ZnJhbWVzJylcbiAgICAgICAgLmFkZE91dHB1dCgnMScpXG4gICAgICAgIC5hZGRPdXRwdXQoaW1nUGF0aClcblxuICAgIGdldFRodW1ibmFpbC5ydW4oKVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZ2V0VGh1bWJuYWlsLm9uKCdlbmQnLCByZXNvbHZlKVxuICAgICAgICBnZXRUaHVtYm5haWwub24oJ2VycicsIGVyciA9PiByZWplY3QoZXJyKSlcbiAgICB9KVxufVxuXG5jb25zdCBnZXRGaWxlUGF0aCA9IChuYW1lLCBleHQpID0+IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi8nLCBET1dOTE9BRFNfRElSX05BTUUsIGAke25hbWV9LiR7ZXh0fWApXG5cbmV4cG9ydCBkZWZhdWx0IGRldGVjdFNvbmdcbiJdfQ==