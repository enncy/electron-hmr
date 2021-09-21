import chalk from "chalk";
import { ChildProcess } from "child_process";
import { ElectronConsoleOptions } from "./interface";

/**
 * take over the electron main process console log
 * @param electronProcess 
 * @param param1 
 */
export function ElectronHmrConsole(electronProcess: ChildProcess, consoleOptions: ElectronConsoleOptions) {
    electronProcess?.stdout?.on('data', (data) => {
        log(` : ${data.toString()}`, consoleOptions)
    });
    electronProcess?.stderr?.on('data', (err) => {
        error(` : ${err.toString()}`, consoleOptions)
    })
    electronProcess.on('close', (code) => {
        log(` : electron close with code ${code}`, consoleOptions)
    });

    electronProcess.on('exit', (code) => {
        log(` : electron exited with code ${code}`, consoleOptions)
    });
}

export function log(msg: string, { enable = true, useChalk = true, preffix = 'electron-hmr' }: ElectronConsoleOptions) {

    if (enable) {
        const info = useChalk ? chalk.blueBright(`[${preffix}]`) : `[${preffix}]`
        console.log(info, msg);
    }

}

export function error(msg: string, { enable = true, useChalk = true, preffix = 'electron-hmr' }: ElectronConsoleOptions) {
    if (enable) {
        const error = useChalk ? chalk.redBright(`[${preffix}]`) : `[${preffix}]`
        console.log(error, msg);
    }
}