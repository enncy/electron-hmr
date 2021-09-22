"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VitePluginElectronHmr = exports.ViteElectronHmrName = void 0;
var console_1 = require("../console");
var core_1 = require("../core");
exports.ViteElectronHmrName = "vite-plugin-electron-hmr";
/**
 * a electron hmr plugin for vite
 *
 * @example
 * ```js
   import { VitePluginElectronHmr } from "electron-hmr"
   const electron = require("electron")
   
   export default defineConfig({
        //...
        plugins: [
            //...
            VitePluginElectronHmr({
                electronBinaryPath: electron.toString(),
                //...
            })

        ],
        //...
   })

 * ```
 *
 *
 *
 */
function VitePluginElectronHmr(_a) {
    var electronBinaryPath = _a.electronBinaryPath, args = _a.args, include = _a.include, exclude = _a.exclude;
    var electronHmr = new core_1.ElectronHmr({
        electronBinaryPath: electronBinaryPath,
        args: args,
        consoleOptions: {
            preffix: exports.ViteElectronHmrName
        }
    });
    return {
        name: exports.ViteElectronHmrName,
        handleHotUpdate: function (_a) {
            var file = _a.file;
            electronHmr.update(file, { include: include, exclude: exclude });
            console_1.log(" rebuilding : file change - " + file, { preffix: exports.ViteElectronHmrName });
        },
        configResolved: function () {
            electronHmr.rebuild();
        },
    };
}
exports.VitePluginElectronHmr = VitePluginElectronHmr;
