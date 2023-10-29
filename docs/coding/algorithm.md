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
<br>空间复杂度 O(1)
<br>时间复杂度 O(n ^ 2)
<br>稳定

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

<br>空间复杂度 O(1)
<br>时间复杂度 O(n ^ 2)
<br>稳定

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

## 选择排序

选择排序算法的实现思路有点类似插入排序，也分已排序区间和未排序区间。但是选择排序每次会从未排序区间中找到最小的元素，将其放到已排序区间的末尾
<br>空间复杂度 O(1)
<br>时间复杂度 O(n ^ 2)
<br>不稳定

```js
const selectionSort = arr => {
    let length = arr.length
    let minIndex,current

    for(let i = 0;i<length-1;i++){
        minIndex = i
        current = arr[i]
        for(let j=i+1;j<length;j++){
            if(arr[j] < arr[minIndex]){
                minIndex = j
            }
        }
        arr[i] = arr[minIndex]
        arr[minIndex] = current
    }
}
```

## 归并排序

思路：通过把数组对半拆分成无数小的集合，分别合并
<br>空间复杂度 O(nlogn)
<br>时间复杂度 O(nlogn)
<br>不稳定

```js
const mergeSort = arr =>{
    let length = arr.length
    if(length <2) return arr
    let pivor = length >> 1
    let left = arr.slice(0,pivor)
    let right = arr.slice(pivor)
    return merge(mergeSort(left),mergeSort(right))
}
const merge = (left,right) =>{
    let result = []

    while(left.length && right.length){
        if(left[0] < right[0]){
            result.push(left.shift())
        }else{
            result.push(right.shift())
        }
    }
    result.push(...left,...right)
    return result
}
```

## 快速排序

思想：定义基准，从前后两个指针与基准值比较大小排序，取的下一次排序的分界线，递归排序

```js
function quickSort(arr, left, right) {
  if(left >= right) return
  let pivor = partition(arr, left, right)
  quickSort(arr,left,pivor-1)
  quickSort(arr,pivor+1,right)
}

function partition(arr, left, right) {
  let index = left, base = arr[left]
  while (left < right) {
    while (left < right) {
      if (arr[right] < base) {
        arr[left] = arr[right]
        index = right
        break
      }
      right--
    }
    while (left < right) {
      if (arr[left] > base) {
        arr[right] = arr[left]
        index = left
        break
      }
      left++
    }
  }
  arr[index] = base
  return index
}
```

## 堆排序

## 动态规划

### 斐波那契数列

## 贪心算法

### 背包问题

 🏗
