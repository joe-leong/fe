---
title: React 专题
categories:
  - 前端框架
tags:
  - 编码规范
author:
  name: joe
  link: https://github.com/joe-leong/fe
---

# React 专题

# 1. 概念

## 1.1. 受控组件

- 受控组件
  对于某个组件，它的状态是否收到外界的控制，如 `input` 的值是否受 `value` 控制，并且改变的值通过 `change` 改变外界的值
- 非受控组件
  对应地，组件的状态不受外界控制，如 `input` 只传入 `defaultValue` 作为初始值

## 1.2. jsx

jsx 是一种描述当前组件内容的数据结构

## 1.3. Fiber

- Fiber 是一种架构

  通过保存的信息链接整个 fiber 树

  ```js
  // Fiber，用来链接其他fiber节点形成的fiber树
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;
  ```

- Fiber 是一种数据结构

  - 储存节点的静态信息以及动态信息

    - 静态信息

      每个 `fiber` 节点都对应着一个 `react element`，保存了该组件的类型（函数组件，类组件，原生组件对应的 `dom` 节点信息）

      ```js
      // Instance，静态节点的数据结构属性
      this.tag = tag;
      this.key = key;
      this.elementType = null;
      this.type = null;
      this.stateNode = null;
      ```

    - 动态信息

      保存了每个组件改变的状态，要执行的工作（删除，插入或者更新）

      ```js
      this.ref = null;

      // 作为动态的工作单元的属性
      this.pendingProps = pendingProps;
      this.memoizedProps = null;
      this.updateQueue = null;
      this.memoizedState = null;
      this.dependencies = null;
      ```

- Fiber 是一种更新机制

  保存着更新的优先级，副作用等，节点之间通过单向链链接，可随时被高优先级或者申请执行时间不够而被中断

  ```js
  this.mode = mode;

  this.effectTag = NoEffect;
  this.subtreeTag = NoSubtreeEffect;
  this.deletions = null;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  // 作为调度优先级的属性
  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  // 指向该fiber在另一次更新时对应的fiber
  this.alternate = null;
  ```

# 2. 源码

## 2.1. render 阶段

### 2.1.1. beginWork

`beginWork`的工作是传入`当前Fiber节点`，创建`子Fiber节点`，通过 current===null 判断是 mount 还是 update

```js
function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes,
): Fiber | null
```

#### 2.1.1.1. update

满足一定条件时可以复用`current节点`，这样就能克隆`current.child`作为`workInProgress.child`

- didReceiveUpdate === false
  - oldProps === newProps && workInProgress.type === current.type (props 和 fiber.type 不变)
  - !includesSomeLane(renderLanes,updateLanes)，当前`fiber节点`优先级不够

#### 2.1.1.2. mount

除`fiberRootNode`以外，会根据`fiber.tag`不同，创建不同类型的`子fiber节点`，最终调用的是`recocileChildren`，最终都会生成新的`Fiber`节点返回并赋值给`workInProgress.child`

- 对于`mount`的组件，会创建新的`fiber节点`
- 对于`update`的组件，会与`current`进行对比（`diff`算法），将比较结果生成新的`fiber节点`

```js
export function reconcileChildren(
  current: Fiber | null,
  workInProgress: Fiber,
  nextChildren: any,
  renderLanes: Lanes
) {
  if (current === null) {
    // 对于mount的组件
    workInProgress.child = mountChildFibers(
      workInProgress,
      null,
      nextChildren,
      renderLanes
    );
  } else {
    // 对于update的组，会带上effectTag属性
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren,
      renderLanes
    );
  }
}
```

### 2.1.2. completeWork

与`beginWork`一样通过判断`current !== null` 来判断是`mount` 还是`update`

处理`props`等参数，提交`commit`

```js
export const completeWork = (workInProgress: FiberNode) => {
  if (__LOG__) {
    console.log("complete流程", workInProgress);
  }
  const newProps = workInProgress.pendingProps;
  const current = workInProgress.alternate;
  switch (workInProgress.tag) {
    case HostComponent:
      if (current !== null && workInProgress.stateNode) {
        // 更新
        // TODO 更新元素属性
        // 不应该在此处调用updateFiberProps，应该跟着判断属性变化的逻辑，在这里打flag
        // 再在commitWork中更新fiberProps，我准备把这个过程留到「属性变化」相关需求一起做
        updateFiberProps(workInProgress.stateNode, newProps);
      } else {
        // 初始化DOM
        const instance = createInstance(workInProgress.type, newProps);
        // 挂载DOM
        appendAllChildren(instance, workInProgress);
        workInProgress.stateNode = instance;

        // TODO 初始化元素属性
      }
      // 冒泡flag
      bubbleProperties(workInProgress);
      return null;
    case HostRoot:
      bubbleProperties(workInProgress);
      return null;
    case HostText:
      if (current !== null && workInProgress.stateNode) {
        // 更新
        const oldText = current.memoizedProps?.content;
        const newText = newProps.content;
        if (oldText !== newText) {
          markUpdate(workInProgress);
        }
      } else {
        // 初始化DOM
        const textInstance = createTextInstance(newProps.content);
        workInProgress.stateNode = textInstance;
      }

      // 冒泡flag
      bubbleProperties(workInProgress);
      return null;
    case FunctionComponent:
      bubbleProperties(workInProgress);
      return null;
    default:
      console.error("completeWork未定义的fiber.tag", workInProgress);
      return null;
  }
};
```

#### 2.1.2.1. update

