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

var _pcmVolume = _interopRequireDefault(require("pcm-volume"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Decoder = _lame["default"].Decoder;
var decoderStream = Decoder();
var speakerStream = new _speaker["default"]();
var v = new _pcmVolume["default"]();

var playStream = function playStream() {
  var URL = 'https://www.youtube.com/watch?v=5qap5aO4i9A';
  var ytStream = (0, _ytdlCore["default"])(URL, {
    audioonly: true
  });
  var stream = new _stream.PassThrough();
  var ffmpeg = new _fluentFfmpeg["default"](ytStream);
  ffmpeg.on('error', function (error) {
    console.log(error);
  });
  ffmpeg.format('mp3').pipe(stream);
  stream.pipe(decoderStream).pipe(v).pipe(speakerStream);
  return [stream, v];
};

var _default = playStream;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy95b3V0dWJlLXN0cmVhbS5qcyJdLCJuYW1lcyI6WyJEZWNvZGVyIiwibGFtZSIsImRlY29kZXJTdHJlYW0iLCJzcGVha2VyU3RyZWFtIiwiU3BlYWtlciIsInYiLCJWb2x1bWUiLCJwbGF5U3RyZWFtIiwiVVJMIiwieXRTdHJlYW0iLCJhdWRpb29ubHkiLCJzdHJlYW0iLCJQYXNzVGhyb3VnaCIsImZmbXBlZyIsIkZGbXBlZyIsIm9uIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiZm9ybWF0IiwicGlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBTUEsT0FBTyxHQUFHQyxpQkFBS0QsT0FBckI7QUFFQSxJQUFNRSxhQUFhLEdBQUdGLE9BQU8sRUFBN0I7QUFDQSxJQUFNRyxhQUFhLEdBQUcsSUFBSUMsbUJBQUosRUFBdEI7QUFDQSxJQUFNQyxDQUFDLEdBQUcsSUFBSUMscUJBQUosRUFBVjs7QUFFQSxJQUFNQyxVQUFVLEdBQUcsU0FBYkEsVUFBYSxHQUFNO0FBQ3JCLE1BQU1DLEdBQUcsR0FBRyw2Q0FBWjtBQUNBLE1BQU1DLFFBQVEsR0FBRywwQkFBS0QsR0FBTCxFQUFVO0FBQ3ZCRSxJQUFBQSxTQUFTLEVBQUU7QUFEWSxHQUFWLENBQWpCO0FBSUEsTUFBTUMsTUFBTSxHQUFHLElBQUlDLG1CQUFKLEVBQWY7QUFDQSxNQUFNQyxNQUFNLEdBQUcsSUFBSUMsd0JBQUosQ0FBV0wsUUFBWCxDQUFmO0FBRUFJLEVBQUFBLE1BQU0sQ0FBQ0UsRUFBUCxDQUFVLE9BQVYsRUFBbUIsVUFBQ0MsS0FBRCxFQUFXO0FBQzFCQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsS0FBWjtBQUNILEdBRkQ7QUFJQUgsRUFBQUEsTUFBTSxDQUFDTSxNQUFQLENBQWMsS0FBZCxFQUFxQkMsSUFBckIsQ0FBMEJULE1BQTFCO0FBQ0FBLEVBQUFBLE1BQU0sQ0FBQ1MsSUFBUCxDQUFZbEIsYUFBWixFQUEyQmtCLElBQTNCLENBQWdDZixDQUFoQyxFQUFtQ2UsSUFBbkMsQ0FBd0NqQixhQUF4QztBQUVBLFNBQU8sQ0FBQ1EsTUFBRCxFQUFTTixDQUFULENBQVA7QUFDSCxDQWpCRDs7ZUFtQmVFLFUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeXRkbCBmcm9tICd5dGRsLWNvcmUnXG5pbXBvcnQgRkZtcGVnIGZyb20gJ2ZsdWVudC1mZm1wZWcnXG5pbXBvcnQgeyBQYXNzVGhyb3VnaCB9IGZyb20gJ3N0cmVhbSdcblxuaW1wb3J0IGxhbWUgZnJvbSAnbGFtZSdcbmltcG9ydCBTcGVha2VyIGZyb20gJ3NwZWFrZXInXG5pbXBvcnQgVm9sdW1lIGZyb20gJ3BjbS12b2x1bWUnXG5cbmNvbnN0IERlY29kZXIgPSBsYW1lLkRlY29kZXJcblxuY29uc3QgZGVjb2RlclN0cmVhbSA9IERlY29kZXIoKVxuY29uc3Qgc3BlYWtlclN0cmVhbSA9IG5ldyBTcGVha2VyKClcbmNvbnN0IHYgPSBuZXcgVm9sdW1lKClcblxuY29uc3QgcGxheVN0cmVhbSA9ICgpID0+IHtcbiAgICBjb25zdCBVUkwgPSAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj01cWFwNWFPNGk5QSdcbiAgICBjb25zdCB5dFN0cmVhbSA9IHl0ZGwoVVJMLCB7XG4gICAgICAgIGF1ZGlvb25seTogdHJ1ZVxuICAgIH0pXG5cbiAgICBjb25zdCBzdHJlYW0gPSBuZXcgUGFzc1Rocm91Z2goKVxuICAgIGNvbnN0IGZmbXBlZyA9IG5ldyBGRm1wZWcoeXRTdHJlYW0pXG5cbiAgICBmZm1wZWcub24oJ2Vycm9yJywgKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgIH0pXG5cbiAgICBmZm1wZWcuZm9ybWF0KCdtcDMnKS5waXBlKHN0cmVhbSlcbiAgICBzdHJlYW0ucGlwZShkZWNvZGVyU3RyZWFtKS5waXBlKHYpLnBpcGUoc3BlYWtlclN0cmVhbSlcblxuICAgIHJldHVybiBbc3RyZWFtLCB2XVxufVxuXG5leHBvcnQgZGVmYXVsdCBwbGF5U3RyZWFtXG4iXX0=