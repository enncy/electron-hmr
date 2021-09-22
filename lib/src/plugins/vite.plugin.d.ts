import { ElectronHmr } from "../core";
import { ElectronHmrWatchOptions } from "../interface";
export declare const ViteElectronHmrName = "vite-plugin-electron-hmr";
export declare let ElectronRebuildTimes: number;
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
export declare function VitePluginElectronHmr(electronHmr: ElectronHmr, { include, exclude }: ElectronHmrWatchOptions): {
    name: string;
    handleHotUpdate({ file, timestamp, read }: {
        file: string;
        timestamp: number;
        read: () => string | Promise<string>;
    }): Promise<void>;
};
