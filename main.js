require.config({
	paths:{
		Window:"modules/simplePopup/window",
		jquery:"vendor/jquery/jquery-2.1.1"
	}
});
require(['jquery','Window'],function(jquery,w){
	$("#a").click(function(){
		new w.Window().alert("hello",function(){
			alert("removed")
		});
	})
})
