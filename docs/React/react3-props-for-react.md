# Study for React Props

## Use PropTypes to Define the Props You Expect
### 在你prop時，你也可以對這個props的值作定義
eg：型態 or 是否為必須
```jsx
const Items = (props) => {
  return <h1>Current Quantity of Items in Cart: {props.quantity}</h1>
};

Items.propTypes = {
  quantity: PropTypes.number.isRequired
    // props的值：屬性為.數字.必要
}

Items.defaultProps = {
  quantity: 0
};

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Items />
  }
};

```

## Access Props Using this.props
### 之前都是在function外面寫props，這次我們使用class來接收props
```jsx
class ReturnTempPassword extends React.Component {
  constructor(props) {
    { /* 這邊是子Component，然後props會接收呼叫端給的值 */ }
    super(props);

  }
  render() {
    return (
        <div>
            <p>Your temporary password is: 
            <strong>{ this.props.tempPassword }</strong></p>
        </div>
    );
  }
};

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <div>
          <h2>Reset Password</h2>
          <h3>We've generated a new temporary password for you.</h3>
          <h3>Please reset this password from your account settings ASAP.</h3>
          { /*  這邊是子Compnent的呼叫，負責給子元件值*/} 
          <ReturnTempPassword tempPassword="asdfkgji"/>
        </div>
    );
  }
};

```

## Review Using Props with Stateless Functional Components
### 在這邊我們複習一下用functional Component 傳入props的寫法
```jsx
class CampSite extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Camper  />
      </div>
    );
  }
};
const Camper = (props) =>{
  return (
    <p>{ props.name }</p>
  )
}

Camper.defaultProps = {
  name: 'CamperBot'
}

Camper.propTypes = {
  name: PropTypes.string.isRequired
}
```
