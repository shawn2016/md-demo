/**
 * 异步引入sdk方式的引导代码(页面添加代码片段方式)
 * 代码说明参考： https://blog.csdn.net/ihaveahappyfamily/article/details/80085404
 */
(function(document, sxfData, root){  

  function loadJsSDK() {
      var script, first_script;
      script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = 'http://localhost:8111/build/0.1.0/sxfData.globals.js';
      first_script = document.getElementsByTagName("script")[0];
      first_script.parentNode.insertBefore(script, first_script);
  };
  
  
  if (!sxfData['__SV']) {
      var win = window;

      var gen_fn, functions, i, lib_name = "sxfData";
      window[lib_name] = sxfData;

      sxfData['_i'] = [];

      sxfData['init'] = function (token, config, name) {
          var target = sxfData;
          if (typeof(name) !== 'undefined') {
              target = sxfData[name] = [];
          } else {
              name = lib_name;
          }

          target['user'] = target['user'] || [];
          target['abtest'] = target['abtest'] || [];
          target['toString'] = function(no_stub) {
              var str = lib_name;
              if (name !== lib_name) {
                  str += "." + name;
              }
              if (!no_stub) {
                  str += " (stub)";
              }
              return str;
          };
          target['user']['toString'] = function() {
              return target.toString(1) + ".user (stub)";
          };

          function _set_and_defer(target, fn) {
              var split = fn.split(".");
              if (split.length == 2) {
                  target = target[split[0]];
                  fn = split[1];
              }
              target[fn] = function(){
                  target.push([fn].concat(Array.prototype.slice.call(arguments, 0)));
              };
          }
          //每次新增对外API，在这边添加下
          functions = "get_device_id get_property time_event track_pv track_event register_event_super_properties register_event_super_properties_once unregister_event_super_properties clear_event_super_properties current_event_super_properties user.set".split(' ');
          for (i = 0; i < functions.length; i++) {
              _set_and_defer(target, functions[i]);
          }

          sxfData['_i'].push([token, config, name]);
      };

      sxfData['__SV'] = 1.0;
      loadJsSDK();
  }
  
})(document, window['sxfData'] || [], window);