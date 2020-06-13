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

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Decoder = _lame["default"].Decoder;
var decoderStream = Decoder();
var speakerStream = new _speaker["default"]();
var v = new _pcmVolume["default"]();

var playStream = function playStream() {
  var ytStream = (0, _ytdlCore["default"])(_config.URL, {
    audioonly: true
  });
  var stream = new _stream.PassThrough();
  var ffmpeg = new _fluentFfmpeg["default"](ytStream);
  ffmpeg.on('error', function (error) {
    console.log(error);
  });
  ffmpeg.format('mp3').pipe(stream);
  stream.pipe(decoderStream).pipe(v).pipe(speakerStream);
  return {
    stream: stream,
    volume: v
  };
};

var _default = playStream;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy95b3V0dWJlLXN0cmVhbS5qcyJdLCJuYW1lcyI6WyJEZWNvZGVyIiwibGFtZSIsImRlY29kZXJTdHJlYW0iLCJzcGVha2VyU3RyZWFtIiwiU3BlYWtlciIsInYiLCJWb2x1bWUiLCJwbGF5U3RyZWFtIiwieXRTdHJlYW0iLCJVUkwiLCJhdWRpb29ubHkiLCJzdHJlYW0iLCJQYXNzVGhyb3VnaCIsImZmbXBlZyIsIkZGbXBlZyIsIm9uIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiZm9ybWF0IiwicGlwZSIsInZvbHVtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBTUEsT0FBTyxHQUFHQyxpQkFBS0QsT0FBckI7QUFFQSxJQUFNRSxhQUFhLEdBQUdGLE9BQU8sRUFBN0I7QUFDQSxJQUFNRyxhQUFhLEdBQUcsSUFBSUMsbUJBQUosRUFBdEI7QUFDQSxJQUFNQyxDQUFDLEdBQUcsSUFBSUMscUJBQUosRUFBVjs7QUFFQSxJQUFNQyxVQUFVLEdBQUcsU0FBYkEsVUFBYSxHQUFNO0FBQ3JCLE1BQU1DLFFBQVEsR0FBRywwQkFBS0MsV0FBTCxFQUFVO0FBQ3ZCQyxJQUFBQSxTQUFTLEVBQUU7QUFEWSxHQUFWLENBQWpCO0FBSUEsTUFBTUMsTUFBTSxHQUFHLElBQUlDLG1CQUFKLEVBQWY7QUFDQSxNQUFNQyxNQUFNLEdBQUcsSUFBSUMsd0JBQUosQ0FBV04sUUFBWCxDQUFmO0FBRUFLLEVBQUFBLE1BQU0sQ0FBQ0UsRUFBUCxDQUFVLE9BQVYsRUFBbUIsVUFBQ0MsS0FBRCxFQUFXO0FBQzFCQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsS0FBWjtBQUNILEdBRkQ7QUFJQUgsRUFBQUEsTUFBTSxDQUFDTSxNQUFQLENBQWMsS0FBZCxFQUFxQkMsSUFBckIsQ0FBMEJULE1BQTFCO0FBQ0FBLEVBQUFBLE1BQU0sQ0FBQ1MsSUFBUCxDQUFZbEIsYUFBWixFQUEyQmtCLElBQTNCLENBQWdDZixDQUFoQyxFQUFtQ2UsSUFBbkMsQ0FBd0NqQixhQUF4QztBQUVBLFNBQU87QUFBRVEsSUFBQUEsTUFBTSxFQUFFQSxNQUFWO0FBQWtCVSxJQUFBQSxNQUFNLEVBQUVoQjtBQUExQixHQUFQO0FBQ0gsQ0FoQkQ7O2VBa0JlRSxVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHl0ZGwgZnJvbSAneXRkbC1jb3JlJ1xuaW1wb3J0IEZGbXBlZyBmcm9tICdmbHVlbnQtZmZtcGVnJ1xuaW1wb3J0IHsgUGFzc1Rocm91Z2ggfSBmcm9tICdzdHJlYW0nXG5cbmltcG9ydCBsYW1lIGZyb20gJ2xhbWUnXG5pbXBvcnQgU3BlYWtlciBmcm9tICdzcGVha2VyJ1xuaW1wb3J0IFZvbHVtZSBmcm9tICdwY20tdm9sdW1lJ1xuaW1wb3J0IHsgVVJMIH0gZnJvbSAnLi9jb25maWcnXG5cbmNvbnN0IERlY29kZXIgPSBsYW1lLkRlY29kZXJcblxuY29uc3QgZGVjb2RlclN0cmVhbSA9IERlY29kZXIoKVxuY29uc3Qgc3BlYWtlclN0cmVhbSA9IG5ldyBTcGVha2VyKClcbmNvbnN0IHYgPSBuZXcgVm9sdW1lKClcblxuY29uc3QgcGxheVN0cmVhbSA9ICgpID0+IHtcbiAgICBjb25zdCB5dFN0cmVhbSA9IHl0ZGwoVVJMLCB7XG4gICAgICAgIGF1ZGlvb25seTogdHJ1ZVxuICAgIH0pXG5cbiAgICBjb25zdCBzdHJlYW0gPSBuZXcgUGFzc1Rocm91Z2goKVxuICAgIGNvbnN0IGZmbXBlZyA9IG5ldyBGRm1wZWcoeXRTdHJlYW0pXG5cbiAgICBmZm1wZWcub24oJ2Vycm9yJywgKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgIH0pXG5cbiAgICBmZm1wZWcuZm9ybWF0KCdtcDMnKS5waXBlKHN0cmVhbSlcbiAgICBzdHJlYW0ucGlwZShkZWNvZGVyU3RyZWFtKS5waXBlKHYpLnBpcGUoc3BlYWtlclN0cmVhbSlcblxuICAgIHJldHVybiB7IHN0cmVhbTogc3RyZWFtLCB2b2x1bWU6IHYgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwbGF5U3RyZWFtXG4iXX0=