import { _, console } from "./utils";

class INPUTLISTEN {
  constructor(instance) {
    this.instance = instance;
  }
  _addDomEventHandlers() {
    try {
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
    } catch (error) {
      console.error("自动添加监听事件失败,请校验语法是否有误！");
    }
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
