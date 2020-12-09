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
exports.chechIfTheBlogIsPublished = exports.publishBlog = exports.getPersonalBlogs = exports.deleteBlog = exports.createBlog = exports.updateBlog = exports.getOneBlog = exports.getBlogs = void 0;
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
                        { active: true }
                    ]
                })];
            case 1:
                blogs = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        status: 'success',
                        results: blogs.length,
                        data: blogs
                    })];
        }
    });
}); });
exports.getOneBlog = catchAsync_1.catchAsync(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var blog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Blog_1.Blog).findOne({ where: [{ id: req.params.id, ownerId: req.body.user.id }, { id: req.params.id, active: true }] })];
            case 1:
                blog = _a.sent();
                if (!blog) {
                    return [2 /*return*/, next(new api_error_1.default(404, "Blog not found"))];
                }
                return [2 /*return*/, res.status(200).json({
                        status: "success",
                        data: { blog: blog }
                    })];
        }
    });
}); });
exports.updateBlog = catchAsync_1.catchAsync(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var blog, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Blog_1.Blog).findOneOrFail(req.params.id)];
            case 1:
                blog = _a.sent();
                if (!blog) {
                    return [2 /*return*/, next(new api_error_1.default(404, 'Blog not found'))];
                }
                typeorm_1.getRepository(Blog_1.Blog).merge(blog, req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Blog_1.Blog).save(blog)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        status: 'success',
                        data: results
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
                    blogId: req.body.blogId,
                    active: req.body.active
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
exports.deleteBlog = catchAsync_1.catchAsync(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedBlog, deletedBlog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(req.body.user.role === 'ADMIN' || req.body.user.role === 'SUPERADMIN')) return [3 /*break*/, 2];
                return [4 /*yield*/, typeorm_1.getRepository(Blog_1.Blog).delete({ id: req.params.id, active: true })];
            case 1:
                deletedBlog = _a.sent();
                if (deletedBlog.affected === 0) {
                    return [2 /*return*/, next(new api_error_1.default(404, "No published Blog with this Id"))];
                }
                return [2 /*return*/, res.status(201).json({
                        status: 'success',
                        data: 'deleted'
                    })];
            case 2: return [4 /*yield*/, typeorm_1.getRepository(Blog_1.Blog).delete({ id: req.params.id, ownerId: req.body.user.id })];
            case 3:
                deletedBlog = _a.sent();
                if (deletedBlog.affected === 0) {
                    return [2 /*return*/, next(new api_error_1.default(404, "You don't have a personal blog with this Id"))];
                }
                return [2 /*return*/, res.status(201).json({
                        status: 'success',
                        data: 'deleted'
                    })];
        }
    });
}); });
exports.getPersonalBlogs = catchAsync_1.catchAsync(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, personalBlogs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.body.user;
                if (!user) {
                    return [2 /*return*/, next(new api_error_1.default(403, 'You are not logged in, please log in'))];
                }
                return [4 /*yield*/, typeorm_1.getRepository(Blog_1.Blog).find({
                        where: {
                            "ownerId": req.body.user.id
                        }
                    })];
            case 1:
                personalBlogs = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        status: "success",
                        quantity: personalBlogs.length,
                        data: personalBlogs,
                    })];
        }
    });
}); });
exports.publishBlog = catchAsync_1.catchAsync(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var publishUnpublish;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getConnection()
                    .createQueryBuilder()
                    .update(Blog_1.Blog)
                    .set({
                    active: req.body.active
                })
                    .returning("*")
                    .where({ id: req.params.id, ownerId: req.body.user.id })
                    .execute()
                    .then(function (response) {
                    return response.raw[0];
                })];
            case 1:
                publishUnpublish = _a.sent();
                if (!publishUnpublish) {
                    return [2 /*return*/, next(new api_error_1.default(404, 'No comment with that ID'))];
                }
                return [2 /*return*/, res.status(200).json({
                        status: 'success',
                        data: publishUnpublish
                    })];
        }
    });
}); });
exports.chechIfTheBlogIsPublished = catchAsync_1.catchAsync(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var blog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Blog_1.Blog).find({ where: { id: req.params.id, active: true } })];
            case 1:
                blog = _a.sent();
                if (blog.length === 0) {
                    return [2 /*return*/, next(new api_error_1.default(404, 'no published blog found with this id'))];
                }
                next();
                return [2 /*return*/];
        }
    });
}); });
