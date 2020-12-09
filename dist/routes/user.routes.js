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
var change_status_dto_1 = require("../dto/change-status.dto");
router.post('/signup', validate_midleware_1.validateDtoFunc(new_user_dto_1.validateDto), auth_controller_1.singup);
router.post('/signin', validate_midleware_1.validateDtoFunc(auth_credentials_dto_1.validateSingInDto), auth_controller_1.login);
router
    .route('/')
    .get(auth_controller_2.protect, auth_controller_2.adminRestriction, user_controller_1.getUsers);
router
    .route('/:id')
    .get(auth_controller_2.protect, auth_controller_2.adminRestriction, user_controller_1.getUser)
    .delete(auth_controller_2.protect, auth_controller_2.superAdminRestriction, user_controller_1.deleteUsers);
router
    .route('/:id/userstoupdate/:userId')
    .put(validate_midleware_1.validateDtoFunc(change_status_dto_1.changeStatusDto), auth_controller_2.protect, auth_controller_2.superAdminRestriction, user_controller_1.uptateTheRole);
exports.default = router;
