---
title: 算法 专题
categories:
  - 计算机基础
  - 算法
  - algorithm
tags:
  - 编码
  - 前端
  - 算法
author:
  name: joe
  link: https://github.com/joe-leong/fe
---

# 算法

## 冒泡排序

冒泡排序只会对相邻的两个元素进行比较大小关系，如果不满足条件就让俩元素互换位置

### 未优化

```js
// 冒泡排序
const bubbleSort = (arr) => {
    const length = arr.length
    if(length <= 1) return
    for(let i = 0;i < length -1;i++){
        for(let j = 0;j < length - i -1;j++){
            if(arr[j] > arr[j+1]){
                let temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
            }
        }
    }
}
```

### 优化

```js
// 冒泡排序
const bubbleSort = (arr) => {
    const length = arr.length
    if(length <= 1) return
    for(let i = 0;i < length -1;i++){
        let tag = false
        for(let j = 0;j < length - i -1;j++){
            if(arr[j] > arr[j+1]){
                let temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
                tag = true
            }
        }
        // 如果冒泡没找到变化，可以中断遍历了
        if(!tag) break
    }
}
```

## 插入排序

### 直接插入

思路：从后往前排序，保存当前下标元素记为current，与前面元素一一比较，如果前面元素比current大，则赋值给后一位，最后把current赋值给停止位

```js
const insertionSort = (arr) => {
    let length = arr.length
    if(length <= 1) return

    let preIndex,current
    for(let i = 1;i<length;i++){
        current = arr[i] // 保存当前元素
        preIndex = i-1 // 待比较下标
        while(preIndex >= 0 && arr[preIndex] > current){
            arr[preIndex + 1] = arr[preIndex]
            preIndex--
        }
        if(preIndex + 1 !== i){
            arr[preIndex + 1] = current
        }
    }
}
```

### 拆半插入

每次新元素排序时，通过查找向前遍历终点，减少遍历次数，达到优化效果

```js
const binaryInsertionSort = (arr) => {
    let length = arr.length
    if(length <= 1) return

    let current,i,j,m,low,high

    for(i = 1;i<length;i++){
        low = 0
        high = i-1
        current = arr[i]
        // 找到遍历终点
        while(low<=high){
            m = (low + high) >> 1
            if(arr[m] <= current){
                low = m + 1
            }else{
                high = m -1
            }
        }

        for(j = i;j > low;j--){
            arr[j] = arr[j-1]
        }
        arr[low] = current
    }
}
```

 🏗
