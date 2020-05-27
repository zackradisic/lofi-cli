#!/usr/bin/env node
"use strict";

var _terminalKit = require("terminal-kit");

var _youtubeStream = _interopRequireDefault(require("./youtube-stream"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var main = function main() {
  _terminalKit.terminal.green.bold('Playing ChilledCow stream...\n');

  (0, _youtubeStream["default"])();
};

main();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGkuanMiXSwibmFtZXMiOlsibWFpbiIsInRlcm1pbmFsIiwiZ3JlZW4iLCJib2xkIl0sIm1hcHBpbmdzIjoiQUFBQTs7O0FBRUE7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxJQUFJLEdBQUcsU0FBUEEsSUFBTyxHQUFNO0FBQ2ZDLHdCQUFTQyxLQUFULENBQWVDLElBQWYsQ0FBb0IsZ0NBQXBCOztBQUNBO0FBQ0gsQ0FIRDs7QUFNQUgsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcblxuaW1wb3J0IHsgdGVybWluYWwgfSBmcm9tICd0ZXJtaW5hbC1raXQnXG5pbXBvcnQgcGxheVN0cmVhbSBmcm9tICcuL3lvdXR1YmUtc3RyZWFtJ1xuXG5jb25zdCBtYWluID0gKCkgPT4ge1xuICAgIHRlcm1pbmFsLmdyZWVuLmJvbGQoJ1BsYXlpbmcgQ2hpbGxlZENvdyBzdHJlYW0uLi5cXG4nKVxuICAgIHBsYXlTdHJlYW0oKVxufVxuXG5cbm1haW4oKVxuXG5cblxuIl19