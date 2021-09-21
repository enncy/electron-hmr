import chalk from "chalk";
import { log } from "../console";
import { ElectronHmr } from "../core";
import { ElectronHmrUpdateOptions, ElectronHmrWatchOptions, ElectronHrmBuildOptions } from "../interface";

export const ViteElectronHmrName = "vite-plugin-electron-hmr"


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
export function VitePluginElectronHmr({ electronBinaryPath, args, hmrUpdateOptions }: ElectronHrmBuildOptions & { hmrUpdateOptions?: ElectronHmrUpdateOptions }) {

    const electronHmr = new ElectronHmr({
        electronBinaryPath, args,
        consoleOptions: {
            preffix: ViteElectronHmrName
        }
    })

    return {
        name: ViteElectronHmrName,
        handleHotUpdate({ file }: { file: string }) {
            electronHmr.update(file, hmrUpdateOptions)
            log(` rebuilding : file change - ${file}`, { preffix: ViteElectronHmrName })
        },

        configResolved() {
            electronHmr.rebuild()
        },
    }

}






