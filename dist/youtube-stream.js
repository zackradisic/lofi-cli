"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ytdlCore = _interopRequireDefault(require("ytdl-core"));

var _fluentFfmpeg = _interopRequireDefault(require("fluent-ffmpeg"));

var _stream = require("stream");

var _lame = _interopRequireDefault(require("lame"));

var _speaker = _interopRequireDefault(require("speaker"));

var Decoder = _lame["default"].Decoder;
var decoderStream = Decoder();
var speakerStream = new _speaker["default"]();

var playStream = function playStream() {
  var URL = 'https://www.youtube.com/watch?v=hHW1oY26kxQ';
  var ytStream = (0, _ytdlCore["default"])(URL, {
    audioonly: true
  });
  var stream = new _stream.PassThrough();
  var ffmpeg = new _fluentFfmpeg["default"](ytStream);
  ffmpeg.on('error', function (error) {
    console.log(error);
  });
  ffmpeg.format('mp3').pipe(stream);
  stream.pipe(decoderStream).pipe(speakerStream);
  return stream;
};

var _default = playStream;
exports["default"] = _default;