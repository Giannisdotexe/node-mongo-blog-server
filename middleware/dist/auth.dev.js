"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var auth = function auth(req, res, next) {
  var token, isCustomAuth, decodedData;
  return regeneratorRuntime.async(function auth$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            token = req.headers.authorization.split(" ")[1];
            isCustomAuth = token.length < 500;

            if (token && isCustomAuth) {
              decodedData = _jsonwebtoken["default"].verify(token, "test");
              req.userId = decodedData;
            }
          } catch (error) {
            console.log(error);
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};