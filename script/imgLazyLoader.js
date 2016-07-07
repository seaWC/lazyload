function imgLazyLoader(container){
   var $container=container || $(window),
       imgArr={},
       h=$(window).height(),
       autoLoadTimer=null,
       restartAutoLoadTimer=null;
       
   initImg();
   loadImg();

   // 浏览器窗口尺寸发生改变时
   $(window).resize(function(){
       initImg();
   })

   // 当拖动滚动条
   $(window).scroll(function(){
       loadImg();
   })


   function initImg(){
      // 遍历所有图片
      $container.find("img").each(function(){
         var $el=$(this);
         var offset=$el.offset();
         var h=$(window).height();
         if($el.attr("lazy-src") && $el.attr("lazy-src")!=""){
            if(!imgArr[offset.top]){
               imgArr[offset.top]=[];   // imgArr={5:[$el,$el],228:[]}
            }
            imgArr[offset.top].push($el);
         }
      })
   }

   function loadImg(){
      var scrollTop=$(window).scrollTop();
      for(var k in imgArr){
         // 如果k小于窗口高+滚动条的位置，具备了加载条件
         if( k < (h+scrollTop) ){
            var imgs=imgArr[k];
            for(var i=0,len=imgs.length;i<len;i++){
               if(imgs[i].attr("lazy-src") && imgs[i].attr("lazy-src")!=""){
                  imgs[i].attr("src",imgs[i].attr("lazy-src"));
               }
            }
            // 删除加载完的图片对应的属性
            delete imgArr[k];  // delete 属性，将这个属性从这个对象中删除
         }
      }
   }
   
   // 自动加载剩余的图片
   function autoLoad(){
      var _key=null;
      for(var k in imgArr){
         if(!_key){
            _key=k;
            break;
         }
      }
      if(!_key) return false;
      for(var i=0,len=imgArr[_key].length;i<len;i++){
         var tempImg=imgArr[_key][i];
         if(tempImg.attr("lazy-src") && tempImg.attr("lazy-src")!=""){
            tempImg.attr("src",tempImg.attr("lazy-src"));
         }
      }
      delete imgArr[_key];

      // 调用定时器
      if(autoLoadTimer){clearTimeout(autoLoadTimer)};

      autoLoadTimer=setTimeout(autoLoad,1000);
   }
}
imgLazyLoader($("#container"));




// js没有块级作用域，它只有一种作用域：函数作用域

// 但是js可以用匿名自执行函数来模拟块级作用域

