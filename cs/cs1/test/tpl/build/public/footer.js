/*TMODJS:{"version":2,"md5":"3b7df7bc8dd84890ea730fa70b1a3131"}*/
define(function(require){return require("../copyright"),require("../template")("public/footer",function(a,b){"use strict";var c=this,d=(c.$helpers,a.time),e=c.$escape,f=function(d,e){e=e||a;var f=c.$include(d,e,b);return g+=f},g="";return g+='<div id="footer"> ',d&&(g+=" <p class='time'>",g+=e(d),g+="</p> "),g+=" ",f("../copyright"),g+=" </div>",new String(g)})});