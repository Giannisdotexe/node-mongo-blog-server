"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSinglePost = exports.likePost = exports.deletePost = exports.updatePost = exports.createPost = exports.getPosts = void 0;

var _postMessage = _interopRequireDefault(require("../models/postMessage.js"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getPosts = function getPosts(req, res) {
  var postMessages;
  return regeneratorRuntime.async(function getPosts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_postMessage["default"].find());

        case 3:
          postMessages = _context.sent;
          res.status(200).json(postMessages);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(404).json({
            message: _context.t0.message
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getPosts = getPosts;

var createPost = function createPost(req, res) {
  var post, newPost;
  return regeneratorRuntime.async(function createPost$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          post = req.body;
          newPost = new _postMessage["default"](post);
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(newPost.save({
            createdAt: new Date()
          }));

        case 5:
          res.status(201).json(newPost);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](2);
          res.status(409).json({
            message: _context2.t0.message
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 8]]);
};

exports.createPost = createPost;

var updatePost = function updatePost(req, res) {
  var _id, post, updatedPost;

  return regeneratorRuntime.async(function updatePost$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _id = req.params.id;
          post = req.body;

          if (_mongoose["default"].Types.ObjectId.isValid(_id)) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt("return", res.status(404).send("No post found"));

        case 4:
          _context3.next = 6;
          return regeneratorRuntime.awrap(_postMessage["default"].findByIdAndUpdate(_id, _objectSpread({}, post, {
            _id: _id
          }), {
            "new": true
          }));

        case 6:
          updatedPost = _context3.sent;
          res.json(updatedPost);

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.updatePost = updatePost;

var deletePost = function deletePost(req, res) {
  var id;
  return regeneratorRuntime.async(function deletePost$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;

          if (_mongoose["default"].Types.ObjectId.isValid(id)) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", res.status(404).send("No post found"));

        case 3:
          _context4.next = 5;
          return regeneratorRuntime.awrap(_postMessage["default"].findByIdAndRemove(id));

        case 5:
          res.json({
            message: "Post deleted forever"
          });

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.deletePost = deletePost;

var likePost = function likePost(req, res) {
  var id, post, index, updatedPost;
  return regeneratorRuntime.async(function likePost$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;

          if (req.userId) {
            _context5.next = 3;
            break;
          }

          return _context5.abrupt("return", res.json({
            message: "Not Authenticated"
          }));

        case 3:
          if (_mongoose["default"].Types.ObjectId.isValid(id)) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", res.status(404).send("No post found"));

        case 5:
          _context5.next = 7;
          return regeneratorRuntime.awrap(_postMessage["default"].findById(id));

        case 7:
          post = _context5.sent;
          index = post.likes.findIndex(function (id) {
            return id === String(req.userId);
          });

          if (index === -1) {
            post.likes.push(req.userId);
          } else {
            post.likes = post.likes.filter(function (id) {
              return id !== String(req.userId);
            });
          }

          _context5.next = 12;
          return regeneratorRuntime.awrap(_postMessage["default"].findByIdAndUpdate(id, post, {
            "new": true
          }));

        case 12:
          updatedPost = _context5.sent;
          res.json(updatedPost);

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.likePost = likePost;

var getSinglePost = function getSinglePost(req, res) {
  var id, post;
  return regeneratorRuntime.async(function getSinglePost$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;

          if (_mongoose["default"].Types.ObjectId.isValid(id)) {
            _context6.next = 3;
            break;
          }

          return _context6.abrupt("return", res.status(404).send("No post found"));

        case 3:
          _context6.next = 5;
          return regeneratorRuntime.awrap(_postMessage["default"].findById(id));

        case 5:
          post = _context6.sent;
          res.json(post);

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.getSinglePost = getSinglePost;