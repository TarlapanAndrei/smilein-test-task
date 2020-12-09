"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var comment_controller_1 = require("../../src/controllers/comment.controller");
jest.mock('typeorm', function () { return ({ getRepository: jest.fn() }); });
describe('comment.controller', function () {
    describe('create comment', function () {
        it('should be a function', function () {
            var commentRepo = { find: find };
            expect(comment_controller_1.createComment).toBe("[function]");
        });
    });
});
