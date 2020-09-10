# Introduce react inline style

## Introducing Inline Styles
在這邊要述說如何在react的render tag內加入`style`，基本上是使用
1. `<div style="color: yellow; font-size: 16px">Mellow Yellow</div>`
2. `<div style={{color: "yellow", fontSize: 16}}>Mellow Yellow</div>`
注意到第二點的fontSize寫法，在物件中React不接受「-」的寫法
```jsx
class Colorful extends React.Component {
  render() {
    return (
      <div
      style={{color:'red', fontSize:'72px'}}
      >Big Red</div>
    );
  }
};

```
## Add Inline Styles in React
在React的style中例如`height`/`width`/`fontSize`單位皆預設為`px`，但如果你有特別的單位，就必須另外設定。
* eg：`fontSize:"24em"`
```jsx
const styles = {
  color: 'purple',
  // 注意這邊使用 number 型態即可
  fontSize:40,
  border:'2px solid purple'
}
class Colorful extends React.Component {
  render() {
    return (
      // 在這邊綁定styles
      <div style={styles}>Style Me!</div>
    );
  }
};

```
