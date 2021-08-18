  //解决base64编码 中文乱码问题 utf-16转utf-8
  function getDecode(str){
    return decodeURIComponent(atob(str).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  }

   //pdf转为ArrayBuffer
  reader.readAsArrayBuffer(blob);
  reader.onload = function (e) {
    zoomType = 'pdf'
    loadPDF(e.target.result,0,'account');
  }

  //png解析为base64
  reader.readAsDataURL(blob);
  reader.onload = function(e){
    console.log(e.target.result);
  };

  //base64 转 字符串
  atob(str)

  /*string -> Unit8Array*/
  function char2buf(str) {
      var out = new ArrayBuffer(str.length);
      var u16a = new Uint8Array(out);
      var strs = str.split("");
      for (var i = 0; i < strs.length; i++) {
          u16a[i] = strs[i].charCodeAt();
      }
      return u16a;
  }