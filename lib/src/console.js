"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.log = exports.ElectronHmrConsole = void 0;
var chalk_1 = __importDefault(require("chalk"));
/**
 * take over the electron main process console log
 * @param electronProcess
 * @param param1
 */
function ElectronHmrConsole(electronProcess, consoleOptions) {
    var _a, _b;
    (_a = electronProcess === null || electronProcess === void 0 ? void 0 : electronProcess.stdout) === null || _a === void 0 ? void 0 : _a.on('data', function (data) {
        log(" : " + data.toString(), consoleOptions);
    });
    (_b = electronProcess === null || electronProcess === void 0 ? void 0 : electronProcess.stderr) === null || _b === void 0 ? void 0 : _b.on('data', function (err) {
        error(" : " + err.toString(), consoleOptions);
    });
    electronProcess.on('close', function (code) {
        log(" : electron close with code " + code, consoleOptions);
    });
    electronProcess.on('exit', function (code) {
        log(" : electron exited with code " + code, consoleOptions);
    });
}
exports.ElectronHmrConsole = ElectronHmrConsole;
function log(msg, _a) {
    var _b = _a.enable, enable = _b === void 0 ? true : _b, _c = _a.useChalk, useChalk = _c === void 0 ? true : _c, _d = _a.preffix, preffix = _d === void 0 ? 'electron-hmr' : _d;
    if (enable) {
        var info = useChalk ? chalk_1.default.blueBright("[" + preffix + "]") : "[" + preffix + "]";
        console.log(info, msg);
    }
}
exports.log = log;
function error(msg, _a) {
    var _b = _a.enable, enable = _b === void 0 ? true : _b, _c = _a.useChalk, useChalk = _c === void 0 ? true : _c, _d = _a.preffix, preffix = _d === void 0 ? 'electron-hmr' : _d;
    if (enable) {
        var error_1 = useChalk ? chalk_1.default.redBright("[" + preffix + "]") : "[" + preffix + "]";
        console.log(error_1, msg);
    }
}
exports.error = error;
