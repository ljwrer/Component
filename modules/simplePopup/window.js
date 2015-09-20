define(['jquery', 'jqueryUI', 'Widget', 'util'], function($, $UI, widget, util) {
	function Window() {
		widget.Widget.call(this);
		this.cfg = {
			title: "系统消息",
			width: 500,
			height: 300,
			content: "",
			handle: null,
			hasCloseBtn: false,
			handle4CloseBtn: null,
			handle4AlertBtn: null,
			skinClassName: null,
			text4AlertBtn: "确定",
			hasMask: true,
			isDragable: true,
			dragHandle: null
		};
	}
	Window.prototype = $.extend(util.create(widget.Widget.prototype), {
		constructor: Window,
		renderUI: function() {
			this.$boundingBox = $('<div class="m-window-bounding-box">' +
				'<div class="header">' + this.cfg.title + '</div>' +
				'<div class="content">' + this.cfg.content + '</div>' +
				'<div class="footer">' +
				'<button class="close">' + this.cfg.text4AlertBtn + '</button>' +
				'</div>' +
				'</div>');
			if (this.cfg.hasMask) {
				$('<div class="m-window-mask"></div>').appendTo("body");
			}
			if (this.cfg.hasCloseBtn) {
				$('<span class="close-btn"></span>').appendTo(this.$boundingBox);
			}
		},
		bindUI: function() {
			var that = this;
			this.$boundingBox.delegate(".footer button", "click", function() {
				that.fire("alert");
				that.destroy();
			}).delegate(".close-btn", "click", function() {
				that.fire("close");
				that.destroy();
			})
			if (this.cfg.handle4AlertBtn) {
				that.on("alert", this.cfg.handle4AlertBtn);
			}
			if (this.cfg.handle4CloseBtn) {
				that.on("close", this.cfg.handle4CloseBtn);
			}
		},
		syncUI: function() {
			this.$boundingBox.css({
				width: this.cfg.width,
				height: this.cfg.height,
				left: this.cfg.left || (window.innerWidth - this.cfg.width) / 2,
				top: this.cfg.top || (window.innerHeight - this.cfg.height) / 2
			});
			if (this.cfg.skinClassName) {
				this.$boundingBox.removeClass("m-window-bounding-box")
				this.$boundingBox.addClass(this.cfg.skinClassName);
			}
			if (this.cfg.isDragable) {
				if (this.cfg.dragHandle) {
					var dragHandle = this.$boundingBox.find(this.cfg.dragHandle)
					this.$boundingBox.draggable({
						handle: dragHandle
					});
				} else {
					this.$boundingBox.draggable();
				}
			}
		},
		destructor: function() {
			$(".m-window-mask").remove();
		},
		alert: function(cfg) {
			$.extend(this.cfg, cfg);
			this.render();
			return this;
		},
		confirm: function() {},
		prompt: function() {}
	});
	return {
		Window: Window
	}
})