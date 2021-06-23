三角形实现原理：宽度width为0；height为0；（1）有一条横竖边（上下左右）的设置为border-方向：长度 solid red，这个画的就是底部的直线。其他边使用border-方向：长度 solid transparent。（2）有两个横竖边（上下左右）的设置，若斜边是在三角形的右边，这时候设置top或bottom的直线，和右边的斜线。若斜边是在三角形的左边，这时候设置top或bottom的直线，和左边的斜线。

 

二、实现

2.1 Triangle Up


#triangle-up {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid red;
}
 

2.2 Triangle Down


#triangle-down {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 100px solid red;
}
 

2.3 Triangle Left


#triangle-left {
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-right: 100px solid red;
    border-bottom: 50px solid transparent;
}
 

2.4 Triangle Right


#triangle-right {
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-left: 100px solid red;
    border-bottom: 50px solid transparent;
}
 

2.5 Triangle Top Left


#triangle-topleft {
    width: 0;
    height: 0;
    border-top: 100px solid red;
    border-right: 100px solid transparent;
}
 

2.6 Triangle Top Right


#triangle-topright {
    width: 0;
    height: 0;
    border-top: 100px solid red;
    border-left: 100px solid transparent;
 
}
 

2.7 Triangle Bottom Left


#triangle-bottomleft {
    width: 0;
    height: 0;
    border-bottom: 100px solid red;
    border-right: 100px solid transparent;
}
 

2.8 Triangle Bottom Right


#triangle-bottomright {
    width: 0;
    height: 0;
    border-bottom: 100px solid red;
    border-left: 100px solid transparent;
}