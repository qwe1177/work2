$(function(){

	$(window).scroll(function(){

		var topscr = $(this).scrollTop();

		//alert(topscr);

		if(topscr<505){

			$(".fiexd").addClass("fiexd_nav");	

		}else{

			$(".fiexd").removeClass("fiexd_nav");	

		}

	});	

	

});
function bmto(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			artDialog({title:"在线报名",padding:"20px",content:'<div class="tablewidth"><div class="tab-title"><span class="g-f-l">在线报名</span><a class="g-f-r" href="javascript:;" title="" onclick="closet()"></a></div><table  border="0" cellspacing="0" cellpadding="0">'+
		  '<tr><th><em>*</em>旺铺名称:</th><td><input name="name" type="text" /><span>请输入旺铺名称</span></td></tr>'+
		  '<tr><th><em>*</em>旺铺网址:</th><td><input name="href" type="text" /><span>请输入旺铺网址</span></td></tr>'+
		  '<tr><th><em>*</em>联系电话:</th><td><input name="tel" type="text" /><span>请输入联系电话</span></td></tr>'+
		  '<tr><th><em>*</em>QQ:</th><td><input name="qq" type="text" /><span>请输入QQ</span></td></tr>'+
		  '<tr><th><em>*</em>推广商品网址1:</th><td><input name="href01" type="text" /><span>请输入推广商品网址</span></td></tr>'+
		  '<tr><th>推广商品网址2:</th><td><input name="href02" type="text" /></td></tr>'+
		  '<tr><th>推广商品网址3:</th><td><input name="href03" type="text" /></td></tr>'+
		  '<tr><th>推广商品网址4:</th><td><input name="href04" type="text" /></td></tr>'+
		  '<tr><th>推广商品网址5:</th><td><input name="href05" type="text" /></td></tr></table></div>',
	
		ok: function() {
	
			var name=$("input[name='name']").val(),
				href=$("input[name=href]").val(),
				tel=$("input[name=tel]").val(),
				qq=$("input[name=qq]").val(),
				href01=$("input[name=href01]").val(),
				href02=$("input[name=href01]").val(),
				href03=$("input[name=href01]").val(),
				href04=$("input[name=href01]").val(),
				href05=$("input[name=href01]").val();
				$(".tablewidth td span").removeAttr("style");
				if(name==""||href==""||tel==""||qq==""||href01==""){
					if(name==""){$("input[name='name']").siblings("span").css("display","inline-block")}
					if(href==""){$("input[name='href']").siblings("span").css("display","inline-block")}
					if(tel==""){$("input[name='tel']").siblings("span").css("display","inline-block")}
					if(qq==""){$("input[name='qq']").siblings("span").css("display","inline-block")}
					if(href01==""){$("input[name='href01']").siblings("span").css("display","inline-block")}
					return false;
				}
				$.post("http://cncms.csc86.com/formguide/index.php",{"formid": 34,"subtype": "ajax","dosubmit":"好货源第七期","info[name]":name,"info[href]":href,"info[tel]":tel,"info[qq]":qq,"info[href01]":href01,"info[href02]":href02,"info[href03]":href03,"info[href04]":href04,"info[href05]":href05},function(data){
	
				if(data.status == true){
					alert("恭喜您！申请加入成功，我们的客服人员会在48小时内与您取得联系，感谢您的申请！");
					$("input[name=name]").val("");
					$("input[name=href]").val("");
					$("input[name=tel]").val("");
					$("input[name=qq]").val("");
					$("input[name=href01]").val("");
					$("input[name=href02]").val("");
					$("input[name=href03]").val("");
					$("input[name=href04]").val("");
					$("input[name=href05]").val("");
				}else{
					alert("申请失败，请刷新后重试！");
				}
			},"jsonp");
		},cancel:false,
	
		fixed: true,
	
		id: 'Fm7',
	
		icon: 'question',
	
		okVal: '确认提交'});
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");			
}

function closet(){

	art.dialog({id:'Fm7'}).close();	

}
