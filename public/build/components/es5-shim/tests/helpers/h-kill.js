var HLP=function(){var t;return t=function(t,e){t.originals||(t.originals={});for(var n=0,o=e.length;o>n;n++){var i=e[n];t.originals[i]=t[i],delete t[i],i in t&&(t[i]=null,t[i]&&console.log("Couln't overwrite",i,"of",t))}},{kill:t}}();HLP.kill(Function.prototype,["bind"]),HLP.kill(Array,["isArray"]),HLP.kill(String.prototype,["trim"]),HLP.kill(Object,["keys"]),HLP.kill(Date,["now","parse"]),HLP.kill(Date.prototype,["toJSON","toISOString"]),HLP.kill(Array.prototype,["forEach","some","every","indexOf","lastIndexOf","map","filter","reduce","reduceRight"]);