let config=require("./config");
(function (window) {
    window.base={
        config:config.default,
        pages:{
          index:{
              scrollTop:0
          }
        }
    };
    module.exports=window.base;
})(window);