define(["lib/jquery","app/main.js"],function(){describe("Basic",function(){it("should pass a single assertion without causing an error",function(){expect([]).toBeArray()})}),describe("AJAX",function(){beforeEach(function(){var e=this.requests=[];this.ajax=sinon.useFakeXMLHttpRequest(),this.ajax.onCreate=function(t){e.push(t)}}),afterEach(function(){this.ajax.restore()}),it("should demonstrate the Sinon mocking and spying functionality",function(){var e=sinon.spy()})})});