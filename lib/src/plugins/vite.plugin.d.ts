import { ElectronHmrUpdateOptions, ElectronHrmBuildOptions } from "../interface";
export declare const ViteElectronHmrName = "vite-plugin-electron-hmr";
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
export declare function VitePluginElectronHmr({ electronBinaryPath, args, hmrUpdateOptions }: ElectronHrmBuildOptions & {
    hmrUpdateOptions?: ElectronHmrUpdateOptions;
}): {
    name: string;
    handleHotUpdate({ file }: {
        file: string;
    }): void;
    configResolved(): void;
};
