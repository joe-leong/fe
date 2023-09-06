---
title: http 专题
categories:
  - 网络基础
  - http
tags:
  - 编码
  - 前端
  - 网络
author:
  name: joe
  link: https://github.com/joe-leong/fe
---

# HTTP

## 1. 响应头

### 1.1. Content-Disposition

主要用于告诉浏览器如何处理服务器返回的文件。当服务器返回一个文件的时候，浏览器默认会根据文件的 MIME 类型来决定如何处理。但是，如果服务器希望浏览器采取特定的行为，比如下载文件，就可以通过 `Content-Disposition` 来告诉浏览器采取什么行动
这个参数可以设置为`inline`或者`attachment`，前者表示直接在浏览器中打开文件，后者表示让浏览器下载文件
