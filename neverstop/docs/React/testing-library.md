---
id: react-testing-library-api-record
title: Testing Library API Record
sidebar_label: Testing Library API Record
slug: /react/testing-library-api-record
---
# API Record

## render
### 用途
用於`render`組件
### 使用方式
```jsx
import React from 'react'
import { render } from '@testing/library/react'
import Counter from './Counter' // 需要import 想要測試的組件
test('test first component', ()=>{
    // 然後在render的時候，把TestId都取出來
    // 後半段是render的基本用法
    const { getByTestId, getByText, container} = render(<Counter />)
})
```
