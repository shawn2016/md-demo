import { _, console } from "./utils";
const allEvent = [
  {
    type: "input",
    eventList: [
      "focus",
      "blur",
      "keydown",
      "keyup",
      "click",
      "input",
      "select",
      "delete",
      "paste",
      "keypress"
    ]
  }
];
class INPUTLISTEN {
  constructor(instance) {
    this.instance = instance;
  }
  _addDomEventHandlers(id) {
    var rcidom = _.getPropsDom(document, "data-sxf-props");

    rcidom.forEach(domItem => {
      const eventItem = JSON.parse(domItem.getAttribute("data-sxf-props"));
      const eventType = eventItem.type;
      const eventList = eventItem.eventList;
      let data = {};

      eventList.forEach(eventItem => {
        _.register_event(
          domItem,
          eventItem.type,
          e => {
            if (eventType === "input") {
              data = {
                input_value: e.target.value
              };
            }
            this.instance["event"].track(
              `sxfData_${eventType}_${eventItem.type}`,
              data
            );
          },
          false,
          true
        );
      });
    });

    // this.bind(rcidom, {
    //   focus: v => {
    //     console.log("focus", v);
    //     this.instance.time_event("input_blur");
    //     this.instance["event"].track("input_focus", {
    //       input_value: v.target.value
    //     });
    //   },
    //   blur: v => {
    //     console.log("blur", v);

    //     this.instance["event"].track("input_blur", {
    //       input_value: v.target.value
    //     });
    //   },
    //   keydown: v => {
    //     console.log("keydown", v);
    //     this.instance.time_event("input_keyup");
    //     this.instance["event"].track("input_keydown", {
    //       input_value: v.target.value
    //     });
    //   },
    //   keyup: v => {
    //     if (v.keyCode === 8) {
    //       this.instance["event"].track("input_delete", {
    //         input_value: v.target.value
    //       });
    //     } else {
    //       this.instance["event"].track("input_keyup", {
    //         input_value: v.target.value
    //       });
    //     }
    //   },
    //   change: v => {
    //     console.log("change", v);
    //     this.instance["event"].track("input_change", {
    //       input_value: v.target.value
    //     });
    //   },
    //   click: v => {
    //     console.log("click", v);
    //     this.instance["event"].track("input_click", {
    //       input_value: v.target.value
    //     });
    //   },
    //   select: v => {
    //     console.log("select", v);
    //     this.instance["event"].track("input_select", {
    //       input_value: v.target.value
    //     });
    //   },
    //   input: v => {
    //     console.log("input", v);
    //     this.instance["event"].track("input_input", {
    //       input_value: v.target.value
    //     });
    //   },
    //   paste: v => {
    //     console.log("paste", v);
    //     this.instance["event"].track("input_input", {
    //       input_value: v.target.value
    //     });
    //   }
    //   //   keypress: v => {
    //   //     console.log("keypress", v);
    //   //     this.instance["event"].track("input_keypress", {
    //   //       input_value: v.target.value
    //   //     });
    //   //   }
    // });
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
