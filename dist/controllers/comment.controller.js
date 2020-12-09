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
exports.deleteComment = exports.updateComment = exports.createComment = exports.getBlogComments = void 0;
var typeorm_1 = require("typeorm");
var Comment_1 = require("../entity/Comment");
var catchAsync_1 = require("../utils/catchAsync");
var api_error_1 = __importDefault(require("../utils/api-error"));
exports.getBlogComments = catchAsync_1.catchAsync(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var allComments;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Comment_1.Comment).find({
                    where: {
                        blogId: req.params.id
                    }
                })];
            case 1:
                allComments = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        status: 'success',
                        results: allComments.length,
                        data: { allComments: allComments }
                    })];
        }
    });
}); });
exports.createComment = catchAsync_1.catchAsync(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var commentData, newComment;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.user) {
                    next(new api_error_1.default(401, 'you have to be authorized'));
                }
                commentData = {
                    ownerId: req.body.user.id,
                    blogId: req.params.id,
                    content: req.body.content
                };
                newComment = typeorm_1.getRepository(Comment_1.Comment).create(commentData);
                return [4 /*yield*/, typeorm_1.getRepository(Comment_1.Comment).save(newComment)];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        status: 'success',
                        data: newComment
                    })];
        }
    });
}); });
exports.updateComment = catchAsync_1.catchAsync(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedComment;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getConnection()
                    .createQueryBuilder()
                    .update(Comment_1.Comment)
                    .set({
                    content: req.body.content
                })
                    .returning("*")
                    .where({ id: req.params.commentId, ownerId: req.body.user.id })
                    .execute()
                    .then(function (response) {
                    return response.raw[0];
                })];
            case 1:
                updatedComment = _a.sent();
                if (!updatedComment) {
                    return [2 /*return*/, next(new api_error_1.default(404, 'No comment with that ID'))];
                }
                return [2 /*return*/, res.status(200).json({
                        status: 'success',
                        data: { updatedComment: updatedComment }
                    })];
        }
    });
}); });
exports.deleteComment = catchAsync_1.catchAsync(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedComment, deletedComment;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(req.body.user.role === 'ADMIN' || req.body.user.role === 'SUPERADMIN')) return [3 /*break*/, 2];
                return [4 /*yield*/, typeorm_1.getConnection()
                        .createQueryBuilder()
                        .delete()
                        .from(Comment_1.Comment)
                        .returning("*")
                        .where("id = :id", { id: req.params.commentId })
                        .execute()
                        .then(function (response) {
                        return response.affected;
                    })];
            case 1:
                deletedComment = _a.sent();
                if (!deletedComment) {
                    return [2 /*return*/, next(new api_error_1.default(404, 'no comment with this Id'))];
                }
                return [2 /*return*/, res.status(200).json({
                        status: 'success',
                        data: 'deleted By Admin'
                    })];
            case 2: return [4 /*yield*/, typeorm_1.getConnection()
                    .createQueryBuilder()
                    .delete()
                    .from(Comment_1.Comment)
                    .returning("*")
                    .where('id = :id and "ownerId" = :ownerId', { id: req.params.commentId, ownerId: req.body.user.id })
                    .execute()
                    .then(function (response) {
                    return response.affected;
                })];
            case 3:
                deletedComment = _a.sent();
                if (!deletedComment) {
                    return [2 /*return*/, next(new api_error_1.default(404, "You don't have any comment with this Id"))];
                }
                return [2 /*return*/, res.status(200).json({
                        status: 'success',
                        data: 'deleted',
                    })];
        }
    });
}); });
