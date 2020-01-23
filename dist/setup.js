#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var CONFIG_PATH = _path["default"].join(__dirname + "/config.json");

var CORE_AUDIO_PATH = _path["default"].join(__dirname + "/../node_modules/speaker/deps/mpg123/src/output/coreaudio.c");

var edit = function edit() {
  var config = JSON.parse(_fs["default"].readFileSync(CONFIG_PATH));
  console.log(config);

  if (config.setup) {
    _fs["default"].copyFileSync(_path["default"].join(__dirname + "/coreaudio.c"), CORE_AUDIO_PATH);

    config.setup = false;

    _fs["default"].writeFileSync(CONFIG_PATH, JSON.stringify(config));
  }
};

edit();