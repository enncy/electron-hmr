/// <reference types="node" />
import { ChildProcess } from "child_process";
import { ElectronConsoleOptions } from "./interface";
/**
 * take over the electron main process console log
 * @param electronProcess
 * @param param1
 */
export declare function ElectronHmrConsole(electronProcess: ChildProcess, consoleOptions: ElectronConsoleOptions): void;
export declare function log(msg: string, { enable, useChalk, preffix }: ElectronConsoleOptions): void;
export declare function error(msg: string, { enable, useChalk, preffix }: ElectronConsoleOptions): void;
