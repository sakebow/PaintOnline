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

   3. 有待更新