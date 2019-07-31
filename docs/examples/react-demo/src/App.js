import React from "react";
import "./App.css";
import Smart from "../../../../libs/md/index.js";
class Test extends React.Component {
  test = () => {
    Smart.init("xxx", {
      local_storage: {
        type: "localStorage"
      },
      SPA: {
        is: true,
        mode: "hash"
      },
      // pageview: false,
      debug: true,
      loaded: function(sdk) {
        sdk.register_event_super_properties({ test: "事件通用属性" });
      }
    });
  };

  render() {
    return <div onClick={this.test}>22</div>;
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
