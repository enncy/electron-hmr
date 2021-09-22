 
/**
 * electron hmr options
 */
export interface ElectronHrmBuildOptions {
    /**
     * the binary path of electron
     */
    electronBinaryPath: string,
    /**
     * electron run options
     * 
     * default ['`.`'] , when run electron : node_module/electron/dist/electron.exe `.`
     */
    args?: string[],
    /**
     * @see {@link ElectronConsoleOptions}
     */
    consoleOptions?: ElectronConsoleOptions
}

 

/**
 * update options
 */
export interface ElectronHmrUpdateOptions {
    /**
     * some paths that need to be listened to for changes
     */
    include?: RegExp[] | string[] | RegExp | string,
    /**
     * some paths that do not need to be listened to for changes
     */
    exclude?: RegExp[] | string[] | RegExp | string,
}


/**
 * show the electron main process console
 */
export interface ElectronConsoleOptions {
    /**
     * open console
     */
    enable?:boolean,
    /**
     * use the chalk to console
     */
    useChalk?: boolean
    /**
     * preffix info , like project name
     */
    preffix?: string
}

