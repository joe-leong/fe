---
title: webpack 专题
categories:
  - 前端工程
  - webpack
tags:
  - 编码规范
  - 工程化
author:
  name: joe
  link: https://github.com/joe-leong/fe
---

# webpack

# 运行流程

1. 校验配置文件：读取命令行传入或者 `webpack.config.js` 文件，初始化本次构建的配置参数
2. 生成 `Compiler` 对象：实例配置文件中的插件
3. 确定入口：进入 `entryOption` 阶段，读取配置的 `Entries` ，遍历所有的入口文件
4. 编译模块：递归依赖使用 `loader` 对文件进行编译,再将编译好的文件生成AST，所有模块和依赖分析完成之后，执行 `compilation` 的 `seal` 对每个chunk进行整理、优化、封装 `__webpack_require__`
5. 输出资源 `emit`：编译及转化都已经完成，包含了最终输出的资源。已经可以在 `compilation.assets` 上拿到所需数据，包括即将输出的资源、代码块chunk等信息
6. 输出完成

# webpack 插件

## 基本结构

`plugins` 是可以使用自身原型方法 `apply` 来实例化的对象。 `apply` 只会在初始化插件时执行一次。`apply` 传入 `webpack compiler` 的引用，来获取编译器回调。

```js
class myPlugin{
  // 在构造函数中获取用户给该插件传入的配置
  constructor(options){
  }
  // Webpack 会调用 myPlugin 实例的 apply 方法给插件实例传入 compiler 对象
  apply(compiler) {
    // 在emit阶段插入钩子函数，用于特定时机处理额外的逻辑；
    compiler.hooks.emit.tap('myPlugin', (compilation) => {
      // 在功能流程完成后可以调用 webpack 提供的回调函数；
    });
    // 如果事件是异步的，会带两个参数，第二个参数为回调函数，在插件处理完任务时需要调用回调函数通知webpack，才会进入下一个处理流程。
    compiler.plugin('emit',function(compilation, callback) {
      // 支持处理逻辑
      // 处理完毕后执行 callback 以通知 Webpack 
      // 如果不执行 callback，运行流程将会一直卡在这不往下执行 
      callback();
    });
  }
}

module.exports = HelloPlugin;
```

## 工作原理

1. 读取配置时执行初始化实例 `new myPlugin(options)`
2. 初始化 `compiler` 对象后调用 `[plugin].apply(compiler)` 传入 `compiler` 对象
3. 插件实例获取到 `compiler` 对象后，就可以通过 `compiler.plugin(事件名称，回调函数)` 监听到 `webpack` 广播出来的事件，并且可以通过 `compiler` 对象操作 `webpack`

# 如何实现动态加载

`webpack` 本身是静态模板打包工具，它不会关心运行时到底发生了什么。
使用 `import()` 方法可以实现按需加载资源，在代码中所有使用 `import([路径])` 的模块都被抽离成一个单独的chunk。在客户端执行到这行代码的时候，会自动请求加载这个资源。路径被编译之后会处理成 `webpack` 命令执行目录的相对路径

# 打包优化

- 代码拆分：将应用程序拆分为多个小块，按需加载，减小初始加载的文件大小，提高页面加载速度。
- 延迟加载：按需加载某些模块或代码块，减少初始加载的文件大小，提高页面响应速度。
- 压缩和混淆代码：使用压缩工具对代码进行压缩和混淆，减小文件大小，提高加载速度。
- 优化文件大小：使用加载器和插件对不同类型的文件进行优化处理，如压缩CSS、压缩图片等。
- 缓存和长效缓存：生成带有哈希值的文件名，利用浏览器缓存机制，减少请求次数，提高再次访问时的加载速度。
- Tree Shaking：消除未使用的代码，减小文件大小，提高运行时的性能。
- 并行构建和缓存：使用多线程构建和缓存策略，加快构建速度，提高开发效率。
- 优化webpack配置：合理配置选项和插件，如设置合适的模式、调整模块解析规则等。

# webpack require是如何查找依赖的

1. 解析路径：webpack会根据配置文件中的resolve属性来解析模块的路径，resolve属性包含了一系列的解析规则，例如指定了模块的根目录、模块的别名等。webpack会根据这些规则来解析模块的路径。
2. 查找文件：一旦webpack解析了模块的路径，会尝试在指定的路径下查找相应的文件。
3. 解析依赖：在查找文件的过程中，如果webpack发现文件中存在其他的依赖关系（例如通过import或者require引入其他模块），它会继续递归地解析这些依赖关系，直到找到所有的依赖为止。
🚧
