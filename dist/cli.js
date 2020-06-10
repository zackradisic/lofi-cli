#!/usr/bin/env node
"use strict";

var _terminalKit = require("terminal-kit");

var _youtubeStream = _interopRequireDefault(require("./youtube-stream"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var keys = {
  VOLUME_DOWN: 'LEFT',
  VOLUME_UP: 'RIGHT',
  EXIT: 'CTRL_C'
};

var main = function main() {
  _terminalKit.terminal.green.bold('Playing ChilledCow stream...\n');

  _terminalKit.terminal.grabInput();

  var _playStream = (0, _youtubeStream["default"])(),
      _playStream2 = _slicedToArray(_playStream, 2),
      stream = _playStream2[0],
      volume = _playStream2[1];

  _terminalKit.terminal.on('key', function (name, matches, data) {
    var offset = 0.1;

    switch (name) {
      case keys.VOLUME_DOWN:
        if (volume.volume - offset >= 0) volume.setVolume(volume.volume - 0.1);
        break;

      case keys.VOLUME_UP:
        if (volume.volume + offset <= 1) volume.setVolume(volume.volume + 0.1);
        break;

      case keys.EXIT:
        process.exit(1);
    }

    _terminalKit.terminal.bold(volume.volume + '\n');
  });
};

main();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGkuanMiXSwibmFtZXMiOlsia2V5cyIsIlZPTFVNRV9ET1dOIiwiVk9MVU1FX1VQIiwiRVhJVCIsIm1haW4iLCJ0ZXJtaW5hbCIsImdyZWVuIiwiYm9sZCIsImdyYWJJbnB1dCIsInN0cmVhbSIsInZvbHVtZSIsIm9uIiwibmFtZSIsIm1hdGNoZXMiLCJkYXRhIiwib2Zmc2V0Iiwic2V0Vm9sdW1lIiwicHJvY2VzcyIsImV4aXQiXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLElBQUksR0FBRztBQUNUQyxFQUFBQSxXQUFXLEVBQUUsTUFESjtBQUVUQyxFQUFBQSxTQUFTLEVBQUUsT0FGRjtBQUdUQyxFQUFBQSxJQUFJLEVBQUU7QUFIRyxDQUFiOztBQUtBLElBQU1DLElBQUksR0FBRyxTQUFQQSxJQUFPLEdBQU07QUFDZkMsd0JBQVNDLEtBQVQsQ0FBZUMsSUFBZixDQUFvQixnQ0FBcEI7O0FBQ0FGLHdCQUFTRyxTQUFUOztBQUZlLG9CQUdVLGdDQUhWO0FBQUE7QUFBQSxNQUdSQyxNQUhRO0FBQUEsTUFHQUMsTUFIQTs7QUFLZkwsd0JBQVNNLEVBQVQsQ0FBWSxLQUFaLEVBQW1CLFVBQUNDLElBQUQsRUFBT0MsT0FBUCxFQUFnQkMsSUFBaEIsRUFBeUI7QUFDeEMsUUFBTUMsTUFBTSxHQUFHLEdBQWY7O0FBQ0EsWUFBUUgsSUFBUjtBQUNBLFdBQUtaLElBQUksQ0FBQ0MsV0FBVjtBQUNJLFlBQUlTLE1BQU0sQ0FBQ0EsTUFBUCxHQUFnQkssTUFBaEIsSUFBMEIsQ0FBOUIsRUFBaUNMLE1BQU0sQ0FBQ00sU0FBUCxDQUFpQk4sTUFBTSxDQUFDQSxNQUFQLEdBQWdCLEdBQWpDO0FBQ2pDOztBQUNKLFdBQUtWLElBQUksQ0FBQ0UsU0FBVjtBQUNJLFlBQUlRLE1BQU0sQ0FBQ0EsTUFBUCxHQUFnQkssTUFBaEIsSUFBMEIsQ0FBOUIsRUFBaUNMLE1BQU0sQ0FBQ00sU0FBUCxDQUFpQk4sTUFBTSxDQUFDQSxNQUFQLEdBQWdCLEdBQWpDO0FBQ2pDOztBQUNKLFdBQUtWLElBQUksQ0FBQ0csSUFBVjtBQUNJYyxRQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYSxDQUFiO0FBUko7O0FBVUFiLDBCQUFTRSxJQUFULENBQWNHLE1BQU0sQ0FBQ0EsTUFBUCxHQUFnQixJQUE5QjtBQUNILEdBYkQ7QUFjSCxDQW5CRDs7QUFxQkFOLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cbmltcG9ydCB7IHRlcm1pbmFsIH0gZnJvbSAndGVybWluYWwta2l0J1xuaW1wb3J0IHBsYXlTdHJlYW0gZnJvbSAnLi95b3V0dWJlLXN0cmVhbSdcblxuY29uc3Qga2V5cyA9IHtcbiAgICBWT0xVTUVfRE9XTjogJ0xFRlQnLFxuICAgIFZPTFVNRV9VUDogJ1JJR0hUJyxcbiAgICBFWElUOiAnQ1RSTF9DJ1xufVxuY29uc3QgbWFpbiA9ICgpID0+IHtcbiAgICB0ZXJtaW5hbC5ncmVlbi5ib2xkKCdQbGF5aW5nIENoaWxsZWRDb3cgc3RyZWFtLi4uXFxuJylcbiAgICB0ZXJtaW5hbC5ncmFiSW5wdXQoKVxuICAgIGNvbnN0IFtzdHJlYW0sIHZvbHVtZV0gPSBwbGF5U3RyZWFtKClcblxuICAgIHRlcm1pbmFsLm9uKCdrZXknLCAobmFtZSwgbWF0Y2hlcywgZGF0YSkgPT4ge1xuICAgICAgICBjb25zdCBvZmZzZXQgPSAwLjFcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgIGNhc2Uga2V5cy5WT0xVTUVfRE9XTjpcbiAgICAgICAgICAgIGlmICh2b2x1bWUudm9sdW1lIC0gb2Zmc2V0ID49IDApIHZvbHVtZS5zZXRWb2x1bWUodm9sdW1lLnZvbHVtZSAtIDAuMSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2Uga2V5cy5WT0xVTUVfVVA6XG4gICAgICAgICAgICBpZiAodm9sdW1lLnZvbHVtZSArIG9mZnNldCA8PSAxKSB2b2x1bWUuc2V0Vm9sdW1lKHZvbHVtZS52b2x1bWUgKyAwLjEpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIGtleXMuRVhJVDpcbiAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKVxuICAgICAgICB9XG4gICAgICAgIHRlcm1pbmFsLmJvbGQodm9sdW1lLnZvbHVtZSArICdcXG4nKVxuICAgIH0pXG59XG5cbm1haW4oKVxuIl19