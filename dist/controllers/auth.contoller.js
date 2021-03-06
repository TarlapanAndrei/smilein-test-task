"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.singup = void 0;
var typeorm_1 = require("typeorm");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var User_1 = require("../entity/User");
var catchAsync_1 = require("../utils/catchAsync");
var api_error_1 = __importDefault(require("../utils/api-error"));
var process_1 = __importDefault(require("process"));
var signToken = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, process_1.default.env.JWT_SECRET, {
        expiresIn: process_1.default.env.JWT_EXPIRES_IN
    });
};
exports.singup = catchAsync_1.catchAsync(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newUser, userJwt, jsonstring, userId, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                    passwordConfirmation: req.body.passwordConfirmation,
                };
                newUser = typeorm_1.getRepository(User_1.User).create(user);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(newUser)];
            case 1:
                userJwt = _a.sent();
                jsonstring = JSON.stringify(userJwt);
                userId = JSON.parse(jsonstring).id;
                token = signToken(userId);
                return [2 /*return*/, res.status(200).json({
                        status: 'success',
                        data: {
                            newUser: newUser,
                            token: token
                        }
                    })];
        }
    });
}); });
exports.login = catchAsync_1.catchAsync(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, _b, token;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOneOrFail({
                        where: { email: email },
                        select: ['password', 'id']
                    })];
            case 1:
                user = _c.sent();
                _b = !user;
                if (_b) return [3 /*break*/, 3];
                return [4 /*yield*/, correctPassword(password, user.password)];
            case 2:
                _b = !(_c.sent());
                _c.label = 3;
            case 3:
                if (_b) {
                    return [2 /*return*/, next(new api_error_1.default(404, 'incorect email or password'))];
                }
                token = signToken(user.id);
                res.status(200).json({
                    status: 'success',
                    user: user,
                    token: token
                });
                return [2 /*return*/];
        }
    });
}); });
var correctPassword = function (candidatePassword, userPassword) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcrypt_1.default.compare(candidatePassword, userPassword)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
