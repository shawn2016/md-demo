import { _, console } from "./utils";
class INPUTLISTEN {
  constructor(instance) {
    this.instance = instance;
  }
  _addDomEventHandlers(id) {
    var rcidom = _.getById(id);
    this.bind(rcidom, {
      focus: v => {
        console.log("focus", v);
        // this.instance.time_event("input_blur");
        // this.instance["event"].track("input_focus", {
        //   input_value: v.target.value
        // });
      },
      blur: v => {
        console.log("blur", v);

        // this.instance["event"].track("input_blur", {
        //   input_value: v.target.value
        // });
      },
      keydown: v => {
        console.log("keydown", v);
        // this.instance.time_event("input_keyup");
        // this.instance["event"].track("input_keydown", {
        //   input_value: v.target.value
        // });
      },
      keyup: v => {
        console.log("keyup", v);
        if (v&&v.keyCode === 8) {
          console.log("delete", v);
          this.instance["event"].track("input_delete", {
            input_value: v.target.value
          });
        }
      },
      change: v => {
        console.log("change", v);
        // this.instance["event"].track("input_change", {
        //   input_value: v.target.value
        // });
      },
      click: v => {
        console.log("click", v);
        // this.instance["event"].track("input_click", {
        //   input_value: v.target.value
        // });
      },
      select: v => {
        console.log("select", v);
        // this.instance["event"].track("input_select", {
        //   input_value: v.target.value
        // });
      },
      input: v => {
        console.log("input", v);
        // this.instance["event"].track("input_input", {
        //   input_value: v.target.value
        // });
      },
      paste: v => {
        console.log("paste", v);
        // this.instance["event"].track("input_input", {
        //   input_value: v.target.value
        // });
      }
    });
  }
  bind(dom, kve) {
    if (dom && kve) {
      for (var k in kve) {
        dom.addEventListener(k, kve[k]);
      }

      return dom;
    }
  }
}
export default INPUTLISTEN;
