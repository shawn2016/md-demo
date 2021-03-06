import { CONFIG, DEFAULT_CONFIG } from "./config";

import { _, console } from "./utils";

// 用户属性追踪
import USER_TRACK from "./user_track";
// 用户事件追踪
import EVENT_TRACK from "./event_track";
// 本地存储
import LOCAL_STORAGE from "./local_storage";
// 单页面
import SPA from "./spa";
// 渠道跟踪
// import CHANNEL from "./channel";
// 断点发送
import BPOINT from "./bpoint_send";
// 远程拉取js文件（插件，具体内容请查看该文件）
// import LOAD_CONTROL_JS from "./load_control_js";
// 全面点
// import { autotrack } from './autotrack';

import INPUTLISTEN from "./input_listen";
class SxfDataLib {
  /**
   *
   * @param {Object} config sdk客户端配置
   */
  constructor() {}
  /**
   * sxfData初始化
   *
   * ### 用法:
   *
   * SxfData.init(config)
   *
   * @param {object} config 配置
   */
  init(config) {
    if (this["__loaded"]) {
      return;
    }
    this["__loaded"] = true;

    this._ = _;
    this["config"] = {};
    this._set_config(
      _.extend({}, DEFAULT_CONFIG, CONFIG, config, {
        // token: token
      })
    );
    this["local_storage"] = new LOCAL_STORAGE(this["config"]);
    // 运行钩子函数
    this._loaded();
    // 实例化拉取远程库对象（按需加载）
    // this["load_control_js"] = new LOAD_CONTROL_JS(this);
    // 实例化事件对象
    this["event"] = new EVENT_TRACK(this);
    // 实例化用户对象
    this["user"] = new USER_TRACK(this);
    // 实例化渠道跟踪对象
    // this["channel"] = new CHANNEL(this);

    this["inputlisten"] = new INPUTLISTEN(this);
    // 断点发送对象
    // 设置设备凭证
    this._set_device_id();
    // 开启是否断点发送
    if (this._get_config("isBpoint")) {
      this["bpoint"] = new BPOINT(this);
      this["bpoint"]._oldDataCheck();
      this["bpoint"]._scanStack(CONFIG.stackTime);
    }

    // 上报广告点击事件
    // if (this["channel"].check_ad_click()) {
    //   this._ad_click();
    // }

    this._track_pv();
    // this._autotrack();
    // persistedTime 首次访问应用时间
    this["local_storage"].register_once(
      { persistedTime: new Date().getTime() },
      ""
    );
    // 单页面
    if (this._get_config("SPA").is) {
      this._SPA();
    }
  }

