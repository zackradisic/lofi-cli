"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ytdlCore = _interopRequireDefault(require("ytdl-core"));

var _fluentFfmpeg = _interopRequireDefault(require("fluent-ffmpeg"));

var _stream = require("stream");

var _lame = _interopRequireDefault(require("lame"));

var _speaker = _interopRequireDefault(require("speaker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Decoder = _lame["default"].Decoder;
var decoderStream = Decoder();
var speakerStream = new _speaker["default"]();

var playStream = function playStream() {
  var URL = 'https://www.youtube.com/watch?v=5qap5aO4i9A';
  var ytStream = (0, _ytdlCore["default"])(URL, {
    audioonly: true
  });
  var stream = new _stream.PassThrough();
  var ffmpeg = new _fluentFfmpeg["default"](ytStream);
  ffmpeg.on('error', function (error) {
    console.log('bingo ' + error);
  });
  ffmpeg.format('mp3').pipe(stream);
  stream.pipe(decoderStream).pipe(speakerStream);
  return stream;
};

var _default = playStream;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy95b3V0dWJlLXN0cmVhbS5qcyJdLCJuYW1lcyI6WyJEZWNvZGVyIiwibGFtZSIsImRlY29kZXJTdHJlYW0iLCJzcGVha2VyU3RyZWFtIiwic3BlYWtlciIsInBsYXlTdHJlYW0iLCJVUkwiLCJ5dFN0cmVhbSIsImF1ZGlvb25seSIsInN0cmVhbSIsIlBhc3NUaHJvdWdoIiwiZmZtcGVnIiwiRkZtcGVnIiwib24iLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJmb3JtYXQiLCJwaXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFDQSxJQUFNQSxPQUFPLEdBQUdDLGlCQUFLRCxPQUFyQjtBQUVBLElBQU1FLGFBQWEsR0FBR0YsT0FBTyxFQUE3QjtBQUNBLElBQU1HLGFBQWEsR0FBRyxJQUFJQyxtQkFBSixFQUF0Qjs7QUFFQSxJQUFNQyxVQUFVLEdBQUcsU0FBYkEsVUFBYSxHQUFNO0FBQ3JCLE1BQU1DLEdBQUcsR0FBRyw2Q0FBWjtBQUNBLE1BQU1DLFFBQVEsR0FBRywwQkFBS0QsR0FBTCxFQUFVO0FBQ3ZCRSxJQUFBQSxTQUFTLEVBQUU7QUFEWSxHQUFWLENBQWpCO0FBSUEsTUFBTUMsTUFBTSxHQUFHLElBQUlDLG1CQUFKLEVBQWY7QUFDQSxNQUFNQyxNQUFNLEdBQUcsSUFBSUMsd0JBQUosQ0FBV0wsUUFBWCxDQUFmO0FBRUFJLEVBQUFBLE1BQU0sQ0FBQ0UsRUFBUCxDQUFVLE9BQVYsRUFBbUIsVUFBQ0MsS0FBRCxFQUFXO0FBQzFCQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxXQUFXRixLQUF2QjtBQUNILEdBRkQ7QUFJQUgsRUFBQUEsTUFBTSxDQUFDTSxNQUFQLENBQWMsS0FBZCxFQUFxQkMsSUFBckIsQ0FBMEJULE1BQTFCO0FBQ0FBLEVBQUFBLE1BQU0sQ0FBQ1MsSUFBUCxDQUFZaEIsYUFBWixFQUEyQmdCLElBQTNCLENBQWdDZixhQUFoQztBQUVBLFNBQU9NLE1BQVA7QUFDSCxDQWpCRDs7ZUFvQmVKLFUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeXRkbCBmcm9tICd5dGRsLWNvcmUnXG5pbXBvcnQgRkZtcGVnIGZyb20gJ2ZsdWVudC1mZm1wZWcnXG5pbXBvcnQgeyBQYXNzVGhyb3VnaCB9IGZyb20gJ3N0cmVhbSdcblxuaW1wb3J0IGxhbWUgZnJvbSAnbGFtZSdcbmltcG9ydCBzcGVha2VyIGZyb20gJ3NwZWFrZXInXG5jb25zdCBEZWNvZGVyID0gbGFtZS5EZWNvZGVyXG5cbmNvbnN0IGRlY29kZXJTdHJlYW0gPSBEZWNvZGVyKClcbmNvbnN0IHNwZWFrZXJTdHJlYW0gPSBuZXcgc3BlYWtlcigpXG5cbmNvbnN0IHBsYXlTdHJlYW0gPSAoKSA9PiB7XG4gICAgY29uc3QgVVJMID0gJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9NXFhcDVhTzRpOUEnXG4gICAgY29uc3QgeXRTdHJlYW0gPSB5dGRsKFVSTCwge1xuICAgICAgICBhdWRpb29ubHk6IHRydWVcbiAgICB9KVxuXG4gICAgY29uc3Qgc3RyZWFtID0gbmV3IFBhc3NUaHJvdWdoKClcbiAgICBjb25zdCBmZm1wZWcgPSBuZXcgRkZtcGVnKHl0U3RyZWFtKVxuXG4gICAgZmZtcGVnLm9uKCdlcnJvcicsIChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnYmluZ28gJyArIGVycm9yKVxuICAgIH0pXG5cbiAgICBmZm1wZWcuZm9ybWF0KCdtcDMnKS5waXBlKHN0cmVhbSlcbiAgICBzdHJlYW0ucGlwZShkZWNvZGVyU3RyZWFtKS5waXBlKHNwZWFrZXJTdHJlYW0pXG5cbiAgICByZXR1cm4gc3RyZWFtXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgcGxheVN0cmVhbVxuXG5cblxuIl19