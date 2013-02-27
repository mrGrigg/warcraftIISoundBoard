/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.1.2 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

var requirejs,require,define;(function(global){function isFunction(e){return"[object Function]"===ostring.call(e)}function isArray(e){return"[object Array]"===ostring.call(e)}function each(e,t){if(e){var n;for(n=0;e.length>n&&(!e[n]||!t(e[n],n,e));n+=1);}}function eachReverse(e,t){if(e){var n;for(n=e.length-1;n>-1&&(!e[n]||!t(e[n],n,e));n-=1);}}function hasProp(e,t){return hasOwn.call(e,t)}function getOwn(e,t){return hasProp(e,t)&&e[t]}function eachProp(e,t){var n;for(n in e)if(hasProp(e,n)&&t(e[n],n))break}function mixin(e,t,n,i){return t&&eachProp(t,function(t,r){(n||!hasProp(e,r))&&(i&&"string"!=typeof t?(e[r]||(e[r]={}),mixin(e[r],t,n,i)):e[r]=t)}),e}function bind(e,t){return function(){return t.apply(e,arguments)}}function scripts(){return document.getElementsByTagName("script")}function getGlobal(e){if(!e)return e;var t=global;return each(e.split("."),function(e){t=t[e]}),t}function makeError(e,t,n,i){var r=Error(t+"\nhttp://requirejs.org/docs/errors.html#"+e);return r.requireType=e,r.requireModules=i,n&&(r.originalError=n),r}function newContext(e){function t(e){var t,n;for(t=0;e[t];t+=1)if(n=e[t],"."===n)e.splice(t,1),t-=1;else if(".."===n){if(1===t&&(".."===e[2]||".."===e[0]))break;t>0&&(e.splice(t-1,2),t-=2)}}function n(e,n,i){var r,o,s,a,c,u,l,p,h,f,d,m=n&&n.split("/"),g=m,y=k.map,v=y&&y["*"];if(e&&"."===e.charAt(0)&&(n?(g=getOwn(k.pkgs,n)?m=[n]:m.slice(0,m.length-1),e=g.concat(e.split("/")),t(e),o=getOwn(k.pkgs,r=e[0]),e=e.join("/"),o&&e===r+"/"+o.main&&(e=r)):0===e.indexOf("./")&&(e=e.substring(2))),i&&(m||v)&&y){for(a=e.split("/"),c=a.length;c>0;c-=1){if(l=a.slice(0,c).join("/"),m)for(u=m.length;u>0;u-=1)if(s=getOwn(y,m.slice(0,u).join("/")),s&&(s=getOwn(s,l))){p=s,h=c;break}if(p)break;!f&&v&&getOwn(v,l)&&(f=getOwn(v,l),d=c)}!p&&f&&(p=f,h=d),p&&(a.splice(0,h,p),e=a.join("/"))}return e}function i(e){isBrowser&&each(scripts(),function(t){return t.getAttribute("data-requiremodule")===e&&t.getAttribute("data-requirecontext")===x.contextName?(t.parentNode.removeChild(t),!0):void 0})}function r(e){var t=getOwn(k.paths,e);return t&&isArray(t)&&t.length>1?(i(e),t.shift(),x.require.undef(e),x.require([e]),!0):void 0}function o(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function s(e,t,i,r){var s,a,c,u,l=null,p=t?t.name:null,h=e,f=!0,d="";return e||(f=!1,e="_@r"+(N+=1)),u=o(e),l=u[0],e=u[1],l&&(l=n(l,p,r),a=getOwn(C,l)),e&&(l?d=a&&a.normalize?a.normalize(e,function(e){return n(e,p,r)}):n(e,p,r):(d=n(e,p,r),u=o(d),l=u[0],d=u[1],i=!0,s=x.nameToUrl(d))),c=!l||a||i?"":"_unnormalized"+(A+=1),{prefix:l,name:d,parentMap:t,unnormalized:!!c,url:s,originalName:h,isDefine:f,id:(l?l+"!"+d:d)+c}}function a(e){var t=e.id,n=getOwn(T,t);return n||(n=T[t]=new x.Module(e)),n}function c(e,t,n){var i=e.id,r=getOwn(T,i);!hasProp(C,i)||r&&!r.defineEmitComplete?a(e).on(t,n):"defined"===t&&n(C[i])}function u(e,t){var n=e.requireModules,i=!1;t?t(e):(each(n,function(t){var n=getOwn(T,t);n&&(n.error=e,n.events.error&&(i=!0,n.emit("error",e)))}),i||req.onError(e))}function l(){globalDefQueue.length&&(apsp.apply(S,[S.length-1,0].concat(globalDefQueue)),globalDefQueue=[])}function p(e){delete T[e]}function h(e,t,n){var i=e.map.id;e.error?e.emit("error",e.error):(t[i]=!0,each(e.depMaps,function(i,r){var o=i.id,s=getOwn(T,o);!s||e.depMatched[r]||n[o]||(getOwn(t,o)?(e.defineDep(r,C[o]),e.check()):h(s,t,n))}),n[i]=!0)}function f(){var e,t,n,o,s=1e3*k.waitSeconds,a=s&&x.startTime+s<(new Date).getTime(),c=[],l=[],p=!1,d=!0;if(!v){if(v=!0,eachProp(T,function(n){if(e=n.map,t=e.id,n.enabled&&(e.isDefine||l.push(n),!n.error))if(!n.inited&&a)r(t)?(o=!0,p=!0):(c.push(t),i(t));else if(!n.inited&&n.fetched&&e.isDefine&&(p=!0,!e.prefix))return d=!1}),a&&c.length)return n=makeError("timeout","Load timeout for modules: "+c,null,c),n.contextName=x.contextName,u(n);d&&each(l,function(e){h(e,{},{})}),a&&!o||!p||!isBrowser&&!isWebWorker||j||(j=setTimeout(function(){j=0,f()},50)),v=!1}}function d(e){hasProp(C,e[0])||a(s(e[0],null,!0)).init(e[1],e[2])}function m(e,t,n,i){e.detachEvent&&!isOpera?i&&e.detachEvent(i,t):e.removeEventListener(n,t,!1)}function g(e){var t=e.currentTarget||e.srcElement;return m(t,x.onScriptLoad,"load","onreadystatechange"),m(t,x.onScriptError,"error"),{node:t,id:t&&t.getAttribute("data-requiremodule")}}function y(){var e;for(l();S.length;){if(e=S.shift(),null===e[0])return u(makeError("mismatch","Mismatched anonymous define() module: "+e[e.length-1]));d(e)}}var v,b,x,w,j,k={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{},map:{},config:{}},T={},E={},S=[],C={},_={},N=1,A=1;return w={require:function(e){return e.require?e.require:e.require=x.makeRequire(e.map)},exports:function(e){return e.usingExports=!0,e.map.isDefine?e.exports?e.exports:e.exports=C[e.map.id]={}:void 0},module:function(e){return e.module?e.module:e.module={id:e.map.id,uri:e.map.url,config:function(){return k.config&&getOwn(k.config,e.map.id)||{}},exports:C[e.map.id]}}},b=function(e){this.events=getOwn(E,e.id)||{},this.map=e,this.shim=getOwn(k.shim,e.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},b.prototype={init:function(e,t,n,i){i=i||{},this.inited||(this.factory=t,n?this.on("error",n):this.events.error&&(n=bind(this,function(e){this.emit("error",e)})),this.depMaps=e&&e.slice(0),this.errback=n,this.inited=!0,this.ignore=i.ignore,i.enabled||this.enabled?this.enable():this.check())},defineDep:function(e,t){this.depMatched[e]||(this.depMatched[e]=!0,this.depCount-=1,this.depExports[e]=t)},fetch:function(){if(!this.fetched){this.fetched=!0,x.startTime=(new Date).getTime();var e=this.map;return this.shim?(x.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return e.prefix?this.callPlugin():this.load()})),void 0):e.prefix?this.callPlugin():this.load()}},load:function(){var e=this.map.url;_[e]||(_[e]=!0,x.load(this.map.id,e))},check:function(){if(this.enabled&&!this.enabling){var e,t,n=this.map.id,i=this.depExports,r=this.exports,o=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,1>this.depCount&&!this.defined){if(isFunction(o)){if(this.events.error)try{r=x.execCb(n,o,i,r)}catch(s){e=s}else r=x.execCb(n,o,i,r);if(this.map.isDefine&&(t=this.module,t&&void 0!==t.exports&&t.exports!==this.exports?r=t.exports:void 0===r&&this.usingExports&&(r=this.exports)),e)return e.requireMap=this.map,e.requireModules=[this.map.id],e.requireType="define",u(this.error=e)}else r=o;this.exports=r,this.map.isDefine&&!this.ignore&&(C[n]=r,req.onResourceLoad&&req.onResourceLoad(x,this.map,this.depMaps)),delete T[n],this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var e=this.map,t=e.id,i=s(e.prefix);this.depMaps.push(i),c(i,"defined",bind(this,function(i){var r,o,l,h=this.map.name,f=this.map.parentMap?this.map.parentMap.name:null,d=x.makeRequire(e.parentMap,{enableBuildCallback:!0,skipMap:!0});return this.map.unnormalized?(i.normalize&&(h=i.normalize(h,function(e){return n(e,f,!0)})||""),o=s(e.prefix+"!"+h,this.map.parentMap),c(o,"defined",bind(this,function(e){this.init([],function(){return e},null,{enabled:!0,ignore:!0})})),l=getOwn(T,o.id),l&&(this.depMaps.push(o),this.events.error&&l.on("error",bind(this,function(e){this.emit("error",e)})),l.enable()),void 0):(r=bind(this,function(e){this.init([],function(){return e},null,{enabled:!0})}),r.error=bind(this,function(e){this.inited=!0,this.error=e,e.requireModules=[t],eachProp(T,function(e){0===e.map.id.indexOf(t+"_unnormalized")&&p(e.map.id)}),u(e)}),r.fromText=bind(this,function(n,i){var o=e.name,c=s(o),u=useInteractive;i&&(n=i),u&&(useInteractive=!1),a(c),hasProp(k.config,t)&&(k.config[o]=k.config[t]);try{req.exec(n)}catch(l){throw Error("fromText eval for "+o+" failed: "+l)}u&&(useInteractive=!0),this.depMaps.push(c),x.completeLoad(o),d([o],r)}),i.load(e.name,d,r,k),void 0)})),x.enable(i,this),this.pluginMaps[i.id]=i},enable:function(){this.enabled=!0,this.enabling=!0,each(this.depMaps,bind(this,function(e,t){var n,i,r;if("string"==typeof e){if(e=s(e,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[t]=e,r=getOwn(w,e.id))return this.depExports[t]=r(this),void 0;this.depCount+=1,c(e,"defined",bind(this,function(e){this.defineDep(t,e),this.check()})),this.errback&&c(e,"error",this.errback)}n=e.id,i=T[n],hasProp(w,n)||!i||i.enabled||x.enable(e,this)})),eachProp(this.pluginMaps,bind(this,function(e){var t=getOwn(T,e.id);t&&!t.enabled&&x.enable(e,this)})),this.enabling=!1,this.check()},on:function(e,t){var n=this.events[e];n||(n=this.events[e]=[]),n.push(t)},emit:function(e,t){each(this.events[e],function(e){e(t)}),"error"===e&&delete this.events[e]}},x={config:k,contextName:e,registry:T,defined:C,urlFetched:_,defQueue:S,Module:b,makeModuleMap:s,nextTick:req.nextTick,configure:function(e){e.baseUrl&&"/"!==e.baseUrl.charAt(e.baseUrl.length-1)&&(e.baseUrl+="/");var t=k.pkgs,n=k.shim,i={paths:!0,config:!0,map:!0};eachProp(e,function(e,t){i[t]?"map"===t?mixin(k[t],e,!0,!0):mixin(k[t],e,!0):k[t]=e}),e.shim&&(eachProp(e.shim,function(e,t){isArray(e)&&(e={deps:e}),!e.exports&&!e.init||e.exportsFn||(e.exportsFn=x.makeShimExports(e)),n[t]=e}),k.shim=n),e.packages&&(each(e.packages,function(e){var n;e="string"==typeof e?{name:e}:e,n=e.location,t[e.name]={name:e.name,location:n||e.name,main:(e.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}}),k.pkgs=t),eachProp(T,function(e,t){e.inited||e.map.unnormalized||(e.map=s(t))}),(e.deps||e.callback)&&x.require(e.deps||[],e.callback)},makeShimExports:function(e){function t(){var t;return e.init&&(t=e.init.apply(global,arguments)),t||e.exports&&getGlobal(e.exports)}return t},makeRequire:function(t,i){function r(n,o,c){var l,p,h;return i.enableBuildCallback&&o&&isFunction(o)&&(o.__requireJsBuild=!0),"string"==typeof n?isFunction(o)?u(makeError("requireargs","Invalid require call"),c):t&&hasProp(w,n)?w[n](T[t.id]):req.get?req.get(x,n,t):(p=s(n,t,!1,!0),l=p.id,hasProp(C,l)?C[l]:u(makeError("notloaded",'Module name "'+l+'" has not been loaded yet for context: '+e+(t?"":". Use require([])")))):(y(),x.nextTick(function(){y(),h=a(s(null,t)),h.skipMap=i.skipMap,h.init(n,o,c,{enabled:!0}),f()}),r)}return i=i||{},mixin(r,{isBrowser:isBrowser,toUrl:function(e){var i=e.lastIndexOf("."),r=null;return-1!==i&&(r=e.substring(i,e.length),e=e.substring(0,i)),x.nameToUrl(n(e,t&&t.id,!0),r)},defined:function(e){return hasProp(C,s(e,t,!1,!0).id)},specified:function(e){return e=s(e,t,!1,!0).id,hasProp(C,e)||hasProp(T,e)}}),t||(r.undef=function(e){l();var n=s(e,t,!0),i=getOwn(T,e);delete C[e],delete _[n.url],delete E[e],i&&(i.events.defined&&(E[e]=i.events),p(e))}),r},enable:function(e){var t=getOwn(T,e.id);t&&a(e).enable()},completeLoad:function(e){var t,n,i,o=getOwn(k.shim,e)||{},s=o.exports;for(l();S.length;){if(n=S.shift(),null===n[0]){if(n[0]=e,t)break;t=!0}else n[0]===e&&(t=!0);d(n)}if(i=getOwn(T,e),!t&&!hasProp(C,e)&&i&&!i.inited){if(!(!k.enforceDefine||s&&getGlobal(s)))return r(e)?void 0:u(makeError("nodefine","No define call for "+e,null,[e]));d([e,o.deps||[],o.exportsFn])}f()},nameToUrl:function(e,t){var n,i,r,o,s,a,c,u,l;if(req.jsExtRegExp.test(e))u=e+(t||"");else{for(n=k.paths,i=k.pkgs,s=e.split("/"),a=s.length;a>0;a-=1){if(c=s.slice(0,a).join("/"),r=getOwn(i,c),l=getOwn(n,c)){isArray(l)&&(l=l[0]),s.splice(0,a,l);break}if(r){o=e===r.name?r.location+"/"+r.main:r.location,s.splice(0,a,o);break}}u=s.join("/"),u+=t||(/\?/.test(u)?"":".js"),u=("/"===u.charAt(0)||u.match(/^[\w\+\.\-]+:/)?"":k.baseUrl)+u}return k.urlArgs?u+((-1===u.indexOf("?")?"?":"&")+k.urlArgs):u},load:function(e,t){req.load(x,e,t)},execCb:function(e,t,n,i){return t.apply(i,n)},onScriptLoad:function(e){if("load"===e.type||readyRegExp.test((e.currentTarget||e.srcElement).readyState)){interactiveScript=null;var t=g(e);x.completeLoad(t.id)}},onScriptError:function(e){var t=g(e);return r(t.id)?void 0:u(makeError("scripterror","Script error",e,[t.id]))}},x.require=x.makeRequire(),x}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(eachReverse(scripts(),function(e){return"interactive"===e.readyState?interactiveScript=e:void 0}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.1.2",commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,ap=Array.prototype,aps=ap.slice,apsp=ap.splice,isBrowser=!("undefined"==typeof window||!navigator||!document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera="undefined"!=typeof opera&&"[object Opera]"==""+opera,contexts={},cfg={},globalDefQueue=[],useInteractive=!1;if(void 0===define){if(requirejs!==void 0){if(isFunction(requirejs))return;cfg=requirejs,requirejs=void 0}void 0===require||isFunction(require)||(cfg=require,require=void 0),req=requirejs=function(e,t,n,i){var r,o,s=defContextName;return isArray(e)||"string"==typeof e||(o=e,isArray(t)?(e=t,t=n,n=i):e=[]),o&&o.context&&(s=o.context),r=getOwn(contexts,s),r||(r=contexts[s]=req.s.newContext(s)),o&&r.configure(o),r.require(e,t,n)},req.config=function(e){return req(e)},req.nextTick="undefined"!=typeof setTimeout?function(e){setTimeout(e,4)}:function(e){e()},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),each(["toUrl","undef","defined","specified"],function(e){req[e]=function(){var t=contexts[defContextName];return t.require[e].apply(t,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=function(e){throw e},req.load=function(e,t,n){var i,r=e&&e.config||{};return isBrowser?(i=r.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script"),i.type=r.scriptType||"text/javascript",i.charset="utf-8",i.async=!0,i.setAttribute("data-requirecontext",e.contextName),i.setAttribute("data-requiremodule",t),!i.attachEvent||i.attachEvent.toString&&0>(""+i.attachEvent).indexOf("[native code")||isOpera?(i.addEventListener("load",e.onScriptLoad,!1),i.addEventListener("error",e.onScriptError,!1)):(useInteractive=!0,i.attachEvent("onreadystatechange",e.onScriptLoad)),i.src=n,currentlyAddingScript=i,baseElement?head.insertBefore(i,baseElement):head.appendChild(i),currentlyAddingScript=null,i):(isWebWorker&&(importScripts(n),e.completeLoad(t)),void 0)},isBrowser&&eachReverse(scripts(),function(e){return head||(head=e.parentNode),dataMain=e.getAttribute("data-main"),dataMain?(cfg.baseUrl||(src=dataMain.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath,dataMain=mainScript),dataMain=dataMain.replace(jsSuffixRegExp,""),cfg.deps=cfg.deps?cfg.deps.concat(dataMain):[dataMain],!0):void 0}),define=function(e,t,n){var i,r;"string"!=typeof e&&(n=t,t=e,e=null),isArray(t)||(n=t,t=[]),!t.length&&isFunction(n)&&n.length&&((""+n).replace(commentRegExp,"").replace(cjsRequireRegExp,function(e,n){t.push(n)}),t=(1===n.length?["require"]:["require","exports","module"]).concat(t)),useInteractive&&(i=currentlyAddingScript||getInteractiveScript(),i&&(e||(e=i.getAttribute("data-requiremodule")),r=contexts[i.getAttribute("data-requirecontext")])),(r?r.defQueue:globalDefQueue).push([e,t,n])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)}})(this);