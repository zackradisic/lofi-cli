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
  return {
    stream: stream,
    volume: v
  };
};

var _default = playStream;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy95b3V0dWJlLXN0cmVhbS5qcyJdLCJuYW1lcyI6WyJEZWNvZGVyIiwibGFtZSIsImRlY29kZXJTdHJlYW0iLCJzcGVha2VyU3RyZWFtIiwiU3BlYWtlciIsInYiLCJWb2x1bWUiLCJwbGF5U3RyZWFtIiwiVVJMIiwieXRTdHJlYW0iLCJhdWRpb29ubHkiLCJzdHJlYW0iLCJQYXNzVGhyb3VnaCIsImZmbXBlZyIsIkZGbXBlZyIsIm9uIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiZm9ybWF0IiwicGlwZSIsInZvbHVtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBTUEsT0FBTyxHQUFHQyxpQkFBS0QsT0FBckI7QUFFQSxJQUFNRSxhQUFhLEdBQUdGLE9BQU8sRUFBN0I7QUFDQSxJQUFNRyxhQUFhLEdBQUcsSUFBSUMsbUJBQUosRUFBdEI7QUFDQSxJQUFNQyxDQUFDLEdBQUcsSUFBSUMscUJBQUosRUFBVjs7QUFFQSxJQUFNQyxVQUFVLEdBQUcsU0FBYkEsVUFBYSxHQUFNO0FBQ3JCLE1BQU1DLEdBQUcsR0FBRyw2Q0FBWjtBQUNBLE1BQU1DLFFBQVEsR0FBRywwQkFBS0QsR0FBTCxFQUFVO0FBQ3ZCRSxJQUFBQSxTQUFTLEVBQUU7QUFEWSxHQUFWLENBQWpCO0FBSUEsTUFBTUMsTUFBTSxHQUFHLElBQUlDLG1CQUFKLEVBQWY7QUFDQSxNQUFNQyxNQUFNLEdBQUcsSUFBSUMsd0JBQUosQ0FBV0wsUUFBWCxDQUFmO0FBRUFJLEVBQUFBLE1BQU0sQ0FBQ0UsRUFBUCxDQUFVLE9BQVYsRUFBbUIsVUFBQ0MsS0FBRCxFQUFXO0FBQzFCQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsS0FBWjtBQUNILEdBRkQ7QUFJQUgsRUFBQUEsTUFBTSxDQUFDTSxNQUFQLENBQWMsS0FBZCxFQUFxQkMsSUFBckIsQ0FBMEJULE1BQTFCO0FBQ0FBLEVBQUFBLE1BQU0sQ0FBQ1MsSUFBUCxDQUFZbEIsYUFBWixFQUEyQmtCLElBQTNCLENBQWdDZixDQUFoQyxFQUFtQ2UsSUFBbkMsQ0FBd0NqQixhQUF4QztBQUVBLFNBQU87QUFBRVEsSUFBQUEsTUFBTSxFQUFFQSxNQUFWO0FBQWtCVSxJQUFBQSxNQUFNLEVBQUVoQjtBQUExQixHQUFQO0FBQ0gsQ0FqQkQ7O2VBbUJlRSxVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHl0ZGwgZnJvbSAneXRkbC1jb3JlJ1xuaW1wb3J0IEZGbXBlZyBmcm9tICdmbHVlbnQtZmZtcGVnJ1xuaW1wb3J0IHsgUGFzc1Rocm91Z2ggfSBmcm9tICdzdHJlYW0nXG5cbmltcG9ydCBsYW1lIGZyb20gJ2xhbWUnXG5pbXBvcnQgU3BlYWtlciBmcm9tICdzcGVha2VyJ1xuaW1wb3J0IFZvbHVtZSBmcm9tICdwY20tdm9sdW1lJ1xuXG5jb25zdCBEZWNvZGVyID0gbGFtZS5EZWNvZGVyXG5cbmNvbnN0IGRlY29kZXJTdHJlYW0gPSBEZWNvZGVyKClcbmNvbnN0IHNwZWFrZXJTdHJlYW0gPSBuZXcgU3BlYWtlcigpXG5jb25zdCB2ID0gbmV3IFZvbHVtZSgpXG5cbmNvbnN0IHBsYXlTdHJlYW0gPSAoKSA9PiB7XG4gICAgY29uc3QgVVJMID0gJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9NXFhcDVhTzRpOUEnXG4gICAgY29uc3QgeXRTdHJlYW0gPSB5dGRsKFVSTCwge1xuICAgICAgICBhdWRpb29ubHk6IHRydWVcbiAgICB9KVxuXG4gICAgY29uc3Qgc3RyZWFtID0gbmV3IFBhc3NUaHJvdWdoKClcbiAgICBjb25zdCBmZm1wZWcgPSBuZXcgRkZtcGVnKHl0U3RyZWFtKVxuXG4gICAgZmZtcGVnLm9uKCdlcnJvcicsIChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICB9KVxuXG4gICAgZmZtcGVnLmZvcm1hdCgnbXAzJykucGlwZShzdHJlYW0pXG4gICAgc3RyZWFtLnBpcGUoZGVjb2RlclN0cmVhbSkucGlwZSh2KS5waXBlKHNwZWFrZXJTdHJlYW0pXG5cbiAgICByZXR1cm4geyBzdHJlYW06IHN0cmVhbSwgdm9sdW1lOiB2IH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGxheVN0cmVhbVxuIl19