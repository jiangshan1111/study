DOM 操作——怎样添加、移除、移动、复制、创建和查找节点？

    （1）创建新节点

      createDocumentFragment()    //创建一个DOM片段
      createElement()   //创建一个具体的元素
      createTextNode()   //创建一个文本节点

    （2）添加、移除、替换、插入

      appendChild(node)
      removeChild(node)
      replaceChild(new,old)
      insertBefore(new,old)

    （3）查找

      getElementById();
      getElementsByName();
      getElementsByTagName();
      getElementsByClassName();
      querySelector();

    （4）属性操作

      getAttribute(key);
      setAttribute(key, value);
      hasAttribute(key);
      removeAttribute(key);