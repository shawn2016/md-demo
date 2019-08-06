import { CHANNEL_PARAMS, CONFIG } from "./config";
import { _, console } from "./utils";
// import pako from "pako";
class BPOINT {
  constructor(instance) {
    this.instance = instance;
    this._infoStack = []; //信息存储栈 收集的信息将暂存到这里 等待打包移动到待发送队列

    this._waitSendQueue = []; //待发送队列，存储多个信息存储栈帧 等待被发送给后台

    this._queueSending = false; //是否在队列递归发送栈帧

    this._scanStackIntervalId = null; //stack 扫描定时器的id

    this._scanWaitSendQqueueIntervalId = null; //WaitSendQqueue 扫描定时器的id
    this._loadFN = []; //用于存储调用者需要在插件load时的执行的fn
  }
  /**
   * 上一个页面的历史数据提交
   * @private
   */
  _oldDataCheck() {
    var oldData = _.localStorage.get("_bp_wqueue");
    if (oldData != null && oldData != "") {
      try {
        oldData = eval("(" + oldData + ")");
        if (_.isArray(oldData) && oldData.length > 0) {
          var sendData = {};
          sendData = _.localStorage.set("_bp_infoConf");
          sendData = eval("(" + sendData + ")");

          for (; oldData.length > 0; ) {
            sendData = oldData.pop();
            //数据发送
            //发送栈帧+环境配置信息
            this._sendByImg(sendData);
          }
        }
      } catch (e) {}

      _.localStorage.remove("_bp_wqueue");
    }
  }
  /**
   * 扫描信息栈中是否有数据 有数据 则将数据栈移入队列
   * @param t
   * @private
   */
  _scanStack(t) {
    if (t != null && t >= 1) {
      if (this._scanStackIntervalId != null) {
        //如果已经存在定时器 需要先删除此定时，再创建新的定时器，防止出现重复定时器创建，最终导致内存泄露
        clearInterval(this._scanStackIntervalId);
      }
      this._scanStackIntervalId = setInterval(() => {
        this.stack2queue();
      }, t * 1000);
    } else {
      console.log("埋点内置对象丢失,栈扫描器创建失败", 1);
      throw new ReferenceError("埋点内置对象丢失,栈扫描器创建失败");
    }
  }
  _scanWaitSendQqueue(t) {
    if (t != null && t >= 1) {
      if (this._scanWaitSendQqueueIntervalId != null) {
        //如果已经存在定时器 需要先删除此定时，再创建新的定时器，防止出现重复定时器创建，最终导致内存泄露
        clearInterval(this._scanWaitSendQqueueIntervalId);
      }
      this._scanWaitSendQqueueIntervalId = setInterval(() => {
        console.log("开启等待发送--scanWaitSendQqueue");
        this.send();
      }, t * 1000);
    } else {
      console.log("埋点内置对象丢失,队列扫描器创建失败", 1);
      throw new ReferenceError("埋点内置对象丢失,队列扫描器创建失败");
    }
  }
  /*计算输入的字节*/
  strlen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
      // 取出单个字符
      var c = str.charCodeAt(i);
      //单字节加1 ，0~9，a~z
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        len++;
      } else {
        len += 2;
      }
    }
    return len;
  }
  /**
   * 发送队列里最老的栈帧
   */
  sendOldestStack() {
    var stack = this._waitSendQueue.shift();
    if (_.localStorage) {
      _.localStorage.set("_bp_wqueue", JSON.stringify(this._waitSendQueue));
    }

    console.log("send stack(queue shift):");

    var sendData = {};
    sendData = stack;

    //数据发送
    //发送栈帧+环境配置信息
    this._sendByImg(sendData);
  }
  _sendByImg(truncated_data) {
    console.log("truncated_data", truncated_data);
    let url = this.instance._get_config("track_url");
    const track_type = this.instance._get_config("track_type");
    if (track_type === "img") {
      url += "track.gif";
    }
    let truncated_data2 =[]
    for (let i = 0; i < truncated_data.length; i++) {
      let a = {};
      let b = 0;
      for (let it in truncated_data[i]) {
        b = b + 1;
        a[i + "" + b] = truncated_data[i][it];
      }
      truncated_data2.push(a);
    }
    console.log(
      "原字符串，字节长度",
      this.strlen(_.JSONEncode(truncated_data))
    );
    // console.log('key编码缩写之后',truncated_data2)
    // console.log('key编码缩写之后，字节长度',this.strlen(_.JSONEncode(truncated_data2)))
    // console.log(
    //   "base64编码之后，字节长度",
    //   this.strlen(_.base64Encode(_.JSONEncode(truncated_data)))
    // );
    // var binaryString = pako.deflate(JSON.stringify(truncated_data), {
    //   to: "string"
    // });
    // console.log("数据压缩展示：", binaryString);
    // console.log("数据压缩之后，字节长度", this.strlen(binaryString));
    // var binaryString2 = JSON.parse(
    //   pako.inflate(binaryString, { to: "string" })
    // );
    // console.log("数据解压之后", binaryString2);
    _.sendRequest(
      url,
      track_type,
      {
        data: _.base64Encode(_.JSONEncode(truncated_data))
        // token: this.instance._get_config("token")
      },
      () => {}
    );
  }
  /**
   * 设置存在埋点信息的栈的大小
   * 调用此方法，如果栈的数据量>stackSize，则触发栈帧入待发送队列
   * @param stackSize 栈的大小 大于0的整数 如果是小数或者字符串，将先使用parseInt处理
   */
  setStackSize(stackSize) {
    stackSize = parseInt(stackSize);
    if (stackSize < 1) {
      return;
    }
    this._option.stackSize = stackSize;

    if (this._infoStack.length >= stackSize) {
      // 如果已经满了 则送入待发送队列
      this.stack2queue();
    }
  }

  /**
   * 栈帧入队列  等待被发送
   */
  stack2queue() {
    console.log("开始扫描--scanStack");
    var is = this._infoStack;
    // if (window._sxfmt && window._sxfmt.length > 0) {
    //   console.log("_sxfmt.length=" + _sxfmt.length);
    //   console.log(_sxfmt);
    //   is = is.concat(_sxfmt);
    //   window._sxfmt = [];
    // }

    console.log("infoStack length=" + is.length);
    if (is.length > 0) {
      this._queueSave(is);
      this._infoStack = [];
    } else {
      console.log("关闭扫描--_scanStackInterval");
      clearInterval(this._scanStackIntervalId);
    }
  }
  _queueSave(is) {
    this._waitSendQueue.push(is);
    this._scanWaitSendQqueue(CONFIG.queueTime);
    if (_.localStorage) {
      _.localStorage.set("_bp_wqueue", JSON.stringify(this._waitSendQueue));
    }
  }
  _stackSave(infoObj) {
    this._infoStack.push(infoObj);
    //检查信息栈是否已经满了
    if (this._infoStack.length >= CONFIG.stackSize) {
      // 如果已经满了 则送入待发送队列
      this.stack2queue();
    }
  }
  send() {
    if (this._waitSendQueue.length == 0 || this._queueSending) {
      return;
    }

    this._send();
  }
  /**
   * 将队列的栈帧都间隔递归发送出去
   */
  _send() {
    console.log("start send");
    console.log("waitSendQueue length=" + this._waitSendQueue.length);
    if (this._waitSendQueue.length == 0) {
      console.log("关闭等待发送--_scanWaitSendQqueueInterval");
      clearInterval(this._scanWaitSendQqueueIntervalId);
      this._queueSending = false;
      return;
    }

    this._queueSending = true;
    setTimeout(() => {
      this.sendOldestStack();
      this._send();
    }, 500);
  }

  /**
   * 收集的信息入栈
   * @param infoObj
   *
   *  {
   *      oc : //业务编码 opeCode
   *      ac ：//行为编码 actionCode
   *      v ：//行为结果 value 例如 输入框产生的值
   *      ed:  //扩展信息 json
   *  }
   *
   */
  push(infoObj) {
    if (infoObj) {
      infoObj.dateTime = new Date().getTime();
      console.log(infoObj);
      this._scanStack(CONFIG.stackTime);
      this._stackSave(infoObj);
    }
  }
}

export default BPOINT;
