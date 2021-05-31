let config=require('./config.js');
(function(global){
    global.base={
        config:config.default,
        pages:{
            index:{
                scrollTop:0
            }
        }
    }
    module.exports=global.base;
})(window)
