# JavaScript

## This 指向

- 普通调用

```js
let obj = {
  a: 1,
  b: {
    a: 2,
    fn: function () {
      console.log(this.a);
    },
    catchFn() {
      console.log(this.a); // 可以捕获上层上下文，并且可以通过显示改变this指向
    },
    arrowFn: () => {
      console.log(this.a); // undefined this => window
    },
  },
};
obj.b.fn(); // 2
let j = obj.b.fn;
j(); // undefined this => window
obj.b.catchFn.call({ a: 3 }); // {a:3} 通过call，bind，apply改变this指向
```

- new 绑定
  - 在 js 中，new 的作用是通过构造函数来创建一个实例对象
  - new 过程发生了什么?
    1. 创建了一个空对象
    2. 将空对象原型的内存地址**proto**指向构造函数的原型对象
    3. 利用函数的 call 方法，将原本指向 window 的 this 指向新建的空对象
    4. 返回第三步的调用结果
    ```js
    function Foo(name) {
      this.name = name;
      return this;
    }
    function myNew(fn) {
      let obj = {};
      obj.__proto__ = fn.prototype;
      return fn.call(obj, "joe");
    }
    ```

```js
function Test() {
  this.x = 1;
}
let obj = new Test();
obj.x; // 1

如果构造函数中有return值，则this指向该值
如果return值是基础类型或者null，this仍然指向原实例对象
function Fn(){
    this.user = 'xxx'
    return {
        user:'joe'
    }
}
let newFn  = new Fn()
newFn.user // joe
```

## Symbol

- 判断平台是否支持`Symbol`

```js
typeof Symbol === "function" && Symbol.for;
```

- Symbol(key) 直接调用会返回一个唯一的结果
- Symbol.for(key) 会在全局 symbol 注册表查找是否存在相同的 key，有则返回，没有则在 全局 symbol 注册表注册 key

```js
let a = Symbol("react");
let b = Symbol("react");
let c = Symbol.for("react");
let d = Symbol.for("react");
b === a; // false
c === d; // true
a === c; //false
```

## 柯里化

`💡柯里化是一种函数式编程技术，将一个带有多个参数的函数转换为一系列只有一个参数的函数`

- 延长作用域链

```js
function curry(a) {
  return (b) => {
    return a + b;
  };
}
```

- 函数柯里化（洋葱圈模型）

```js
function compose(...args) {
  return args.reduceRight((pre, curr) => {
    return curr(pre);
  });
}
```

## async defer prefetch preload

1.`async`立即下载（异步，不会阻塞文档解析），下载完立刻执行 2. `defer`立即下载（异步，不会阻塞文档解析），文档解析完后立即执行 3.`prefetch`预下载，在未来的某个页面可能会执行
4、`preload`预下载，需要的时候立即执行

🚧 `持续更新` 🚧
