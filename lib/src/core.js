"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectronHmr = void 0;
var chokidar_1 = require("chokidar");
var child_process_1 = __importDefault(require("child_process"));
var console_1 = require("./console");
/**
 * the core of electron-hmr
 */
var ElectronHmr = /** @class */ (function () {
    function ElectronHmr(options) {
        this.options = options;
        var electronBinaryPath = options.electronBinaryPath, _a = options.args, args = _a === void 0 ? ["."] : _a;
        this.electronProcess = child_process_1.default.spawn(electronBinaryPath, args);
    }
    /**
     * use chokidar to watch files and rebuild electron
     * @param options {@link ElectronHmrWatchOptions}
     */
    ElectronHmr.prototype.watch = function (options) {
        var _this = this;
        chokidar_1.watch('.').on('change', function (path, stats) {
            if (stats === null || stats === void 0 ? void 0 : stats.isFile) {
                _this.update(path, options);
            }
        });
    };
    /**
     * rebuild the electron
     */
    ElectronHmr.prototype.update = function (path, options) {
        var _a = options || {}, exclude = _a.exclude, _b = _a.include, include = _b === void 0 ? ['.'] : _b;
        if (exclude) {
            var exc = Array.isArray(exclude) ? exclude : [exclude];
            // if path is not exclude
            if (exc && pathSomeTest(exc)) {
                return;
            }
        }
        else {
            var inc = Array.isArray(include) ? include : [include];
            if (pathSomeTest(inc)) {
                this.rebuild();
                if (console && this.electronProcess) {
                    console_1.ElectronHmrConsole(this.electronProcess, this.options.consoleOptions || {});
                }
            }
        }
        function pathSomeTest(condition) {
            return condition.map(function (e) { return RegExp(e); }).some(function (e) { return e.test(path); });
        }
    };
    /**
     * rebuild the electron
     * @param options {@link ElectronHrmBuildOptions} default
     */
    ElectronHmr.prototype.rebuild = function (options) {
        if (this.electronProcess) {
            this.electronProcess.kill();
        }
        this.build(options);
    };
    ElectronHmr.prototype.build = function (options) {
        var _a = options || this.options, electronBinaryPath = _a.electronBinaryPath, _b = _a.args, args = _b === void 0 ? ["."] : _b;
        this.electronProcess = child_process_1.default.spawn(electronBinaryPath, args);
    };
    return ElectronHmr;
}());
exports.ElectronHmr = ElectronHmr;
