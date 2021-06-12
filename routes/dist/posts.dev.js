"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _posts = require("../controllers/posts.js");

var _auth = _interopRequireDefault(require("../middleware/auth.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/", _posts.getPosts);
router.post("/", _auth["default"], _posts.createPost);
router.get("/:id", _posts.getSinglePost);
router.patch("/:id", _auth["default"], _posts.updatePost);
router["delete"]("/:id", _auth["default"], _posts.deletePost);
router.patch("/:id/like", _auth["default"], _posts.likePost);
var _default = router;
exports["default"] = _default;