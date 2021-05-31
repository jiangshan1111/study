1.transform 属性
  
  使用：
    div {
    transform:rotate(7deg);
    -ms-transform:rotate(7deg); 	/* IE 9 */
    -moz-transform:rotate(7deg); 	/* Firefox */
    -webkit-transform:rotate(7deg); /* Safari 和 Chrome */
    -o-transform:rotate(7deg); 	/* Opera */
    }
  
  属性：
    none	定义不进行转换。	
    matrix(n,n,n,n,n,n)	定义 2D 转换，使用六个值的矩阵。	
    matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n)	定义 3D 转换，使用 16 个值的 4x4 矩阵。	
    translate(x,y)	定义 2D 转换。	
    translate3d(x,y,z)	定义 3D 转换。	
    translateX(x)	定义转换，只是用 X 轴的值。	
    translateY(y)	定义转换，只是用 Y 轴的值。	
    translateZ(z)	定义 3D 转换，只是用 Z 轴的值。	
    scale(x,y)	定义 2D 缩放转换。	
    scale3d(x,y,z)	定义 3D 缩放转换。	
    scaleX(x)	通过设置 X 轴的值来定义缩放转换。	
    scaleY(y)	通过设置 Y 轴的值来定义缩放转换。	
    scaleZ(z)	通过设置 Z 轴的值来定义 3D 缩放转换。	
    rotate(angle)	定义 2D 旋转，在参数中规定角度。	
    rotate3d(x,y,z,angle)	定义 3D 旋转。	
    rotateX(angle)	定义沿着 X 轴的 3D 旋转。	
    rotateY(angle)	定义沿着 Y 轴的 3D 旋转。	
    rotateZ(angle)	定义沿着 Z 轴的 3D 旋转。	
    skew(x-angle,y-angle)	定义沿着 X 和 Y 轴的 2D 倾斜转换。	
    skewX(angle)	定义沿着 X 轴的 2D 倾斜转换。	
    skewY(angle)	定义沿着 Y 轴的 2D 倾斜转换。	
    perspective(n)	为 3D 转换元素定义透视视图。

2.transform-origin 属性（设置旋转元素的基点位置）

  使用：
    div{
      transform: rotate(45deg);
      transform-origin:20% 40%;

      -ms-transform: rotate(45deg); 		/* IE 9 */
      -ms-transform-origin:20% 40%; 		/* IE 9 */

      -webkit-transform: rotate(45deg);	/* Safari 和 Chrome */
      -webkit-transform-origin:20% 40%;	/* Safari 和 Chrome */

      -moz-transform: rotate(45deg);		/* Firefox */
      -moz-transform-origin:20% 40%;		/* Firefox */

      -o-transform: rotate(45deg);		/* Opera */
      -o-transform-origin:20% 40%;		/* Opera */
    }

  语法
  transform-origin[ˈɔːrɪdʒɪn]: x-axis y-axis z-axis;
    x-axis	
        定义视图被置于 X 轴的何处。可能的值：

        left
        center
        right
        length
        %

    y-axis	
        定义视图被置于 Y 轴的何处。可能的值：

        top
        center
        bottom
        length
        %

    z-axis	
        定义视图被置于 Z 轴的何处。可能的值：
        length

3.transform-style 属性 (使被转换的子元素保留其 3D 转换)

  使用：
    div{
      transform: rotateY(60deg);
      transform-style: preserve-3d;
      -webkit-transform: rotateY(60deg);	/* Safari 和 Chrome */
      -webkit-transform-style: preserve-3d;	/* Safari 和 Chrome */
    }

  语法
    transform-style: flat|preserve-3d;

    flat	子元素将不保留其 3D 位置。
    preserve-3d	子元素将保留其 3D 位置。


4.transition 属性
  transition 属性是一个简写属性，用于设置四个过渡属性：
  transition-property （规定设置过渡效果的 CSS 属性的名称。）
  transition-duration  （规定完成过渡效果需要多少秒或毫秒。）
  transition-timing-function （规定速度效果的速度曲线。）
  transition-delay （	定义过渡效果何时开始。）

    4.1 transition-property 属性
      使用：
        把鼠标指针放到 div 元素上，会产生带有平滑改变元素宽度的过渡效果：
          div
          {
          transition-property:width;
          -moz-transition-property: width; /* Firefox 4 */
          -webkit-transition-property:width; /* Safari 和 Chrome */
          -o-transition-property:width; /* Opera */
          }

      语法
        transition-property: none|all|property;
          none	没有属性会获得过渡效果。
          all	所有属性都将获得过渡效果。
          property	定义应用过渡效果的 CSS 属性名称列表，列表以逗号分隔。

    4.2 transition-duration
      使用：
        让过渡效果持续 5 秒：
          div
          {
          transition-duration: 5s;
          -moz-transition-duration: 5s; /* Firefox 4 */
          -webkit-transition-duration: 5s; /* Safari 和 Chrome */
          -o-transition-duration: 5s; /* Opera */
          }

      语法
        transition-duration: time;
        time	规定完成过渡效果需要花费的时间（以秒或毫秒计）。默认值是 0，意味着不会有效果。

    4.3 transition-timing-function 属性
      使用：
        以相同的速度从开始到结束的过渡效果：
          div
          {
          transition-timing-function: linear;
          -moz-transition-timing-function: linear; /* Firefox 4 */
          -webkit-transition-timing-function: linear; /* Safari 和 Chrome */
          -o-transition-timing-function: linear; /* Opera */
          }

      语法
        transition-timing-function: linear|ease|ease-in|ease-out|ease-in-out|cubic-
