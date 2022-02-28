function getUrlParam(name) {  
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
   console.log(rg)
   var r = window.location.search.substr(1).match(reg);  //匹配目标参数  
   if (r != null) {
       return unescape(r[2]);  //返回参数值 
   } else {
       return null; 
   }
}

/(^|&)rsv_spt=([^&]*)(&|$)/