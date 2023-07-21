import { defineConfig4CustomTheme, UserPlugins } from "vuepress/config";

export default defineConfig4CustomTheme({
  locales: {
    "/": {
      lang: "zh-CN",
      title: "前端小梁",
      description: "前端工程",
    },
  },
  base: "/fe/",
  themeConfig: {
    logo: "/img/logo.png",
    repo: "joe-leong/fe",
    searchMaxSuggestions: 10,
    docsDir: "docs",
    nav: [
      {
        text: "首页",
        link: "/index.md",
      },
      {
        text: "前端框架",
        items: [
          {
            text: "React",
            link: "/frame/react.md",
          },
          {
            text: "Vue",
            link: "/frame/vue.md",
          },
        ],
      },
      {
        text: "前端基础",
        items: [
          {
            text: "CSS",
            link: "/coding/css.md",
          },
          {
            text: "JavaScript",
            link: "/coding/javascript.md",
          },
          {
            text: "数据结构",
            link: "/coding/datastructure.md",
          },
        ],
      },
    ],
    sidebar: [
      {
        title: "前端框架",
        children: [
          {
            title: "React",
            path: "/frame/react.md",
          },
          {
            title: "Vue",
            path: "/frame/vue.md",
          },
        ],
      },
      {
        title: "前端基础",
        children: [
          {
            title: "CSS",
            path: "/coding/css.md",
          },
          {
            title: "JavaScript",
            path: "/coding/javascript.md",
          },
          {
            title: "数据结构",
            path: "/coding/datastructure.md",
          },
        ],
      },
    ],
    footer: {
      createYear: 2023,
      copyrightInfo: 'joe | <a href="https://github.com/joe-leong/fe" target="_blank">github</a>',
    },
    extendFrontmatter: {
      author: {
        name: "joe",
        link: "https://github.com/joe-leong/fe",
      },
    },
  },
  head: [
    ["link", { rel: "icon", href: "/img/logo.png" }],
    [
      "meta",
      {
        name: "keywords",
        content: "前端空间",
      },
    ],
  ],
  plugins: <UserPlugins>[
    [
      "one-click-copy",
      {
        copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'],
        copyMessage: "复制成功",
        duration: 1000,
        showInMobile: false,
      },
    ],

    [
      "vuepress-plugin-zooming",
      {
        selector: ".theme-vdoing-content img:not(.no-zoom)",
        options: {
          bgColor: "rgba(0,0,0,0.6)",
        },
      },
    ],
  ],
  extraWatchFiles: [".vuepress/config.ts"],
});
