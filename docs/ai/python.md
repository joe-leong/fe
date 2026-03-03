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

## 调试 pdb

``pdb 是 Python 的标准库，全称是 "Python Debugger"（Python 调试器）pdb.set_trace()进入调试，
raise ValueError(f"处理错误: {message['content']}")抛出错误，开发中使用try...except Exception as e捕获错误进入错误处理逻辑``

| 命令 | 简写 | 作用 |
| :----- | :----- | :----- |
| list | l | 查看当前代码位置 |
| next | n | 执行下一行 |
| step | s | 进入函数内部 |
| continue | c | 继续执行直到下一个断点 |
| print | p | 打印变量值 |
| quit | q | 退出调试器 |

```py
# 只在特定条件下暂停调试
import pdb

for i, message in enumerate(conversation):
    if message["role"] == "assistant" and "error" in message["content"]:
        pdb.set_trace()  # 只在出错时进入调试
    process_message(message)
```

## 日志记录 logging

<h3>日志级别</h3>

| 级别 | 数值 | 用途 |
| :---- | :---- | :---- |
| DEBUG | 10 | 调试信息，开发时使用 |
| INFO | 20 | 一般信息，正常流程 |
| WARNING | 30 | 警告，不影响运行但需要注意 |
| ERROR | 40 | 错误，功能执行失败 |
| CRITICAL | 50 | 严重错误，程序可能崩溃 |

```py
import logging

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='agent.log'  # 保存到文件
)
logger = logging.getLogger(__name__)

class Agent:
    def _process(self, task):
        """内部处理方法"""
        # 模拟任务处理
        if task == "错误任务":
            raise ValueError("处理任务时出错！")
        return f"成功处理: {task}"
    
    def run(self, task):
        logger.info(f"开始执行任务：{task}")
        try:
            result = self._process(task)
            logger.info(f"任务完成：{result[:50]}...")  # 只记录前50字符
            return result
        except Exception as e:
            logger.error(f"任务失败：{e}", exc_info=True)  # 记录完整错误堆栈
            raise

# ============ 测试代码 ============
if __name__ == "__main__":
    print("开始测试Agent日志系统...")
    print("日志将保存到 agent.log 文件中\n")
    
    # 创建Agent实例
    agent = Agent()
    
    # 测试1：正常任务
    print("测试1：执行正常任务")
    try:
        result = agent.run("数据分析任务")
        print(f"结果: {result}\n")
    except Exception as e:
        print(f"错误: {e}\n")
    
    # 测试2：会出错的任务
    print("测试2：执行会出错的任务")
    try:
        result = agent.run("错误任务")
        print(f"结果: {result}\n")
    except Exception as e:
        print(f"捕获到错误: {e}\n")
    
    # 测试3：长文本任务
    print("测试3：执行长文本任务")
    long_task = "这是一个非常非常非常非常非常非常非常非常非常非常长的任务描述，超过50个字符的任务描述"
    try:
        result = agent.run(long_task)
        print(f"结果: {result}\n")
    except Exception as e:
        print(f"错误: {e}\n")
    
    print("测试完成！请查看 agent.log 文件查看日志记录")
    
    # 显示日志文件内容
    print("\n" + "="*50)
    print("agent.log 文件内容：")
    print("="*50)
    try:
        with open('agent.log', 'r') as f:
            print(f.read())
    except FileNotFoundError:
        print("日志文件尚未创建")
```

<pre class='pre'>
<b>实例中演示的功能</b>
1. ✅ 正常任务执行和日志记录
2. ❌ 错误任务执行和完整的错误堆栈记录
3. 📝 长文本自动截断功能
4. 📁 日志保存到文件
</pre>

## 类型检查 typechecked

```py
from typing import Union, List, Dict
from typeguard import typechecked

@typechecked  # 运行时检查类型
def process_tool_result(
    result: Union[str, List[str], Dict],
    max_length: int = 100
) -> str: # 返回字符串类型
    if isinstance(result, str):
        return result[:max_length]
    elif isinstance(result, list):
        return ", ".join(result)[:max_length]
    elif isinstance(result, dict):
        return str(result)[:max_length]
    else:
        raise TypeError(f"不支持的类型：{type(result)}")
```

<pre class="pre">
[start:end]切片操作符，python中的切割功能，意味着从第start位切割到end位
冒号前默认0，冒号后默认到末尾，可赋值切割起始位，意味从起始位切割到end位
</pre>

```py
text = "Python编程"

# 正向切片
print(text[:4])     # "Pyth"（前4个字符）
print(text[2:5])    # "tho"（索引2到4）
print(text[3:])     # "hon编程"（索引3到结尾）

# 负向索引
print(text[-3:])    # "n编程"（最后3个字符）
print(text[:-2])    # "Python"（去掉最后2个字符）

# 带步长
print(text[::2])    # "Pto编"（每隔2个字符取一个）
print(text[::-1])   # "程编nohtyP"（反转字符串）
```

# 代码整洁

## 海象运算符 :=

```py
# 场景：在条件中同时赋值和判断
# 传统写法
data = api.get_data()
if data:
    process(data)

# 海象运算符写法
if (data := api.get_data()):
    process(data)

# 场景：循环中避免重复调用
while chunk := stream.read(1024):
    process_chunk(chunk)
```

## 枚举（代替魔法数字）Enum

```py
from enum import Enum, auto
# 自动赋值
class AgentStatus(Enum):
    IDLE = auto()      # 1
    RUNNING = auto()   # 2
    PAUSED = auto()    # 3
    ERROR = auto()     # 4
# 手动赋值
class ToolType(Enum):
    SEARCH = "search_engine"
    CALCULATOR = "math_tool"
    DATABASE = "db_query"

# 使用示例
status = AgentStatus.RUNNING
if status == AgentStatus.RUNNING:
    print("Agent正在运行")

tool_type = ToolType.SEARCH
print(tool_type.value)  # "search_engine"
```

<pre class="pre">
auto()自动赋值
</pre>

# 性能优化

## 缓存计算 lru_cache

```py
from functools import lru_cache

# 相同输入不重复调用
@lru_cache(maxsize=128)
def call_llm(prompt: str, temperature: float = 0.7):
    """相同prompt+temperature只调用一次API"""
    print(f"实际调用API：{prompt[:20]}...")
    # 模拟API调用
    return f"回复：{prompt}"

# 第一次调用（实际调用API）
result1 = call_llm("你好", 0.7)

# 第二次调用（使用缓存，不会打印）
result2 = call_llm("你好", 0.7)

# 查看缓存统计
print(call_llm.cache_info())  # CacheInfo(hits=1, misses=1, maxsize=128, currsize=1)
```

<pre class="pre">
lru_cache 是 Python 的一个缓存装饰器，全称是 Least Recently Used (LRU) 缓存。它会自动缓存函数的返回值，避免重复计算。
</pre>

## 字符串拼接 join

```py
# 场景：构建大prompt
parts = ["系统提示", "用户问题", "历史对话", "工具返回"]

# 不好的写法（每次循环创建新字符串）
prompt = ""
for part in parts:
    prompt += part + "\n"

# 好的写法（join一次性拼接）
prompt = "\n".join(parts)

# 更好的写法（f-string + join）
prompt = f"""
系统：{parts[0]}
用户：{parts[1]}
历史：{parts[2]}
工具：{parts[3]}
"""
```
