
import { ElectronHmrWatchOptions } from "./interface"
import micromatch from 'micromatch';
import { resolve } from 'path';
import fs from 'fs';


/**
 * test the path by some glob options
 * @param path changed file path 
 * @param options glob pattern condition
 */
export function pathTest(path: string, options?: ElectronHmrWatchOptions): boolean {
    const { exclude = ['node_modules/**/*'], include = ['**/*.ts'] } = options || {}

    const inc = Array.isArray(include) ? include : [include]
    const tested = inc.some((i: string) => {
        const isMatch = micromatch.matcher(i, { ignore: exclude });
        return isMatch(path)
    })
    return tested
}