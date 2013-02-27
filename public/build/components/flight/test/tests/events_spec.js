provide(function(t){using("lib/component",function(e){describe("(Core) events",function(){function n(){this.testVal=69,this.after("initialize",function(){this.testString||(this.testString=""),this.testString+="-initTestMixin1-"})}function i(){this.after("initialize",function(){this.testString||(this.testString=""),this.testString+="-initTestMixin1-"})}var r=function(){function t(){this.after("initialize",function(){this.testString||(this.testString=""),this.testString+="-initBase-"})}return e(t,n,i)}();beforeEach(function(){window.outerDiv=document.createElement("div"),window.innerDiv=document.createElement("div"),window.outerDiv.appendChild(window.innerDiv),document.body.appendChild(window.outerDiv)}),afterEach(function(){document.body.removeChild(window.outerDiv),window.outerDiv=null,window.innerDiv=null,r.teardownAll()}),it("bubbles native events between components",function(){var t=new r(window.innerDiv),e=new r(window.outerDiv),n=jasmine.createSpy();e.on("click",n),t.trigger("click"),expect(n).toHaveBeenCalled()}),it('unbinds listeners using "off"',function(){var t=new r(window.outerDiv),e=jasmine.createSpy();t.on("click",e),t.off("click",e),t.trigger("click"),expect(e).not.toHaveBeenCalled()}),it("bubbles custom events between components",function(){var t=new r(window.innerDiv),e=new r(window.outerDiv),n=jasmine.createSpy();e.on("click",n),t.trigger("click"),expect(n).toHaveBeenCalled()}),it("can be attached to any element",function(){var t=new r(window.innerDiv),e=new r(window.outerDiv),n=jasmine.createSpy();e.on(document,"click",n),t.trigger("click"),expect(n).toHaveBeenCalled()}),it("makes data and target element available to callback",function(){var t=new r(document.body),e={blah:"blah"},n=jasmine.createSpy();t.on(document,"foo",n),t.trigger("foo",e);var i=n.mostRecentCall.args;expect(i[0]).toEqual(jasmine.any($.Event)),expect(i[1]).toEqual(e)}),it("ignores data parameters with value of undefined",function(){var t=new r(document.body),e=jasmine.createSpy();t.on(document,"foo",e),t.trigger("foo",void 0);var n=e.mostRecentCall.args;expect(n[0]).toEqual(jasmine.any($.Event)),expect(n[1]).not.toBeDefined()}),it("merges eventData into triggered event data",function(){var t=new r(document.body,{eventData:{penguins:"cool",sheep:"dull"}}),e={sheep:"thrilling"},n=jasmine.createSpy();t.on(document,"foo",n),t.trigger("foo",e);var i=n.mostRecentCall.args,o=i[1];expect(o.penguins).toBeDefined(),expect(o.penguins).toBe("cool"),expect(o.sheep).toBeDefined(),expect(o.sheep).toBe("thrilling")}),t(1)})})});