bezier(n,n,n,n);
          linear	规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。
          ease	规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。
          ease-in	规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。
          ease-out	规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。
          ease-in-out	规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。
          cubic-bezier(n,n,n,n)	在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。

    4.4 transition-delay 属性
      使用：
        div
          {
          transition-delay: 2s;
          -moz-transition-delay: 2s; /* Firefox 4 */
          -webkit-transition-delay: 2s; /* Safari 和 Chrome */
          -o-transition-delay: 2s; /* Opera */
          }

      语法
        transition-delay: time;
        time	规定在过渡效果开始之前需要等待的时间，以秒或毫秒计。



5.animation 属性
  animation 属性是一个简写属性，用于设置六个动画属性：
  animation-name	             规定需要绑定到选择器的 keyframe 名称。。
  animation-duration	         规定完成动画所花费的时间，以秒或毫秒计。
  animation-timing-function	   规定动画的速度曲线。
  animation-delay	             规定在动画开始之前的延迟。
  animation-iteration-count	   规定动画应该播放的次数。
  animation-direction	         规定是否应该轮流反向播放动画。
  使用：
    使用简写属性，将动画与 div 元素绑定：
      div
      {
      animation:mymove 5s infinite;
      -webkit-animation:mymove 5s infinite; /* Safari 和 Chrome */
      }

    5.1 animation-name
      使用：
        为 @keyframes 动画规定一个名称：
          div
          {
          animation:mymove 5s infinite;
          -webkit-animation:mymove 5s infinite; /* Safari 和 Chrome */
          }
      
      语法
        animation-name: keyframename|none;
        keyframename	规定需要绑定到选择器的 keyframe 的名称。
        none	规定无动画效果（可用于覆盖来自级联的动画）。

    5.2 animation-duration
      使用：
        为 @keyframes 动画规定一个名称：
          div
          {
          animation-duration:2s;
          -webkit-animation-duration:2s; /* Safari 和 Chrome */
          }
      
      语法
        animation-duration: time;
        time	规定完成动画所花费的时间。默认值是 0，意味着没有动画效果。

    5.3 animation-timing-function
      使用：
        从开头到结尾以相同的速度来播放动画：
          div
          {
          animation-timing-function:linear;
          -webkit-animation-timing-function:linear; /* Safari 和 Chrome */
          }
      
      语法
        animation-timing-function: value;
        animation-timing-function 使用名为三次贝塞尔（Cubic Bezier）函数的数学函数，来生成速度曲线。您能够在该函数中使用自己的值，也可以预定义的值：

        linear	动画从头到尾的速度是相同的。	
        ease	默认。动画以低速开始，然后加快，在结束前变慢。	
        ease-in	动画以低速开始。	
        ease-out	动画以低速结束。	
        ease-in-out	动画以低速开始和结束。	
        cubic-bezier(n,n,n,n)	在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值。。

    5.4 animation-delay
      使用：
        等待两秒，然后开始动画：
        div
        {
        animation-delay:2s;
        -webkit-animation-delay:2s; /* Safari 和 Chrome */
        }
      
      语法
        animation-delay: time;
        time	可选。定义动画开始前等待的时间，以秒或毫秒计。默认值是 0。

    5.5 animation-iteration-count
      使用：
        播放动画三次：
          div
          {
          animation-iteration-count:3;
          -webkit-animation-iteration-count:3; /* Safari 和 Chrome */
          }
      
      语法
        animation-iteration-count: n|infinite;
        n	定义动画播放次数的数值。	
        infinite	规定动画应该无限次播放。	


    5.6 animation-direction
      使用：
        暂停动画：
        div
        {
        animation-direction:alternate;
        -webkit-animation-direction:alternate; /* Safari 和 Chrome */
        }
      
      语法
        nimation-direction: normal|alternate;
        normal	默认值。动画应该正常播放。	
        alternate	动画应该轮流反向播放。


6.animation-fill-mode 属性 
  animation-fill-mode 属性规定动画在播放之前或之后，其动画效果是否可见。
  使用：
    为 h1 元素规定填充模式：
      h1
        {
        animation-fill-mode: forwards;
        }

  语法：
    animation-fill-mode : none | forwards | backwards | both;
    none	不改变默认行为。
    forwards	当动画完成后，保持最后一个属性值（在最后一个关键帧中定义）。
    backwards	在 animation-delay 所指定的一段时间内，在动画显示之前，应用开始属性值（在第一个关键帧中定义）。
    both	向前和向后填充模式都被应用。

7.animation-play-state 属性  animation-play-state 属性规定动画正在运行还是暂停。
  使用：
    暂停动画：
      div
      {
      animation-play-state:paused;
      -webkit-animation-play-state:paused; /* Safari 和 Chrome */
      }

  语法
    animation-play-state: paused|running;
    paused	规定动画已暂停。	
    running	规定动画正在播放。	