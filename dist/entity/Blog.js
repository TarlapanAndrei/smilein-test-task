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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Comment_1 = require("./Comment");
var Blog = /** @class */ (function (_super) {
    __extends(Blog, _super);
    function Blog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Blog.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Blog.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Blog.prototype, "content", void 0);
    __decorate([
        typeorm_1.Column({ default: false }),
        __metadata("design:type", Boolean)
    ], Blog.prototype, "active", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Blog.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Blog.prototype, "updatedAt", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Blog.prototype, "ownerId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.blogs; }, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
        typeorm_1.JoinColumn({ name: "ownerId" }),
        __metadata("design:type", User_1.User)
    ], Blog.prototype, "owner", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Comment_1.Comment; }, function (comment) { return comment.blog; }, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
        __metadata("design:type", Array)
    ], Blog.prototype, "comments", void 0);
    Blog = __decorate([
        typeorm_1.Entity('blogs')
    ], Blog);
    return Blog;
}(typeorm_1.BaseEntity));
exports.Blog = Blog;
