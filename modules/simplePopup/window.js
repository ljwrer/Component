define(['jquery','jqueryUI'], function() {
	function Window() {
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
			isDragable:true,
			dragHandle:null
		};
		this.handlers={};
	}
	Window.prototype = {
		constructor: Window,
		on:function(type,handler){
			if(this.handlers[type]==undefined){
				this.handlers[type]=[];
			}
			this.handlers[type].push(handler);
		},
		fire:function(type,data){
			if(this.handlers[type] instanceof Array){
				var handlers=this.handlers[type];
				for(var i=0,len=handlers.length;i<len;i++){
					handlers[i](data);
				}
			}
		},
		alert: function(cfg) {
			var that=this;
			var CFG = $.extend(this.cfg, cfg);
			var $boundingBox = $('<div class="m-window-bounding-box">' +
				'<div class="header">' + CFG.title + '</div>' +
				'<div class="content">' + CFG.content + '</div>' +
				'<div class="footer">' +
				'<button class="close">' + CFG.text4AlertBtn + '</button>' +
				'</div>' +
				'</div>');
			$boundingBox.appendTo("body");
			$confirmButton = $boundingBox.find(".footer button");
			$confirmButton.click(function() {
//				CFG.handle4AlertBtn && CFG.handle4AlertBtn();
				$boundingBox.remove();
				$mask && $mask.remove();
				that.fire("alert");
			});
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
//					CFG.handle4CloseBtn && CFG.handle4CloseBtn();
					$boundingBox.remove();
					$mask && $mask.remove();
					that.fire("close")
				})
			}
			if(CFG.handle4AlertBtn){
				that.on("alert",CFG.handle4AlertBtn);
			}
			if(CFG.handle4CloseBtn){
				that.on("close",CFG.handle4CloseBtn);
			}
			if (CFG.skinClassName) {
				$boundingBox.removeClass("m-window-bounding-box")
				$boundingBox.addClass(CFG.skinClassName);
			}
			if(CFG.isDragable){
				if(CFG.dragHandle){
					$boundingBox.draggable({handle:CFG.dragHandle});
				}else{
					$boundingBox.draggable();
				}
			}
		},
		confirm: function() {},
		prompt: function() {}
	}
	return {
		Window: Window
	}
})