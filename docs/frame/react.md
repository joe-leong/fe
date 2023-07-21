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

## 1. 🚧

## 2. 🚧

## 3. 性能优化

### 3.1. 渲染优化

- 3.1.1. 引起 ReRender 的三要素，props 默认是全等比较，每次传入的 props 都是全新的对象，oldProps !== newProps true

  - props
    `从父组件接受 data children 等参数`
  - state
    `作为 props 传递给子孙组件`
  - context
    `从 provider 中获取数据`

- 3.1.2. 自顶向下更新

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

- 3.1.3. 抽离变的部分

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

- 3.1.4. 父组件不变，props 传递不变组件到可变组件中，也可以达到不变组件不重渲染

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

- 3.1.5. 使用 context 传参

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

- 3.1.6. 使用 memo 对中间组件的渲染结果缓存，原理是 memo 会对 props 进行浅比较

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

- 3.1.7. 使用 useMemo 对渲染结果缓存

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