判断`current`的同时还需要判断`workInProgress.stateNode`，如果不为`null`则是`update`,主要处理的 prop：

- `onClick`、`onChange`等事件注册
- 处理`style`
- 处理`children prop`

最终处理完的`props`会被赋值给`workInProgress.updateQueue`,最后在`commit`阶段被渲染，`props`是一个数组，基数值为`key`，偶数值为`value`

#### 2.1.2.2. mount

主要逻辑：

- 通过`beginWork`生成的 tag 为 fiber 节点生成 DOM 节点
- 将子 DOM 节点插入到刚刚生成的 DOM 节点中
- 与`update`步骤中的`updateHostComponent`类似的`props`处理过程

每次都把生成的 DOM 节点插入到父亲节点中，`commit`后只需把`rootFiber`的`stateNode`插入到`fiberRoot`即可以更新全文档

### 2.1.3. effectList

:::warning
v18 已经进行重构，变为`subtreeFlags`，通过冒泡传递到`rootFiber`，最终还得遍历树处理`effect`
:::
[关于 effectList 重构为 subtreeFlags](https://juejin.cn/post/7036155759121399821)

`commit阶段`需要对存在`effectTag`的`fiber节点`进行对应的操作，来源一条叫`effectList`的单向链表

在`completeWork`中的上层`completeUnitOfWork`中，每执行完`completeWork`且存在`effectTag`，就会把`fiber节点`添加到该链表中

## 2.2. 触发更新

### 2.2.1. 触发更新方式

- render
- setState
- dispatch reducer
- forceUpdate

## 2.3. 问题

### 2.3.1. 更新时workinprogress tree如何生成？

### 2.3.2. 优先级插队如何实现？

### 2.3.3. 如何生成新的 fiber 链呢？

  那就是在`beginworke`里，在处理子节点时调用的`reconcileChildFibers` 然后调用`reconcileSingleElement`下层调用 `useFiber` 产生`alternate`，最后`commitRoot`更新视图

### 2.3.4. 生成的真实节点如何合并的呢？

  `beginwork`的时候对 fiber 完成 tag 的标记，`completework`时向上遍历，如果判断是原生节点就调用`appendAllChildren`把子节点添加到当前节点下，`fiber`保存 DOM 的字段是`stateNode`

# 3. 优化

## 3.1. 渲染优化

### 3.1.1. ReRender 三要素

`props 默认是全等比较，每次传入的 props 都是全新的对象，oldProps !== newProps true`

- props
  `从父组件接受 data children 等参数`
- state
  `作为 props 传递给子孙组件`
- context
  `从 provider 中获取数据`

### 3.1.2. 自顶向下更新

在`React`中数据发生变化，会自顶向下构建一颗完整的组件树，即使组件内部没有发生变化，默认都会被重新渲染

```js
function Demo1() {
  const [count, setCount] = useState(0);
  return (
    <>
      <input
        type="number"
        value={count}
        onChange={(e) => setCount(+e.target.value)}
      />
      <p>num is {count}</p>
      <ExpensiveCpn />
    </>
  );
}
function ExpensiveCpn() {
  const now = performance.now();
  while (performance.now() - now > 100) {}
  console.log("耗时组件 render");
  return <p>耗时组件</p>;
}
```

### 3.1.3. 抽离变的部分

把 Input 及展示需要用到 state 的部分抽离成一个组件，把变与不变分离

```js
function Demo2() {
  return (
    <>
      <Input></Input>
      <ExpensiveCpn />
    </>
  );
}
function Input() {
  const [count, setCount] = useState(0);
  return (
    <>
      <input
        type="number"
        value={count}
        onChange={(e) => setCount(+e.target.value)}
      />
      <p>num is {count}</p>
    </>
  );
}
```

### 3.1.4. 优化父组件

`父组件不变，props 传递不变组件到可变组件中，也可以达到不变组件不重渲染`

```js
function Demo3() {
  return (
    <InputWrapper>
      <ExpensiveCpn />
    </InputWrapper>
  );
}

function InputWrapper({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div title={count + ""}>
      <input
        type="number"
        value={count}
        onChange={(e) => setCount(+e.target.value)}
      />
      <p>num is {count}</p>
      {children}
    </div>
  );
}
```

### 3.1.5. context 传参

```js
const numCtx = createContext(0);
const updateNumCtx = createContext(() => {});
function Demo4() {
  const [num, updateNum] = useState(0);
  return (
    <>
      <numCtx.Provider value={num}>
        <updateNumCtx.Provider value={updateNum}>
          <Middle></Middle>
        </updateNumCtx.Provider>
      </numCtx.Provider>
    </>
  );
}

function Middle() {
  return (
    <>
      <Button></Button>
      <Show></Show>
    </>
  );
}
function Button() {
  const updateNum = useContext(updateNumCtx);
  console.log("btn render");
  return <button onClick={() => updateNum(Math.random())}>随机数</button>;
}

function Show() {
  const num = useContext(numCtx);
  return <p>num is: {num}</p>;
}
```

### 3.1.6. memo

`使用memo对中间组件的渲染结果缓存，原理是 memo 会对 props 进行浅比较`

```js
const Middle = memo(() => {
  return (
    <>
      <Button></Button>
      <Show></Show>
    </>
  );
});
```

### 3.1.7. useMemo

`使用 useMemo 对渲染结果缓存`

```js
const Middle = () => {
  return useMemo(() => {
    return (
      <>
        <Button></Button>
        <Show></Show>
      </>
    );
  }, []);
};
```

# 4. 相关库

immutable.js
React-app-rewired
