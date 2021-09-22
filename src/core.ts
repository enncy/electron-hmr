
import { watch } from 'chokidar';
import { ElectronHmrUpdateOptions,  ElectronHrmBuildOptions } from './interface';
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
    watch(options?: ElectronHmrUpdateOptions) {

        watch('.').on('change', (path, stats) => {
            if (stats?.isFile) {
                this.update(path,  options)
            }
        });

    }

    /**
     * rebuild the electron  
     */
    update(path: string, options?: ElectronHmrUpdateOptions) {
        const { exclude, include = ['.'] } = options || {}

        if (exclude) {
            const exc = Array.isArray(exclude) ? exclude : [exclude]
            // if path is not exclude
            if (exc && pathSomeTest(exc)) {
                return
            }
        } else {
            const inc = Array.isArray(include) ? include : [include]
            if (pathSomeTest(inc)) {
                this.rebuild()
                if (console && this.electronProcess) {
                    ElectronHmrConsole(this.electronProcess, this.options.consoleOptions || {})
                }
            }
        }

        function pathSomeTest(condition: (string | RegExp)[]) {
            return condition.map(e => RegExp(e)).some((e: RegExp) => e.test(path))
        }

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

    private build() {
        const { electronBinaryPath, args = ["."] } =   this.options
        this.electronProcess = child_process.spawn(electronBinaryPath, args)
    }
}


