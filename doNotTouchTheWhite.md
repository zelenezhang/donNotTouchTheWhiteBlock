- Math.random():生成0-1的随机数
- JQ中click()对应onclick事件
    $('#main').click(function(event){//event事件对象
        judge(event);
    });
- event.target指向产生事件的元素
- event.target.parent():JQ不存在这个用法
- event.target.parentNode:指向父元素
- clock=setIntervar(函数名不带括号和引号,时间ms) 对应clearInterval(clock)
- $.append()/prepend():在元素的末尾/前部插入元素作为其的子节点
- $.children():返回子元素列表
- $.addClass(className):增加class
- $.css():获取/设置css中的属性
- $.text():获取、设置文本内容
- $.html()
- $.val():获取、设置输入变量值
- $.empty():子节点设为空
- border-collapse:设置表格的边框是否被合并为一个单一的边框，还是象在标准的 HTML 中那样分开显示
    separate默认值。边框会被分开。不会忽略 border-spacing 和 empty-cells 属性。
    collapse如果可能，边框会合并为一个单一的边框。会忽略 border-spacing 和 empty-cells 属性。
    inherit 规定应该从父元素继承 border-collapse 属性的值。

