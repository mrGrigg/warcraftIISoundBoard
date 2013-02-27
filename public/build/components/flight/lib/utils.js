//implementation lifted from underscore.js (c) 2009-2012 Jeremy Ashkenas

define([],function(){var t=[],e=100,n={isDomObj:function(t){return!(!t.nodeType&&t!==window)},toArray:function(e,n){return t.slice.call(e,n)},merge:function(){var t=this.toArray(arguments);return t.unshift({}),t[t.length-1]===!0&&(t.pop(),t.unshift(!0)),$.extend.apply(void 0,t)},push:function(t,e,n){return t&&Object.keys(e||{}).forEach(function(i){if(t[i]&&n)throw Error("utils.push attempted to overwrite '"+i+"' while running in protected mode");"object"==typeof t[i]&&"object"==typeof e[i]?this.push(t[i],e[i]):t[i]=e[i]},this),t},isEnumerable:function(t,e){return Object.keys(t).indexOf(e)>-1},compose:function(){var t=arguments;return function(){for(var e=arguments,n=t.length-1;n>=0;n--)e=[t[n].apply(this,e)];return e[0]}},uniqueArray:function(t){for(var e={},n=[],i=0,o=t.length;o>i;++i)e.hasOwnProperty(t[i])||(n.push(t[i]),e[t[i]]=1);return n},debounce:function(t,n,i){"number"!=typeof n&&(n=e);var o,r;return function(){var e=this,s=arguments,a=function(){o=null,i||(r=t.apply(e,s))},c=i&&!o;return clearTimeout(o),o=setTimeout(a,n),c&&(r=t.apply(e,s)),r}},throttle:function(t,n){"number"!=typeof n&&(n=e);var i,o,r,s,a,c,u=this.debounce(function(){a=s=!1},n);return function(){i=this,o=arguments;var e=function(){r=null,a&&(c=t.apply(i,o)),u()};return r||(r=setTimeout(e,n)),s?a=!0:(s=!0,c=t.apply(i,o)),u(),c}},countThen:function(t,e){return function(){return--t?void 0:e.apply(this,arguments)}},delegate:function(t){return function(e,n){var i,o=$(e.target);Object.keys(t).forEach(function(r){return(i=o.closest(r)).length?(n=n||{},n.el=i[0],t[r].apply(this,[e,n])):void 0},this)}}};return n});