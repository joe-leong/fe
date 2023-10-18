---
title: React16
categories:
  - 前端框架
tags:
  - 编码规范
author:
  name: joe
  link: https://github.com/joe-leong/fe
---

# React16

## 架构

React16架构分为三层：

- Scheduler（调度器）- 调度任务的优先级，高优先级优先进入`Reconciler`
- Reconciler（协调器）- 负责找出变化的组件
- Renderer（渲染器）- 负责将变化的组件渲染到页面上
:::tip
相比较于15，增加了Scheduler调度任务
:::

### Scheduler（调度器）

如果需要实现异步，那么就需要知道浏览器是否有剩余时间，在浏览器中有原生的API`requestIdleCallback`，但是该api存在以下问题

- 兼容性
- 触发频率不稳定，影响因素很多。比如当前tab切换后，之前tab注册的时间触发的频率会变得很低。

所以React实现了`requestIdleCallback`pollyfill。除了在空闲时触发回调的功能外，还提供了多种调度优先级供任务设置。

### Reconciler（协调器）

16+版本中，`Reconciler` 更新工作从递归变成了可中断的循环过程。每次循环都会调用`shouldYield`获取当前是否有剩余时间。并且`Reconciler`和`Renderer`不再是交替工作。当`Schuduler`把任务交给`Reconciler`之后，`Reconciler`会为变化的虚拟DOM打上标记（增/删/更新）

整个过程都在内存中进行。只有当所有组件都完成`Reconciler`的工作，再会统一交给`Renderer`进行渲染工作

`Reconciler` 和 `Schuduler` 被称为 `render` 阶段，具体流程如下：

- `beginwork` 递
  - 从 `rootFiber` 开始 `child`，如果遇到函数组件或者类组件则调用渲染函数生成新的 `child`(Fiber Array)
  - `reconcilerChildren`，对已存在的child与生成的child进行diff，如果是单节点，直接进入更新单节点，如果是数组，则会进入diff逻辑，尽可能复用已有Fiber，创建的effectTag包含更新、删除并且更新 `父Fiber` 的tag，如果是新建的话就不需要打tag
`diff算法`:
    - `oldChild` 与新渲染产生的child循序遍历，比较tag与key，如果相同则复用，判断props是否需要更新，需要更新则标记 `update` 并更新父节点 `effectTag`，更新`lastPlaceIndex`
    - 一旦遇到不能复用，则把`oldChild`创建map，遍历新节点，在map中查找可复用节点,如果没找到则新建 `Fiber`
    - 遍历map，打上 `delete` 标记

- `completework` 归
  - 处理flag：把 `Fiber` 自身的 `flag` 以及 `subtreeFlag` 冒泡到 `父Fiber`
  - 处理 `Fiber` 的 `stateNode`，如果没有则需要创建，并且把子孙节点append到当前DOM节点下，存在的话就更新props、事件绑定等
  - 把每个 `Fiber` 的 `Effect` 添加到 `父Fiber` 上组成 `effectList`，在commit阶段会遍历单向链执行对应操作

### Renderer（渲染器）

`Renderer`根据`Reconciler`的标记，同步执行对应的DOM操作
此阶段也称为`commit 阶段`，分为三个步骤：

#### before mutation

遍历 `effectList` 处理 `DOM` 节点 `渲染/删除` 后的 `聚焦/失焦` 逻辑，调用 `getSnapShotBeforeUpdate` 生命周期钩子，调度 `useEffect` （使用SchedulerCallback调度）

#### mutation

- 更新文本节点的content
- 更新ref
- 根据 `effectTag` 进行对应处理，包含操作：移动、插入、更新、删除等组合
- 更新 `DOM` props、properties（遍历pendingProps，数据在completeWork阶段完成处理）
- 如果是 `FC` 则需要调用 `useLayout` 的销毁函数
- 完成后再进入 `layout` 阶段前需要把current指针切换，因为 `mutation` 阶段会调用 `componentWillUnmount`，此时的 `DOM` 还是更新前的

