"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.right = void 0;
const Left_1 = __importDefault(require("./Left"));
class Right {
    constructor(data) {
        this.data = data;
    }
    promisify() {
        return Promise.reject(this.data);
    }
    then(_) {
        return this;
    }
    map(_) {
        return new Right(this.data);
    }
    swap() {
        return new Left_1.default(this.data);
    }
    getOrThrow() {
        throw new Error("Either : Attempting to get a Left value from a Right instance");
    }
    getOr(x) {
        return x;
    }
}
exports.default = Right;
const right = (x) => new Right(x);
exports.right = right;
