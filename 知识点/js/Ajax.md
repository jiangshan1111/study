我对 ajax 的理解是，它是一种异步通信的方法，通过直接由 js 脚本向服务器发起 http 通信，然后根据服务器返回的数据，更新网页的相应部分，而不用刷新整个页面的一种方法。

  面试手写（原生）:
  //1：创建Ajax对象
  var xhr = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');// 兼容IE6及以下版本
  //2：配置 Ajax请求地址
  xhr.open('get','index.xml',true);
  //3：发送请求
  xhr.send(null); // 严谨写法
  //4:监听请求，接受响应
  xhr.onreadysatechange=function(){
      if(xhr.readySate==4&&xhr.status==200 || xhr.status==304 )
            console.log(xhr.responsetXML)
  }