#### layout

到达这个阶段，已经完成 `离屏DOM` 的布局，只是浏览器尚未完成渲染

- 遍历 `effectList` 执行 `commitLayoutEffcts` 函数：赋值 `ref`、调用生命周期钩子和hooks
- 执行 `useLayout` 回调函数，调度 `useEffect` 的销毁函数以及回调函数
- 类组件 `this.setState` 的第二个回调函数也会执行
- 执行的生命周期钩子：`componentDidMount`, `componentDidUpdate`

## 生命周期（16.4+）

### 创建阶段

- constructor
实例过程中自动调用的方法，在方法内部通过`super`关键字获取来自父组件的`props`
- getDerivedStateFromProps
新增的生命周期，是一个静态的方法，因此不能访问到组件的实例
<br>执行时机：组件创建和更新阶段，不论是`props`还是`state`变化，都会调用
<br>参数：（props，state），即将更新的`props`，上一个状态的`state`
- render
类组件用于渲染`DOM`结构的方法，可以访问组件`state`和`props`属性
- componentDidMount
组件挂载到真实`DOM`后执行

### 更新阶段

- getDerivedStateFromProps
同上
- shouldComponentUpdate
基于`props`和`state`是否需要重新渲染组件，默认返回`true`
- render
同上
- getSnapshotBeforeUpdate
在`render`后执行，执行时`DOM`还没被更新
<br>参数`props`和`state`,返回的参数作为`componentDidUpdate`的第三参数，目的在于获取组件更新前的一些信息，如滚动位置之类，在组件更新后可以恢复一些UI上的状态
- componentDidUpdate
在组件更新结束后执行，可以根据前后的`props`和`state`的变化做相应的操作，如获取数据，修改`DOM`样式等

### 卸载阶段

- componentWillUnmount
用于组件卸载前，清理一些注册监听事件，或者取消订阅的网络请求等。<br>一旦一个组件实例被卸载，其不会被再次挂载，而只可能是被重新创建

### 与16.4-对比

减少了以下钩子，在现实使用中还能使用，只是增加了`UNDAFE_`前缀，原因是fiber架构，会导致render阶段会被多次执行，一下钩子可能会被多次执行

- componentWillMount
- componentWillReceiveProps
- componentWillUpdate

## v18新特性

### 新增hook

- useId
解决了客户端和服务端id不同的问题
原理：利用组件在组件数中的层级生成id
用法：

```js
fc(){
  const id = useId()
  return (
    <input type="checkbox" name="react" id={id} />
  )
}
```

- useTransition
在`React`中状态更新分为紧急更新和过渡更新：
<br>紧急更新：输出、点击、拖拽需要立即响应
<br>过渡更新：将UI从一个视图过渡到另一个视图
<br>使用`useTransition`可以将一个任务变为非紧急状态
用法：

```js
fc(){
  const [isPending,startTransition] = useTransition()
  return (
    <>
      <input type="text" value={value} onChange={(e)=>{
        setValue(e.target.value)// 紧急任务
        startTransition(()=>{
          setSearch(e.target.value)// 非紧急任务
        })
      }} />
      {isPending && 'loading……'}{/* 非紧急任务的状态 */}
    </>
  )

}
```

- useDeferredValue
将任务变成非紧急任务
:::tip 与useTrransition区别
useDeferredValue把任务变成了`延迟更新任务`，useTransition则是把一个状态变成了`延迟状态`
:::
用法：

```js
fc(){
  const [state,setState] = useState('')
  const deferedValue = useDeferrefValue(state)
  return (
    <>
      <input type="text" value={value} onChange={(e)=>{
        setState(e.target.value)// 紧急任务
      }} />
      <List search={deferredValue} />{/* 标记非紧急状态 */}
    </>
  )
}
```
