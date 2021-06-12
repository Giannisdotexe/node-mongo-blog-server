"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = exports.signIn = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../models/user.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var signIn = function signIn(req, res) {
  var _req$body, email, password, existingUser, isPasswordCorrect, token;

  return regeneratorRuntime.async(function signIn$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_user["default"].findOne({
            email: email
          }));

        case 4:
          existingUser = _context.sent;

          if (existingUser) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            message: "User doesn't exist"
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(_bcryptjs["default"].compare(password, existingUser.password));

        case 9:
          isPasswordCorrect = _context.sent;

          if (isPasswordCorrect) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "Invalid credentials"
          }));

        case 12:
          token = _jsonwebtoken["default"].sign({
            email: existingUser.email,
            id: existingUser._id
          }, "test", //process.env.SECRET_KEY
          {
            expiresIn: "1w"
          });
          res.status(200).json({
            result: existingUser,
            token: token
          });
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](1);
          res.status(500).json({
            error: _context.t0
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 16]]);
};

exports.signIn = signIn;

var signUp = function signUp(req, res) {
  var _req$body2, email, password, confirmPassword, firstName, lastName, existingUser, hashedPassword, result, token;

  return regeneratorRuntime.async(function signUp$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password, confirmPassword = _req$body2.confirmPassword, firstName = _req$body2.firstName, lastName = _req$body2.lastName;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_user["default"].findOne({
            email: email
          }));

        case 4:
          existingUser = _context2.sent;

          if (!existingUser) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "Email already in use"
          }));

        case 7:
          if (!(password !== confirmPassword)) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "Passwords don't match"
          }));

        case 9:
          _context2.next = 11;
          return regeneratorRuntime.awrap(_bcryptjs["default"].hash(password, 12));

        case 11:
          hashedPassword = _context2.sent;
          _context2.next = 14;
          return regeneratorRuntime.awrap(_user["default"].create({
            email: email,
            password: hashedPassword,
            name: "".concat(firstName, " ").concat(lastName)
          }));

        case 14:
          result = _context2.sent;
          token = _jsonwebtoken["default"].sign({
            email: result.email,
            id: result._id
          }, "test", //process.env.SECRET_KEY
          {
            expiresIn: "1w"
          });
          res.status(200).json({
            result: result,
            token: token
          });
          _context2.next = 22;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json({
            error: _context2.t0
          });

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 19]]);
};

exports.signUp = signUp;