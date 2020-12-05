"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var blog_controller_1 = require("../controllers/blog.controller");
var auth_controller_1 = require("../controllers/auth.controller");
router
    .route('/')
    .get(auth_controller_1.protect, blog_controller_1.getBlogs)
    .post(auth_controller_1.protect, blog_controller_1.createBlog);
router
    .route('/:id')
    .get(blog_controller_1.getBlog)
    .put(blog_controller_1.updateBlog)
    .delete(blog_controller_1.deleteBlog);
exports.default = router;
