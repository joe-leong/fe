---
title: Vue2.x 专题
categories:
  - 前端框架
tags:
  - 编码规范
author:
  name: joe
  link: https://github.com/joe-leong/fe
---

# Vue2.x 专题

## 1. 目录结构

```js
src
├── compiler # 编译相关
├── core     # 核心
├── platforms# 不同平台入口
├── server   # 服务端渲染
├── sfc      # .vue文件解析
└── shared   # 共享代码
```

- compiler
  模板生成 ast，ast 优化，ast 生成代码

  编译可以在构建时做（webpack，vite，vue-loader 等辅助插件），也可以在运行时做，但是编译是一件耗时的工作，一般都选择构建时做。

## x. 关键函数

### x.1. \_render

渲染`vnode`，渲染完成交给`_patch`

### x.2. \_patch

把`vnode`渲染`dom`，进行`diff`阶段

🚧
