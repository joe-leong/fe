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

## 目录结构

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

## 原理

### 双向绑定

双向绑定由三个重要部分构成：

- 数据层（Model）：应用的数据及业务逻辑
- 视图层（View）：应用的展示效果，各类UI组件
- 业务逻辑层（ViewModel）：框架封装的核心，它负责将数据与视图关联起来

#### ViewModel

主要职责就是：

- 数据变化后更新视图
- 视图变化后更新数据

两个重要组成部分：

- 监听器（Observer）：对所有数据的属性进行监听
- 解析器（Compiler）：对每个元素节点的指令进行扫描跟解析，根据指令模板替换数据，以及绑定响应的更新函数

#### 实现双向绑定

1. `new Vue()` 首先执行初始化，对 `data` 执行响应化处理，这个过程发生在 `Observe` 中
2. 对模板执行编译，找到其中动态绑定的数据，从 `data` 中获取并初始化视图，这个过程发生在 `Compiler` 中
3. 定义一个更新函数和 `Watcher`，将来对应数据变化时 `Watcher` 会调用更新函数
4. 由于 `data` 的某个 `key` 在一个视图中可能出现多次，所以每个 `key` 都需要一个管家 `Dep` 来管理多个 `Watcher`
5. 将来 `data` 中数据一旦发生变化，会首先找到对应的 `Dep`，通知所有的 `Watcher` 执行更新函数
🚧
