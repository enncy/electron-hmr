import { ElectronHmrWatchOptions } from "./interface";
/**
 * test the path by some glob options
 * @param path changed file path
 * @param options glob pattern condition
 */
export declare function pathTest(path: string, options?: ElectronHmrWatchOptions): boolean;
