# Fabricjs踩坑总结

Fabricjs是一款非常齐全的基于H5中canvas画布的函数库。

为什么我要强调这么多遍？因为真的 ***非常齐全***，齐全到高度封装以至于使用原生js写事件的时候总会出现一些意想不到的效果。

接下来是一些经验总结：

1. 事件

   1.1. 点击事件

      + 一般到这种时候我们想到的绝对是**原生js的onclick事件**，但是总会发现有各种情况的bug调都调不完。不过不用担心，接口里面提供了**mouse:down**事件。下面给出一段示例代码：

```javascript
// 画布id值为'c'
// 另外此处的deeptech是替换了原来的fabric
var canvas = this.__canvas = new deeptech.Canvas('c');
canvas.on('mouse:down', function(downEvent){
    // 监听canvas的按下鼠标左键事件
    if (downEvent.target === null) {
        // 根据需要填写代码……
    }
});
```
+ 首先，我们获取到了当前的画布对象*canvas*
+ 然后给*canvas*绑定了'mouse:down'事件。其实原生js中是没有这个事件的，但是接口中有，并且能够监听到。回调函数中的参数为 ***downEvent***。
+ 接着使用*downEvent.**target***来判断我们是不是点到了使用接口新建的对象。如果只点到了画布，将会是null，否则是具体的对象属性，当我们使用*console.log*输出的时候会看见所有属性。在当你需要在一些特殊需求的时候会非常方便，比如**点到特定点禁止执行、其他点始终执行**的时候。
+ 这可比js原生的onclick事件方便多了，点到具体对象的时候还能用代码控制拖拽。

    1.2. 拖拽事件
    1. moved

        这一事件会从按住开始拖拽一直到鼠标放开全部完成之后才开始执行
    2. moving

        这一事件会在按住到开始拖拽直到鼠标放开的整个过程中执行。<br />
        下面看一个例子：
```javascript
// 目标是画出一条线段，并在两个端点处各放一个圆
var canvas = this.__canvas = new deeptech.Canvas('c'); // 获取画布对象
// 画线：给出起点终点的坐标，顺序为x1，y1，x2，y2，后面跟上其他属性
var deepTechLine1 = new deeptech.Line([110, 110, 210, 210], {
    stroke: '#87cefa',
    strokeWidth: 7
});
// 画圆：给出半径（必要）和其他属性
var deepTechCircle1 = new deeptech.Circle({
    radius: 10,
    left: 100, 
    top: 100,
    fill: '#f00',
    stroke: 'grey',
    strokeWidth: 7
});
var deepTechCircle2 = new deeptech.Circle({
    radius: 10,
    left: 200, 
    top: 200,
    fill: '#f00',
    stroke: 'grey',
    strokeWidth: 7
});
canvas.add(deepTechLine1); // 将对象添到画布上
canvas.add(deepTechCircle1); // 这个添加的顺序就是画布上图层由低到高的顺序
canvas.add(deepTechCircle2); // 即此处顺序从低到高为：线、圆1、圆2
deepTechCircle2.on('moving', function(){ // 监听圆2的moving事件
    deepTechLine1.set({ // 一旦圆2产生了移动，就修改线的终点坐标
        x2: deepTechCircle2.aCoords.tl.x + deepTechCircle2.radius,
        y2: deepTechCircle2.aCoords.tl.y + deepTechCircle2.radius
    });
    canvas.renderAll();
});
```
看起来并没有什么问题，但是在移动的时候出现了大问题：
## **直线并没有随着圆2的移动而改变位置！**
淦（gan4）！看看官方文档再改改吧……<br />
然后发现官方Demo上是监听画布的object:moving事件，即每当画布上的任何元素被移动的时候就会被调用；并且将moving事件的目标 *(即target属性)* 作为进行其他对象的坐标修改对照，而不是直接使用对象名称。
接下来是修改之后的例子：
```javascript
var canvas = this.__canvas = new deeptech.Canvas('c');
var deepTechLine1 = new deeptech.Line([110, 110, 210, 210], {
    stroke: '#87cefa',
    strokeWidth: 7
});
var deepTechCircle1 = new deeptech.Circle({
    radius: 10,
    left: 100, 
    top: 100,
    fill: '#f00',
    stroke: 'grey',
    strokeWidth: 7
});
var deepTechCircle2 = new deeptech.Circle({
    radius: 10,
    left: 200, 
    top: 200,
    fill: '#f00',
    stroke: 'grey',
    strokeWidth: 7
});
canvas.add(deepTechLine1);
canvas.add(deepTechCircle1);
canvas.add(deepTechCircle2);
// 只修改了从这条注释开始以下的地方
canvas.on('object:moving', function(movingEvent){
    deepTechLine1.set({// 这里改用事件对象来获取圆2，而不是直接使用圆2的对象名称
        x2: movingEvent.target.left + deepTechCircle2.radius,
        y2: movingEvent.target.top + deepTechCircle2.radius,
    });
});
```
然后发现全部恢复正常，直线可以随着圆2随意移动

总结：修改坐标的时候永远是以各种各样的事件属性进行修改，而不是对象的属性。

   3. 事件终止<br />
   当我们在使用绘图工具的时候，一般都是直接切换或者会重复点击。这个时候终止上次的事件就是非常必要的。如果不终止，当我点了**橡皮擦**功能了之后又去点**填充**功能的时候，由于橡皮擦事件**并未正常终止**，而是**一直存活在生命周期中**，就会出现**本来是想填充结果把他擦掉了**的现象。原生js中就是强行将事件置为*null*来终止，fabricjs中则有*canvas.off*方法来取消监听。<br />
   下面我们看一段代码：
   ```javascript
$(".tool").click(function() {
    __canvas.off('mouse:down');
    __canvas.off('mouse:move');
	__canvas.off('mouse:up');
    // 获取被选中时的按钮元素的title属性
    if($(this).hasClass('selected')) {
	    __currentTool = $(this).attr('title');
	    if(__currentTool == '铅笔') {
	  	    // 铅笔功能 - 自由画线
	   	    // 其他所有功能在调用的时候都需要首先禁用铅笔功能
	   	    // 否则会在绘制的时候莫名其妙的出现铅笔轨迹
	   	    __canvas.isDrawingMode = true;
	    } else if(__currentTool == '多边形') {
		    	// 多边形功能 - 随意点击生成点，并将点连起来成形
              // 需要监听mouse:down事件和mouse:move事件
		    ljx.util.drawPolygon();
		    __canvas.isDrawingMode = false;
           } else {
               // 其余的都在这通用函数里面
               // 需要监听mouse:down事件和mouse:move事件
		    ljx.util.drawItem();
		    __canvas.isDrawingMode = false;
	    }
	    // 绘画过程中禁止框选
	    __canvas.selection = false;
        // 如果选择了绘画工具，绘完了立马退出
	    return;
    }
	// 如果取消了点击，即未选择任何工具时，将当前工具（全局变量）置空
	__currentTool = null;
	// 此时允许框选
	__canvas.selection = true;
});
   ```