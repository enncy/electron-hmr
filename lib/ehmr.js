#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("./src/core");
var commander_1 = require("commander");
var chokidar_1 = require("chokidar");
var path_1 = __importDefault(require("path"));
var chalk_1 = __importDefault(require("chalk"));
var fs_1 = __importDefault(require("fs"));
var program = new commander_1.Command();
program
    .version('1.0.0')
    .option('-i, --include <paths...>', 'include file glob pattern', '**/*.ts **/*.js')
    .option('-e, --exclude <paths...>', 'exclude file glob pattern', 'node_modules/**/*')
    .option('-p, --path <path>', 'the electron binary path', './node_modules/electron/dist/electron.exe')
    .parse(process.argv);
var options = {
    include: program.opts().include.split(" "),
    exclude: program.opts().exclude.split(" "),
    path: path_1.default.resolve(program.opts().path),
};
console.log(chalk_1.default.blueBright('\n\n[electron-hmr]:'), 'running!');
console.log(chalk_1.default.blueBright("  options :"));
console.log("\tinclude : " + chalk_1.default.greenBright(options.include));
console.log("\texclude : " + chalk_1.default.greenBright(options.exclude));
console.log("\tpath : " + chalk_1.default.greenBright(options.path) + "\n\n");
if (!fs_1.default.existsSync(options.path)) {
    console.log(chalk_1.default.redBright('[electron-hmr] error :'), 'please ckeck ' + chalk_1.default.greenBright(options.path) + ' is exists , or run ' + chalk_1.default.blueBright('npm i electron') + ' again!\n');
}
else {
    // init and create electron
    var ehmr_1 = new core_1.ElectronHmr({
        electronBinaryPath: path_1.default.resolve(options.path)
        // other options
    });
    chokidar_1.watch(options.include, { ignored: options.exclude }).on('change', function (path, stats) {
        if (stats === null || stats === void 0 ? void 0 : stats.isFile /* or some condition*/) {
            // rebuild the electron
            ehmr_1.rebuild();
        }
    });
}
