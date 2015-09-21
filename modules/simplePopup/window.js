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
			handle4PromptBtn: null,
			skinClassName: null,
			text4AlertBtn: "确定",
			text4ConfirmBtn: "确定",
			text4CancelBtn: "取消",
			text4PromptBtn: "提交",
			placeholder4PromptInput: "请输入内容",
			defaultText4PromptInput: "",
			maxLength4PromptInput: 10,
			isPromptInputPassword: false,
			hasMask: true,
			isDragable: true,
			dragHandle: null
		};
	}
	Window.prototype = $.extend(util.create(widget.Widget.prototype), {
		constructor: Window,
		renderUI: function() {
			var footContent = "";
			switch (this.cfg.windowType) {
				case "alert":
					footContent = '<button class="close">' + this.cfg.text4AlertBtn + '</button>';
					break;
				case "confirm":
					footContent = '<button class="confirm">' + this.cfg.text4ConfirmBtn + '</button>' +
						'<button class="cancel">' + this.cfg.text4CancelBtn + '</button>'
					break;
				case "prompt":
					this.cfg.content += '<p class="prompt-input-warpper"><input class="prompt-input" type="' + (this.cfg.isPromptInputPassword ? "password" : "text") + '" value="' + this.cfg.defaultText4PromptInput + '" placeholder="' + this.cfg.placeholder4PromptInput + '" maxlength="' + this.cfg.maxLength4PromptInput + '"/>' + '</p>';
					footContent = '<button class="prompt">' + this.cfg.text4PromptBtn + '</button>' +
						'<button class="cancel">' + this.cfg.text4CancelBtn + '</button>';
					this._$promptInput = $(".pronpt-input input");
				default:
					break;
			}
			this.$boundingBox = $('<div class="m-window-bounding-box">' +
				'<div class="content">' + this.cfg.content + '</div>' +
				'</div>');
			if(this.cfg.windowType!="common"){
				this.$boundingBox.prepend('<div class="header">' + this.cfg.title + '</div>');
				this.$boundingBox.append('<div class="footer">' + footContent + '</div>')
			}
			if (this.cfg.hasMask) {
				this._mask = $('<div class="m-window-mask"></div>');
				this._mask.appendTo("body")
			}
			if (this.cfg.hasCloseBtn) {
				$('<span class="close-btn"></span>').appendTo(this.$boundingBox);
			}
			this._$promptInput=this.$boundingBox.find(".prompt-input")
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
			}).on("click", ".prompt", function() {
				that.fire("prompt",that._$promptInput.val());
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
			if (this.cfg.handle4PromptBtn) {
				this.on("prompt", this.cfg.handle4PromptBtn);
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
		prompt: function(cfg) {
			$.extend(this.cfg, cfg, {
				windowType: "prompt"
			});
			this.render();
			this._$promptInput.focus();
			return this;
		},
		common:function(cfg){
			$.extend(this.cfg,cfg,{
				windowType:"common"
			})
			this.render();
			return this;
		}
	});
	return {
		Window: Window
	}
})