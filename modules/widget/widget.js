define(['jquery'], function() {
	function Widget(handles) {
		this.$boundingBox=null;
		this.handlers = {};
	}
	Widget.prototype = {
		constructor: Widget,
		on: function(type, handler) {
			if (this.handlers[type] == undefined) {
				this.handlers[type] = [];
			}
			this.handers[type].push(handler);
			return this;
		},
		fire: function(type, data) {
			var handlers = this.handlers[type];
			if (handlers instanceof Array) {
				for (var i = 0, len = handlers.length; i < len; i++) {
					handlers[i](data);
				}
			}
			return this;
		},
		renderUI: function() {},
		bindUI: function() {},
		syncUI: function() {},
		destructor:function() {},
		render:function(container){
			this.renderUI();
			this.bindUI();
			this.syncUI();
			$(container||document.body).append(this.boundingBox);
		},
		destroy:function(){
			this.destructor();
			this.boundingBox.off();
			this.boundingBox.remove();
		}
	}
	return {
		Widget:Widget
	}
});