var swfu, uploadObj = {};
function uploadSuccess(file, serverData) {
	var response =  eval('(' + serverData + ')');
	if(response.result != "success"){
		var msg = response.msg || "上传失败!";
		csc.useDialog(function (){
			csc.alert(msg);
		})
		return;
	} else {
		var url=csc.url("img",response.key),arr=file.id.split("_"),id=Number(arr[1]);
		var $th=$('#SWFUpload_'+id).siblings(".phoall");
		var imk=$th.find("span").length>0?$th.children("span:eq(0)").find("img").attr("src").split(/\/(?![^\/]*\/)/)[1]:"";
		if($th.children("span").length>3){
			$th.append('<span class="imgshow"><img src="'+url+'" alt="" width="60" height="50" data="0" /><i></i></span>');
			$('#SWFUpload_'+id).css("display","none");
		}else if(imk=="no-img.png"||imk==""){
			$th.html("").append('<span class="imgshow"><img src="'+url+'" alt="" width="60" height="50" data="0" /><i></i></span>');
		}else{
			$th.append('<span class="imgshow"><img src="'+url+'" alt="" width="60" height="50" data="0" /><i></i></span>');
		}
	}
}

