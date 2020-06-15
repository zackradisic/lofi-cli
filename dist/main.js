#!/usr/bin/env node
"use strict";

var _youtubeStream = _interopRequireDefault(require("./youtube-stream"));

var _cli = _interopRequireDefault(require("./cli/cli"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var main = function main() {
  var lofiStream = (0, _youtubeStream["default"])();
  (0, _cli["default"])(lofiStream);
};

main();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbIm1haW4iLCJsb2ZpU3RyZWFtIl0sIm1hcHBpbmdzIjoiQUFBQTs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxJQUFJLEdBQUcsU0FBUEEsSUFBTyxHQUFNO0FBQ2YsTUFBTUMsVUFBVSxHQUFHLGdDQUFuQjtBQUNBLHVCQUFRQSxVQUFSO0FBQ0gsQ0FIRDs7QUFLQUQsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcbmltcG9ydCBwbGF5U3RyZWFtIGZyb20gJy4veW91dHViZS1zdHJlYW0nXG5pbXBvcnQgaW5pdENMSSBmcm9tICcuL2NsaS9jbGknXG5cbmNvbnN0IG1haW4gPSAoKSA9PiB7XG4gICAgY29uc3QgbG9maVN0cmVhbSA9IHBsYXlTdHJlYW0oKVxuICAgIGluaXRDTEkobG9maVN0cmVhbSlcbn1cblxubWFpbigpXG4iXX0=