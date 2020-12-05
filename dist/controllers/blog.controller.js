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
exports.getPersonalBlogs = exports.deleteBlog = exports.createBlog = exports.updateBlog = exports.getBlog = exports.getBlogs = void 0;
var typeorm_1 = require("typeorm");
var Blog_1 = require("../entity/Blog");
var catchAsync_1 = require("../utils/catchAsync");
var api_error_1 = __importDefault(require("../utils/api-error"));
exports.getBlogs = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var blogs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Blog_1.Blog).find({
                    where: [
                        { active: true },
                        { active: false, ownerId: req.body.user.id }
                    ]
                })];
            case 1:
                blogs = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        status: 'success',
                        length: blogs.length,
                        data: blogs
                    })];
        }
    });
}); });
exports.getBlog = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var blog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Blog_1.Blog).findOne(req.params.id)];
            case 1:
                blog = _a.sent();
                return [2 /*return*/, res.status(200).json(blog)];
        }
    });
}); });
exports.updateBlog = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var blog, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Blog_1.Blog).findOne(req.params.id)];
            case 1:
                blog = _a.sent();
                if (!blog) return [3 /*break*/, 4];
                return [4 /*yield*/, typeorm_1.getRepository(Blog_1.Blog).merge(blog, req.body)];
            case 2:
                _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Blog_1.Blog).save(blog)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        status: 'success',
                        data: results
                    })];
            case 4: return [2 /*return*/, res.status(404).json({
                    status: 'error',
                    data: 'not found'
                })];
        }
    });
}); });
exports.createBlog = catchAsync_1.catchAsync(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var blog, newBlog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.user) {
                    next(new api_error_1.default(401, 'you hav to be authorized'));
                }
                blog = {
                    title: req.body.title,
                    content: req.body.content,
                    ownerId: req.body.user.id,
                    blogId: req.body.blogId
                };
                newBlog = typeorm_1.getRepository(Blog_1.Blog).create(blog);
                return [4 /*yield*/, typeorm_1.getRepository(Blog_1.Blog).save(newBlog)];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        status: 'success',
                        data: newBlog
                    })];
        }
    });
}); });
exports.deleteBlog = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Blog_1.Blog).delete(req.params.id)];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(201).json({
                        status: 'success',
                        data: 'deleted'
                    })];
        }
    });
}); });
exports.getPersonalBlogs = catchAsync_1.catchAsync(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var personalBlogs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.params.id);
                console.log(req.body.user.id);
                if (!(req.params.id === req.body.user.id)) return [3 /*break*/, 2];
                return [4 /*yield*/, typeorm_1.getRepository(Blog_1.Blog).find({
                        where: {
                            "ownerId": req.params.id
                        }
                    })];
            case 1:
                personalBlogs = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        status: "success",
                        quantity: personalBlogs.length,
                        data: personalBlogs,
                    })];
            case 2:
                exports.getBlogs(req, res, next);
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
