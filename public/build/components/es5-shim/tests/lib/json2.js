this.JSON||(this.JSON={}),function(){function f(t){return 10>t?"0"+t:t}function quote(t){return escapable.lastIndex=0,escapable.test(t)?'"'+t.replace(escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var n,i,o,s,r,a=gap,u=e[t];switch(u&&"object"==typeof u&&"function"==typeof u.toJSON&&(u=u.toJSON(t)),"function"==typeof rep&&(u=rep.call(e,t,u)),typeof u){case"string":return quote(u);case"number":return isFinite(u)?u+"":"null";case"boolean":case"null":return u+"";case"object":if(!u)return"null";if(gap+=indent,r=[],"[object Array]"===Object.prototype.toString.apply(u)){for(s=u.length,n=0;s>n;n+=1)r[n]=str(n,u)||"null";return o=0===r.length?"[]":gap?"[\n"+gap+r.join(",\n"+gap)+"\n"+a+"]":"["+r.join(",")+"]",gap=a,o}if(rep&&"object"==typeof rep)for(s=rep.length,n=0;s>n;n+=1)i=rep[n],"string"==typeof i&&(o=str(i,u),o&&r.push(quote(i)+(gap?": ":":")+o));else for(i in u)Object.hasOwnProperty.call(u,i)&&(o=str(i,u),o&&r.push(quote(i)+(gap?": ":":")+o));return o=0===r.length?"{}":gap?"{\n"+gap+r.join(",\n"+gap)+"\n"+a+"}":"{"+r.join(",")+"}",gap=a,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;"function"!=typeof JSON.stringify&&(JSON.stringify=function(t,e,n){var i;if(gap="",indent="","number"==typeof n)for(i=0;n>i;i+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(t,e){var n,i,o=t[e];if(o&&"object"==typeof o)for(n in o)Object.hasOwnProperty.call(o,n)&&(i=walk(o,n),void 0!==i?o[n]=i:delete o[n]);return reviver.call(t,e,o)}var j;if(cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();