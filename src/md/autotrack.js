import { _, console } from "./utils";
import {
  getClassName,
  getSafeText,
  isElementNode,
  isTag,
  isTextNode,
  shouldTrackDomEvent,
  shouldTrackElement,
  shouldTrackValue
} from "./autotrack-utils";

var autotrack = {
  _initializedTokens: [],

  _previousElementSibling: function(el) {
    if (el.previousElementSibling) {
      return el.previousElementSibling;
    } else {
      do {
        el = el.previousSibling;
      } while (el && !isElementNode(el));
      return el;
    }
  },

  _loadScript: function(scriptUrlToLoad, callback) {
    var scriptTag = document.createElement("script");
    scriptTag.type = "text/javascript";
    scriptTag.src = scriptUrlToLoad;
    scriptTag.onload = callback;

    var scripts = document.getElementsByTagName("script");
    if (scripts.length > 0) {
      scripts[0].parentNode.insertBefore(scriptTag, scripts[0]);
    } else {
      document.body.appendChild(scriptTag);
    }
  },

  _getPropertiesFromElement: function(elem) {
    var props = {
      classes: getClassName(elem).split(" "),
      tag_name: elem.tagName.toLowerCase()
    };

    if (shouldTrackElement(elem)) {
      _.each(elem.attributes, function(attr) {
        if (shouldTrackValue(attr.value)) {
          props["attr__" + attr.name] = attr.value;
        }
      });
    }

    var nthChild = 1;
    var nthOfType = 1;
    var currentElem = elem;
    while ((currentElem = this._previousElementSibling(currentElem))) {
      // eslint-disable-line no-cond-assign
      nthChild++;
      if (currentElem.tagName === elem.tagName) {
        nthOfType++;
      }
    }
    props["nth_child"] = nthChild;
    props["nth_of_type"] = nthOfType;

    return props;
  },

  _getDefaultProperties: function(eventType) {
    return {
      $event_type: eventType,
      $ce_version: 1,
      $host: window.location.host,
      $pathname: window.location.pathname
    };
  },

  _extractCustomPropertyValue: function(customProperty) {
    var propValues = [];
    _.each(document.querySelectorAll(customProperty["css_selector"]), function(
      matchedElem
    ) {
      var value;

      if (["input", "select"].indexOf(matchedElem.tagName.toLowerCase()) > -1) {
        value = matchedElem["value"];
      } else if (matchedElem["textContent"]) {
        value = matchedElem["textContent"];
      }

      if (shouldTrackValue(value)) {
        propValues.push(value);
      }
    });
    return propValues.join(", ");
  },

  _getCustomProperties: function(targetElementList) {
    var props = {};
    _.each(
      this._customProperties,
      function(customProperty) {
        _.each(
          customProperty["event_selectors"],
          function(eventSelector) {
            var eventElements = document.querySelectorAll(eventSelector);
            _.each(
              eventElements,
              function(eventElement) {
                if (
                  _.includes(targetElementList, eventElement) &&
                  shouldTrackElement(eventElement)
                ) {
                  props[
                    customProperty["name"]
                  ] = this._extractCustomPropertyValue(customProperty);
                }
              },
              this
            );
          },
          this
        );
      },
      this
    );
    return props;
  },

  _getEventTarget: function(e) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Event/target#Compatibility_notes
    if (typeof e.target === "undefined") {
      return e.srcElement;
    } else {
      return e.target;
    }
  },

  _trackEvent: function(e, instance) {
    console.log("------------");
    /*** 如果不运行IE8测试，不要乱动这段代码 ***/
    var target = this._getEventTarget(e);
    if (isTextNode(target)) {
      // defeat Safari bug (see: http://www.quirksmode.org/js/events_properties.html)
      target = target.parentNode;
    }

    if (shouldTrackDomEvent(target, e)) {
      var targetElementList = [target];
      var curEl = target;
      while (curEl.parentNode && !isTag(curEl, "body")) {
        targetElementList.push(curEl.parentNode);
        curEl = curEl.parentNode;
      }

      var elementsJson = [];
      var href,
        explicitNoTrack = false;
      _.each(
        targetElementList,
        function(el) {
          var shouldTrackEl = shouldTrackElement(el);

          // if the element or a parent element is an anchor tag
          // include the href as a property
          if (el.tagName && el.tagName.toLowerCase() === "a") {
            href = el.getAttribute("href");
            href = shouldTrackEl && shouldTrackValue(href) && href;
          }

          // allow users to programatically prevent tracking of elements by adding class 'mp-no-track'
          var classes = getClassName(el).split(" ");
          if (_.includes(classes, "mp-no-track")) {
            explicitNoTrack = true;
          }
          console.log(elementsJson);
          elementsJson.push(this._getPropertiesFromElement(el));
        },
        this
      );

      if (explicitNoTrack) {
        return false;
      }

      // only populate text content from target element (not parents)
      // to prevent text within a sensitive element from being collected
      // as part of a parent's el.textContent
      var elementText;
      var safeElementText = getSafeText(target);
      if (safeElementText && safeElementText.length) {
        elementText = safeElementText;
      }

      var props = _.extend(
        this._getDefaultProperties(e.type),
        {
          $elements: elementsJson,
          $el_attr__href: href,
          $el_text: elementText
        },
        this._getCustomProperties(targetElementList)
      );

      instance.track("$web_event", props);
      return true;
    }
  },

  // only reason is to stub for unit tests
  // since you can't override window.location props
  _navigate: function(href) {
    window.location.href = href;
  },

  _addDomEventHandlers: function(instance) {
    var handler = _.bind(function(e) {
      e = e || window.event;
      console.log("_trackEvent");
      this._trackEvent(e, instance);
    }, this);
    _.register_event(document, "submit", handler, false, true);
    _.register_event(document, "change", handler, false, true);
    _.register_event(document, "click", handler, false, true);
  },

  _customProperties: {},
  init: function(instance) {
    if (!(document && document.body)) {
      console.log("文档还没有准备好，在500毫秒内再次尝试...");
      var that = this;
      setTimeout(function() {
        that.init(instance);
      }, 500);
      return;
    }

    var token = instance._get_config("token");
    if (this._initializedTokens.indexOf(token) > -1) {
      console.log('已初始化令牌的自动跟踪"' + token + '"');
      return;
    }
    this._initializedTokens.push(token);

    if (!this._maybeLoadEditor(instance)) {
      // don't autotrack actions when the editor is enabled
      var parseDecideResponse = _.bind(function(response) {
        if (
          response &&
          response["config"] &&
          response["config"]["enable_collect_everything"] === true
        ) {
          if (response["custom_properties"]) {
            this._customProperties = response["custom_properties"];
          }

          instance.track(
            "$web_event",
            _.extend(
              {
                $title: document.title
              },
              this._getDefaultProperties("pageview")
            )
          );

          this._addDomEventHandlers(instance);
        } else {
          instance["__autotrack_enabled"] = false;
        }
      }, this);
      // instance._send_request(
      //     instance._get_config('api_host') + '/decide/', {
      //         'verbose': true,
      //         'version': '1',
      //         'lib': 'web',
      //         'token': token
      //     },
      //     instance._prepare_callback(parseDecideResponse)
      // );
    }
  },

  _editorParamsFromHash: function(instance, hash) {
      console.log('_editorParamsFromHash')
    var editorParams;
    try {
      var state = _.getHashParam(hash, "state");
      state = JSON.parse(decodeURIComponent(state));
      var expiresInSeconds = _.getHashParam(hash, "expires_in");
      editorParams = {
        accessToken: _.getHashParam(hash, "access_token"),
        accessTokenExpiresAt:
          new Date().getTime() + Number(expiresInSeconds) * 1000,
        bookmarkletMode: !!state["bookmarkletMode"],
        projectId: state["projectId"],
        projectOwnerId: state["projectOwnerId"],
        projectToken: state["token"],
        readOnly: state["readOnly"],
        userFlags: state["userFlags"],
        userId: state["userId"]
      };
      window.sessionStorage.setItem(
        "editorParams",
        JSON.stringify(editorParams)
      );

      if (state["desiredHash"]) {
        window.location.hash = state["desiredHash"];
      } else if (window.history) {
        history.replaceState(
          "",
          document.title,
          window.location.pathname + window.location.search
        ); // completely remove hash
      } else {
        window.location.hash = ""; // clear hash (but leaves # unfortunately)
      }
    } catch (e) {
      console.log("Unable to parse data from hash", e);
    }
    return editorParams;
  },

  /**
   *要加载可视化编辑器，我们需要访问令牌和其他状态。这个州来自以下三个地方之一:
   * 1。如果客户使用旧代码片段，则在URL散列参数中
   * 2。如果代码段已经解析了散列，则从键“_mpcehash”下的会话存储中提取
   * 3。如果编辑器是在前一页初始化的，则从密钥“editorParams”下的会话存储中获取
   */
  _maybeLoadEditor: function(instance) {
      console.log('_maybeLoadEditor')
    try {
      var parseFromUrl = false;
      if (_.getHashParam(window.location.hash, "state")) {
        var state = _.getHashParam(window.location.hash, "state");
        state = JSON.parse(decodeURIComponent(state));
        parseFromUrl = state["action"] === "mpeditor";
      }
      var parseFromStorage = !!window.sessionStorage.getItem("_mpcehash");
      var editorParams;

      if (parseFromUrl) {
        // happens if they are initializing the editor using an old snippet
        editorParams = this._editorParamsFromHash(
          instance,
          window.location.hash
        );
      } else if (parseFromStorage) {
        // 如果初始化编辑器并使用新代码段，则发生
        editorParams = this._editorParamsFromHash(
          instance,
          window.sessionStorage.getItem("_mpcehash")
        );
        window.sessionStorage.removeItem("_mpcehash");
      } else {
        // 从以前的初始化中从sessionStorage获取凭据
        editorParams = JSON.parse(
          window.sessionStorage.getItem("editorParams") || "{}"
        );
      }

      if (
        editorParams["projectToken"] &&
        instance._get_config("token") === editorParams["projectToken"]
      ) {
        this._loadEditor(instance, editorParams);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  },

  _loadEditor: function(instance, editorParams) {
      console.log('_loadEditor')
    if (!window["_mpEditorLoaded"]) {
      // 即使有多个MixpanelLib实例，也只加载一次无代码事件编辑器
      window["_mpEditorLoaded"] = true;
      var editorUrl =
        instance._get_config("track_url") +
        "/js-bundle/reports/collect-everything/editor.js?_ts=" +
        new Date().getTime();
      this._loadScript(editorUrl, function() {
        window["mp_load_editor"](editorParams);
      });
      return true;
    }
    return false;
  },

  //这是一种不需要服务器端交互就可以提升CE的机制。
  //当CE处于活动状态时，每个页面加载都会导致一个确定请求。我们
  //需要慢慢地把这个调高，这样我们就不会决定是否过载。这个决定
  //通过修改字符来确定是否为这个项目启用了CE
  //项目令牌的值。
  enabledForProject: function(token, numBuckets, numEnabledBuckets) {
    numBuckets = !_.isUndefined(numBuckets) ? numBuckets : 10;
    numEnabledBuckets = !_.isUndefined(numEnabledBuckets)
      ? numEnabledBuckets
      : 10;
    var charCodeSum = 0;
    for (var i = 0; i < token.length; i++) {
      charCodeSum += token.charCodeAt(i);
    }
    return charCodeSum % numBuckets < numEnabledBuckets;
  },

  isBrowserSupported: function() {
    return _.isFunction(document.querySelectorAll);
  }
};

_.bindInstanceMethods(autotrack);
_.safewrapInstanceMethods(autotrack);

export { autotrack };
