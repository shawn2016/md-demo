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
      isBpoint: true,
      loaded: function(sdk) {
        sdk.register_event_super_properties({ test: "事件通用属性" });
      }
    });
    Smart.instance.time_event('buy');
  };

  render() {
    return (
      <div>
        <input
          id="userId"
          onChange={e => {
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
        <h2
          onClick={() => {
            Smart.instance.track_event("buy", {
              smartConfig: {
                isBpoint: false
              },
              price: "￥123",
              id: "xxxx-xxxx-xxxx"
            });
          }}
        >
          测试用户自定义事件
        </h2>
        <p
          onClick={() => {
            Smart.instance.user.set({
              name: "汪洋",
              country: "中国",
              province: "浙江省",
              city: "杭州市",
              age: "100",
              gender: "男",
              niu: "自定义用户属性"
            });
          }}
        >
          设置用户自定义属性
        </p>
        <a href="#22">单页面1（hash）</a>
        <a href="#33">单页面2（hash）</a>
        <input data-stat="{key:'111', act: 'click'}" placeholder="请输入" />
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
