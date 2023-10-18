(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{314:function(e,t,n){"use strict";n.r(t);var l=n(14),s=Object(l.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"node"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#node"}},[e._v("#")]),e._v(" Node")]),e._v(" "),t("h1",{attrs:{id:"两个node进程如何通信"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#两个node进程如何通信"}},[e._v("#")]),e._v(" "),t("a",{attrs:{href:"https://juejin.cn/post/7016233869565231135",target:"_blank",rel:"noopener noreferrer"}},[e._v("两个Node进程如何通信"),t("OutboundLink")],1)]),e._v(" "),t("ul",[t("li",[e._v("不同电脑上的两个Node进程通信\n通常使用 "),t("code",[e._v("TCP")]),e._v(" 或者 "),t("code",[e._v("HTTP")]),e._v(" 进行通信\n"),t("br")]),e._v(" "),t("li",[e._v("同一台电脑上两个Node进程通信\n"),t("ul",[t("li",[e._v("进程与自己创建的子进程，可以使用内置的IPC通信")]),e._v(" "),t("li",[e._v("进程与别的不相关的进程通信，可以使用自定义管道")])])])]),e._v(" "),t("h1",{attrs:{id:"node-与浏览器-eventloop-的区别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#node-与浏览器-eventloop-的区别"}},[e._v("#")]),e._v(" Node 与浏览器 EventLoop 的区别")]),e._v(" "),t("ul",[t("li",[e._v("浏览器事件循环有两个默认事件队列\n"),t("ul",[t("li",[e._v("宏任务队列")]),e._v(" "),t("li",[e._v("微任务队列")])])]),e._v(" "),t("li",[e._v("Node 根据任务的种类和优先级，分成了 6 个阶段来执行异步任务\n"),t("ul",[t("li",[e._v("定时器（timers）：该阶段用于判断是否执行定时器回调")]),e._v(" "),t("li",[e._v("待定回调（pending callbacks）：用于执行网络I/O 等异常时的回调；执行上一轮残留的回调")]),e._v(" "),t("li",[e._v("idle，prepare：仅系统内部使用")]),e._v(" "),t("li",[e._v("轮询（poll）：该阶段用于执行 所有其他阶段不处理的 I/O回调 + 检索新的I/O事件\n"),t("ul",[t("li",[e._v("生成该阶段预设阻塞的时间 + 预设轮询I/O 的时间")]),e._v(" "),t("li",[e._v("执行大多数的网络I/O，文件I/O")]),e._v(" "),t("li",[e._v("如果轮询队列不为空，遍历队列同步执行回调，直到队列为空")]),e._v(" "),t("li",[e._v("如果为空\n"),t("ul",[t("li",[e._v("如果有 setimmediate 回调需要执行，立即结束 poll 阶段，并进入 check 阶段")]),e._v(" "),t("li",[e._v("如果没有 setimmediate 回调需要执行，则停留在该阶段以等待回调被添加到队列中，然后立即执行。在超时时间到达前，事件循环会一直停留等待")])])])])]),e._v(" "),t("li",[e._v("检测（check）：setimmediate 回调函数在这里执行")]),e._v(" "),t("li",[e._v("关闭的回调函数（close callbacks）：用于执行一些关闭资源的回调，优先级最低")])])])]),e._v(" "),t("div",{staticClass:"language-txt extra-class"},[t("pre",{pre:!0,attrs:{class:"language-txt"}},[t("code",[e._v("   ┌───────────────────────────┐\n┌─>│           timers          │\n│  └─────────────┬─────────────┘\n│  ┌─────────────┴─────────────┐\n│  │     pending callbacks     │\n│  └─────────────┬─────────────┘\n│  ┌─────────────┴─────────────┐\n│  │       idle, prepare       │\n│  └─────────────┬─────────────┘      ┌───────────────┐\n│  ┌─────────────┴─────────────┐      │   incoming:   │\n│  │           poll            │<─────┤  connections, │\n│  └─────────────┬─────────────┘      │   data, etc.  │\n│  ┌─────────────┴─────────────┐      └───────────────┘\n│  │           check           │\n│  └─────────────┬─────────────┘\n│  ┌─────────────┴─────────────┐\n└──┤      close callbacks      │\n   └───────────────────────────┘\n\n")])])]),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),t("p",[e._v("node11 之后，微任务的调度会穿插在每一个timers任务执行之中：\ntimers执行一个任务 -> 清空process.nextTick() + promise.then() 任务队列 -> timers执行一个任务 依次循环，直到全部执行完成")])]),e._v(" "),t("p",[e._v("🚧")])])}),[],!1,null,null,null);t.default=s.exports}}]);