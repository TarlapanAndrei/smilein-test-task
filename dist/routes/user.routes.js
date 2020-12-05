"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var validate_midleware_1 = require("../utils/validate-midleware");
var user_controller_1 = require("../controllers/user.controller");
var auth_controller_1 = require("../controllers/auth.controller");
var new_user_dto_1 = require("../dto/new-user.dto");
var auth_credentials_dto_1 = require("../dto/auth-credentials.dto");
var auth_controller_2 = require("../controllers/auth.controller");
var blog_controller_1 = require("../controllers/blog.controller");
router.post('/signup', validate_midleware_1.validateDtoFunc(new_user_dto_1.validateDto), auth_controller_1.singup);
router.post('/signin', validate_midleware_1.validateDtoFunc(auth_credentials_dto_1.validateSingInDto), auth_controller_1.login);
router
    .route('/')
    .get(user_controller_1.getUsers)
    .post(user_controller_1.createUser);
router
    .route('/:id')
    .get(user_controller_1.getUser)
    .put(user_controller_1.updateUser)
    .delete(user_controller_1.deleteUsers);
router
    .route('/:id/blogs')
    .get(auth_controller_2.protect, blog_controller_1.getPersonalBlogs);
router
    .route('/:id/blogs/:blogId');
exports.default = router;
