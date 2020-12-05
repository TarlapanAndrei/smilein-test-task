"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiErrorHandler = void 0;
var api_error_1 = __importDefault(require("./api-error"));
var apiErrorHandler = function (err, req, res, next) {
    if (err instanceof api_error_1.default) {
        return res.status(err.code).json(err.message);
    }
    return res.status(500).json('someting went wrong');
};
exports.apiErrorHandler = apiErrorHandler;
