"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorExemple = /** @class */ (function () {
    function ErrorExemple() {
    }
    return ErrorExemple;
}());
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError(code, message) {
        var _this = _super.call(this) || this;
        _this.code = code;
        _this.message = message;
        return _this;
    }
    ApiError.badRequest = function (msg) {
        return new ApiError(400, msg);
    };
    return ApiError;
}(ErrorExemple));
exports.default = ApiError;
