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
	util.inheritPrototype(Window, widget.Widget);
	Window.prototype.rendUI = function() {
		var that = this;
		var CFG = $.extend(this.cfg, cfg);
		this.$boundingBox = $('<div class="m-window-bounding-box">' +
			'<div class="header">' + CFG.title + '</div>' +
			'<div class="content">' + CFG.content + '</div>' +
			'<div class="footer">' +
			'<button class="close">' + CFG.text4AlertBtn + '</button>' +
			'</div>' +
			'</div>');

	}
	Window.prototype.bindUI = function() {
		var that = this;
		var CFG = $.extend(this.cfg, cfg);
		$confirmButton = $boundingBox.find(".footer button");
		$confirmButton.click(function() {
			$boundingBox.remove();
			$mask && $mask.remove();
			that.fire("alert");
		});

	}
	Window.prototype.syncUI = function() {

	}
	Window.prototype.destructor = function() {

	}
	Window.prototype.alert = function() {

	}



	Window.prototype = {

		alert: function(cfg) {
			var that = this;
			//			var CFG = $.extend(this.cfg, cfg);
			//			var $boundingBox = $('<div class="m-window-bounding-box">' +
			//				'<div class="header">' + CFG.title + '</div>' +
			//				'<div class="content">' + CFG.content + '</div>' +
			//				'<div class="footer">' +
			//				'<button class="close">' + CFG.text4AlertBtn + '</button>' +
			//				'</div>' +
			//				'</div>');
			//			$boundingBox.appendTo("body");
//			$confirmButton = $boundingBox.find(".footer button");
//			$confirmButton.click(function() {
//				$boundingBox.remove();
//				$mask && $mask.remove();
//				that.fire("alert");
//			});
			$boundingBox.css({
				width: CFG.width,
				height: CFG.height,
				left: CFG.left || (window.innerWidth - CFG.width) / 2,
				top: CFG.top || (window.innerHeight - CFG.height) / 2
			});
			var $mask = null;
			if (CFG.hasMask) {
				$mask = $('<div class="m-window-mask"></div>');
				$mask.appendTo("body");
			}
			if (CFG.hasCloseBtn) {
				var $closeBtn = $('<span class="close-btn"></span>');
				$closeBtn.appendTo($boundingBox);
				$closeBtn.click(function() {
					$boundingBox.remove();
					$mask && $mask.remove();
					that.fire("close")
				})
			}
			if (CFG.handle4AlertBtn) {
				that.on("alert", CFG.handle4AlertBtn);
			}
			if (CFG.handle4CloseBtn) {
				that.on("close", CFG.handle4CloseBtn);
			}
			if (CFG.skinClassName) {
				$boundingBox.removeClass("m-window-bounding-box")
				$boundingBox.addClass(CFG.skinClassName);
			}
			if (CFG.isDragable) {
				if (CFG.dragHandle) {
					var dragHandle = $boundingBox.find(CFG.dragHandle)
					$boundingBox.draggable({
						handle: dragHandle
					});
				} else {
					$boundingBox.draggable();
				}
			}
			return this;
		},
		confirm: function() {},
		prompt: function() {}
	}
	return {
		Window: Window
	}
})