  // 广告点击事件
  _ad_click() {
    this.track_event("sxfData_ad_click");
  }
  // 内部使用的PV方法
  _track_pv(properties, callback) {
    // 配置为自动触发PV事件
    if (this._get_config("pageview")) {
      this["event"].track_pv(properties, callback);
    } else {
      // 若没有自动触发事件，还需检测session (说明：当触发PV 时，实际已经检测了session)
      this["event"]._session();
    }
  }
  // 单页面应用（影响PV）
  _SPA() {
    SPA.init({
      mode: this._get_config("SPA").mode,
      callback_fn: () => {
        this._track_pv();
      }
    });
  }
  /**
   * 设置配置
   * @param {Object} config
   */
  _set_config(config) {
    if (_.isObject(config)) {
      this["config"] = _.extend(this["config"], config);
      CONFIG.DEBUG = CONFIG.DEBUG || this._get_config("debug");
      CONFIG.isBpoint = CONFIG.isBpoint || this._get_config("isBpoint");
    }
  }
  /**
   * 获取某个配置
   * @param {String} prop_name
   * @returns {*}
   */
  _get_config(prop_name) {
    return this["config"][prop_name];
  }
  // sdk初始化之前触发的钩子函数，该方法必须在初始化子模块前以及上报数据前使用
  _loaded() {
    try {
      this._get_config("loaded")(this);
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * 设置本地设备凭证
   * 若是首次访问（本地无设备凭证），上报用户首次访问网站事件
   */
  _set_device_id() {
    let track_data = {};
    if (!this.get_device_id()) {
      this["local_storage"].register_once({ deviceId: _.UUID() }, "");
      track_data = this.track_event("sxfData_activate");
    }
    return track_data;
  }

  // 获取唯一凭证（设备标记）
  get_device_id() {
    return this.get_property("deviceId");
  }
  // 获取指定本地存储属性（缓存和本地）
  get_property(prop_name) {
    return this["local_storage"]["props"][prop_name];
  }
  /**
   * 设置一个指定事件的耗时监听器
   * @param {String} event_name
   */
  // 监听事件
  _addlisten(id) {
    this["inputlisten"]._addDomEventHandlers(id);
  }
  time_event(event_name) {
    this["event"].time_event(event_name);
  }
  /**
   * 发送PV事件，在此之前检测session
   * @param {Object} properties  pv属性
   * @param {*} callback
   */
  track_pv(properties, callback) {
    this["event"].track_pv(properties, callback);
  }
  /**
   * 追踪事件（上报用户事件触发数据）
   * @param {String} event_name 事件名称（必须）
   * @param {Object} properties 事件属性
   * @param {Function} callback 上报后的回调方法
   * @param {String} event_type 自定义事件类型
   * @returns {Object} track_data 上报的数据
   */
  track_event(event_name, properties, callback, event_type) {
    this["event"].track(event_name, properties, callback, event_type);
  }
  /**
   * 设置事件自定义通用属性
   * 成功设置事件通用属性后，再通过 track_event: 追踪事件时，事件通用属性会被添加进每个事件中。
   * 重复调用 register_event_super_properties: 会覆盖之前已设置的通用属性。
   */
  register_event_super_properties(prop, to) {
    let set_props = {};
    let super_properties = this.get_property("superProperties");
    if (_.isObject(prop)) {
      _.each(prop, (v, k) => {
        set_props[k] = v;
      });
    } else {
      set_props[prop] = to;
    }
    // 注意合并顺序
    super_properties = _.extend({}, super_properties, set_props);
    this["local_storage"].register({
      superProperties: super_properties
    });
  }
  /**
   * 设置事件自定义通用属性
   * 成功设置事件通用属性后，再通过 track_event: 追踪事件时，事件通用属性会被添加进每个事件中。
   * 不覆盖之前已经设定的通用属性。
   */
  register_event_super_properties_once(prop, to) {
    let set_props = {};
    let super_properties = this.get_property("superProperties");
    if (_.isObject(prop)) {
      _.each(prop, (v, k) => {
        set_props[k] = v;
      });
    } else {
      set_props[prop] = to;
    }
    // 注意合并顺序
    super_properties = _.extend({}, set_props, super_properties);
    this["local_storage"].register({
      superProperties: super_properties
    });
  }
  /**
   * 删除指定通用事件属性
   * @param {String} prop_name
   */
  unregister_event_super_properties(prop_name) {
    if (_.isString(prop_name)) {
      let super_properties = this.get_property("superProperties");
      if (_.isObject(super_properties)) {
        delete super_properties[prop_name];
        this["local_storage"].register({
          superProperties: super_properties
        });
      }
    }
  }
  /**
   * 清除本地已设置的通用事件属性
   */
  clear_event_super_properties() {
    this["local_storage"].register({
      superProperties: {}
    });
  }
  /**
   * 查看当前已设置的通用事件属性
   */
  current_event_super_properties() {
    return this.get_property("superProperties");
  }
  /**
   * 用户登录和注册时调用
   * @param {String} user_id
   */
  login(user_id) {
    this["event"].login(user_id);
  }
  // 清除本地用户信息，退出用户（选则调用）,建议平台网站不必调用（无需匿名用户的平台）
  logout() {
    this["event"].logout();
  }
  //   _autotrack(){
  //     autotrack.init(this);
  //   }
}
let sxfData = new SxfDataLib();
if (sxf_Data_format === "iife") {
  window.sxfData = sxfData;
}
export default sxfData;
