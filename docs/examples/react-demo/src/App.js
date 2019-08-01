import React from "react";
import "./App.css";
import Smart from "../../../../libs/md/index.js";
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "11"
    };
    this.init();
  }
  init = () => {
    Smart.init("xxx", {
      local_storage: {
        type: "localStorage"
      },
      SPA: {
        is: true,
        mode: "hash"
      },
      pageview: true,
      debug: true,
      isBpoint: false,
      loaded: function(sdk) {
        sdk.register_event_super_properties({ test: "事件通用属性" });
      }
    });
  };

  render() {
    return (
      <div>
        <input
          id="userId"
          onChange={e => {
            console.log(e);
            this.setState({
              user_id: e.target.value
            });
          }}
          placeholder="请输入用户名称"
        />
        <h1
          onClick={() => {
            Smart.instance.login(this.state.user_id);
          }}
        >
          测试登录
        </h1>
        <h1
          onClick={() => {
            Smart.instance.logout();
          }}
        >
          测试退出
        </h1>
        <h2>测试用户自定义事件</h2>
        <p>设置用户自定义属性</p>
        <a href="#22">单页面1（hash）</a>
        <a href="#33">单页面2（hash）</a>
      </div>
    );
  }
}
function App() {
  return (
    <div className="App">
      <Test />
    </div>
  );
}

export default App;
