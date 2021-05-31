1.事件对象
  Event 对象代表事件的状态，比如事件在其中发生的元素、键盘按键的状态、鼠标的位置、鼠标按钮的状态。

  什么时候会产生Event 对象呢? 
  例如: 当用户单击某个元素的时候,我们给这个元素注册的事件就会触发,该事件的本质就是一个函数,而该函数的形参接收一个event对象.
  事件通常与函数结合使用，函数不会在事件发生前被执行！
  使用场景即：

  var oDIv = document.getElementById('box');

  oDiv.onclick = function(event){
      .........
  }

2.关于event对象

  在触发的事件的函数里面我们会接收到一个event对象,通过该对象我们需要的一些参数,比如说我们需要知道此事件作用到谁身上了,就可以通过event的属性target来获取到(IE暂且不谈),或者想阻止浏览器的默认行为可以通过方法preventDefault()来进行阻止.以下是event对象的一些属性和方法
  属性	描述
  altKey	返回当事件被触发时，”ALT” 是否被按下。
  button	返回当事件被触发时，哪个鼠标按钮被点击。
  clientX	返回当事件被触发时，鼠标指针的水平坐标。
  clientY	返回当事件被触发时，鼠标指针的垂直坐标。
  ctrlKey	返回当事件被触发时，”CTRL” 键是否被按下。
  metaKey	返回当事件被触发时，”meta” 键是否被按下。
  relatedTarget	返回与事件的目标节点相关的节点。
  screenX	返回当某个事件被触发时，鼠标指针的水平坐标。
  screenY	返回当某个事件被触发时，鼠标指针的垂直坐标。
  shiftKey	返回当事件被触发时，”SHIFT” 键是否被按下。
  IE 属性(除了上面的鼠标/事件属性，IE 浏览器还支持下面的属性)
  属性	描述
  cancelBubble	如果事件句柄想阻止事件传播到包容对象，必须把该属性设为 true。
  fromElement	对于 mouseover 和 mouseout 事件，fromElement 引用移出鼠标的元素。
  keyCode	对于 keypress 事件，该属性声明了被敲击的键生成的 Unicode 字符码。对于 keydown 和 keyup
  offsetX,offsetY	发生事件的地点在事件源元素的坐标系统中的 x 坐标和 y 坐标。
  returnValue	如果设置了该属性，它的值比事件句柄的返回值优先级高。把这个属性设置为
  srcElement	对于生成事件的 Window 对象、Document 对象或 Element 对象的引用。
  toElement	对于 mouseover 和 mouseout 事件，该属性引用移入鼠标的元素。
  x,y	事件发生的位置的 x 坐标和 y 坐标，它们相对于用CSS动态定位的最内层包容元素。
  标准 Event 属性 下面列出了 2 级 DOM 事件标准定义的属性
  属性和方法	描述
  bubbles	返回布尔值，指示事件是否是起泡事件类型。
  cancelable	返回布尔值，指示事件是否可拥可取消的默认动作。
  currentTarget	返回其事件监听器触发该事件的元素。
  eventPhase	返回事件传播的当前阶段。
  target	返回触发此事件的元素（事件的目标节点）。
  timeStamp	返回事件生成的日期和时间。
  type	返回当前 Event 对象表示的事件的名称。
  initEvent()	初始化新创建的 Event 对象的属性。
  preventDefault()	通知浏览器不要执行与事件关联的默认动作。
  stopPropagation()	不再派发事件。
  
3.Event对象的一些兼容写法

  复制代码
  获得event对象兼容性写法 
  event || (event = window.event);
  获得target兼容型写法 
  event.target||event.srcElement
  阻止浏览器默认行为兼容性写法 
  event.preventDefault ? event.preventDefault() : (event.returnValue = false);
  阻止冒泡写法 
  event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
  复制代码
  事件绑定和取消事件绑定方法的形式

  复制代码
  //事件绑定
  function on(dom, eventType, fn) {
      if(dom.addEventListener) {
          dom.addEventListener(eventType, fn);
      } else {
          if(dom.attachEvent) {
              dom.attachEvent('on' + eventType, fn);
          }
  }
  //取消事件绑定
  function un(dom, eventType, fn) {
      if(dom.removeEventListener) {
          dom.removeEventListener(eventType, fn, false);
      } else {
          if(dom.detachEvent) {
              dom.detachEvent("on" + eventType, fn)
          }
      }
  
  }

4.事件冒泡和事件捕获demo

  /*<!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <title>bubble event</title>
      <style type="text/css">
          body{margin:0;}
          #one{
                width:500px;
                height:500px;
              background:rgb(255,0,0);
                border: 1px solid transparent;
          }
          #two{
              width:400px;
              height:400px;
              margin: 0 auto;
              margin-top: 50px;
              background:rgb(255,50,50);
              border: 1px solid transparent;
          }
          #three{
              width:300px;
                height:300px;
              margin: 0 auto;
              margin-top: 50px;
                background:rgb(255,100,100);
              border: 1px solid transparent;
          }
          #four{
              width:200px;
                height:200px;
                margin: 0 auto;
              margin-top: 50px;
              background:rgb(255,150,150);
          }
      </style>
  </head>
  <body>
      <div id='one'>
        <div id='two'>
          <div id='three'>
          <div id='four'>
            </div>
          </div>
        </div>
      </div>

      <script>
          var one = document.getElementById('one');
          var two = document.getElementById('two');
          var three = document.getElementById('three');
          var four = document.getElementById('four');

        var useCapture = false; //false为冒泡获取【目标元素先触发】    true为捕获获取【父级元素先触发】
          one.addEventListener('click', function(event) {
              event || (event = window.event);
              console.log(event);
            console.log('one');
          }, useCapture);
          two.addEventListener('click', function() {
              console.log('two');
          }, useCapture);
          three.addEventListener('click', function() {
              console.log('three');
          }, useCapture);
          four.addEventListener('click', function() {
              console.log('four');
          }, useCapture);     

          /*
          false
              冒泡
              点击four div
              输出结果：four three two one        

          true
          捕获
              点击four div
              输出结果： one two three four
        */
    </script>
  </body>
  </html>*/
