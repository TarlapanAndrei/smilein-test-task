"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var validate_midleware_1 = require("../utils/validate-midleware");
var create_blog_dto_1 = require("../dto/create-blog.dto");
var blog_controller_1 = require("../controllers/blog.controller");
var auth_controller_1 = require("../controllers/auth.controller");
var comments_routes_1 = __importDefault(require("./comments.routes"));
router.use('/:id/comments', comments_routes_1.default);
router
    .route('/mybloges')
    .get(auth_controller_1.protect, blog_controller_1.getPersonalBlogs);
router
    .route('/')
    .get(auth_controller_1.protect, blog_controller_1.getBlogs)
    .post(validate_midleware_1.validateDtoFunc(create_blog_dto_1.createBlogDto), auth_controller_1.protect, blog_controller_1.createBlog);
router
    .route('/:id')
    .get(auth_controller_1.protect, blog_controller_1.getOneBlog)
    .put(auth_controller_1.protect, blog_controller_1.updateBlog)
    .delete(auth_controller_1.protect, blog_controller_1.deleteBlog);
router
    .route('/:id/publish')
    .put(auth_controller_1.protect, blog_controller_1.publishBlog);
exports.default = router;
