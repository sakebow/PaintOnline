canvas_width = $('#right').innerWidth();
canvas_height = $('#right').innerHeight();
document.getElementById('lowc').width = canvas_width;
document.getElementById('lowc').height = canvas_height;
var bLine = function(){
	__canvas.off('mouse:down');
	__canvas.off('mouse:up');
	__canvas.off('mouse:move');
	var canvas = document.getElementById('lowc')
	var ctx = canvas.getContext('2d')
	var t = 0 //贝塞尔函数涉及的占比比例，0<=t<=1
	var clickNodes = [] //点击的控制点对象数组
	var bezierNodes = [] //绘制内部控制点的数组
	var isPrinted = false //当前存在绘制的曲线
	var isPrinting = false //正在绘制中
	var num = 0 //控制点数
	var isDrag = false //是否进入拖拽行为
	var isDragNode = false //是否点击到了控制点
	var dragIndex = 0 //被拖拽的点的索引
	var clickon = 0 //鼠标按下时间戳
	var clickoff = 0 //鼠标抬起
__canvas.on('mouse:down',function(e){
	isDrag = true
    clickon = new Date().getTime()
    var diffLeft = e.pointer.x,
        diffTop = e.pointer.y,
        clientX = 0,
        clientY = 0,
        x = diffLeft,
        y = diffTop
    clickNodes.forEach(function(item, index) {
        var absX = Math.abs(item.x - x),
            absY = Math.abs(item.y - y)
        if(absX < 5 && absY < 5) {     //小于预值判定控制点被选中
            isDragNode = true
            dragIndex = index
        }
    })
})
__canvas.on('mouse:move',function(e){
	if(isDrag && isDragNode) {
        var diffLeft = e.pointer.x,
        diffTop = e.pointer.y,
        clientX = 0,
        clientY = 0,
        x = diffLeft,
        y =  diffTop
        clickNodes[dragIndex] = {   //更新被拖拽的控制点
            x: x,
            y: y
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height)   //刷新画布
        clickNodes.forEach(function(item, index) {
            var x = item.x,
                y = item.y,
                i = parseInt(index, 10) + 1
//          ctx.fillText("p" + i, x, y + 20)
//          ctx.fillText("p" + i + ': ('+ x +', '+ y +')', 10, i * 20)
            ctx.beginPath()
            ctx.arc(x, y, 4, 0, Math.PI * 2, false)
            ctx.fill()
            ctx.beginPath()
            ctx.moveTo(startX, startY)
//          ctx.lineTo(x, y)
            ctx.strokeStyle = '#696969'
//          ctx.stroke()
            if (index) {
                var startX = clickNodes[index - 1].x,
                    startY = clickNodes[index - 1].y
                ctx.beginPath()
                ctx.moveTo(startX, startY)
//              ctx.lineTo(x, y)
//              ctx.stroke()
            }
        })
        if(isPrinted) {          //每次移动控制点时，重绘曲线
            var bezierArr = []
            for(i = 0; i < 1; i+=0.01) {
                bezierArr.push(bezier(clickNodes, i))
            }
            bezierArr.forEach(function(obj, index) {
                if (index) {
                    var startX = bezierArr[index - 1].x,
                        startY = bezierArr[index - 1].y,
                        x = obj.x,
                        y = obj.y
                    ctx.beginPath()
                    ctx.moveTo(startX, startY)
                    ctx.lineTo(x, y)
                    ctx.strokeStyle = 'red'
                    ctx.stroke()	
                }
            })
        }
    }
})
__canvas.on('mouse:up',function(e){   
	isDrag = false
    isDragNode = false
    clickoff = new Date().getTime()
    if(clickoff - clickon < 200) {
        var diffLeft = e.pointer.x,
        diffTop = e.pointer.y,
        clientX = 0,
        clientY = 0,
        x =diffLeft,
        y = diffTop
        if(!isPrinted && !isDragNode) {
            num++
            var ctx = canvas.getContext('2d')
            ctx.font = "16px Microsoft YaHei";
            ctx.fillStyle = '#696969'
            ctx.fillText("p" + num, x, y + 20);
//          ctx.fillText("p" + num + ': ('+ x +', '+ y +')', 10, num * 20)
            ctx.beginPath()
            ctx.arc(x, y, 4, 0, Math.PI * 2, false)
            ctx.fill()
            if(clickNodes.length) {
                var startX = clickNodes[clickNodes.length - 1].x,
                    startY = clickNodes[clickNodes.length - 1].y
                ctx.beginPath() 
                ctx.moveTo(startX, startY)
//              ctx.lineTo(x, y)
                ctx.strokeStyle = '#696969'
//              ctx.stroke()
            } 
            clickNodes.push({
                x: x,
                y: y
            })
        }
    }
})
$('#print').click(function() {    //点击按钮，开始绘制
    if(!num) return
    if(!isPrinting) {
        isPrinted = true
        drawBezier(ctx, clickNodes)
    }
})
$('#clear').click(function() {  //点击按钮，清空画布
    if(!isPrinting) {
        isPrinted = false
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        clickNodes = []
        bezierNodes = []
        t = 0
        num = 0
    }
})

function drawBezier(ctx, origin_nodes) {   //曲线绘制
    if(t > 1) {    //判断阶数
        isPrinting = false
        return
    }
    isPrinting = true
    var nodes = origin_nodes
    t += 0.01
    //ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawnode(nodes)
    window.requestAnimationFrame(drawBezier.bind(this, ctx, nodes))
}
function drawnode(nodes) {
    if(!nodes.length) return
    var _nodes = nodes
    var next_nodes = []
    _nodes.forEach(function(item, index) {
        var x = item.x,
            y = item.y    
        if(_nodes.length === num) {
            ctx.font = "16px Microsoft YaHei"
            var i = parseInt(index, 10) + 1
        }
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2, false)
//      ctx.fill()
        if(_nodes.length === 1) {
            bezierNodes.push(item)
            if(bezierNodes.length > 1) {
                bezierNodes.forEach(function (obj, i) {
                    if (i) {
                        var startX = bezierNodes[i - 1].x,
                            startY = bezierNodes[i - 1].y,
                            x = obj.x,
                            y = obj.y
                        ctx.beginPath()
                        ctx.moveTo(startX, startY)
                        ctx.lineTo(x, y)
                        ctx.strokeStyle = 'red'
                        ctx.stroke()
                    }
                })
            }
        }
        if(index) {
            var startX = _nodes[index - 1].x,
                startY = _nodes[index - 1].y
            ctx.beginPath()
            ctx.moveTo(startX, startY)
//          ctx.lineTo(x, y)
            ctx.strokeStyle = '#696969'
//          ctx.stroke()
        }
    })  
    if(_nodes.length) {
        for(var i = 0; i < _nodes.length - 1; i++) {
            var arr = [{
                x: _nodes[i].x,
                y: _nodes[i].y
            }, {
                x: _nodes[i + 1].x,
                y: _nodes[i + 1].y 
            }]
            next_nodes.push(bezier(arr, t))
        }
        drawnode(next_nodes)
    }

}
function factorial(num) { //递归阶乘
    if (num <= 1) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }
}

function bezier(arr, t) { //通过各控制点与占比t计算当前贝塞尔曲线上的点坐标
    var x = 0,
        y = 0,
        n = arr.length - 1
    arr.forEach(function(item, index) {
        if(!index) {
            x += item.x * Math.pow(( 1 - t ), n - index) * Math.pow(t, index) 
            y += item.y * Math.pow(( 1 - t ), n - index) * Math.pow(t, index) 
        } else {
            x += factorial(n) / factorial(index) / factorial(n - index) * item.x * Math.pow(( 1 - t ), n - index) * Math.pow(t, index) 
            y += factorial(n) / factorial(index) / factorial(n - index) * item.y * Math.pow(( 1 - t ), n - index) * Math.pow(t, index) 
        }
    })
    return {
        x: x,
        y: y
    }
}
var getRandomColor = function(){
      return '#'+Math.floor(Math.random()*16777215).toString(16);
}
}
