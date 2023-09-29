---
title: npm 脚本
categories:
  - 前端工程
  - npm
tags:
  - 编码规范
  - 工程化
author:
  name: joe
  link: https://github.com/joe-leong/fe
---

# npm

## 命令编排

| 命令 | 说明                                               |
| ---- | -------------------------------------------------- |
| &&   | 顺序执行多条命令，当碰到错误后不再执行后续命令     |
| &    | 并行执行多条命令                                   |
| \|\| | 顺序执行多条命令，碰到正确的命令后不再执行后续命令 |
| \|   | 管道符                                             |



### 脚本顺序与并行同时存在

- 使用`npm-run-all`编排 `-p --parallel`并行 `-s--sequentially`顺序

  ```js
  npm-run-all -p n_1 n_2 -s n_3 // 并行执行1,2后顺序执行3
  ```

- 利用钩子pre + `concurrently`

  ```js
  "prepack": "concurrently \"node ./build/1.js\" \"node ./build/2.js\"",
  "pack": "node ./build/3.js",
  ```

## 切换node版本

- 全局安装n模块

  ```js
  // 安装
  sudo npm i n -g
  // 安装node版本
  sudo n [nodeVersion]
  // 打印已安装node版本以及切换node版本
  n
  // 命令行切换node版本
  sudo n [nodeVresion]
  // 删除某个node版本
  sudo n rm [nodeVersion]
  // 使用指定版本执行脚本
  sudo n use [nodeVersion] [script]
  ```


## npm发包

`.npmignore` 不存在时，会查找 `.gitignore` 配置并使用，会导致一个问题：添加了 `git `不跟踪的文件，在 `npm `文件列表中会被忽略，即使  `packages.json` 标记为文件需要发布，所以要使用 `.npmignore` 作为发包配置
