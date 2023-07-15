import { defineConfig4CustomTheme, UserPlugins } from "vuepress/config";

export default defineConfig4CustomTheme({
  locales: {
    "/": {
      lang: "zh-CN",
      title: "小梁前端工程",
      description: "前端工程",
    },
  },
  base: "/fe/",
  themeConfig: {
    logo: "/img/logo.png",
  },
  head: [
    ["link", { rel: "icon", href: "/img/logo.png" }],
    [
      "meta",
      {
        name: "keywords",
        content: "前端工程化",
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
