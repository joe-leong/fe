(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{319:function(e,t,r){"use strict";r.r(t);var v=r(14),c=Object(v.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"react15"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#react15"}},[e._v("#")]),e._v(" React15")]),e._v(" "),t("h2",{attrs:{id:"架构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#架构"}},[e._v("#")]),e._v(" 架构")]),e._v(" "),t("p",[e._v("React15架构分为两层：\n"),t("br"),e._v("Reconciler（协调器）- 负责找出变化的组件\n"),t("br"),e._v("Renderer（渲染器）- 负责将变化的组件渲染到页面上")]),e._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),t("p",[e._v("两者交替执行，协调器发现变化就会通知渲染器更新，渲染器更新完成会返回协调器继续执行")])]),e._v(" "),t("h3",{attrs:{id:"reconciler-协调器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#reconciler-协调器"}},[e._v("#")]),e._v(" Reconciler（协调器）")]),e._v(" "),t("p",[e._v("在React中，setState,forceUpdate,render等API都可以触发更新，每当有更新发生时，Reconciler都会执行一下流程：")]),e._v(" "),t("ul",[t("li",[e._v("调用函数组件、或者调用class组件的render方法，将返回的"),t("code",[e._v("JSX")]),e._v("转化为"),t("code",[e._v("虚拟DOM")])]),e._v(" "),t("li",[e._v("将"),t("code",[e._v("虚拟DOM")]),e._v("和上次更新时的"),t("code",[e._v("虚拟DOM")]),e._v("对比")]),e._v(" "),t("li",[e._v("找出本次更新中变化的"),t("code",[e._v("虚拟DOM")])]),e._v(" "),t("li",[e._v("通知"),t("code",[e._v("Renderer")]),e._v("将变化的"),t("code",[e._v("虚拟DOM")]),e._v("渲染到页面上")])]),e._v(" "),t("h3",{attrs:{id:"renderer-渲染器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#renderer-渲染器"}},[e._v("#")]),e._v(" Renderer（渲染器）")]),e._v(" "),t("p",[e._v("React支持跨平台，所以不同的平台使用的渲染包不同。对于浏览器端使用的"),t("code",[e._v("Renderer")]),e._v("就是"),t("code",[e._v("ReactDOM")]),e._v(" "),t("br"),e._v("每次更新时，"),t("code",[e._v("Renderer")]),e._v("收到"),t("code",[e._v("Reconciler")]),e._v("的通知，将变化的组件渲染到当前宿主环境")]),e._v(" "),t("h2",{attrs:{id:"缺点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#缺点"}},[e._v("#")]),e._v(" 缺点")]),e._v(" "),t("p",[e._v("15使用的是"),t("code",[e._v("Stack concurrent")]),e._v("，在"),t("code",[e._v("Reconciler")]),e._v("中，无论是挂载组件还是更新组件，都会递归更新子组件。\n由于递归执行，所以一旦开始执行更新，就无法中途中断。如果层级很深，嘛呢更新所需要的时间就会远远超过渲染一帧所需要的时间，\n用户交互就会卡顿")]),e._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),t("p",[e._v("在浏览器中，js与UI渲染是互斥的，所以js未执行完毕，就无法执行UI更新的工作")])])])}),[],!1,null,null,null);t.default=c.exports}}]);