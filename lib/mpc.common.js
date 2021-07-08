module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "7f3e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ "cb22":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_index_vue_vue_type_style_index_0_id_2d5870e7_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7f3e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_index_vue_vue_type_style_index_0_id_2d5870e7_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_index_vue_vue_type_style_index_0_id_2d5870e7_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");

// CONCATENATED MODULE: ./node_modules/vue-loader-v16/dist/templateLoader.js??ref--5!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./packages/Mpanda.Carousel/src/index.vue?vue&type=template&id=2d5870e7&scoped=true

const _withId = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withScopeId"])("data-v-2d5870e7")

Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-2d5870e7")
const _hoisted_1 = { class: "__Carousel" }
const _hoisted_2 = {
  key: 0,
  class: "slide-indicators"
}
Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])()

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])("div", null, [
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])("div", _hoisted_1, [
      (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])($setup.data, (item, index) => {
        return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])("section", {
          class: {
          slide:true,
          left:$setup.currentSectionPos>index,
          active:$setup.currentSectionPos===index, 
          right:$setup.currentSectionPos<index,
          },
          style: {
            zIndex:$setup.zIndex(index)
          },
          key: index,
          onMouseover: _cache[1] || (_cache[1] = (...args) => ($setup.doPause && $setup.doPause(...args))),
          onMouseout: _cache[2] || (_cache[2] = (...args) => ($setup.doContinue && $setup.doContinue(...args))),
          onMouseup: $event => ($setup.handleClick($event,$props.value[index],index)),
          onClick: $event => ($setup.focusOn(index))
        }, [
          Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])("figure", null, [
            Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])("img", {
              src: item.pic,
              style: {
              width:(item.width&&item.width!==0)?`${item.width}px` :'100%',
              height:(item.height&&item.height!==0)?`${item.height}px` :null
            },
              alt: ""
            }, null, 12, ["src"])
          ])
        ], 46, ["onMouseup", "onClick"]))
      }), 128)),
      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])("div", {
        onClick: _cache[3] || (_cache[3] = (...args) => ($setup.toLeft && $setup.toLeft(...args))),
        class: "slide-arrow left"
      }),
      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])("div", {
        onClick: _cache[4] || (_cache[4] = (...args) => ($setup.toRight && $setup.toRight(...args))),
        class: "slide-arrow right"
      }),
      ($props.indicators)
        ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])("div", _hoisted_2, [
            (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])($props.value, (i, index) => {
              return (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])("i", {
                onClick: $event => ($setup.focusOn(index)),
                key: index,
                class: {'slide-indicator':true,active:index===$setup.currentSectionPos},
                onMouseover: _cache[5] || (_cache[5] = (...args) => ($setup.doPause && $setup.doPause(...args))),
                onMouseout: _cache[6] || (_cache[6] = (...args) => ($setup.doContinue && $setup.doContinue(...args)))
              }, null, 42, ["onClick"]))
            }), 128))
          ]))
        : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)
    ])
  ]))
})
// CONCATENATED MODULE: ./packages/Mpanda.Carousel/src/index.vue?vue&type=template&id=2d5870e7&scoped=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./packages/Mpanda.Carousel/src/index.vue?vue&type=script&lang=js


/* harmony default export */ var srcvue_type_script_lang_js = ({
  name: 'MPCarousel',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    indicators:{
      type:Boolean,
      default:()=>false
    }
  },
  emits: ['click'],
  setup (props, context) {
    var data = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])([])
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["watch"])(()=>props.value,(val)=>{
      var sortedArr = val.sort((pre,next)=>pre.order-next.order)
      sortedArr.map(i=>data.push(i))  
    },{ 
      immediate:true
    }) 
    var currentSectionPos = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(0);
    var pause = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(false);
    var playTimer = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(null);
    var intervalTime = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(4000);
    var focusOn = (index) => {
      currentSectionPos.value = index
    };
    var convert = (number) => {
      if (typeof number === 'number') {
        return `${number}px`
      }
      if (typeof number === 'string') {
        if (number.indexOf('%') > 0) {
          return `${number.split('%')[0]}%`
        } else {
          return number
        }
      }
    }
    var doPause = () => {
      context.emit('pause',currentSectionPos.value)
      pause.value = true
    }
    var doContinue = () => {
      pause.value = false
    }
    var play = () => {
      clearTimeout(playTimer.value)
      playTimer.value = setTimeout(function () {
        if (!pause.value) {
          var newPos = (currentSectionPos.value + 1) % data.length
          focusOn(newPos)
        }
        play()
      }, intervalTime.value)
    }
    var toRight = () => {
      var newPos = (currentSectionPos.value + 1) % data.length
      context.emit('next',newPos)
      focusOn(newPos)
    }
    var toLeft = () => {
      var newPos = (currentSectionPos.value + data.length - 1) % data.length
      context.emit('previous',newPos)
      focusOn(newPos)
    }
    var zIndex = (index) => {
      var result = 0
      if (currentSectionPos.value > index) {
        result = index
      } else if (currentSectionPos.value < index) {
        result = data.length - (index - currentSectionPos.value)
      } else {
        result = data.length
      }
      return result
    }
    var handleClick = ($event, item, index) => {
      context.emit('click', $event, item, index)
    }
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["onMounted"])(() => {
      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["nextTick"])(() => {
        play()
      })
    })
    return {
      currentSectionPos,
      focusOn,
      toLeft,
      toRight,
      doPause,
      doContinue,
      zIndex,
      handleClick,
      convert,
      data
    }
  }
});

// CONCATENATED MODULE: ./packages/Mpanda.Carousel/src/index.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./packages/Mpanda.Carousel/src/index.vue?vue&type=style&index=0&id=2d5870e7&lang=scss&scoped=true
var srcvue_type_style_index_0_id_2d5870e7_lang_scss_scoped_true = __webpack_require__("cb22");

// CONCATENATED MODULE: ./packages/Mpanda.Carousel/src/index.vue





srcvue_type_script_lang_js.render = render
srcvue_type_script_lang_js.__scopeId = "data-v-2d5870e7"

/* harmony default export */ var Mpanda_Carousel_src = (srcvue_type_script_lang_js);
// CONCATENATED MODULE: ./packages/Mpanda.Carousel/index.js

Mpanda_Carousel_src.install=function(Vue){
  Vue.component(Mpanda_Carousel_src.name,Mpanda_Carousel_src)
}
/* harmony default export */ var Mpanda_Carousel = (Mpanda_Carousel_src);
// CONCATENATED MODULE: ./packages/index.js
// 导入组件


// 存储组件列表-数组方式
// const components = [tedMenu]

// 存储组件列表-对象方式
const components = {
  MPCarousel: Mpanda_Carousel,
};

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return;

  // 遍历注册全局组件-数组方式
  // components.forEach(component => {
  //   Vue.component(component.name, component)
  // });

  // 遍历注册全局组件-对象方式
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });
};

// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

/* harmony default export */ var packages_0 = ({
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  components: components
}); 
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (packages_0);



/***/ })

/******/ });
//# sourceMappingURL=mpc.common.js.map