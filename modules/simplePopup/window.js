define(['jquery'],function(){
	function Window(){
		this.cfg={
			width:500,
			height:300
		};
	}
	Window.prototype={
		constructor:Window,
		alert:function(content,handle,cfg){
			var $boundingBox=$('<div class="m-window-bounding-box"></div>');
			$boundingBox.appendTo("body");
			$boundingBox.html(content);
			var $confirmButton=$('<button class="close">确定</button>');
			$boundingBox.append($confirmButton);
			$confirmButton.click(function(){
				handle&&handle();
				$boundingBox.remove()
			})
			$.extend(this.cfg,cfg);
			$boundingBox.css({
				width:this.cfg.width,
				height:this.cfg.height,
				left:this.cfg.left||(window.innerWidth-this.cfg.width)/2,
				top:this.cfg.top||(window.innerHeight-this.cfg.height)/2
			})
		},
		confirm:function(){},
		prompt:function(){}
	}
	return {
		Window:Window
	}
})