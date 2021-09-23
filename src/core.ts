
import { watch } from 'chokidar';
import { ElectronHmrWatchOptions, ElectronHrmBuildOptions } from './interface';
import child_process, { ChildProcess } from "child_process";
import { ElectronHmrConsole } from './console';


/**
 * the core of electron-hmr
 */
export class ElectronHmr {
    electronProcess: ChildProcess


    constructor(private options: ElectronHrmBuildOptions) {
        const { electronBinaryPath, args = ["."] } = options
        this.electronProcess = child_process.spawn(electronBinaryPath, args)
    }

    /**
     * use chokidar to watch files and rebuild electron
     * @param options {@link ElectronHmrWatchOptions}
     */
    watch(options?: ElectronHmrWatchOptions) {
        const fsWatcher = watch(options?.include || '.', {
            ignored: options?.exclude
        })
        fsWatcher.on('change', (path, stats) => {
            if (stats?.isFile) {
                this.rebuild()
            }
        });

    }

    /**
     * rebuild the electron 
     * @param options {@link ElectronHrmBuildOptions} default 
     */
    rebuild() {
        if (this.electronProcess) {
            this.electronProcess.kill()
        }
        this.build()
    }

    build() {
        const { electronBinaryPath, args = ["."], options } = this.options
        this.electronProcess = child_process.spawn(electronBinaryPath, args, options)
        if (this.electronProcess) {
            ElectronHmrConsole(this.electronProcess, this.options.consoleOptions || {})
        }
    }

}


