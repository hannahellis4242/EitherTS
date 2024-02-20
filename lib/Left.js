"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.left = void 0;
const Right_1 = __importDefault(require("./Right"));
class Left {
    constructor(data) {
        this.data = data;
    }
    then(fn) {
        return fn(this.data);
    }
    swap() {
        return new Right_1.default(this.data);
    }
    getOrThrow() {
        return this.data;
    }
    getOr(_) {
        return this.data;
    }
    map(fn) {
        return new Left(fn(this.data));
    }
}
exports.default = Left;
const left = (x) => new Left(x);
exports.left = left;
