BFC
BFC 指的是格式化上下文

1.当一个元素形成 BFC 后:
  其内部元素的布局不会影响外部元素
  外部元素的布局不会影响内部元素。

2.如何形成 BFC
  根元素
  浮动元素：float 除 none 以外的值
  绝对定位元素：position (absolute、fixed)
  display 为 inline-block、table-cells、flex
  表格类元素
  overflow 除了 visible 以外的值 (hidden、auto、scroll)【最常用】

3.BFC 的原理/BFC 的布局规则
  BFC 内部的子元素，在垂直方向，边距会发生重叠。
  BFC 在页面中是独立的容器，外面的元素不会影响里面的元素，反之亦然。
  BFC 区域不与旁边的 float box 区域重叠。（可以用来清除浮动带来的影响）。
  计算 BFC 的高度时，浮动的子元素也参与计算。

4.BFC 的应用
  解决 margin 重叠
  当父元素和子元素发生 margin 重叠时，解决办法：给子元素或父元素创建 BFC
  BFC 区域不与 float 区域重叠
  清除浮动 在浮动的盒子之下再放一个标签，在这个标签中使用clear:both