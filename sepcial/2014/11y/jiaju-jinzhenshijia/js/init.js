/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('header');
    require('placeholder');

   	require('./scroll');
	    var tm;
	    $(".img-scroll").CscScroll({
	        Left: 470,
	        Right: 235,
	        Time: 2000,
	        linedUp: tm,
	        Auto: true,
	        Visual: 4
	    });
	
		$(".p-01 li").hover(function(){

			$(this).children(".bg-img").css("display","none");						 
	
			$(this).children(".inf").css("display","block");						 
	
		},function(){
	
			$(this).children(".bg-img").removeAttr("style");			 
	
			$(this).children(".inf").removeAttr("style");
	
		});		
	
});
