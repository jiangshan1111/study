css3新增属性有哪些？来提问这个问题的人都应该知道css3是css的升级版本，那么，css3既然是升级版本，自然是会新增一些属性，接下来本篇文章将给大家介绍关于css3中常用的新增属性。

一、css3新增边框属性

  1、css3新增属性之border-color：为边框设置多种颜色
      p

        {

        border-style:solid;  

        border-color:#ff0000 #0000ff;

        }
      

      这里说一下题外话，需要注意："border-width" 属性如果单独使用的话是不会起作用的。请首先使用 "border-style" 属性来设置边框。

  2、css3新增属性之border-image：图片边框

    css3的border-image属性是使用图片来创建边框

    div

    {

    -webkit-border-image:url(border.png) 30 30 round; /* Safari 5 */

    -o-border-image:url(border.png) 30 30 round; /* Opera */

    border-image:url(border.png) 30 30 round;

    }
    

    注意：Internet Explorer 不支持 border-image 属性；border-image 属性规定了用作边框的图片。

  3、css3新增属性之border-radius：圆角边框

    div

    {

    border:2px solid;

    border-radius:25px;

    }
  

  4、css3新增属性之box-shadow：阴影效果

    css3中box-shadow 用于向方框添加阴影

    div

    {

    box-shadow: 10px 10px 5px #888888;

    }
 

二、css3新增背景属性

  1、css3新增属性之background-size：指定背景图片尺寸

    在 CSS3 之前，背景图片的尺寸是由图片的实际尺寸决定的。在 CSS3 中，可以规定背景图片的尺寸，这就允许我们在不同的环境中重复使用背景图片。您能够以像素或百分比规定尺寸。如果以百分比规定尺寸，那么尺寸相对于父元素的宽度和高度。

    div

    {

    background:url(img_flwr.gif);

    background-size:80px 60px;

    background-repeat:no-repeat;

    }
  

  2、css3新增属性之background-origin：指定背景图片从哪里开始显示

    背景图片可以放置于 content-box、padding-box 或 border-box 区域。

    div

    {

    background-image:url('smiley.gif');

    background-repeat:no-repeat;

    background-position:left;

    background-origin:content-box;

    }
  

  3、css3新增属性之background-clip：指定背景图片从什么位置开始裁剪

    div

    {

    background-color:yellow;

    background-clip:content-box;

    }
 

三、css3新增文字效果

  1、css3新增属性之text-shadow：文本阴影

    h1

    {

    text-shadow: 5px 5px 5px #FF0000;

    }
    

    说明:

    (1) <颜色>和<模糊半径>是可选的, 当<颜色>未指定时,将使用文本颜色; 当<模糊半径>未指定时, 半径值为0；

    (2) shadow可以是逗号分隔的列表, 如:text-shadow: 2px 2px 2px #ccc, 3px 3px 3px #ddd;

    (3) 阴影效果会按照shadow list中指定的顺序应用到元素上；

    (4) 这些阴影效果有可能相互重叠, 但不会叠加文本本身；

    (5) 阴影可能会跑到容器的边界之外, 但不会影响容器的大小。

  2、css3新增属性之word-wrap：自动换行

    单词太长的话就可能无法超出某个区域，允许对长单词进行拆分，并换行到下一行

    p {word-wrap:break-word;}


四、css3新增动画效果

  1、transform变换效果：

    css3提供了元素变形效果，也叫做变换。它可以将元素实现旋转、缩放和平移的功能。

    属性值：（1）transform ；（2）transform-origin：transform-origin 属性可以设置变换的起点。默认情况下，使用元素的中心作为起点。

  2、animation动画效果

    CSS3 提供了类似 Flash 关键帧控制的动画效果，通过 animation 属性实现。那么之前的 transition 属性只能通过指定属性的初始状态和结束状态来实现动画效果，有一定的局限性。

    animation 实现动画效果主要由两个部分组成：1、通过类似 Flash 动画中的关键帧声明一个动画；2、在 animation 属性中调用关键帧声明的动画。

五、css3新增过渡效果

  1、transition过渡效果

  过渡效果一般是通过一些简单的 CSS 动作触发平滑过渡功能，比如：:hover、:focus、:active、:checked 等。CSS3 提供了 transition 属性来实现这个过渡功能。