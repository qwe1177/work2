/*TMODJS:{"version":1,"md5":"5a5b15becc69b7c5e2c85827c1ccb73b"}*/
template('public/header',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+=' <div id="header"> ';
include('./logo');
$out+=' <ul id="nav"> <li><a href="http://www.qq.com">首页</a></li> <li><a href="http://news.qq.com/">新闻</a></li> <li><a href="http://pp.qq.com/">图片</a></li> <li><a href="http://mil.qq.com/">军事</a></li> </ul> </div>  ';
return new String($out);
});