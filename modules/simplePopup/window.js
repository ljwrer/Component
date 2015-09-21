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
			handle4ConfirmBtn: null,
			handle4CancelBtn: null,
			skinClassName: null,
			text4AlertBtn: "确定",
			text4ConfirmBtn: "确定",
			text4CancelBtn: "取消",
			hasMask: true,
			isDragable: true,
			dragHandle: null
		};
	}
	Window.prototype = $.extend(util.create(widget.Widget.prototype), {
		constructor: Window,
		renderUI: function() {
			var _footContent;
			switch (this.cfg.windowType) {
				case "alert":
					_footContent = '<button class="close">' + this.cfg.text4AlertBtn + '</button>';
					break;
				case "confirm":
					_footContent = '<button class="confirm">' + this.cfg.text4ConfirmBtn + '</button>' +
						'<button class="cancel">' + this.cfg.text4CancelBtn + '</button>'
					break;
				default:
					break;
			}
			this.$boundingBox = $('<div class="m-window-bounding-box">' +
				'<div class="header">' + this.cfg.title + '</div>' +
				'<div class="content">' + this.cfg.content + '</div>' +
				'<div class="footer">' + _footContent + '</div>' +
				'</div>');
			if (this.cfg.hasMask) {
				this._mask = $('<div class="m-window-mask"></div>');
				this._mask.appendTo("body")
			}
			if (this.cfg.hasCloseBtn) {
				$('<span class="close-btn"></span>').appendTo(this.$boundingBox);
			}
		},
		bindUI: function() {
			var that = this;
			this.$boundingBox.on("click", ".close", function() {
				that.fire("alert");
				that.destroy();
			}).on("click", ".close-btn", function() {
				that.fire("close");
				that.destroy();
			}).on("click", ".confirm", function() {
				that.fire("confirm");
				that.destroy();
			}).on("click", ".cancel", function() {
				that.fire("cancel");
				that.destroy();
			})
			if (this.cfg.handle4AlertBtn) {
				this.on("alert", this.cfg.handle4AlertBtn);
			}
			if (this.cfg.handle4CloseBtn) {
				this.on("close", this.cfg.handle4CloseBtn);
			}
			if (this.cfg.handle4ConfirmBtn) {
				this.on("confirm", this.cfg.handle4ConfirmBtn);
			}
			if (this.cfg.handle4CancelBtn) {
				this.on("cancel", this.cfg.handle4CancelBtn);
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
			this._mask && this._mask.remove();
		},
		alert: function(cfg) {
			$.extend(this.cfg, cfg, {
				windowType: "alert"
			});
			this.render();
			return this;
		},
		confirm: function(cfg) {
			$.extend(this.cfg, cfg, {
				windowType: "confirm"
			});
			this.render();
			return this;
		},
		prompt: function() {}
	});
	return {
		Window: Window
	}
})