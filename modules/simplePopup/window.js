define(['jquery'],function(){
	function Window(){}
	Window.prototype={
		constructor:Window,
		alert:function(content,handle){
			var $boundingBox=$('<div class="m-window-bounding-box"></div>');
			$boundingBox.appendTo("body");
			$boundingBox.html(content);
			var $confirmButton=$('<button class="close">确定</button>');
			$boundingBox.append($confirmButton);
			$confirmButton.click(function(){
				handle&&handle();
				$boundingBox.remove()
			})
			
		},
		confirm:function(){},
		prompt:function(){}
	}
	return {
		Window:Window
	}
})