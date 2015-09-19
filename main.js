require.config({
	paths: {
		Window: "modules/simplePopup/window",
		jquery: "vendor/jquery/jquery-2.1.1",
		jqueryUI:"vendor/jquery/jquery-ui"
	}
});
require(['jquery', 'Window'], function(jquery, w) {
	$("#a").click(function() {
		var win = new w.Window();
		win.alert({
			width: 500,
			height: 500,
			content: "hello",
			hasCloseBtn: true,
			handle4CloseBtn: function() {
				alert("click close button")
			},
			handle4AlertBtn: function() {
				alert("click alert button")
			},
			skinClassName:"m-window-bounding-box-skina",
			text4AlertBtn:"OK!",
			dragHandle:".header"
		});
		win.on("alert",function(){
			alert("click 2nd alert button");
		})
		win.on("alert",function(){
			alert("click 3rd alert button");
		})
		win.on("close",function(){
			alert("click 2nd close button");
		})
	})
})