---
title: PYTHON
categories:
  - ai
  - ai agent
tags:
  - 编码规范
author:
  name: joe
  link: https://github.com/joe-leong/fe
---


## 字典合并

```py
tool_result = {"weather": "晴天", "temperature": 20}
agent_info = {"status": "success", "time": "2024-01-01"}

result = {**tool_result, **agent_info}
result = tool_result | agent_info  （Python 3.9+）
# 结果：{"weather": "晴天", "temperature": 20, "status": "success", "time": "2024-01-01"}
```

## 字典取值

```py
data = {"name": "Agent", "tools": ["search", "calc"]}
tool_count = len(data.get("tools", []))  # 没有则返回空列表

# 更高级：设置默认值
config = {
    "model": data.get("model", "gpt-3.5-turbo"),
    "temperature": data.get("temperature", 0.7),
    "max_tokens": data.get("max_tokens", 2000)
}
```

## 列表推导式

```py
tool_results = [1, 2, 3, 4, 5]

squared = [x ** 2 for x in tool_results]
# 结果 [1, 4, 9, 16, 25]

even_squared = [x ** 2 for x in tool_results if x % 2 == 0]
# 结果 [4, 16]

responses = [
    {"status": "success", "data": "结果1"},
    {"status": "failed", "data": None},
    {"status": "success", "data": "结果2"}
]
success_data = [r["data"] for r in responses if r["status"] == "success"]
#结果 ['结果1', '结果2']
```

## 参数解包

```py
def call_tool(tool_name, *args, **kwargs):
    """*args接收位置参数打包为元组，**kwargs接收关键字参数打包为字典"""
    print(f"调用工具：{tool_name}")
    print(f"位置参数：{args}")
    print(f"关键字参数：{kwargs}")

call_tool("search", "Python教程", engine="google", limit=10)
# 结果
# 调用工具：search
# 位置参数：('Python教程',)
# 关键字参数：{'engine': 'google', 'limit': 10}

tool_params = {"engine": "bing", "limit": 5}
call_tool("search", "AI Agent", **tool_params)
# 结果
# 调用工具：search
# 位置参数：('AI Agent',)
# 关键字参数：{'engine': 'bing', 'limit': 5}
```

## Lambda函数

`临时函数 匿名 可接收或不接收参数`

```py
tools = [
    {"name": "搜索", "priority": 3, "time": 2.1},
    {"name": "计算器", "priority": 1, "time": 0.1},
    {"name": "数据库", "priority": 2, "time": 3.5}
]

# 按优先级排序
tools.sort(key=lambda x: x["priority"])

# 结果
# [{'name': '计算器', 'priority': 1, 'time': 0.1}, {'name': '数据库', 'priority': 2, 'time': 3.5}, {'name': '搜索', 'priority': 3, 'time': 2.1}]

# 按执行时间过滤
fast_tools = list(filter(lambda x: x["time"] < 2.0, tools))
# 结果
# [{'name': '计算器', 'priority': 1, 'time': 0.1}]

# 动态创建简单函数
get_priority = lambda tool: tool.get("priority", 0)
priorities = [get_priority(t) for t in tools]
# 结果
# [3, 1, 2]
```

## 装饰器

```py
import time
from functools import wraps
# wraps保留的是函数原信息，不会被装饰器覆盖
# 保留的属性包括
# __name__      # 函数名
# __doc__       # 文档字符串
# __module__    # 模块名
# __annotations__ # 类型注解
# __qualname__  # 限定名称
# __dict__      # 函数的自定义属性
def timer(origin_func):
    @wraps(origin_func) #保留原函数信息
    def wrapper(*args,**kwargs):
        start = time.time()
        result = origin_func(*args,**kwargs)
        print(f"{origin_func.__name__} 耗时：{time.time()-start:.2f}秒")
        return result
    return wrapper

@timer
def call_llm_api():
    time.sleep(1)
    return "回复内容"
```

## 上下文管理器 - with

`使用with语法读取文件后会自动关闭文件，释放资源`

```py
with open("nodemon.json","r") as f:
    config = f.read()

# 同时读写多个文件
with open("input.txt", "r") as f_in, open("output.txt", "w") as f_out:
    for line in f_in:
        f_out.write(line.upper())
```

## pathlib 现代文件操作

```py
from pathlib import Path

data_dir = Path('./agent_memory')
data_dir.mkdir(exist_ok=True) #如果目录不存在则创建目录

# 遍历所有记忆文件
for file in data_dir.glob("*.json"):  # 支持通配符
    print(f"处理记忆文件：{file.name}")

# 读写文件
memory_file = data_dir / "session_1.json"
memory_file.write_text('{"data":"记忆内容"}') # 写入内容
content = memory_file.read_text() # 读取内容
```

## 异步编程

```py
import asyncio
import aiohttp
import time

async def fetch_url_async(session, url,method='get',*args):
    """模拟一个耗时的网络请求（异步版本）"""
    print(f"开始异步获取: {url},{method}")
    # 注意：这里我们使用 aiohttp 的异步 get 方法，并用 await 等待
    http_method = getattr(session,method.lower())
    async with http_method(url) as response:
        # 模拟处理响应也需要时间
        await asyncio.sleep(2)  # 使用 asyncio.sleep 模拟 I/O 等待，它不会阻塞线程
        text = await response.text()
        print(f"完成异步获取: {url}")
        return f"来自 {url} 的数据 (长度: {len(text)})"

async def main_async():
    urls = [{'url':'http://example.com'}, {'url':'http://example.com','method':'post'},]
    
    async with aiohttp.ClientSession() as session:  # 创建异步 HTTP 会话
        # 为每个 URL 创建一个任务（Task）
        tasks = []
        for url in urls:
            # create_task 会将协程加入事件循环，立即开始调度
            print(url)
            task = asyncio.create_task(fetch_url_async(session, url.get('url'),url.get('method','get')))
            tasks.append(task)
        
        print("所有任务已创建，开始并发执行...")
        
        # 使用 asyncio.gather 并发运行所有任务，并等待它们全部完成
        # gather 返回一个结果列表，顺序与传入的任务顺序一致
        results = await asyncio.gather(*tasks)
        
        return results

if __name__ == "__main__":
    start = time.time()
    # asyncio.run() 是启动事件循环并运行顶层协程的简便方法
    final_results = asyncio.run(main_async())
    end = time.time()
    
    print(f"\n异步版本总耗时: {end - start:.2f} 秒")
    for res in final_results:
        print(res)
```

## 异步生成器 yield

`yield返回generator`

```py
async def stream_llm_response(prompt):
    # 模拟流式返回
    words = prompt.split()
    for word in words:
        yield word + " "
        await asyncio.sleep(1)  # 模拟延迟

async def main():
    async for chunk in stream_llm_response("你好 我是AI助手 哈哈"):
        print(chunk, end="", flush=True)  # 逐个词打印
```
