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
        var fsWatcher = chokidar_1.watch((options === null || options === void 0 ? void 0 : options.include) || '.', {
            ignored: options === null || options === void 0 ? void 0 : options.exclude
        });
        fsWatcher.on('change', function (path, stats) {
            if (stats === null || stats === void 0 ? void 0 : stats.isFile) {
                _this.rebuild();
                if (_this.electronProcess) {
                    console_1.ElectronHmrConsole(_this.electronProcess, _this.options.consoleOptions || {});
                }
            }
        });
    };
    /**
     * rebuild the electron
     * @param options {@link ElectronHrmBuildOptions} default
     */
    ElectronHmr.prototype.rebuild = function () {
        if (this.electronProcess) {
            this.electronProcess.kill();
        }
        this.build();
    };
    ElectronHmr.prototype.build = function () {
        var _a = this.options, electronBinaryPath = _a.electronBinaryPath, _b = _a.args, args = _b === void 0 ? ["."] : _b, options = _a.options;
        this.electronProcess = child_process_1.default.spawn(electronBinaryPath, args, options);
    };
    return ElectronHmr;
}());
exports.ElectronHmr = ElectronHmr;
