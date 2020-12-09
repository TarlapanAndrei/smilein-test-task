"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = require("../controllers/auth.controller");
var comment_controller_1 = require("../controllers/comment.controller");
var blog_controller_1 = require("../controllers/blog.controller");
var router = express_1.Router({ mergeParams: true });
router
    .route('/')
    .get(auth_controller_1.protect, comment_controller_1.getBlogComments)
    .post(auth_controller_1.protect, blog_controller_1.chechIfTheBlogIsPublished, comment_controller_1.createComment);
router
    .route('/:commentId')
    .put(auth_controller_1.protect, comment_controller_1.updateComment)
    .delete(auth_controller_1.protect, comment_controller_1.deleteComment);
exports.default = router;
