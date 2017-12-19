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

    /*
     * 以下为专题js代码
     * ......
     */
	 
	 /*//顶部导航
		$(function(){
		  var nav = $("#navbox");
		  $(window).scroll(function(){
		     var topscr = $(this).scrollTop();
		     topscr > 818?nav.addClass("navbox"):nav.removeClass("navbox");
		  });
		});*/
		
		//顶部导航
		$(function(){
		  var navArr = [];
		  var nav = $("#navbox");
		  var nava = nav.find("a");
		  var navb = $(".navb");
		  $(window).scroll(function(){
		     var topscr = $(this).scrollTop();
		     topscr > 688?nav.addClass("navbox"):nav.removeClass("navbox");
		  });
		  navb.each(function(){
			  navArr.push($(this).offset().top);
			  });
		  nava.on("click",function(){
			  var _index = nava.index(this);
			  //alert(navArr);
			  $("html,body").animate({scrollTop:(navArr[_index]-100)},500);
			  return false;
			  });
		});
	 
	 
	 //焦点图
		
		
		$(function () {
            var container = document.getElementById('container');
            var list = document.getElementById('list');
            //var buttons = document.getElementById('buttons').getElementsByTagName('span');
            var prev = document.getElementById('prevbtn');
            var next = document.getElementById('nextbtn');
            var index = 1;
            var len = 9;
            var animated = false;
            var interval = 3000;
            var timer;


            function animate (offset) {
                if (offset == 0) {
                    return;
                }
                animated = true;
                var time = 222;
                var inteval = 10;
                var speed = offset/(time/inteval);
                var left = parseInt(list.style.left) + offset;

                var go = function (){
                    if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
                        list.style.left = parseInt(list.style.left) + speed + 'px';
                        setTimeout(go, inteval);
                    }
                    else {
                        list.style.left = left + 'px';
                        if(left>-222){
                            list.style.left = -222 * len + 'px';
                        }
                        if(left<(-222 * len)) {
                            list.style.left = '-222px';
                        }
                        animated = false;
                    }
                }
                go();
            }

         /*   function showButton() {
                for (var i = 0; i < buttons.length ; i++) {
                    if( buttons[i].className == 'on'){
                        buttons[i].className = '';
                        break;
                    }
                }
                buttons[index - 1].className = 'on';
            }*/

         /*   function play() {
                timer = setTimeout(function () {
                    next.onclick();
                    play();
                }, interval);
            }
            function stop() {
                clearTimeout(timer);
            }*/

            next.onclick = function () {
                if (animated) {
                    return;
                }
                if (index == 5) {
                    index = 1;
                }
                else {
                    index += 1;
                }
                animate(-222);
                showButton();
            }
            prev.onclick = function () {
                if (animated) {
                    return;
                }
                if (index == 1) {
                    index = 5;
                }
                else {
                    index -= 1;
                }
                animate(222);
                showButton();
            }

           /* for (var i = 0; i < buttons.length; i++) {
                buttons[i].onclick = function () {
                    if (animated) {
                        return;
                    }
                    if(this.className == 'on') {
                        return;
                    }
                    var myIndex = parseInt(this.getAttribute('index'));
                    var offset = -600 * (myIndex - index);

                    animate(offset);
                    index = myIndex;
                    showButton();
                }
            }*/

            container.onmouseover = stop;
            container.onmouseout = play;

            play();

        })
	  
	 
	  //轮播图 
	 function bannerImg(a,b,c){
		 var tabLi = $(a),
		     tabLen = tabLi.length,
			 prevBtn = $(b),
			 nextBtn = $(c),
			 _index = 0,
			 _timer = null;
		nextBtn.on("click",function(){
			_index++;
			if(_index > tabLen-1){
				_index = 0;
				}
				changeLi(_index);
			}); 
		prevBtn.on("click",function(){
			_index--;
			if(_index <0){
				_index = tabLen -1;
				}
				changeLi(_index);
			});	
		function changeLi(_index){
		  tabLi.eq(_index).css("display","block");
		  tabLi.eq(_index).siblings().css("display","none");
		  clearInterval(_timer);
		  _timer = setInterval(function(){nextBtn.click()},3000);
		  }
		  _timer = setInterval(function(){nextBtn.click()},3000);	 	
		 }
		
		bannerImg(".rollist ul li",".leftBtn",".rightBtn"); 

});