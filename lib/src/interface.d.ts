/// <reference types="node" />
import { SpawnOptionsWithoutStdio } from "child_process";
/**
 * electron hmr options
 */
export interface ElectronHrmBuildOptions {
    /**
     * the binary path of electron
     */
    electronBinaryPath: string;
    /**
     * electron run options
     *
     * default ['`.`'] , when run electron : node_module/electron/dist/electron.exe `.`
     */
    args?: string[];
    /**
     * @see {@link SpawnOptionsWithoutStdio}
     */
    options?: SpawnOptionsWithoutStdio | undefined;
    /**
     * @see {@link ElectronConsoleOptions}
     */
    consoleOptions?: ElectronConsoleOptions;
}
/**
 * watch options
 */
export interface ElectronHmrWatchOptions {
    /**
     *  pass in chokidar first argument
     */
    include?: readonly string[] | string;
    /**
     *  pass in chokidar second argument ignore param
     */
    exclude?: readonly string[] | string;
}
/**
 * show the electron main process console
 */
export interface ElectronConsoleOptions {
    /**
     * open console
     */
    enable?: boolean;
    /**
     * use the chalk to console
     */
    useChalk?: boolean;
    /**
     * preffix info , like project name
     */
    preffix?: string;
}
