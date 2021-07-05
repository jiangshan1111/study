Flex（Flexible Box）布局 称为 "弹性布局"，可以为网页的布局提供最大的灵活性，取代了往常的 浮动（float） 布局，并且任何一个容器都可以设置 Flex 布局。注：设置 Flex 布局后，子元素的 Float 布局将失效

1.Flex 中的四大概念
  容器： 如果给一个标签添加 display:flex;，那么这个标签就是一个容器
  项目： 在容器中的直接子元素叫项目（一定是 直接 子元素）
  主轴： 项目的默认排序方向就是主轴（默认横向排列，一个容器可以有多根主轴）
  交叉轴： 和主轴垂直的那个轴，就是交叉轴

2. 容器的属性
  Flex-direction --属性决定主轴的方向
  Flex-wrap -- 属性决定项目排不下时如何换行
  Flex-flow -- flex-direction 和 flex-wrap 的简写形式
  justify-content -- 水平对齐
  align-items -- 垂直对齐
  align-content -- 决定了多根主轴的对齐方式

  1.Flex-direction（属性决定主轴的方向）
    row（默认值）：主轴为水平方向，起点在左端
    row-reverse：主轴为水平方向，起点在右端
    column：主轴为垂直方向，起点在上端
    column-reverse：主轴为垂直方向，起点在下端

  2.Flex-wrap(属性决定项目排不下时如何换行)
    norwrap（默认）：不换行
    wrap：换行，第一行在上方
    wrap-reverse：换行，第一行在下方

  3.Flex-flow（属性是 flex-direction 和 flex-wrap 的简写形式）
    flex-flow: flex-direction || flex-wrap;

  4.justify-content(沿着主轴的方向--一般是水平对齐)
    flex-start；（默认值），项目左对齐
    flex-end：项目右对齐
    center: 居中对齐
    space-between：项目两端对齐，项目之间的间隔都相等
    space-around：每个项目两侧的间隔相等

    justify-content: space-evenly可以使每个元素之间和元素距离边距的距离都相等，但是兼容性比较差（iphone的SE上不支持，会失效，相当于没有设置）

  5.align-items(属性决定项目在交叉轴上如何对齐--一般是垂直对齐)
    flex-start 从上而下
    flex-end 从下到上
    center 挤在一起居中显示
    stretch 拉伸（设置拉伸这个属性的时候，不能给子元素设置高度,基线对齐）
    注:必须给当前的容器设置高度才会起作用

  6.align-content（属性决定了多根主轴的对齐方式）
    stretch（默认值）：轴线占满整个交叉轴
    flex-start：与交叉轴的起点对齐
    flex-end：与交叉轴的终点对齐
    center：与交叉轴的中点对齐
    space-between：与交叉轴两端对齐，轴线之间的间隔平均分
    space-around：每根轴线两侧的间隔都相等

3.项目属性
  项目的属性
  order
  flex-grow
  flex-shrink
  flex-basis
  flex
  align-self
  （1）order（属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0）

  （2）flex-grow（属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大）

  （3）flex-shrink（属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小）

  （4）flex-basis(属性定义了在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小,也可以设置 xx px,项目将占据固定空间)

  （5）flex（属性是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。后两个属性可选）
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ];

  （6）align-self（属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch）
  align-self: auto | stretch | flex-start | flex-end | center | baseline;

https://segmentfault.com/a/1190000040025099