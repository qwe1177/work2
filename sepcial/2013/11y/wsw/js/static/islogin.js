$(function(){
	$.get(csc.url("api","/member/isLogin.html"),function (data){
			if(data.status){
				$.get(csc.url("api","/member/messagecount.html"),{type:"json"},function (dataMsg){
					$("div.top-log").find("span").html('<a href="http://member.csc86.com/" target="_blank" rel="nofollow" class="hover">'+data.data.userName+'</a>！消息<a class="top-msg-num" href="http://member.csc86.com/membercenter/messageall/" target="_blank" rel="nofollow">'+dataMsg.data.count+'</a><span class="v-line"></span><a href="http://member.csc86.com/login/logout" rel="nofollow" class="hover">退出</a>');
				},"jsonp");
			}else{
				$("div.top-sign-info").find("span.bd").html('欢迎光临华南城网！ <a rel="nofollow" href="http://member.csc86.com/login/phone/" class="tit">登录</a><span class="v-line"></span><a rel="nofollow" target="_blank" href="http://member.csc86.com/register/phonereg">免费注册</a>');
			}
	},"jsonp");
	
	$.get(csc.url("api","/api/search/hotkey"),function (data){
		var con=$("#dist-list");
		var str='';
		for(var i = 0,len = data.length;i<len;i++){
			str+='<li><a target="_blank" href="http://search.csc86.com/offer/products.html?q='+encodeURIComponent(data[i])+'">'+data[i]+'</a></li>';
			//console.log(data[i]);
		}
		
		$("#didst-list").html(str);
		//console.log(str);
	},"jsonp");
});