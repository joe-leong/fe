---
title: React15
categories:
  - 前端框架
tags:
  - 编码规范
author:
  name: joe
  link: https://github.com/joe-leong/fe
---

# React15

## 架构

React15架构分为两层：
<br>Reconciler（协调器）- 负责找出变化的组件
<br>Renderer（渲染器）- 负责将变化的组件渲染到页面上
:::tip
两者交替执行，协调器发现变化就会通知渲染器更新，渲染器更新完成会返回协调器继续执行
:::

### Reconciler（协调器）

在React中，setState,forceUpdate,render等API都可以触发更新，每当有更新发生时，Reconciler都会执行一下流程：

- 调用函数组件、或者调用class组件的render方法，将返回的`JSX`转化为`虚拟DOM`
- 将`虚拟DOM`和上次更新时的`虚拟DOM`对比
- 找出本次更新中变化的`虚拟DOM`
- 通知`Renderer`将变化的`虚拟DOM`渲染到页面上

### Renderer（渲染器）

React支持跨平台，所以不同的平台使用的渲染包不同。对于浏览器端使用的`Renderer`就是`ReactDOM`
<br>每次更新时，`Renderer`收到`Reconciler`的通知，将变化的组件渲染到当前宿主环境

## 缺点

15使用的是`Stack concurrent`，在`Reconciler`中，无论是挂载组件还是更新组件，都会递归更新子组件。
由于递归执行，所以一旦开始执行更新，就无法中途中断。如果层级很深，嘛呢更新所需要的时间就会远远超过渲染一帧所需要的时间，
用户交互就会卡顿
:::tip
在浏览器中，js与UI渲染是互斥的，所以js未执行完毕，就无法执行UI更新的工作
:::
