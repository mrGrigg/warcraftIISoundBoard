//implementation lifted from underscore.js (c) 2009-2012 Jeremy Ashkenas

/**
 * @license RequireJS text 2.0.5 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */

requirejs.config({paths:{ui:"app/component_ui",text:"components/requirejs/text"},config:{text:{useXhr:function(){return!0}}}}),define("config",function(){}),define("components/flight/lib/utils",[],function(){var e=[],t=100,n={isDomObj:function(e){return!(!e.nodeType&&e!==window)},toArray:function(t,n){return e.slice.call(t,n)},merge:function(){var e=this.toArray(arguments);return e.unshift({}),e[e.length-1]===!0&&(e.pop(),e.unshift(!0)),$.extend.apply(void 0,e)},push:function(e,t,n){return e&&Object.keys(t||{}).forEach(function(i){if(e[i]&&n)throw Error("utils.push attempted to overwrite '"+i+"' while running in protected mode");"object"==typeof e[i]&&"object"==typeof t[i]?this.push(e[i],t[i]):e[i]=t[i]},this),e},isEnumerable:function(e,t){return Object.keys(e).indexOf(t)>-1},compose:function(){var e=arguments;return function(){for(var t=arguments,n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},uniqueArray:function(e){for(var t={},n=[],i=0,r=e.length;r>i;++i)t.hasOwnProperty(e[i])||(n.push(e[i]),t[e[i]]=1);return n},debounce:function(e,n,i){"number"!=typeof n&&(n=t);var r,o;return function(){var t=this,s=arguments,a=function(){r=null,i||(o=e.apply(t,s))},c=i&&!r;return clearTimeout(r),r=setTimeout(a,n),c&&(o=e.apply(t,s)),o}},throttle:function(e,n){"number"!=typeof n&&(n=t);var i,r,o,s,a,c,u=this.debounce(function(){a=s=!1},n);return function(){i=this,r=arguments;var t=function(){o=null,a&&(c=e.apply(i,r)),u()};return o||(o=setTimeout(t,n)),s?a=!0:(s=!0,c=e.apply(i,r)),u(),c}},countThen:function(e,t){return function(){return--e?void 0:t.apply(this,arguments)}},delegate:function(e){return function(t,n){var i,r=$(t.target);Object.keys(e).forEach(function(o){return(i=r.closest(o)).length?(n=n||{},n.el=i[0],e[o].apply(this,[t,n])):void 0},this)}}};return n}),define("components/flight/lib/registry",["./utils"],function(e){function t(t,n){var i,r,o;return n=e.toArray(n),"function"==typeof n[n.length-1]&&(o=n.pop()),"object"==typeof n[n.length-1]&&n.pop(),2==n.length?(i=n[0],r=n[1]):(i=t.node,r=n[0]),{element:i,type:r,callback:o}}function n(e,t){return e.element==t.element&&e.type==t.type&&(null==t.callback||e.callback==t.callback)}function i(){function i(e){this.component=e,this.instances=[],this.addInstance=function(e){this.throwIfInstanceExistsOnNode(e);var t=new r(e);return this.instances.push(t),t},this.throwIfInstanceExistsOnNode=function(e){this.instances.forEach(function(t){if(t.instance.$node[0]===e.$node[0])throw Error("Instance of "+e.constructor+" already exists on node "+e.$node[0])})},this.removeInstance=function(e){var t=this.instances.filter(function(t){return t.instance==e})[0],n=this.instances.indexOf(t);n>-1&&this.instances.splice(n,1),this.instances.length||o.removeComponentInfo(this)}}function r(e){this.instance=e,this.events=[],this.addTrigger=function(){},this.addBind=function(e){this.events.push(e),o.events.push(e)},this.removeBind=function(e){for(var t,i=0;t=this.events[i];i++)n(t,e)&&this.events.splice(i,1)}}var o=this;(this.reset=function(){this.components=[],this.allInstances=[],this.events=[]}).call(this),this.addInstance=function(e){var t=this.findComponentInfo(e);t||(t=new i(e.constructor),this.components.push(t));var n=t.addInstance(e);return this.allInstances.push(n),t},this.removeInstance=function(e){var t,n=this.findInstanceInfo(e),i=this.findComponentInfo(e);i.removeInstance(e);var t=this.allInstances.indexOf(n);t>-1&&this.allInstances.splice(t,1)},this.removeComponentInfo=function(e){var t=this.components.indexOf(e);t>-1&&this.components.splice(t,1)},this.findComponentInfo=function(e){for(var t,n=e.attachTo?e:e.constructor,i=0;t=this.components[i];i++)if(t.component===n)return t;return null},this.findInstanceInfo=function(e){var t;t=e.node?function(t){return t.instance===e}:function(t){return t.instance.node===e};var n=this.allInstances.filter(t);return n.length?e.node?n[0]:n:e.node?null:[]},this.trigger=function(){var e=t(this,arguments),n=o.findInstanceInfo(this);n&&n.addTrigger(e)},this.on=function(n){var i,r=e.toArray(arguments,1),s=o.findInstanceInfo(this);if(s){i=n.apply(null,r),i&&(r[r.length-1]=i);var a=t(this,r);s.addBind(a)}},this.off=function(){var e=t(this,arguments),n=o.findInstanceInfo(this);n&&n.removeBind(e)},this.teardown=function(){o.removeInstance(this)},this.withRegistration=function(){this.before("initialize",function(){o.addInstance(this)}),this.after("trigger",o.trigger),this.around("on",o.on),this.after("off",o.off),this.after("teardown",{obj:o,fnName:"teardown"})}}return new i}),define("components/flight/tools/debug/debug",["../../lib/registry","../../lib/utils"],function(){function e(t,n,i){var i=i||{},r=i.obj||window,o=i.path||(r==window?"window":""),s=Object.keys(r);s.forEach(function(i){(f[t]||t)(n,r,i)&&console.log([o,".",i].join(""),"->",["(",typeof r[i],")"].join(""),r[i]),"[object Object]"==Object.prototype.toString.call(r[i])&&r[i]!=r&&-1==o.split(".").indexOf(i)&&e(t,n,{obj:r[i],path:[o,i].join(".")})})}function t(t,n,i,r){n&&typeof i!=n?console.error([i,"must be",n].join(" ")):e(t,i,r)}function n(e,n){t("name","string",e,n)}function i(e,n){t("nameContains","string",e,n)}function r(e,n){t("type","function",e,n)}function o(e,n){t("value",null,e,n)}function s(e,n){t("valueCoerced",null,e,n)}function a(t,n){e(t,null,n)}function c(){var e=[].slice.call(arguments,0);h.eventNames.length||(h.eventNames="all"),h.actions=e.length?e:"all"}function u(){var e=[].slice.call(arguments,0);h.actions.length||(h.actions="all"),h.eventNames=e.length?e:"all"}function l(){h.actions=[],h.eventNames=[]}function p(){h.actions="all",h.eventNames="all"}var h,f={name:function(e,t,n){return e==n},nameContains:function(e,t,n){return n.indexOf(e)>-1},type:function(e,t,n){return t[n]instanceof e},value:function(e,t,n){return t[n]===e},valueCoerced:function(e,t,n){return t[n]==e}},d="all";return h={actions:d,eventNames:d},{enable:function(e){this.enabled=!!e,e&&window.console&&(console.info("Booting in DEBUG mode"),console.info("You can filter event logging with DEBUG.events.logAll/logNone/logByName/logByAction")),window.DEBUG=this},find:{byName:n,byNameContains:i,byType:r,byValue:o,byValueCoerced:s,custom:a},events:{logFilter:h,logByAction:c,logByName:u,logAll:p,logNone:l}}}),define("components/flight/lib/compose",["./utils","../tools/debug/debug"],function(e,t){function n(e,t){if(o){var n=Object.create(null);Object.keys(e).forEach(function(i){if(0>s.indexOf(i)){var r=Object.getOwnPropertyDescriptor(e,i);r.writable=t,n[i]=r}}),Object.defineProperties(e,n)}}function i(e,t,n){var i;return o&&e.hasOwnProperty(t)?(i=Object.getOwnPropertyDescriptor(e,t).writable,Object.defineProperty(e,t,{writable:!0}),n.call(e),Object.defineProperty(e,t,{writable:i}),void 0):(n.call(e),void 0)}function r(e,t){e.mixedIn=e.hasOwnProperty("mixedIn")?e.mixedIn:[],t.forEach(function(t){-1==e.mixedIn.indexOf(t)&&(n(e,!1),t.call(e),e.mixedIn.push(t))}),n(e,!0)}var o=t.enabled&&!e.isEnumerable(Object,"getOwnPropertyDescriptor"),s=["mixedIn"];if(o)try{Object.getOwnPropertyDescriptor(Object,"keys")}catch(a){o=!1}return{mixin:r,unlockProperty:i}}),define("components/flight/lib/advice",["./utils","./compose"],function(e,t){var n={around:function(t,n){return function(){var i=e.toArray(arguments);return n.apply(this,[t.bind(this)].concat(i))}},before:function(t,n){return this.around(t,function(){var t,i=e.toArray(arguments),r=i.shift();return t="function"==typeof n?n:n.obj[n.fnName],t.apply(this,i),r.apply(this,i)})},after:function(t,n){return this.around(t,function(){var t,i=e.toArray(arguments),r=i.shift(),o=(r.unbound||r).apply(this,i);return t="function"==typeof n?n:n.obj[n.fnName],t.apply(this,i),o})},withAdvice:function(){["before","after","around"].forEach(function(e){this[e]=function(i,r){t.unlockProperty(this,i,function(){return this[i]="function"==typeof this[i]?n[e](this[i],r):r})}},this)}};return n}),define("components/flight/lib/logger",["./compose","./utils"],function(e,t){function n(e){var t=e.tagName?e.tagName.toLowerCase():""+e,n=e.className?"."+e.className:"",i=t+n;return e.tagName?["'","'"].join(i):i}function i(e,t,i){var r,s,a,c,u,l,p,h;"function"==typeof i[i.length-1]&&(a=i.pop(),a=a.unbound||a),"object"==typeof i[i.length-1]&&i.pop(),2==i.length?(s=i[0],r=i[1]):(s=t.$node[0],r=i[0]),window.DEBUG&&(u=DEBUG.events.logFilter,p="all"==u.actions||u.actions.indexOf(e)>-1,l=function(e){return e.test?e:RegExp("^"+e.replace(/\*/g,".*")+"$")},h="all"==u.eventNames||u.eventNames.some(function(e){return l(e).test(r)}),p&&h&&console.info(o[e],e,"["+r+"]",n(s),t.constructor.describe,a&&(c=a.name||a.displayName)&&"->  "+c))}function r(){this.before("trigger",function(){i("trigger",this,t.toArray(arguments))}),this.before("on",function(){i("on",this,t.toArray(arguments))}),this.before("off",function(){i("off",this,t.toArray(arguments))})}var o={on:"<-",trigger:"->",off:"x "};return r}),define("flightStart",["components/flight/lib/compose","components/flight/lib/registry","components/flight/lib/advice","components/flight/lib/logger","components/flight/tools/debug/debug"],function(e,t,n,i,r){r.enable(!0),e.mixin(t,[n.withAdvice,i])}),define("components/flight/lib/component",["./advice","./utils","./compose","./registry"],function(e,t,n,i){function r(e){e.events.slice().forEach(function(e){var t=[e.type];e.element&&t.unshift(e.element),"function"==typeof e.callback&&t.push(e.callback),this.off.apply(this,t)},e.instance)}function o(){r(i.findInstanceInfo(this)),this.trigger("componentTornDown")}function s(){var e=i.findComponentInfo(this);e&&e.instances.slice().forEach(function(e){e.instance.teardown()})}function a(){this.trigger=function(){var e,n,i,r=t.toArray(arguments);if("string"!=typeof r[r.length-1]&&(i=r.pop()),e=2==r.length?$(r.shift()):this.$node,n=r[0],window.DEBUG&&window.postMessage)try{window.postMessage(i,"*")}catch(o){throw console.log("unserializable data for event",n,":",i),Error(["The event",event.type,"on component",this.describe,"was triggered with non-serializable data"].join(" "))}return"object"==typeof this.attr.eventData&&(i=$.extend(!0,{},this.attr.eventData,i)),e.trigger(n,i)},this.on=function(){var e,n,i,r,o=t.toArray(arguments);if(r="object"==typeof o[o.length-1]?t.delegate(this.resolveDelegateRules(o.pop())):o.pop(),i=r&&r.bind(this),i.target=r,e=2==o.length?$(o.shift()):this.$node,n=o[0],i===void 0)throw Error("Unable to bind to '"+n+"' because the given callback is undefined");return e.on(n,i),r.guid=i.guid,i},this.off=function(){var e,n,i,r=t.toArray(arguments);return"function"==typeof r[r.length-1]&&(i=r.pop()),e=2==r.length?$(r.shift()):this.$node,n=r[0],e.off(n,i)},this.resolveDelegateRules=function(e){var t={};return Object.keys(e).forEach(function(n){if(!this.attr.hasOwnProperty(n))throw Error('Component "'+this.describe+'" wants to listen on "'+n+'" but no such attribute was defined.');t[this.attr[n]]=e[n]},this),t},this.defaultAttrs=function(e){t.push(this.defaults,e,!0)||(this.defaults=e)},this.select=function(e){return this.$node.find(this.attr[e])},this.initialize=$.noop,this.teardown=o}function c(e){if(!e)throw Error("Component needs to be attachTo'd a jQuery object, native node or selector string");var n=t.merge.apply(t,t.toArray(arguments,1));$(e).each(function(e,t){new this(t,n)}.bind(this))}function u(){function r(e,n){var i={},r=0;if(!e)throw Error("Component needs a node");e.jquery?(this.node=e[0],this.$node=e):(this.node=e,this.$node=$(e)),this.describe=this.constructor.describe,this.bind=function(e){var n;if(e.uuid&&(n=i[e.uuid]))return n;var o=t.toArray(arguments,1);return o.unshift(this),n=e.bind.apply(e,o),n.target=e,e.uuid=r++,i[e.uuid]=n,n},this.attr=t.merge(this.defaults,n),this.defaults&&Object.keys(this.defaults).forEach(function(e){if(null===this.defaults[e]&&null===this.attr[e])throw Error('Required attribute "'+e+'" not specified in attachTo for component "'+this.describe+'".')},this),this.initialize.call(this,n||{}),this.trigger("componentInitialized")}var o=t.toArray(arguments);return r.toString=function(){var e=o.map(function(e){if($.browser.msie){var t=(""+e).match(/function (.*?)\s?\(/);return t&&t[1]?t[1]:""}return e.name}).join(", ").replace(/\s\,/g,"");return e},r.describe=""+r,r.attachTo=c,r.teardownAll=s,o.unshift(a,e.withAdvice,i.withRegistration),n.mixin(r.prototype,o),r}return u.teardownAll=function(){i.components.slice().forEach(function(e){e.component.teardownAll()}),i.reset()},u}),define("text",["module"],function(e){var t,n,i=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],r=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,o=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,s="undefined"!=typeof location&&location.href,a=s&&location.protocol&&location.protocol.replace(/\:/,""),c=s&&location.hostname,u=s&&(location.port||void 0),l=[],p=e.config&&e.config()||{};return t={version:"2.0.5",strip:function(e){if(e){e=e.replace(r,"");var t=e.match(o);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:p.createXhr||function(){var e,t,n;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(t=0;3>t;t+=1){n=i[t];try{e=new ActiveXObject(n)}catch(r){}if(e){i=[n];break}}return e},parseName:function(e){var t,n,i,r=!1,o=e.indexOf("."),s=0===e.indexOf("./")||0===e.indexOf("../");return-1!==o&&(!s||o>1)?(t=e.substring(0,o),n=e.substring(o+1,e.length)):t=e,i=n||t,o=i.indexOf("!"),-1!==o&&(r="strip"===i.substring(o+1),i=i.substring(0,o),n?n=i:t=i),{moduleName:t,ext:n,strip:r}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,n,i,r){var o,s,a,c=t.xdRegExp.exec(e);return c?(o=c[2],s=c[3],s=s.split(":"),a=s[1],s=s[0],!(o&&o!==n||s&&s.toLowerCase()!==i.toLowerCase()||(a||s)&&a!==r)):!0},finishLoad:function(e,n,i,r){i=n?t.strip(i):i,p.isBuild&&(l[e]=i),r(i)},load:function(e,n,i,r){if(r.isBuild&&!r.inlineText)return i(),void 0;p.isBuild=r.isBuild;var o=t.parseName(e),l=o.moduleName+(o.ext?"."+o.ext:""),h=n.toUrl(l),f=p.useXhr||t.useXhr;!s||f(h,a,c,u)?t.get(h,function(n){t.finishLoad(e,o.strip,n,i)},function(e){i.error&&i.error(e)}):n([l],function(e){t.finishLoad(o.moduleName+"."+o.ext,o.strip,e,i)})},write:function(e,n,i){if(l.hasOwnProperty(n)){var r=t.jsEscape(l[n]);i.asModule(e+"!"+n,"define(function () { return '"+r+"';});\n")}},writeFile:function(e,n,i,r,o){var s=t.parseName(n),a=s.ext?"."+s.ext:"",c=s.moduleName+a,u=i.toUrl(s.moduleName+a)+".js";t.load(c,i,function(){var n=function(e){return r(u,e)};n.asModule=function(e,t){return r.asModule(e,u,t)},t.write(e,c,n,o)},o)}},"node"===p.env||!p.env&&"undefined"!=typeof process&&process.versions&&process.versions.node?(n=require.nodeRequire("fs"),t.get=function(e,t){var i=n.readFileSync(e,"utf8");0===i.indexOf("﻿")&&(i=i.substring(1)),t(i)}):"xhr"===p.env||!p.env&&t.createXhr()?t.get=function(e,n,i,r){var o,s=t.createXhr();if(s.open("GET",e,!0),r)for(o in r)r.hasOwnProperty(o)&&s.setRequestHeader(o.toLowerCase(),r[o]);p.onXhr&&p.onXhr(s,e),s.onreadystatechange=function(){var t,r;4===s.readyState&&(t=s.status,t>399&&600>t?(r=Error(e+" HTTP status: "+t),r.xhr=s,i(r)):n(s.responseText))},s.send(null)}:("rhino"===p.env||!p.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java)&&(t.get=function(e,t){var n,i,r="utf-8",o=new java.io.File(e),s=java.lang.System.getProperty("line.separator"),a=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(o),r)),c="";try{for(n=new java.lang.StringBuffer,i=a.readLine(),i&&i.length()&&65279===i.charAt(0)&&(i=i.substring(1)),n.append(i);null!==(i=a.readLine());)n.append(s),n.append(i);c=""+n+""}finally{a.close()}t(c)}),t}),define("text!templates/unit.html",[],function(){return'<div class="unit">\r\n    <div class="top left direction"></div>\r\n    <div class="top center direction"></div>\r\n    <div class="top right direction"></div>\r\n    <div class="right center direction"></div>\r\n    <div class="bottom right direction"></div>\r\n    <div class="bottom center direction"></div>\r\n    <div class="bottom left direction"></div>\r\n    <div class="left center direction"></div>\r\n    <div class="sprite footman" id="sprite">\r\n        <div class="dot top-center"></div>\r\n        <div class="dot center-center"></div>\r\n        <div class="dot bottom-center"></div>\r\n    </div>\r\n</div>'}),define("ui/Unit",["require","components/flight/lib/component","text!templates/unit.html"],function(e){function t(){this.after("initialize",function(){n=this,this.render(),this._playCount=0,this._soundArray=[],this.createSoundArray(),this.createSpritePositionArray(),this._step=!1,this.setSpritePosition(this._position.stand.bottom.center),this.on("mouseenter",this.setUnitActive),this.on("mouseleave",this.setUnitInactive),this.$node.on("mouseover",".direction",this.getDirection),this.bindClickToPlay()}),this.render=function(){this.$node.addClass(this.attr.elementClass).append(o())},this.getDirection=function(){var e,t=this.className.split(" "),i=t[0],r=t[1],o=!1;("left"===r||"left"===i)&&(o=!0),n._direction=i,n._modifier=r,n._flip=o,e=n._position.step[i][r],n._positions=n._position.step[i][r],n._frame=0,n.stopWalking(),n._walking=setInterval(n.animateSprite,150)},this.animateSprite=function(){var e=n._positions,t=n._frame;n.setSpritePosition(e[t]),n._frame=(n._frame+1)%n._positions.length},this.setUnitActive=function(){n._active=!0},this.stopWalking=function(){null!==typeof n._walking&&clearInterval(n._walking)},this.stand=function(){var e=n._direction,t=n._modifier;n.setSpritePosition(n._position.stand[e][t])},this.setSpritePosition=function(e){var t=n.$node.find(".sprite"),i=n._flip;t.removeClass("flip"),i&&t.addClass("flip"),t.css("background-position",e)},this.setUnitInactive=function(){n._active=!1,n.stopWalking(),n.stand()},this.createSpritePositionArray=function(){n._position={step:{top:{left:["-86px -68px","-86px -124px","-86px -172px","-86px -220px"],right:["-86px -68px","-86px -124px","-86px -172px","-86px -220px"],center:["-13px -72px","-13px -128px","-13px -178px","-13px -226px"]},right:{center:["-162px -68px","-162px -124px","-162px -172px","-162px -220px"]},bottom:{left:["-236px -68px","-236px -124px","-236px -170px","-236px -220px"],right:["-236px -68px","-236px -124px","-236px -170px","-236px -220px"],center:["-309px -72px","-309px -128px","-309px -178px","-309px -226px"]},left:{center:["-162px -68px","-162px -124px","-162px -172px","-162px -220px"]}},stand:{top:{left:"-86px -6px",right:"-86px -6px",center:"-13px -9px"},right:{center:"-162px -6px"},bottom:{left:"-236px -8px",right:"-236px -8px",center:"-309px -10px"},left:{center:"-162px -6px"}}}},this.createSoundArray=function(){var e={},t=["Hready.ogg","Hwhat1.ogg","Hwhat2.ogg","Hwhat3.ogg","Hwhat4.ogg","Hwhat5.ogg","Hwhat6.ogg","Hyessir1.ogg","Hyessir2.ogg","Hyessir3.ogg","Hyessir4.ogg","Hpissed1.ogg","Hpissed2.ogg","Hpissed3.ogg","Hpissed4.ogg","Hpissed5.ogg","Hpissed6.ogg","Hpissed7.ogg"];for(i=0;t.length>i;i++)e=n.newSound(t[i]),n._soundArray.push(e)},this.playSpriteAudio=function(){n.$node.off("click",".sprite",n.playSpriteAudio),n._soundArray[n._playCount].play(),n._playCount=(n._playCount+1)%n._soundArray.length},this.newSound=function(e){var t="/sounds/human/"+e,i={volume:.5,onend:n.bindClickToPlay,urls:[t]};return new Howl(i)},this.bindClickToPlay=function(){n.$node.on("click",".sprite",n.playSpriteAudio)}}var n,r=e("components/flight/lib/component"),o=Handlebars.compile(e("text!templates/unit.html"));return r(t)}),define("app/boot/page",["ui/Unit"],function(e){function t(){e.attachTo(".content")}return t}),require(["require","config"],function(e){e(["flightStart"],function(){e(["app/boot/page"],function(e){e()})})}),define("main",function(){});