(function($){
    $.fn.lazyLoader = function(options){
        var defaults = {
            attr:"lazy-src",//自定义属性用于存放链接
            container: window,
            callback: $.noop
        };

        var settings = $.extend({},defaults,options);

        var container = $(settings.container);

        settings.cache = [];//缓存所有匹配到的目标元素



        $(this).each(function(i,val){//遍历所有用$()匹配到的元素，有可能不是img
            var obj = {
                dom: $(this),//each指针指向的当前元素
                src: $(this).attr(settings.attr),//获取对应的属性
                node: val.nodeName.toLowerCase()//获取节点类型
            };

            settings.cache.push(obj);
        });

        var callback = function(call){//用继承的方法执行回调函数
            if($.isFunction(settings.callback)){
                settings.callback.call(call);
            }
        };

        var loading = function(){
            var cHeight = $(settings.container).outerHeight();
            var sTop = $(settings.container).scrollTop();
            $(settings.cache).each(function(i,v){
                var ele = v.dom, domHeight, domTop, _src = v.src;
                domHeight = ele.height();
                domTop = ele.offset().top;

                if(domHeight+domTop>sTop || domTop<sTop+cHeight){
                //判断每一个元素的顶边和底边与视窗上下边的距离，一旦元素进入视窗我们就设置图片路径

                    if(v.node == "img"){//img元素
                        callback(ele.attr("src",_src));

                    }else{//非img元素
                        callback(ele.css("background-image","url("+_src+")"));
                    }

                }
                v.dom = null;
            })


        };

        loading();
    };
})(jQuery);


$("#container").find("img").lazyLoader({
    callback:function(){
        console.log("loading...");
    }
});