"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathTest = void 0;
var micromatch_1 = __importDefault(require("micromatch"));
/**
 * test the path by some glob options
 * @param path changed file path
 * @param options glob pattern condition
 */
function pathTest(path, options) {
    var _a = options || {}, _b = _a.exclude, exclude = _b === void 0 ? ['node_modules/**/*'] : _b, _c = _a.include, include = _c === void 0 ? ['**/*.ts'] : _c;
    var inc = Array.isArray(include) ? include : [include];
    var tested = inc.some(function (i) {
        var isMatch = micromatch_1.default.matcher(i, { ignore: exclude });
        return isMatch(path);
    });
    return tested;
}
exports.pathTest = pathTest;
