---
{
  "title": "React Test",
  "lang": "zH",
  "description": "React 主要概念",
  "meta": [{"name":"React 主要概念", "content":"React 主要概念"}],
  "tags": ['React'],
  "sidebarDepth": "2"
}
---
# React Test
## 套件安裝
* @testing-library/react
* @testing-library/jest-dom
    - 因為需要驗證的東西，要Render成DOM，所以需要使用這個
    - 提供許多對於DOM測試更好用的matcher，讓我們測試更好懂
* @testing-library/user-event
* @babel/core
    - 將測試程式碼轉成讓JSX看得懂的語法
    - 設定於.babelrc檔案之中
* jest
    - JS測試框架
    
## @testing-library/jest-dom
* toBeInTheDocument：判斷一個Element是否存在於DOM中
* toHaveAttribute：判斷一個Element是否有某個Attribute
* toHaveTextContent：判斷一段文字是否存在於Element中

## jest 測試生命週期
* beforeAll：所在區域內會第一個執行
* beforeEach：每一次測試前會先執行
* afterAll：所在區域內最後一個執行
* afterEach：每一次測試後會馬上執行

## 基本React function Component
```jsx
import React, { useState } from 'react'

const Counter = props =>{
  const [ count, setCount ] = useState(0)
  return (
    // 在測試上，我們會使用data-testid 來讓測試程式拿到這個DOM元素
    <div data-testid="counterBlock">
      <span data-testid="counter" >{ count }</span>
      <button
      type="button"
      onClick={()=> setCount(count+1)}
      data-testid="addCountBtn"
      >
        +1
      </button>
    </div>
  )
}
export default Counter
```

## 測試程式起手式

### 基本斷言
```jsx
// 得到testId後，再拿到其textContent，斷言為toBe
expect(getByTestId('display_count').textContent).toBe('點了0下');
expect(getByText('點了0下').textContent).toBe('點了0下');
expect(container.querySelector('span').innerHTML).toBe('點了0下');
```
### Component 測試
```jsx
import React from 'react'
// 要什麼就是從 @testing/library拿
import { render, fireEvent } from '@testing-library/react'
import Counter from "../../src/Pages/Counter";

describe('Counter', ()=>{
  test('Counter_Check', ()=>{
    // 首先獲取ID
    const { getByTestId } = render(<Counter />)
    // 得到counter這個id後，看其內容(textContent)會是什麼
    expect(getByTestId('counter').textContent).toBe('0')

    const addCountBtn = getByTestId('addCountBtn')
    fireEvent.click(addCountBtn)
    expect(getByTestId('counter').textContent).toBe('1')
  })
})
```

## 參考資料
* [Next.js | 初探單元測試，使用 Jest + React Testing Library](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/nextjs-testing-tutorial-1-ed4b27563761)
