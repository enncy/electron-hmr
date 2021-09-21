# electron-hmr
> an electron hot module replace plugin of vite

## Quicly Start

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

// start hmr
electronHmr.watch({
    paths: '.',
    change(path, stats) {
        console.log('file is change : ', path);
    }
})
```

## Use in vite 

```js
import { VitePluginElectronHmr } from "electron-hmr"
const electron = require("electron")
   
export default defineConfig({
    //...
    plugins: [
         //...
        VitePluginElectronHmr({
            electronBinaryPath: electrontoString(),
            //...
        })

    ],
    //...
})
```

## API

### `class` ElectronHmr

#### options

   - `electronBinaryPath`:`string`  , the binary path of electron , like `node_modules/electron/dist/electron.exe`

   - `args`:`string[]` default :  `['.']` , the electron launch arguments

   - `consoleOptions`: the electron child process stdout and stderr console option

​       - `useChalk`:`boolean` default : true , use the chalk to print

​       - `preffix`:`string` default : 'electron-hmr'

#### methods
> more the detail , please see the source code
- watch : watch file change
- update : update electron
- rebuild : rebuild electron
- build : build electron
### `function` VitePluginElectronHmr

   - `electronBinaryPath`:`string`  , the binary path of electron , like `node_modules/electron/dist/electron.exe`

   - `args`:`string[]` default :  `['.']` , the electron launch arguments

   - `consoleOptions`: the electron child process stdout and stderr console option

​       - `useChalk`:`boolean` default : true , use the chalk to print

​       - `preffix`:`string` default : 'electron-hmr'

   - `hmrUpdateOptions`: file update options

​       - `exclude`:`(string|Regexp)[] | string | Regexp` default :  undefined , if you use `['.']` , it will do nothing when file change

​       - `include`:`(string|Regexp)[] | string | Regexp` default :  `['.']` , include all the file

   

