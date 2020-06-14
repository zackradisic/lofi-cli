"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _terminalKit = require("terminal-kit");

var _detectSong = _interopRequireDefault(require("./detect-song"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var keys = {
  VOLUME_DOWN: 'LEFT',
  VOLUME_UP: 'RIGHT',
  GET_CURRENT_SONG: 'CTRL_A',
  EXIT: 'CTRL_C'
};

var init = function init(lofiStream) {
  _terminalKit.terminal.green.bold('Playing ChilledCow stream...\n');

  _terminalKit.terminal.grabInput();

  var progressBar = _terminalKit.terminal.progressBar({
    width: 80,
    title: 'Volume',
    eta: false,
    percent: true,
    barHeadChar: '=',
    syncMode: true
  });

  var cli = {
    terminal: _terminalKit.terminal,
    progressBar: progressBar
  };
  progressBar.update(lofiStream.volume.volume);

  _terminalKit.terminal.on('key', function (name) {
    return menuOnClick(cli, lofiStream)(name);
  });

  return cli;
};

var menuOnClick = function menuOnClick(cli, lofiStream) {
  return function (keyName) {
    var offset = 0.1;

    switch (keyName) {
      case keys.VOLUME_DOWN:
        if (lofiStream.volume.volume - offset >= 0) lofiStream.volume.setVolume(lofiStream.volume.volume - 0.1);
        break;

      case keys.VOLUME_UP:
        if (lofiStream.volume.volume + offset <= 1) lofiStream.volume.setVolume(lofiStream.volume.volume + 0.1);
        break;

      case keys.GET_CURRENT_SONG:
        (0, _detectSong["default"])().then(function (song) {
          return console.log("Current song: ".concat(song));
        });
        break;

      case keys.EXIT:
        process.exit(1);
    }

    cli.progressBar.update(lofiStream.volume.volume);
  };
};

var _default = init;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGkuanMiXSwibmFtZXMiOlsia2V5cyIsIlZPTFVNRV9ET1dOIiwiVk9MVU1FX1VQIiwiR0VUX0NVUlJFTlRfU09ORyIsIkVYSVQiLCJpbml0IiwibG9maVN0cmVhbSIsInRlcm1pbmFsIiwiZ3JlZW4iLCJib2xkIiwiZ3JhYklucHV0IiwicHJvZ3Jlc3NCYXIiLCJ3aWR0aCIsInRpdGxlIiwiZXRhIiwicGVyY2VudCIsImJhckhlYWRDaGFyIiwic3luY01vZGUiLCJjbGkiLCJ1cGRhdGUiLCJ2b2x1bWUiLCJvbiIsIm5hbWUiLCJtZW51T25DbGljayIsImtleU5hbWUiLCJvZmZzZXQiLCJzZXRWb2x1bWUiLCJ0aGVuIiwic29uZyIsImNvbnNvbGUiLCJsb2ciLCJwcm9jZXNzIiwiZXhpdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUEsSUFBTUEsSUFBSSxHQUFHO0FBQ1RDLEVBQUFBLFdBQVcsRUFBRSxNQURKO0FBRVRDLEVBQUFBLFNBQVMsRUFBRSxPQUZGO0FBR1RDLEVBQUFBLGdCQUFnQixFQUFFLFFBSFQ7QUFJVEMsRUFBQUEsSUFBSSxFQUFFO0FBSkcsQ0FBYjs7QUFPQSxJQUFNQyxJQUFJLEdBQUcsU0FBUEEsSUFBTyxDQUFBQyxVQUFVLEVBQUk7QUFDdkJDLHdCQUFTQyxLQUFULENBQWVDLElBQWYsQ0FBb0IsZ0NBQXBCOztBQUNBRix3QkFBU0csU0FBVDs7QUFDQSxNQUFNQyxXQUFXLEdBQUdKLHNCQUFTSSxXQUFULENBQXFCO0FBQ3JDQyxJQUFBQSxLQUFLLEVBQUUsRUFEOEI7QUFFckNDLElBQUFBLEtBQUssRUFBRSxRQUY4QjtBQUdyQ0MsSUFBQUEsR0FBRyxFQUFFLEtBSGdDO0FBSXJDQyxJQUFBQSxPQUFPLEVBQUUsSUFKNEI7QUFLckNDLElBQUFBLFdBQVcsRUFBRSxHQUx3QjtBQU1yQ0MsSUFBQUEsUUFBUSxFQUFFO0FBTjJCLEdBQXJCLENBQXBCOztBQVNBLE1BQU1DLEdBQUcsR0FBRztBQUFFWCxJQUFBQSxRQUFRLEVBQUVBLHFCQUFaO0FBQXNCSSxJQUFBQSxXQUFXLEVBQUVBO0FBQW5DLEdBQVo7QUFFQUEsRUFBQUEsV0FBVyxDQUFDUSxNQUFaLENBQW1CYixVQUFVLENBQUNjLE1BQVgsQ0FBa0JBLE1BQXJDOztBQUNBYix3QkFBU2MsRUFBVCxDQUFZLEtBQVosRUFBbUIsVUFBQUMsSUFBSTtBQUFBLFdBQUlDLFdBQVcsQ0FBQ0wsR0FBRCxFQUFNWixVQUFOLENBQVgsQ0FBNkJnQixJQUE3QixDQUFKO0FBQUEsR0FBdkI7O0FBRUEsU0FBT0osR0FBUDtBQUNILENBbEJEOztBQW9CQSxJQUFNSyxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFDTCxHQUFELEVBQU1aLFVBQU47QUFBQSxTQUFxQixVQUFBa0IsT0FBTyxFQUFJO0FBQ2hELFFBQU1DLE1BQU0sR0FBRyxHQUFmOztBQUNBLFlBQVFELE9BQVI7QUFDQSxXQUFLeEIsSUFBSSxDQUFDQyxXQUFWO0FBQ0ksWUFBSUssVUFBVSxDQUFDYyxNQUFYLENBQWtCQSxNQUFsQixHQUEyQkssTUFBM0IsSUFBcUMsQ0FBekMsRUFBNENuQixVQUFVLENBQUNjLE1BQVgsQ0FBa0JNLFNBQWxCLENBQTRCcEIsVUFBVSxDQUFDYyxNQUFYLENBQWtCQSxNQUFsQixHQUEyQixHQUF2RDtBQUM1Qzs7QUFDSixXQUFLcEIsSUFBSSxDQUFDRSxTQUFWO0FBQ0ksWUFBSUksVUFBVSxDQUFDYyxNQUFYLENBQWtCQSxNQUFsQixHQUEyQkssTUFBM0IsSUFBcUMsQ0FBekMsRUFBNENuQixVQUFVLENBQUNjLE1BQVgsQ0FBa0JNLFNBQWxCLENBQTRCcEIsVUFBVSxDQUFDYyxNQUFYLENBQWtCQSxNQUFsQixHQUEyQixHQUF2RDtBQUM1Qzs7QUFDSixXQUFLcEIsSUFBSSxDQUFDRyxnQkFBVjtBQUNJLHNDQUFhd0IsSUFBYixDQUFrQixVQUFBQyxJQUFJO0FBQUEsaUJBQUlDLE9BQU8sQ0FBQ0MsR0FBUix5QkFBNkJGLElBQTdCLEVBQUo7QUFBQSxTQUF0QjtBQUNBOztBQUNKLFdBQUs1QixJQUFJLENBQUNJLElBQVY7QUFDSTJCLFFBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLENBQWI7QUFYSjs7QUFhQWQsSUFBQUEsR0FBRyxDQUFDUCxXQUFKLENBQWdCUSxNQUFoQixDQUF1QmIsVUFBVSxDQUFDYyxNQUFYLENBQWtCQSxNQUF6QztBQUNILEdBaEJtQjtBQUFBLENBQXBCOztlQWtCZWYsSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRlcm1pbmFsIH0gZnJvbSAndGVybWluYWwta2l0J1xuaW1wb3J0IGRldGVjdFNvbmcgZnJvbSAnLi9kZXRlY3Qtc29uZydcblxuY29uc3Qga2V5cyA9IHtcbiAgICBWT0xVTUVfRE9XTjogJ0xFRlQnLFxuICAgIFZPTFVNRV9VUDogJ1JJR0hUJyxcbiAgICBHRVRfQ1VSUkVOVF9TT05HOiAnQ1RSTF9BJyxcbiAgICBFWElUOiAnQ1RSTF9DJ1xufVxuXG5jb25zdCBpbml0ID0gbG9maVN0cmVhbSA9PiB7XG4gICAgdGVybWluYWwuZ3JlZW4uYm9sZCgnUGxheWluZyBDaGlsbGVkQ293IHN0cmVhbS4uLlxcbicpXG4gICAgdGVybWluYWwuZ3JhYklucHV0KClcbiAgICBjb25zdCBwcm9ncmVzc0JhciA9IHRlcm1pbmFsLnByb2dyZXNzQmFyKHtcbiAgICAgICAgd2lkdGg6IDgwLFxuICAgICAgICB0aXRsZTogJ1ZvbHVtZScsXG4gICAgICAgIGV0YTogZmFsc2UsXG4gICAgICAgIHBlcmNlbnQ6IHRydWUsXG4gICAgICAgIGJhckhlYWRDaGFyOiAnPScsXG4gICAgICAgIHN5bmNNb2RlOiB0cnVlXG4gICAgfSlcblxuICAgIGNvbnN0IGNsaSA9IHsgdGVybWluYWw6IHRlcm1pbmFsLCBwcm9ncmVzc0JhcjogcHJvZ3Jlc3NCYXIgfVxuXG4gICAgcHJvZ3Jlc3NCYXIudXBkYXRlKGxvZmlTdHJlYW0udm9sdW1lLnZvbHVtZSlcbiAgICB0ZXJtaW5hbC5vbigna2V5JywgbmFtZSA9PiBtZW51T25DbGljayhjbGksIGxvZmlTdHJlYW0pKG5hbWUpKVxuXG4gICAgcmV0dXJuIGNsaVxufVxuXG5jb25zdCBtZW51T25DbGljayA9IChjbGksIGxvZmlTdHJlYW0pID0+IGtleU5hbWUgPT4ge1xuICAgIGNvbnN0IG9mZnNldCA9IDAuMVxuICAgIHN3aXRjaCAoa2V5TmFtZSkge1xuICAgIGNhc2Uga2V5cy5WT0xVTUVfRE9XTjpcbiAgICAgICAgaWYgKGxvZmlTdHJlYW0udm9sdW1lLnZvbHVtZSAtIG9mZnNldCA+PSAwKSBsb2ZpU3RyZWFtLnZvbHVtZS5zZXRWb2x1bWUobG9maVN0cmVhbS52b2x1bWUudm9sdW1lIC0gMC4xKVxuICAgICAgICBicmVha1xuICAgIGNhc2Uga2V5cy5WT0xVTUVfVVA6XG4gICAgICAgIGlmIChsb2ZpU3RyZWFtLnZvbHVtZS52b2x1bWUgKyBvZmZzZXQgPD0gMSkgbG9maVN0cmVhbS52b2x1bWUuc2V0Vm9sdW1lKGxvZmlTdHJlYW0udm9sdW1lLnZvbHVtZSArIDAuMSlcbiAgICAgICAgYnJlYWtcbiAgICBjYXNlIGtleXMuR0VUX0NVUlJFTlRfU09ORzpcbiAgICAgICAgZGV0ZWN0U29uZygpLnRoZW4oc29uZyA9PiBjb25zb2xlLmxvZyhgQ3VycmVudCBzb25nOiAke3Nvbmd9YCkpXG4gICAgICAgIGJyZWFrXG4gICAgY2FzZSBrZXlzLkVYSVQ6XG4gICAgICAgIHByb2Nlc3MuZXhpdCgxKVxuICAgIH1cbiAgICBjbGkucHJvZ3Jlc3NCYXIudXBkYXRlKGxvZmlTdHJlYW0udm9sdW1lLnZvbHVtZSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdFxuIl19