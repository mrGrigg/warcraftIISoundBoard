describe("String",function(){describe("trim",function(){var t="	\n\f\r   ᠎             　\u2028\u2029﻿Hello, World!	\n\f\r   ᠎             　\u2028\u2029﻿";it("trims all ES5 whitespace",function(){expect(t.trim()).toEqual("Hello, World!"),expect(t.trim().length).toEqual(13)})}),describe("split",function(){var t="ab";it('If "separator" is undefined must return Array with one String - "this" string',function(){expect(t.split()).toEqual([t]),expect(t.split(void 0)).toEqual([t])}),it('If "separator" is undefined and "limit" set to 0 must return Array[]',function(){expect(t.split(void 0,0)).toEqual([])})})});