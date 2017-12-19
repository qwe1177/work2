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

	var isLogin = require('http://api.csc86.com/notify/count/all/?callback=define');

	//<script src="http://res.csc86.com/js/m/sign.js"></script>


	var dialog = require('m/dialog/js/init');
	require('jquery');
	require('top');
	require('header');
	require('placeholder');

	//上下滚动
	require('./updownscroll');
	var timers;
	$('.updown').ConScroolTop({
		$select: 'ul',
		childrens: 'li',
		MoveTop: '-220px',
		MoveBottom: '110px',
		times: 3000,
		rank: timers
	});


	/*$(".container").delegate(".l_info", "click", function() {
		$(this).addClass("selected").children("div").slideDown();
		$(this).parent().siblings().find(".l_info").removeClass("selected").children("div").slideUp();

	});*/

	$(".container").delegate(".l_info", "click", function() {
		$(this).addClass("selected").children("div").slideToggle();
		$(this).parent().siblings().find(".l_info").removeClass("selected").children("div").slideUp();

	});

	//分页弹出
	var myIndex = 0
	$(".container").delegate(".l_btn", "click", function() {
		myIndex = $(".container .l_btn").index(this)
		if (!isLogin.status) {
			csc.checkSign('location.reload');
			return;
		}
		art.dialog({
			title: false,
			lock: true,
			padding: 0,
			content: $('.pup')[0]
		});
	});

	//文字滚动
	var intId;
	$.fn.myScroll = function(options) {

		//默认配置
		var defaults = {
			speed: 40,
			//滚动速度,值越大速度越慢
			rowHeight: 1000 //每行的高度
		};

		var opts = $.extend({}, defaults, options);
		intId = [];

		function marquee(obj, step) {
			var domLiWidth = 0;
			var domdivWidth = obj.parent().width();
			obj.find('li').each(function() {
				domLiWidth = domLiWidth + $(this).width();
			});
			var animateSpace = domLiWidth - domdivWidth;
			if (animateSpace > 0) {
				obj.animate({
					left: '-=1'
				}, 0, function() {
					var s = Math.abs(parseInt($(this).css("left")));
					var LiFirstW = $(this).find("li").width();
					if (s >= LiFirstW) {
						$(this).find("li").slice(0, 1).appendTo($(this));
						$(this).css("left", 0);
					}
				});
			}

		}


		this.each(function(i) {
			var sh = opts["rowHeight"],
				speed = opts["speed"],
				_this = $(this);

			intId[i] = setInterval(function() {
				marquee(_this, sh);
			}, speed);

			_this.hover(function() {
				clearInterval(intId[i]);
			}, function() {
				intId[i] = setInterval(function() {
					marquee(_this, sh);
				}, speed);
			});

		});

	}

	$("div.demo").find('ul').each(function() {

		var list = $(this).find('li');
		$(this).css('width', "9999px")
		$(this).myScroll({
			speed: 40,
			rowHeight: 700
		});
	})
	var formbool = true;

	$('#submit').on('click', function() {
		var company = $("input[name='info[company]']").val(),
			name = $("input[name='info[name]']").val(),
			tel = $("input[name='info[tel]']").val(),
			qq = $("input[name='info[QQ]']").val(),
			beizhu = $("input[name='info[beizhu]']").val(),
			email = $("input[name='info[email]']").val();
		var str = $("#sumbitform").serializeArray();
		var index = $('.demo ul').attr('class') + myIndex;
		if (company != "" && name != "" && tel != "" && email != "" && qq != "") {
			if (formbool) {
				formbool = false;
				$.post("http://ec.csc86.com/index.php?m=formguide&c=index&a=show&formid=23&siteid=1&ajax=1&info[typeid]=" + index, str, function(data) {
					var typeid = data.typeid;
					if (data.stutas) {
						$('.zxbm-bd').hide();
						$('.success').show();
						var demo = $('.demo').eq(index).find('ul');
						demo.append("<li>" + company.replace(/^s|s$/g, '') + "</li>")
						formbool = true;
					} else {
						alert("提交失败，请更新页面！");
					}
				}, "jsonp")
			}
		} else {
			alert('供应商信息不能有空！');
		}
		return false;
	})
	var $close = $('#close')
	$close.on("click", function() {
		$('.success').hide();
		$('.zxbm-bd').show();
		$('.pop').hide();
		var next = $('.pop').next('div');
		if (next) next.hide();

	})


	$(window).scroll(function() {
		var topscr = $(this).scrollTop();
		//alert(topscr);
		if (topscr < 600) {
			$(".fiexd").addClass("fiexd_nav");
		} else {
			$(".fiexd").removeClass("fiexd_nav");
		}
	});

	function getdata() {

		$('div.demo').each(function(index) {
			var domClass = $(this).find('ul').attr('class');
			var $this = $(this);
			$.post("http://ec.csc86.com/api.php", {
				"op": "formInfo",
				"mid": 23,
				"l": 20,
				"p": 1
			}, function(data) {
				var arr = [];
				for (var i = 0, len = data.length; i < len; i++) {
					var typeid = data[i].typeid;
					var myId = "" + domClass + index
					if (typeid == myId) {
						arr[i] = "<li>" + data[i].company + "</li>";
					}
				}
				$this.find("ul").html(arr.join(''));
			}, "jsonp");
		});
	}
	getdata();

	require('./fixed');
	
	//汇总页弹出
	var myIndex=0
	$(".join").click(function(){
		/*myIndex =$(".join").index(this)
		if (!isLogin.status) {
			csc.checkSign('location.reload');
			return;
		}*/
		art.dialog({
			id:("dmjform"),
			title:false,
			lock: true,
			padding: 0,
			content: $('.puppop')[0]
			});
		
		});
		
	//汇总页表单提交
	$('.tablesub').click(function() {
					var 	_json = $("#subform").serializeArray(),_form=$("#subform");
					var company = $.trim($('#company').val()),
						   industry = $.trim($('#industry').val()),
						   name = $.trim($('#name').val()),
						   tel = $.trim($('#tel').val()),
						   email = $.trim($('#email').val()),
						   detail = $.trim($('#detail').val());
					if (company== "" || industry == ""|| name  == ""|| tel == "" ) {
						alert("尊敬的用户，你还有重要资料未填写完整，请您核对完毕再提交！");
						return false;
					}
					$.get(_form.attr('action'), _json, function(data) {

						if (data.stutas==true) {
							art.dialog.list['dmjform'].close();
								art.dialog({
									title:false,
									lock: true,
									padding: 0,
									content: $('.okpup')[0]
									});
					
						} else {
							alert("提交失败，请重新填写提交！");
						}
					}, "jsonp");
	
				});
	
});