/// <reference types="node" />
import { ElectronHmrWatchOptions, ElectronHrmBuildOptions } from './interface';
import { ChildProcess } from "child_process";
/**
 * the core of electron-hmr
 */
export declare class ElectronHmr {
    private options;
    electronProcess: ChildProcess;
    constructor(options: ElectronHrmBuildOptions);
    /**
     * use chokidar to watch files and rebuild electron
     * @param options {@link ElectronHmrWatchOptions}
     */
    watch(options?: ElectronHmrWatchOptions): void;
    /**
     * rebuild the electron
     * @param options {@link ElectronHrmBuildOptions} default
     */
    rebuild(): void;
    build(): void;
}
