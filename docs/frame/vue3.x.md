---
title: Vue3.x 专题
categories:
  - 前端框架
tags:
  - 编码规范
author:
  name: joe
  link: https://github.com/joe-leong/fe
---

# Vue3.x 专题

## 1. 目录结构

```js
packages
├── compiler-core // 编译核心
│   └── src
│       ├── compat
│       └── transforms
├── compiler-dom // 编译时dom包
│   └── src
│       └── transforms
├── compiler-sfc // 单文件编译器
│   └── src
├── compiler-ssr
│   └── src
│       └── transforms
├── reactivity
│   └── src
├── reactivity-transform
│   └── src
├── runtime-core // 运行时核心
│   ├── src
│   │   ├── compat
│   │   ├── components
│   │   └── helpers
│   └── types
├── runtime-dom // 运行时dom包
│   ├── src
│   │   ├── components
│   │   ├── directives
│   │   ├── helpers
│   │   └── modules
│   └── types
├── server-renderer
│   └── src
│       └── helpers
├── shared
│   ├── __tests__
│   │   └── __snapshots__
│   └── src
├── size-check
│   └── src
├── template-explorer
│   └── src
├── vue
│   ├── compiler-sfc
│   ├── examples
│   │   ├── classic
│   │   ├── composition
│   │   └── transition
│   ├── server-renderer
│   └── src
└── vue-compat
    └── src
```

## 2. 概念

### 2.1. LRU

`LRU`是`Least recently used`的简写，主要原理是根据历史访问记录来淘汰数据。如果数据被访问过，则被定义为未来被访问的概率也高。存储结构是双链表，最近被访问的放到链表尾部，所以头部数据是被访问过时间最久的。
`Vue`在内部监听`include`和`exclude`，一旦发生变化就会清洗缓存，分别使用`Map`和`Set`存储`vnode`和`Keys`,前者形成映射表，后者存储`key`，方便查找，无需遍历`Map`

```js
const KeepAliveImpl: ComponentOptions = {
  name: `KeepAlive`,
  __isKeepAlive: true,

  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number],
  },
  ...
  // 添加缓存的函数
  const cacheSubtree = () => {
      if (pendingCacheKey != null) {
        cache.set(pendingCacheKey, getInnerChild(instance.subTree))
      }
    }
  ...
  // prune cache on include/exclude prop change
  watch(
    () => [props.include, props.exclude],
    ([include, exclude]) => {
      include && pruneCache((name) => matches(include, name));
      exclude && pruneCache((name) => !matches(exclude, name));
    },
    // prune post-render after `current` has been updated
    { flush: "post", deep: true }
  ),
  ...
  //LRU
  // prune oldest entry
  if (max && keys.size > parseInt(max as string, 10)) {
    pruneCacheEntry(keys.values().next().value)
  }
 function pruneCacheEntry(key: CacheKey) {
    const cached = cache.get(key) as VNode
    if (!current || !isSameVNodeType(cached, current)) {
      unmount(cached)
    } else if (current) {
      // current active instance should no longer be kept-alive.
      // we can't unmount it now but it might be later, so reset its flag now.
      resetShapeFlag(current)
    }
    cache.delete(key)
    keys.delete(key)
  }
};
```

## 3. APIS

## x. 插件

- veaury
  在 `vue` 中使用 `react` 组件
  在 `react` 中使用 `vue` 组件
- @glideapps/glide-data-grid
  canvas 虚拟列表
- @vue-flow/core
  流程设计器

🚧
