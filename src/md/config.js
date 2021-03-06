// 默认配置
const DEFAULT_CONFIG = {
  // 上报服务器域名配置
  track_url: "http://localhost:3300/",
  // debug启动配置
  debug: false,
  // 本地存储配置
  local_storage: {
    // 存储方式  localStorage || cookie
    type: "localStorage",
    // 存储名称
    name: "",
    // 关闭存储功能
    disable: false,
    // cookie存储时，采用安全的存储方式，即：
    //当secure属性设置为true时，cookie只有在https协议下才能上传到服务器，而在http协议下是没法上传的，所以也不会被窃听
    secure_cookie: false,
    // cookie存储时，跨主域名存储配置
    cross_subdomain_cookie: false,
    // cookie方法存储时，配置保存过期时间
    cookie_expiration: 1000
  },
  // 初始化sdk时触发的方法
  loaded: function() {},
  // 上报数据实现形式  post, get, img
  track_type: "img",
  // 单页面应用配置
  SPA: {
    // 开启SPA配置
    is: false,
    // SPA 实现类型，hash || history
    mode: "hash"
  },
  // PV指标自动触发配置
  pageview: true,
  // 上报数据前，每个字段长度截取配置，默认不截取
  truncateLength: -1,
  // 会话超时时长，默认30分钟
  session_interval_mins: 30,
  isBpoint: true, // 是否开启断点发送，默认开启
  stackSize: 10, //信息存储栈大小 栈满 则打包 转存到待发送队列
  stackTime: 3, //信息存储栈时间（单位 秒） 定时扫描，栈有数据就发
  queueSize: 20, //待发送队列大小
  queueTime: 5 //待发送队列 自动扫描发送时间
};

// 配置
const CONFIG = {
  DEBUG: false,
  LIB_VERSION: "0.1.0",
  isBpoint: true, // 是否开启断点发送，默认开启
  stackSize: 10, //信息存储栈大小 栈满 则打包 转存到待发送队列
  stackTime: 3, //信息存储栈时间（单位 秒） 定时扫描，栈有数据就发

  queueSize: 20, //待发送队列大小
  queueTime: 5 //待发送队列 自动扫描发送时间
};

// 系统事件类型（事件分为：系统事件和业务事件）
const SYSTEM_EVENT_TYPE = "se";

// 业务事件类型
const BUSSINESS_EVENT_TYPE = "be";

// 系统事件列表
const SYSTEM_EVENT_OBJECT = {
  // 会话开始事件
  sxfData_session_start: {
    data_type: SYSTEM_EVENT_TYPE
  },
  // 会话结束事件
  sxfData_session_close: {
    data_type: SYSTEM_EVENT_TYPE
  },
  // PV事件
  sxfData_pv: {
    data_type: SYSTEM_EVENT_TYPE
  },
  // 广告点击事件
  sxfData_ad_click: {
    data_type: SYSTEM_EVENT_TYPE
  },
  // 用户首次访问网站事件
  sxfData_activate: {
    data_type: SYSTEM_EVENT_TYPE
  },
  // A/B 测试事件
  sxfData_abtest: {
    data_type: SYSTEM_EVENT_TYPE
  },
  // 异常错误事件
  sxfData_error: {
    data_type: SYSTEM_EVENT_TYPE
  },
  // 用户注册事件
  sxfData_u_signup: {
    data_type: SYSTEM_EVENT_TYPE
  },
  // 用户登录事件
  sxfData_u_login: {
    data_type: SYSTEM_EVENT_TYPE
  },
  // 用户登出事件
  sxfData_u_logout: {
    data_type: SYSTEM_EVENT_TYPE
  },
  // 用户属性设置事件
  sxfData_u_property: {
    data_type: SYSTEM_EVENT_TYPE
  }
};

// People类系统保留属性，用户设置这些属性将无法成功
const PEOPLE_RESERVED_PROPERTY = ["$deviceUdid", "$toekn"];

// People类属性事件id，全局唯一
const PEOPLE_PROPERTY_ID = "sxfData_user_property";

// 渠道推广参数全局配置, 左边sdk内部使用的参数，右边实际url上的参数
// 若url上推广的参数不一致，请修改对应右边的值（一一对应）
// 注意：系统暂时未支持自定义配置（TODO）,若要改动，请到文件 src/channel.js 修改。
const CHANNEL_PARAMS = {
  // 广告来源(必须字段)
  utm_source: "utm_source",
  // 广告媒介(必须字段)
  utm_medium: "utm_medium",
  // 广告名称(必须字段)
  utm_campaign: "utm_campaign",
  // 广告内容(选填)
  utm_content: "utm_content",
  // 广告关键词(选填)
  utm_term: "utm_term",
  // 广告id(必须字段)
  promotional_id: "promotional_id"
};
export {
  CONFIG,
  DEFAULT_CONFIG,
  SYSTEM_EVENT_TYPE,
  BUSSINESS_EVENT_TYPE,
  SYSTEM_EVENT_OBJECT,
  PEOPLE_RESERVED_PROPERTY,
  PEOPLE_PROPERTY_ID,
  CHANNEL_PARAMS,
  BPOINT_CONFIG,
  ALLEVENT
};
