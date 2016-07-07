(function($){
	$.fn.scrollLoading = function(option){
		var defaults = {
			attr : 'lazy-src',     // 在html标签中存放的属性名称 自定义属性
			container : window,    // 父元素默认为window
			callback : $.noop
		};
		// 不管有没有传入参数，先合并再说；
		var params = $.extend({},defaults,option);
		// 把父元素转为jquery对象；
		var container = $(params.container);
		// 新建一个数组，然后调用each方法，用于存储每个dom对象相关的数据
		params.cache = [];

		$(this).each(function(i,val){
			// 取出jquery对象中每个dom对象的节点类型
			// 取出每个dom对象上设置的图片路径
			var obj = {
				dom : $(this),                      //each指针指向的当前元素
				src : $(this).attr( params.attr),   //获取对应的属性
				node : val.nodeName.toLowerCase()   //获取节点类型
			}
			// 把这个对象加到一个数组中；
			params.cache.push( obj);
		});

		//回调函数     用继承的方法执行回调函数
		var callback = function(c){
			if( $.isFunction(params.callback)){
				params.callback.call(c)
			}
		};
		//每次触发滚动事件时，对每个dom元素与container元素进行位置判断，
		//如果满足条件，就把路径赋予这个dom元素！
		var loaDing = function(){
			// 获取父元素的高度
			var conHeight = container.outerHeight();
			var sTop = container.scrollTop();

			$(params.cache).each(function(i,v){
				var ele = v.dom,
					domH, domTop, url = v.src;
				domH = ele.height();
				domTop = ele.offset().top;

				if( sTop < domH + domTop || domTop < sTop+conHeight){
						callback( ele.attr('src',url) );

				}
				v.dom = null;
			})		
		};


		loaDing();
	};


})(jQuery)


$("#container").find("img").scrollLoading({
    callback:function(){
        console.log("loading...");
    }
});