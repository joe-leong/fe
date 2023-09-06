---
title: vite 专题
categories:
  - 前端工程
  - vite
tags:
  - 编码规范
  - 工程化
author:
  name: joe
  link: https://github.com/joe-leong/fe
---

# Vite

## 1. 打包优化

### 1.1. 打包碎片

`Vite` 底层使用 `Rollup` 进行构建，产物中以定义时的文件作为模块分割，每个文件被单独成为一个产物模块，导致碎片化严重

- 对 node_modules 依赖合并

  ```js
  // vite.config.js
  build:{
    ...,
    rollupOptions: {
      output:{
          manualChunks: (filePath) => {
            if (filePath.includes('node_modules')) {
              return 'vendor'
            }
          }
      }
    }
  }
  ```

- 合并公共库

```js
  build: {
    ...
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-common-lib': ['vue', 'vue-router', 'pinia'],
          'react-common-lib': ['react', 'react-dom', '@glideapps/glide-data-grid'],
        }
      }
    }
  },
```

- 打包后使用`CDN`引入`npm`依赖

```js
import { Plugin as importToCDN } from 'vite-plugin-cdn-import'
plugins:[
    ...,
    importToCDN:[
        {
            name:'模块全局使用变量名称',
            var:'模块名称',
            path:'cdn地址'
        }
    ]
]
```

- 普通文件 chunk 合并

```js
// vite.config.js
output: {
  experimentalMinChunkSize: 1000; //指定chunk最小体积，不超过即尝试把依赖模块打包进来
  // 如果引入的模块存在副作用，则会被单独打包，可以通过一下操作定义为纯函数
  1. @__NO_SIDE_EFFECTS__
  const fn = () => {
    console.log('b')
    return 'b'
  }
  fn()
  2. @__PURE__
  const fn = () => {
    console.log('b')
    return 'b'
  }
  /*@__PURE__*/ fn()
  // 亦可以在配置文件中指定纯函数定义
  treeshake: {
    preset: 'recommended',
    manualPureFunctions: ['console.log'],
  }
}
```

## 2. 兼容性

### 2.1. 浏览器兼容

`@vitejs/plugin-legacy`,`vite`的运行时是基于`native ESM`,所以一些老版本浏览器需要做`polyfill`处理
