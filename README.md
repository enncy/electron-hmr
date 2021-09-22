# electron-hmr
> an electron hot module replace plugin


# Quicly Start

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

# Use in vite 

```js
import { VitePluginElectronHmr } from "electron-hmr"
const electron = require("electron")
   
export default defineConfig({
    //...
    plugins: [
         //...
        VitePluginElectronHmr({
            electronBinaryPath: electron.toString(),
            //...
        })

    ],
    //...
})
```

if you want to watch some files, not the all files : 

```js
VitePluginElectronHmr({
    electronBinaryPath: electron.toString(),
    include:['./src'],
    exclude:['./node_modules/']
})
```