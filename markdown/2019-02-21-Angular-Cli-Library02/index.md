---
title: Angular Cli를 기능을 활용하여 라이브러리 만들기-2
date: 2019-02-21 11:37:00
category: "Angular" 
tags: ['Angular','library']
---

# Angular Cli를 기능을 활용하여 라이브러리 만들기-2

[https://byeonggi.github.io/blog/angular-cli%EB%A5%BC-%EA%B8%B0%EB%8A%A5%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%98%EC%97%AC-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EB%A7%8C%EB%93%A4%EA%B8%B0-2](https://byeonggi.github.io/blog/angular-cli%EB%A5%BC-%EA%B8%B0%EB%8A%A5%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%98%EC%97%AC-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EB%A7%8C%EB%93%A4%EA%B8%B0-2)

```bash
"scripts": {
    "build_lib": "ng build bengis-ui",
    "npm_pack": "cd dist/bengis-ui && npm pack",
    "package": "npm run build_lib && npm run npm_pack",
},
```

```bash
npm run build_lib

> bengis-lib@0.0.0 build_lib /home/kira/PROJECT/angular-experimental/bengis-lib
> ng build bengis-ui

Building Angular Package
Building entry point 'bengis-ui'
Compiling TypeScript sources through ngc
Bundling to FESM2015
Bundling to FESM5
Bundling to UMD
Minifying UMD bundle
Copying declaration files
Writing package metadata
Removing scripts section in package.json as it's considered a potential security vulnerability.
Built bengis-ui
Built Angular Package!
  - from: /home/kira/PROJECT/angular-experimental/bengis-lib/projects/bengis-ui
  - to:   /home/kira/PROJECT/angular-experimental/bengis-lib/dist/bengis-ui

npm run npm_pack

> bengis-lib@0.0.0 npm_pack /home/kira/PROJECT/angular-experimental/bengis-lib
> cd dist/bengis-ui && npm pack

npm notice 
npm notice 📦  bengis-ui@0.0.1
npm notice === Tarball Contents === 
npm notice 532B  package.json                      
npm notice 78B   bengis-ui.d.ts                    
npm notice 1.3kB bengis-ui.metadata.json           
npm notice 124B  public_api.d.ts                   
npm notice 1.0kB README.md                         
npm notice 3.2kB bundles/bengis-ui.umd.js          
npm notice 1.4kB bundles/bengis-ui.umd.js.map      
npm notice 1.0kB bundles/bengis-ui.umd.min.js      
npm notice 1.4kB bundles/bengis-ui.umd.min.js.map  
npm notice 676B  esm2015/bengis-ui.js              
npm notice 1.5kB esm2015/lib/bengis-ui.component.js
npm notice 1.4kB esm2015/lib/bengis-ui.module.js   
npm notice 1.3kB esm2015/lib/bengis-ui.service.js  
npm notice 954B  esm2015/public_api.js             
npm notice 676B  esm5/bengis-ui.js                 
npm notice 1.8kB esm5/lib/bengis-ui.component.js   
npm notice 1.6kB esm5/lib/bengis-ui.module.js      
npm notice 1.5kB esm5/lib/bengis-ui.service.js     
npm notice 954B  esm5/public_api.js                
npm notice 2.0kB fesm2015/bengis-ui.js             
npm notice 1.3kB fesm2015/bengis-ui.js.map         
npm notice 2.5kB fesm5/bengis-ui.js                
npm notice 1.3kB fesm5/bengis-ui.js.map            
npm notice 142B  lib/bengis-ui.component.d.ts      
npm notice 40B   lib/bengis-ui.module.d.ts         
npm notice 60B   lib/bengis-ui.service.d.ts        
npm notice === Tarball Details === 
npm notice name:          bengis-ui                               
npm notice version:       0.0.1                                   
npm notice filename:      bengis-ui-0.0.1.tgz                     
npm notice package size:  6.7 kB                                  
npm notice unpacked size: 29.9 kB                                 
npm notice shasum:        16ed29218c61de3c397370a169d895ead7ba54f0
npm notice integrity:     sha512-9MXxrP4NJbT/B[...]wevv3IGGooEDw==
npm notice total files:   26                                      
npm notice 
bengis-ui-0.0.1.tgz
```    

![/assets/2019-02-21-Angular-Cli-Library02/angular-build-packaging.png](/assets/2019-02-21-Angular-Cli-Library02/angular-build-packaging.png)

```bash
npm install ./bengis-ui-0.0.1.tgz

npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.7 (node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.7: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})

+ bengis-ui@0.0.1
added 1 package and audited 42430 packages in 23.592s
found 1 low severity vulnerability
  run `npm audit fix` to fix them, or `npm audit` for details
```

![/assets/2019-02-21-Angular-Cli-Library02/angular-lib-install.png](/assets/2019-02-21-Angular-Cli-Library02/angular-lib-install.png)

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BengisUiModule } from 'bengis-ui';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BengisUiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
```html
<bengis-bengis-ui></bengis-bengis-ui>
```