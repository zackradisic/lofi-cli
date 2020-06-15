"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateControls = exports.createControls = void 0;

var _blessed = _interopRequireDefault(require("blessed"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createControls = function createControls() {
  return {
    currentSong: undefined,
    volume: 1,
    box: _blessed["default"].box({
      width: '100%',
      height: '100%',
      tags: true,
      style: {
        fg: 'white',
        bg: '#ad006e'
      },
      content: createText()
    })
  };
};

exports.createControls = createControls;

var createText = function createText(currentSong) {
  var volume = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return '\n\n'.concat("{bold}Volume{/bold} [{#11A5AD-fg}{bold}".concat(getVolumeBars(volume), "{/}]")).concat("\n{bold}Current Song{/bold}: ".concat(currentSong || 'Press CTRL + A'));
};

var getVolumeBars = function getVolumeBars(volume) {
  return Array.from(Array(Math.floor(volume * 10))).reduce(function (acc, curr) {
    return acc.concat('==');
  }, '').concat(Array.from(Array(10 - Math.floor(volume * 10))).reduce(function (acc, curr) {
    return acc.concat('  ');
  }, ''));
};

var updateControls = function updateControls(controls) {
  return controls.box.content = createText(controls.currentSong, controls.volume);
};

exports.updateControls = updateControls;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY29udHJvbHMuanMiXSwibmFtZXMiOlsiY3JlYXRlQ29udHJvbHMiLCJjdXJyZW50U29uZyIsInVuZGVmaW5lZCIsInZvbHVtZSIsImJveCIsImJsZXNzZWQiLCJ3aWR0aCIsImhlaWdodCIsInRhZ3MiLCJzdHlsZSIsImZnIiwiYmciLCJjb250ZW50IiwiY3JlYXRlVGV4dCIsImNvbmNhdCIsImdldFZvbHVtZUJhcnMiLCJBcnJheSIsImZyb20iLCJNYXRoIiwiZmxvb3IiLCJyZWR1Y2UiLCJhY2MiLCJjdXJyIiwidXBkYXRlQ29udHJvbHMiLCJjb250cm9scyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBRU8sSUFBTUEsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQjtBQUFBLFNBQU87QUFDakNDLElBQUFBLFdBQVcsRUFBRUMsU0FEb0I7QUFFakNDLElBQUFBLE1BQU0sRUFBRSxDQUZ5QjtBQUdqQ0MsSUFBQUEsR0FBRyxFQUFFQyxvQkFBUUQsR0FBUixDQUFZO0FBQ2JFLE1BQUFBLEtBQUssRUFBRSxNQURNO0FBRWJDLE1BQUFBLE1BQU0sRUFBRSxNQUZLO0FBR2JDLE1BQUFBLElBQUksRUFBRSxJQUhPO0FBSWJDLE1BQUFBLEtBQUssRUFBRTtBQUNIQyxRQUFBQSxFQUFFLEVBQUUsT0FERDtBQUVIQyxRQUFBQSxFQUFFLEVBQUU7QUFGRCxPQUpNO0FBUWJDLE1BQUFBLE9BQU8sRUFBRUMsVUFBVTtBQVJOLEtBQVo7QUFINEIsR0FBUDtBQUFBLENBQXZCOzs7O0FBZVAsSUFBTUEsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQ1osV0FBRDtBQUFBLE1BQWNFLE1BQWQsdUVBQXVCLENBQXZCO0FBQUEsU0FBNkIsT0FDM0NXLE1BRDJDLGtEQUNNQyxhQUFhLENBQUNaLE1BQUQsQ0FEbkIsV0FFM0NXLE1BRjJDLHdDQUVKYixXQUFXLElBQUksZ0JBRlgsRUFBN0I7QUFBQSxDQUFuQjs7QUFJQSxJQUFNYyxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUFaLE1BQU07QUFBQSxTQUFJYSxLQUFLLENBQUNDLElBQU4sQ0FDNUJELEtBQUssQ0FBQ0UsSUFBSSxDQUFDQyxLQUFMLENBQVdoQixNQUFNLEdBQUcsRUFBcEIsQ0FBRCxDQUR1QixFQUUzQmlCLE1BRjJCLENBRXBCLFVBQUNDLEdBQUQsRUFBTUMsSUFBTjtBQUFBLFdBQWVELEdBQUcsQ0FBQ1AsTUFBSixDQUFXLElBQVgsQ0FBZjtBQUFBLEdBRm9CLEVBRWEsRUFGYixFQUczQkEsTUFIMkIsQ0FJeEJFLEtBQUssQ0FBQ0MsSUFBTixDQUFXRCxLQUFLLENBQUMsS0FBS0UsSUFBSSxDQUFDQyxLQUFMLENBQVdoQixNQUFNLEdBQUcsRUFBcEIsQ0FBTixDQUFoQixFQUFnRGlCLE1BQWhELENBQXVELFVBQUNDLEdBQUQsRUFBTUMsSUFBTjtBQUFBLFdBQWVELEdBQUcsQ0FBQ1AsTUFBSixDQUFXLElBQVgsQ0FBZjtBQUFBLEdBQXZELEVBQXdGLEVBQXhGLENBSndCLENBQUo7QUFBQSxDQUE1Qjs7QUFPTyxJQUFNUyxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLENBQUFDLFFBQVE7QUFBQSxTQUFLQSxRQUFRLENBQUNwQixHQUFULENBQWFRLE9BQWIsR0FBdUJDLFVBQVUsQ0FBQ1csUUFBUSxDQUFDdkIsV0FBVixFQUF1QnVCLFFBQVEsQ0FBQ3JCLE1BQWhDLENBQXRDO0FBQUEsQ0FBL0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmxlc3NlZCBmcm9tICdibGVzc2VkJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ29udHJvbHMgPSAoKSA9PiAoe1xuICAgIGN1cnJlbnRTb25nOiB1bmRlZmluZWQsXG4gICAgdm9sdW1lOiAxLFxuICAgIGJveDogYmxlc3NlZC5ib3goe1xuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgdGFnczogdHJ1ZSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGZnOiAnd2hpdGUnLFxuICAgICAgICAgICAgYmc6ICcjYWQwMDZlJ1xuICAgICAgICB9LFxuICAgICAgICBjb250ZW50OiBjcmVhdGVUZXh0KClcbiAgICB9KVxufSlcblxuY29uc3QgY3JlYXRlVGV4dCA9IChjdXJyZW50U29uZywgdm9sdW1lID0gMSkgPT4gJ1xcblxcbidcbiAgICAuY29uY2F0KGB7Ym9sZH1Wb2x1bWV7L2JvbGR9IFt7IzExQTVBRC1mZ317Ym9sZH0ke2dldFZvbHVtZUJhcnModm9sdW1lKX17L31dYClcbiAgICAuY29uY2F0KGBcXG57Ym9sZH1DdXJyZW50IFNvbmd7L2JvbGR9OiAke2N1cnJlbnRTb25nIHx8ICdQcmVzcyBDVFJMICsgQSd9YClcblxuY29uc3QgZ2V0Vm9sdW1lQmFycyA9IHZvbHVtZSA9PiBBcnJheS5mcm9tKFxuICAgIEFycmF5KE1hdGguZmxvb3Iodm9sdW1lICogMTApKSlcbiAgICAucmVkdWNlKChhY2MsIGN1cnIpID0+IGFjYy5jb25jYXQoJz09JyksICcnKVxuICAgIC5jb25jYXQoXG4gICAgICAgIEFycmF5LmZyb20oQXJyYXkoMTAgLSBNYXRoLmZsb29yKHZvbHVtZSAqIDEwKSkpLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiBhY2MuY29uY2F0KCcgICcpLCAnJylcbiAgICApXG5cbmV4cG9ydCBjb25zdCB1cGRhdGVDb250cm9scyA9IGNvbnRyb2xzID0+IChjb250cm9scy5ib3guY29udGVudCA9IGNyZWF0ZVRleHQoY29udHJvbHMuY3VycmVudFNvbmcsIGNvbnRyb2xzLnZvbHVtZSkpXG4iXX0=