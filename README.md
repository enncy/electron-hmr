# electron-hmr
> an electron hot module replace plugin

![https://cdn.jsdelivr.net/gh/enncy/electron-hmr@1.1.1/docs/show.gif](https://cdn.jsdelivr.net/gh/enncy/electron-hmr@1.1.1/docs/show.gif)

# Quickly Start

```shell
npm i elecrton-hmr -D
```
and run hmr , use `--help` to see the options
```
ehmr
```
if you want to use whit `vite` or other , install `concurrently`
```shell
npm i concurrently -D
```
`package.json`

```json
...
  "scripts": {
    "dev": "concurrently  \"ehmr\"  \"vite\"  ",
    ...
  },
...
```
# JavaScript Api

```js
// you also can use import like : import { ElectronHmr } from "electron-hmr"
const { ElectronHmr } = require('electron-hmr');
// use electron binary path
const electron = require('electron');

// init and create electron
const electronHmr = new ElectronHmr({
    electronBinaryPath: electron.toString(),
    // other options
})

// rebuild after 3000s delay
settimeout(electronHmr.rebuild,3000)
```
##  Three way to rebuild electron 

**1. you can use `rebuild()` to rebuild the electron**

```js
electronHmr.rebuild()
```
 **2. start hot module replace, it will watch file change and rebuild automaticly**
```js
electronHmr.watch(/*options*/)
```
**3. or you can use chokidar to watch file and rebuild manually** 

```js
import { watch } from 'chokidar';
watch('.').on('change', (path, stats) => {
    if (stats?.isFile /* or some condition*/) {
        // rebuild the electron
        electronHmr.rebuild()
    }
});
```
