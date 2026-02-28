import { defineConfig4CustomTheme, UserPlugins } from "vuepress/config";

export default defineConfig4CustomTheme({
  locales: {
    "/": {
      lang: "zh-CN",
      title: "小梁の前端空间",
      description: "前端工程",
    },
  },
  base: "/fe/",
  themeConfig: {
    logo: "/img/logo.png",
    repo: "joe-leong/fe",
    searchMaxSuggestions: 10,
    docsDir: "docs",
    editLinkText: "为该章节纠错",
    editLinks: true,
    lastUpdated: "上次更新",
    smoothScroll: true,
    nav: [
      {
        text: "首页",
        link: "/index.md",
      },
      {
        text: "AI",
        items: [
          {
            text: "python",
            link: "/ai/python.md",
          },
        ],
      },
      {
        text: "前端基础",
        items: [
          {
            text: "JavaScript",
            link: "/coding/javascript.md",
          },
          {
            text: "http",
            link: "/coding/HTTP.md",
          },
          {
            text: "数据结构",
            link: "/coding/datastructure.md",
          },
          {
            text: "CSS",
            link: "/coding/css.md",
          },
          {
            text: "算法",
            link: "/coding/algorithm.md",
          },
          {
            text: "Node",
            link: "/coding/node.md",
          },
        ],
      },
      {
        text: "前端框架",
        items: [
          {
            text: "React",
            link: "/frame/react.md",
          },
          {
            text: "React15",
            link: "/frame/react15.md",
          },
          {
            text: "React16",
            link: "/frame/react16.md",
          },
          {
            text: "Vue3",
            link: "/frame/vue3.x.md",
          },
          {
            text: "Vue2",
            link: "/frame/vue2.x.md",
          },
        ],
      },
      {
        text: "工程化",
        items: [
          {
            text: "webpack",
            link: "/engineering/webpack.md",
          },
          {
            text: "vite",
            link: "/engineering/vite.md",
          },
        ],
      },
      {
        text: "npm",
        items: [
          {
            text: "eslint-config",
            link: "https://www.npmjs.com/package/eslint-config-q-eslint-config",
          },
          {
            text: "markdownlint-config",
            link: "https://www.npmjs.com/package/q-markdownlint-config",
          },
          {
            text: "commitlint-config",
            link: "https://www.npmjs.com/package/commitlint-config-q-commitlint-config",
          },
          {
            text: "stylelint-config",
            link: "https://www.npmjs.com/package/q-stylelint-config",
          },
        ],
      },
      {
        text: "CLI",
        link: "https://www.npmjs.com/package/q-lint",
      },
      {
        text: "Hooks",
        link: "https://joe-leong.github.io/q-hooks",
      },
    ],
    sidebar: "auto",
    // sidebar: [
    //   {
    //     title: "前端框架",
    //     collapsable: true,
    //     children: [
    //       ["/frame/react.md", "React"],
    //       ["/frame/vue3.x.md", "Vue3"],
    //       ["/frame/vue2.x.md", "Vue2"],
    //     ],
    //   },
    //   {
    //     title: "工程化",
    //     collapsable: true,
    //     children: [
    //       ["/engineering/webpack.md", "webpack"],
    //       ["/engineering/vite.md", "vite"],
    //     ],
    //   },
    //   {
    //     title: "前端基础",
    //     collapsable: true,
    //     children: [
    //       ["/coding/css.md", "CSS"],
    //       ["/coding/javascript.md", "JavaScript"],
    //       ["/coding/http.md", "HTTP"],
    //       ["/coding/datastructure.md", "数据结构"],
    //     ],
    //   },
    // ],
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
