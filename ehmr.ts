#!/usr/bin/env node
import { ElectronHmr } from './src/core';
import { Command } from 'commander';
import { watch } from 'chokidar';
import path from 'path';
import chalk from 'chalk';
import fs from 'fs';

const program = new Command();
program
    .version('1.0.0')
    .option('-i, --include <paths...>', 'include file glob pattern', '**/*.ts **/*.js')
    .option('-e, --exclude <paths...>', 'exclude file glob pattern', 'node_modules/**/*')
    .option('-p, --path <path>', 'the electron binary path', './node_modules/electron/dist/electron.exe')

    .parse(process.argv);

let options: { include: string[], exclude: string[], path: string } = {
    include: program.opts().include.split(" "),
    exclude: program.opts().exclude.split(" "),
    path: path.resolve(program.opts().path),

}

console.log(chalk.blueBright('\n\n[electron-hmr]:'), 'running!');
console.log(chalk.blueBright("  options :"));
console.log("\tinclude : " + chalk.greenBright(options.include));
console.log("\texclude : " + chalk.greenBright(options.exclude));
console.log("\tpath : " + chalk.greenBright(options.path)+"\n\n");

if (!fs.existsSync(options.path)) {
    console.log(chalk.redBright('[electron-hmr] error :'), 'please ckeck ' + chalk.greenBright(options.path) + ' is exists , or run ' + chalk.blueBright('npm i electron') + ' again!\n');
} else {
    // init and create electron
    const ehmr = new ElectronHmr({
        electronBinaryPath: path.resolve(options.path)
        // other options
    })

    watch(options.include, { ignored: options.exclude }).on('change', (path, stats) => {
        if (stats?.isFile /* or some condition*/) {
            // rebuild the electron
            ehmr.rebuild()
        }
    });
}


