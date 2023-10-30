---
title: ECMAscript 专题
categories:
  - 前端框架
  - react
  - vue
tags:
  - 编码规范
author:
  name: joe
  link: https://github.com/joe-leong/fe
---

# JavaScript

# 前端模块化

前端模块化就是 `复杂的文件变成一个个独立的模块`，比如js文件等等，分成独立的模块有利于复用和维护，但是会引起模块之前相互依赖的问题。所以出现了各种模块化规范。模块化也是前端工程化的基石

# 模块化规范

## CommonJS

- 定义
  - 同步加载，模块加载完成才能继续执行后面的代码
  - 所有代码运行在模块作用域，不会污染全局
  - 模块可以多次加载，但是只在第一次加载时运行一次，之后的加兹安都引用缓存的结果。如果想再次运行，需要清除缓存
  - 加载顺序，按照在代码中出现的顺序加载，也可以动态加载
  - 导入的值是拷贝的，可以修改拷贝值，不会引起变量污染
- 基本语法
  - 暴露模块：module.exports = value || exports.xxx = value，exports 引用的其实是 module.exports
  - 引入模块：require(xxx)

## AMD

- 定义

  - 非同步加载模块，允许指定回调函数

- 基本语法

  - 定义没有依赖的模块

    ```js
    define(function () {
      return xxx;
    });
    ```

  - 定义有依赖的模块

    ```js
    define(['module1','module2']。function(m1,m2){
      return xxx
    })
    ```

  - 引入模块，依赖前置

    ```js
    require(["m1", "m2"], function (m1, m2) {
      xxx;
    });
    ```

  - Eg：[require.js](https://github.com/requirejs/requirejs)

## CMD

- 定义

  - 专门用于浏览器
  - 异步加载，使用时加载
  - 依赖就近

- 基本语法

  - 定义没有依赖的模块

    ```js
    define(function (resuire, exports, module) {
      exports.xxx = value;
      module.exports = value;
    });
    ```

  - 定义有依赖的模块

    ```js
    define(function(require,exports,module){
      // 同步引入
      let m1 = require('./module')
      // 异步引入
      require.async('./module',function(m2){
        ...
      })
    })
    ```

  - eg：[sea.js](https://github.com/seajs/seajs)

## UMD

- 定义
  - JavaScript 通用模块，同时满足 CMD。AMD，CommonJS 标准

## ESM

- 定义

  - 静态化
  - 编译时
  - 值引用

- 基本语法

  - 定义模块

    ```js
    export const xxx = value
    export {
     xxx:value,
      xxx:value
    }
    export default xxx
    ```

  - 引入模块

    ```js
    import { xxx } from "module"; // import concrete
    import a from "module"; // import default
    ```

# 2. This 指向

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

# Symbol

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

# 柯里化

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

# async defer prefetch preload

1. `async`立即下载（异步，不会阻塞文档解析），下载完立刻执行，无序
2. `defer`立即下载（异步，不会阻塞文档解析），文档解析完后立即执行，按照加载顺序执行
3. .`prefetch`预下载，在未来的某个页面可能会执行
4. `preload`预下载，需要的时候立即执行，

# 运算符

## 按位或 |

运算符在其中一个或两个数对应的围巾值位为`1`时，该值的结果为`1`

```js
cosnt a = 5/** *///00000000000000000000000000000101
const b = 3/** *///00000000000000000000000000000011
a | b/**       *///00000000000000000000000000000111
```

## 按位或赋值 |=

按位或运算后赋值

```js
let a = 5; /***/ //00000000000000000000000000000101
a |= 3; /**   */ //00000000000000000000000000000011
a; /**        */ //00000000000000000000000000000111
```

## 按位与 &

在两个操作数对应的二进位都为`1`时，该位的结果才为`1`

```js
const a = 5; /***/ //00000000000000000000000000000101
const b = 3; /***/ //00000000000000000000000000000011
a & b; /**      */ //00000000000000000000000000000001
```

## 按位与赋值 &=

按位与运算后赋值

```js
const a = 5; /***/ //00000000000000000000000000000101
a &= 3; /**     */ //00000000000000000000000000000001
```

```js
function findMost(arr){
    let a = new Map()
    ;arr.forEach(item=>{
        a.set(item,(a.get(item) || 0)++)
    })
    return a
}
findMost([1,2,3,2,2,2,5,4,2])
```

# 进程 & 线程

进程是资源分配的基本单位，线程是独立调度的基本单位

## 什么是进程

进程是程序在某个数据集合上的一次运动活动，也是操作系统进行资源分配和保护的基本单位

## 什么是线程

线程是进程开辟的子活动，是为了减少进程开启的资源消耗以及数据共享而诞生。同属一个进程的线程可以共享进程上的内存数据资源，一个进程能够开启多个线程，但是一个线程只能归属一个进程

### 优点

一个进程中可以存在多个线程，这些线程共享该进程的资源。进程间的通信必须请求操作系统服务，开销很大。而线程见通信无需操作系统干预，开销更小。但是不同进程的线程通信也是需要请求操作系统服务的
<br>线程的并发比进程的开销更小，系统并发性能提升

### 缺点

当进程中的一个线程崩溃时，会导致其所属进程的所有线程崩溃

# 浏览器工作原理

浏览器的工作原理可以简单地概括为以下几个步骤：

用户输入URL：用户在浏览器地址栏输入URL或点击链接，触发浏览器的导航行为。

发送HTTP请求：浏览器向服务器发送HTTP请求，请求获取网页的资源，包括HTML、CSS、JavaScript文件以及其他相关的资源文件。

接收和解析响应：浏览器接收到服务器返回的HTTP响应，根据响应的内容类型进行解析。如果是HTML文件，则开始构建DOM树，同时解析CSS文件构建CSSOM树。如果有JavaScript文件，则执行JavaScript代码。

构建渲染树：浏览器将解析得到的DOM树和CSSOM树进行合并，构建出渲染树（Render Tree）。渲染树只包含需要显示的节点和对应的样式信息。

布局和绘制：浏览器根据渲染树进行布局（Layout）和绘制（Painting）。布局阶段确定每个节点在屏幕上的位置和大小，绘制阶段将渲染树转换为屏幕上的像素。

显示页面：浏览器将绘制得到的像素信息发送给显示器，显示页面内容在用户的屏幕上。

处理用户交互：浏览器监听用户的交互事件，例如鼠标点击、滚动等，根据事件执行相应的操作。这可能包括重新构建渲染树、重新布局和绘制。

定时器和异步任务：浏览器执行定时器任务和处理异步任务，例如延迟执行的JavaScript代码、网络请求等。

整个过程中，浏览器会不断地与服务器进行通信，下载和加载页面所需的资源，并将这些资源解析和渲染成用户可见的页面。同时，浏览器还负责处理用户的交互操作，并执行JavaScript代码来实现网页的动态效果和交互功能。

# 浏览器渲染过程

- DOM树 和 CSSOM树解析 (样式计算，computed style)
- 布局 layout
- 分层 layer
- 绘制 paint
- 分块 tiling
- 光栅化 raster
- 画页面 draw

# ssl（HTTP）

- 客户端发起一个请求，发送自身支持的加密算法发给服务端
- 服务端接收后与自身的对比，如果没有支持的则断开连接，反之选择其中一种加密算法和哈希算法以证书形式返回客户端
- 客户端收到证书后，需要校验证书的有效性，生成随机密码，使用证书中的公钥加密发送给客户端
- 服务端收到加密的密码后，用自己的私钥解密，获得随机密码，使用随机密码解密握手信息和握手信息的哈希值，并与发送过来的哈希值进行对比是否一致，然后使用随机密码加密一段握手信息发送给客户端
- 客户端用随机密码解密握手信息，对比与服务端发来的哈希值的一致性

# == & ===

```js
基本类型：undefined、null、boolean、number、string
引用类型：Array、Object
包装类型：String、Number、Boolean
```

- 如果两个操作数都是数字类型，则直接进行数值比较。
- 如果两个操作数都是字符串类型，则按照字典顺序进行字符串比较。
- 如果一个操作数是数字类型，另一个操作数是字符串类型，则将字符串转换为数字后再进行比较。
- 如果两个操作数都是对象类型，则会调用它们的valueOf()或toString()方法来获取可比较的值，然后进行比较
- NaN和其他任何值都是不相等的，包括它本身

## ==

双等号比较，如果两边类型不一样会尝试转换成基本类型进行比较

```js
// 对象比较
{a:1} == {a:1} //false 也会进行类型转换，但是转换会依然不会相等
{a:1} == 'object Object' // true 转换为字符串，调用.toString
'object Object' == {a:1} // false 尝试把字符串转换成对象
[] == true // false 都转换成数字类型 ‘’ == true => 0 == 1
[1] == true // true '1' == true => 1 == 1
[12] == true // false '12' == true => 12 == 1
{} == true // false  NaN == true
```

## ===

全等比较，不进行类型隐式转换，引用类型比较地址，基本类型比较值

# 节流与防抖

- 防抖

  延迟执行回调函数，事件内再次出发重新计时，直到超出延迟时间后触发函数

  ```js
  function debounce(fn,ms){
     let timer
     return function(){
        let context = this
        let args = arguments
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
          fn.apply(context,args)
        },ms)
    }
  }
  ```

- 节流

  以指定的时间频率执行回调函数，指定时间内回调函数只会执行一次

  ```js
  function throttle(fn,ms){
    let previous
    return function (){
      let now = Date.now()
      let context = this
      let args = arguments
      if(now - previous > ms){
        fn.apply(context,args)
        previous = now
      }
    }
  }
  ```

# instanceof

`instanceof`运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上，一直往原型链上找原型，判断是否相同

```js
function myInstanceof(left,right){
  // 先用 typeof 判断是否是基础数据类型，如果是则直接返回false
  if(typeof left !== 'object' || left === null) return false
  let proto = Object.getPrototypeOf(left)
  while(true){
    if(proto === null) return false
    if(proto === right.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}
```

# Promise限制并发

```js
function sendRequest(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      Math.ramdom() > 0.5 ? resolve() : reject()
    },3000)
  })
}
function concurrent(list,maxLink){
  let len = list.length
  let counter = 0
  return new Promise(resolve=>{
    const start = ()=>{
      while(counter < len && maxLink > 0){
        maxLink--
        request().then(()=>{
          maxLink++
          counter++
          if(counter === len){
            resolve()
          }else{
            start()
          }
        },()=>{
          maxLink++
          start()
        })
      }
    }
    start()
  })
}
```

# 数字在计算机存储方式

数据在计算机中是以二进制祖里尔的形式存在，内存中存储的都是补码

- 对于正数，它的原码、反码，补码都一样
- 对于负数
  - 原码：符号位为1，其余依次按二进制转换
  - 反码：符号位不变，其余按位取反
  - 补码：反码+1

# 0.1 + 0.2 !== 0.3

## 十进制小数转二进制

十进制小数转二进制，小数部分，乘2取整数，如果乘之后的小数部分不为0，继续乘以2知道小数部分为0，将取出的整数正向排序
eg: 0.1转二进制，最终表示为 0.00110011... 后面将会 0011 无限循环

```js
0.1 * 2 = 0.2 --------------- 取整数 0，小数 0.2
0.2 * 2 = 0.4 --------------- 取整数 0，小数 0.4
0.4 * 2 = 0.8 --------------- 取整数 0，小数 0.8
0.8 * 2 = 1.6 --------------- 取整数 1，小数 0.6
0.6 * 2 = 1.2 --------------- 取整数 1，小数 0.2
0.2 * 2 = 0.4 --------------- 取整数 0，小数 0.4
0.4 * 2 = 0.8 --------------- 取整数 0，小数 0.8
0.8 * 2 = 1.6 --------------- 取整数 1，小数 0.6
0.6 * 2 = 1.2 --------------- 取整数 1，小数 0.2
...
```

## 数据精度

在64位系统下，js使用的是双精度。双精度浮点数使用8字节来存储一个浮点数。
64位分为以下3个部分：

- sign bit（符号位）：用来表示正负号，0为正1为负（1位）
- exponent（指数）：用来表示次方数（11位）
- mantissa（尾数）：用来表示精确度（52位）

# 实现bind

```js

Object.prototype.myBind = function (target) {
  let _symbol = Symbol()
  target[_symbol] = this
  target[_symbol](...Array.from(arguments).slice(1))
  delete target[_symbol]
}

function aa(name) {
  console.log(this,name)
}

aa.myBind({a:123},'joe')
```

# 数据存储

## indexDB

`indexDB` 是一个运行在浏览器上的`非关系型数据库`，容量大小不小于`250MB`，步进能存储字符串，还可以存储二进制数据

特点：

1. 键值对存储：`indexDB`内部采用对象仓库存储数据。所有类型的数据都可以存入，包括js对象。对象仓库中，数据以`键值对`的形式保存，每个数据记录都有对应的主键，主键是独一无二的，不能重复，否则抛出错误。
2. 异步：操作是不会锁死浏览器，用户依然可以进行其他操作。
3. 支持事务：只要有一步失败，整个事务就取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况。
4. 同源性限制：每一个数据库对应创建他的域名。网页只能访问自身域名下的数据库，而不能访问跨域的数据库。
5. 支持未禁止存储：步进可以存储字符串，还可以存储二进制数据（ArrayBuffer和Blob对象）。
6. 存储空间大：存储空间一般不少于`250MB`

### 使用

```js
let db = null
// 打开数据库
const request = window.indexDB.open(databaseName,version)

request.onupgradeneeded = res => {
  console.log('updated', res)
  db = res.target.result
  /**
   * 建表
   * keypath 主键
   * autoIncrement:true 自动增加/生成
   */
  db_table = db.createObjectStore('group', { keyPath: 'id' })
  /**
   * 创建索引
   * 索引名称
   * 索引所在的属性
   * 
   */
  db_table.createIndex('indexName','name',{unique:true})
}

request.onsuccess = res => {
  /**
   * 添加数据
   */
  const addData = store.add({
    id: 1,
    name: 'joe',
    age:18
  })

  addData.onerror = err => {
    console.log('数据添加失败',err)
  }
  addData.onsuccess = res => {
    console.log('数据添加成功',res)
  }

  /**
   * 获取数据
   */
  const pickStore = db.transaction(['group']).objectStore('group')

  let pick = pickStore.get(1)

  pick.onsuccess = res => {
    const { result } = res.target
    if (result) {
      console.log('pick success', result)
    } else {
      console.log('pick fail');
    }
  }

  pick.onerror = err => {
    console.log('pick err',err)
  }

  /**
   * 更新数据
   */
  const putStore = db.transaction(['group'],'readwrite').objectStore('group')

  const putReq = putStore.put({
    id: 1,
    name: 'joe' + Math.random(),
    age:18
  })

  putReq.onsuccess = res => {
    console.log('更新成功',res)
  }

  putReq.onerror = err => {
    console.log('更新失败',err);
  }

  /**
   * 删除数据
   */
  const delReq = putStore.delete(1)

  delReq.onsuccess = res => {
    console.log('删除成功',res);
  }

  delReq.onerror = err => {
    console.error('删除失败',err);
  }

  /**
   * 通过索引获取数据
   */
  const indexGet = pickStore.index('indexName').get('joe')

  indexGet.onsuccess = res => {
    console.log('索引获取成功',res);
  }

  indexGet.onerror = err => {
    console.error('索引获取失败',err);
  }

  /**
   * 获取指针并遍历表
   */
  const cursor = pickStore.openCursor()

  cursor.onsuccess = res => {
    console.log('指针获取成功',res);
    let point = res.target.result
    if (point) {
      console.log('point value', point.value);
      point.continue()
    } else {
      console.error('没有更多数据了');
    }
  }

  cursor.onerror = err => {
    console.error('指针获取失败');
  }
}
```

🚧 `持续更新` 🚧
