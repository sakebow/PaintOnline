/* EDITOR: 柳景兴
 * SUMMARY: This is a file constains some convenient functions & some static values
 * DETAILS:
 * 	1 - value: - some static values
 * 		1.1 - CHECK_RAIDIUS
 * 			  - to check if the distance between this point & where you clicked
 * 				is below a specific value
 *  2 - util: - some functions
 * 		2.1 - drawPoint - serve for drawing polygons
 * 			params:
 * 				event - JSON - get where you clicked,
 * 				fillColor - String - get which color you want fill,
 * 				strokeWidth - Integer - get how wide the line is,
 * 				strokeColor - String - get which color the line is,
 * 				hasControls - Boolean - get if there's control points around elements,
 * 				hasBorders - Boolean - get if there's borders around elements,
 * 				radius - double - get radius of this circle,
 * 				evented - Boolean - get if this element can be the target of events,
 * 				selectable - Boolean - get if this  element can be selected
 * 									   selected - can not do anything if it is false
 * 									   evented  - only can not be caught
 * 												  can be updated by some other ways
 * 		2.2 - linkWithLine - serve for drawing polygons
 * 		2.3 - drawItem - drawing rect, line, ellipse for general purpose
 * 		2.4 - drawRectangle - get a rectangle object
 * 		2.5 - drawCircle - get circle object
 * 		2.6 - drawEllipse - get ellipse object
 * 		2.7 - fill - fill which you click
 * 		2.8 - eraser - erase which you click
 * 		2.9 - drawPolygon - draw circles as key point and link these key point automatically
 * 							then it is a polygon
 * */
// first declare variable
var ljx = {
	"value": {},
	"util": {}
};
// then add static values
ljx.value = {
	"CIRCLE_RADIUS": 10,
	"CHECK_DISTANCE": 10,
	"back": 0,
	"front": 0,
	"words": [{
		"name": "柳",
		"code": [
			[0x10, 0x04, 0x10, 0x03, 0xD0, 0x00, 0xFF, 0xFF, 0x90, 0x00, 0x10, 0x01, 0xFC, 0x8F, 0x04, 0x44],
			[0x02, 0x32, 0xF8, 0x0F, 0x00, 0x00, 0xFC, 0xFF, 0x04, 0x04, 0x04, 0x08, 0xFC, 0x07, 0x00, 0x00]
		]
	}, {
		"name": "景",
		"code": [
			[0x10, 0x04, 0x10, 0x03, 0xD0, 0x00, 0xFF, 0xFF, 0x90, 0x00, 0x10, 0x01, 0xFC, 0x8F, 0x04, 0x44],
			[0x02, 0x32, 0xF8, 0x0F, 0x00, 0x00, 0xFC, 0xFF, 0x04, 0x04, 0x04, 0x08, 0xFC, 0x07, 0x00, 0x00]
		]
	}, {
		"name": "兴",
		"code": [
			[0x80, 0x00, 0x80, 0x80, 0x84, 0x40, 0x88, 0x20, 0xB0, 0x18, 0x81, 0x06, 0x82, 0x00, 0x8C, 0x00],
			[0x80, 0x00, 0xC0, 0x02, 0xA0, 0x04, 0x98, 0x08, 0x87, 0x30, 0x80, 0xC0, 0x80, 0x00, 0x00, 0x00]
		]
	}, {
		"name": "邢",
		"code": [
			[0x80, 0x80, 0x82, 0x40, 0x82, 0x30, 0xFE, 0x0F, 0x82, 0x00, 0x82, 0x00, 0xFE, 0xFF, 0x82, 0x00],
			[0x82, 0x00, 0x80, 0x00, 0xFE, 0xFF, 0x02, 0x08, 0x22, 0x10, 0xDA, 0x08, 0x06, 0x07, 0x00, 0x00]
		]
	}, {
		"name": "文",
		"code": [
			[0x08, 0x80, 0x08, 0x80, 0x08, 0x40, 0x38, 0x40, 0xC8, 0x20, 0x08, 0x11, 0x09, 0x0A, 0x0E, 0x04],
			[0x08, 0x0A, 0x08, 0x11, 0xC8, 0x20, 0x38, 0x40, 0x08, 0x40, 0x08, 0x80, 0x08, 0x80, 0x00, 0x00]
		]
	}, {
		"name": "圣",
		"code": [
			[0x00, 0x01, 0x00, 0x41, 0x02, 0x41, 0x82, 0x44, 0x86, 0x44, 0x4A, 0x44, 0x52, 0x44, 0x22, 0x7F],
			[0x52, 0x44, 0x4A, 0x44, 0x86, 0x44, 0x82, 0x44, 0x00, 0x41, 0x00, 0x41, 0x00, 0x01, 0x00, 0x00]
		]
	}, {
		"name": "王",
		"code": [
			[0x00, 0x40, 0x02, 0x40, 0x82, 0x40, 0x82, 0x40, 0x82, 0x40, 0x82, 0x40, 0x82, 0x40, 0xFE, 0x7F],
			[0x82, 0x40, 0x82, 0x40, 0x82, 0x40, 0x82, 0x40, 0x82, 0x40, 0x02, 0x40, 0x00, 0x40, 0x00, 0x00]
		]
	}, {
		"name": "晨",
		"code": [
			[0x00, 0x80, 0x00, 0x60, 0xC0, 0x1F, 0x5F, 0x04, 0x55, 0xFD, 0x55, 0x85, 0x55, 0x45, 0x55, 0x0D],
			[0x55, 0x15, 0x55, 0x25, 0x55, 0x25, 0x5F, 0x55, 0x40, 0x4D, 0x40, 0x84, 0x00, 0x84, 0x00, 0x00]
		]
	}, {
		"name": "旭",
		"code": [
			[0x10, 0x80, 0x10, 0x60, 0xFF, 0x1F, 0x10, 0x00, 0x10, 0x00, 0xF0, 0x3F, 0x00, 0x40, 0x00, 0x40],
			[0xFE, 0x4F, 0x22, 0x44, 0x22, 0x44, 0x22, 0x44, 0xFE, 0x4F, 0x00, 0x40, 0x00, 0x78, 0x00, 0x00]
		]
	}, {
		"name": "刘",
		"code": [
			[0x08, 0x40, 0x28, 0x20, 0x48, 0x10, 0x89, 0x09, 0x0E, 0x06, 0x88, 0x19, 0x78, 0x60, 0x08, 0x00],
			[0x08, 0x00, 0x00, 0x00, 0xF8, 0x0F, 0x00, 0x40, 0x00, 0x80, 0xFF, 0x7F, 0x00, 0x00, 0x00, 0x00]
		]
	}, {
		"name": "俊",
		"code": [
			[0x00, 0x01, 0x80, 0x00, 0x60, 0x00, 0xF8, 0xFF, 0x07, 0x00, 0x00, 0x80, 0x10, 0x89, 0x98, 0x44],
			[0x54, 0x46, 0x93, 0x2B, 0x10, 0x12, 0x10, 0x2A, 0x54, 0x46, 0x98, 0x80, 0x30, 0x81, 0x00, 0x00]
		]
	}, {
		"name": "洲",
		"code": [
			[0x10, 0x04, 0x60, 0x04, 0x02, 0x7E, 0x8C, 0x01, 0x00, 0x01, 0xC0, 0x80, 0x00, 0x60, 0xFF, 0x1F],
			[0x40, 0x00, 0x80, 0x00, 0xFE, 0x3F, 0x40, 0x00, 0x80, 0x00, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x00]
		]
	}, {
		"name": "袁",
		"code": [
			[0x10, 0x20, 0x10, 0x20, 0x14, 0x10, 0xD4, 0x13, 0x54, 0xFA, 0x54, 0x46, 0x54, 0x22, 0x5F, 0x06],
			[0x54, 0x0A, 0x54, 0x12, 0x54, 0x22, 0xD4, 0x53, 0x14, 0x48, 0x10, 0x84, 0x10, 0x80, 0x00, 0x00]
		]
	}, {
		"name": "嘉",
		"code": [
			[0x02, 0x82, 0x02, 0x4A, 0x0A, 0x2A, 0xEA, 0x1E, 0xAA, 0x0B, 0xAA, 0x4A, 0xAA, 0x8A, 0xAF, 0x7A],
			[0xAA, 0x02, 0xAA, 0xFA, 0xAA, 0x4B, 0xEA, 0x4A, 0x0A, 0x4A, 0x02, 0xFA, 0x02, 0x02, 0x00, 0x00]
		]
	}, {
		"name": "豪",
		"code": [
			[0x00, 0x02, 0x82, 0x01, 0x82, 0xA0, 0xBA, 0xAA, 0xAA, 0xAA, 0xAA, 0x56, 0xAA, 0x56, 0xAB, 0xAA],
			[0xAA, 0xF2, 0xAA, 0x12, 0xAA, 0x2A, 0xBA, 0x22, 0x82, 0x40, 0x82, 0x42, 0x80, 0x01, 0x00, 0x00]
		]
	}, {
		"name": "侯",
		"code": [
			[0x00, 0x01, 0x80, 0x00, 0x60, 0x00, 0xF8, 0xFF, 0x07, 0x84, 0x10, 0x85, 0x92, 0x44, 0xF2, 0x24],
			[0x92, 0x14, 0x92, 0x0F, 0x92, 0x14, 0x92, 0x24, 0x9E, 0x44, 0x10, 0x84, 0x10, 0x84, 0x00, 0x00]
		]
	}, {
		"name": "静",
		"code": [
			[0x44, 0x00, 0x54, 0xFF, 0x54, 0x15, 0x7F, 0x55, 0x54, 0x95, 0x54, 0x7F, 0x44, 0x00, 0x20, 0x09],
			[0x28, 0x49, 0x27, 0x89, 0xE4, 0x7F, 0x34, 0x09, 0x2C, 0x09, 0xE0, 0x1F, 0x00, 0x01, 0x00, 0x00]
		]
	}, {
		"name": "怡",
		"code": [
			[0x80, 0x00, 0x70, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x08, 0x00, 0x10, 0x00, 0x40, 0x00, 0x60, 0xFE],
			[0x50, 0x42, 0x4C, 0x42, 0x43, 0x42, 0x40, 0x42, 0x50, 0x42, 0x60, 0xFE, 0xC0, 0x00, 0x00, 0x00]
		]
	}, {
		"name": "陈",
		"code": [
			[0x00, 0x00, 0xFE, 0xFF, 0x22, 0x04, 0x5A, 0x08, 0x86, 0x07, 0x08, 0x20, 0x88, 0x11, 0x68, 0x0D],
			[0x18, 0x41, 0x0F, 0x81, 0xE8, 0x7F, 0x08, 0x01, 0x08, 0x05, 0x08, 0x09, 0x08, 0x30, 0x00, 0x00]
		]
	}, {
		"name": "雪",
		"code": [
			[0x10, 0x00, 0x0C, 0x00, 0x05, 0x41, 0x55, 0x49, 0x55, 0x49, 0x55, 0x49, 0x05, 0x49, 0x7F, 0x49],
			[0x05, 0x49, 0x55, 0x49, 0x55, 0x49, 0x55, 0x49, 0x05, 0xFF, 0x14, 0x00, 0x0C, 0x00, 0x00, 0x00]
		]
	}, {
		"name": "刘",
		"code": [
			[0x08, 0x40, 0x28, 0x20, 0x48, 0x10, 0x89, 0x09, 0x0E, 0x06, 0x88, 0x19, 0x78, 0x60, 0x08, 0x00],
			[0x08, 0x00, 0x00, 0x00, 0xF8, 0x0F, 0x00, 0x40, 0x00, 0x80, 0xFF, 0x7F, 0x00, 0x00, 0x00, 0x00]
		]
	}, {
		"name": "楚",
		"code": [
			[0x40, 0x80, 0x44, 0x41, 0x24, 0x21, 0x14, 0x1D, 0x7F, 0x21, 0x14, 0x41, 0x24, 0x41, 0x00, 0x7F],
			[0x24, 0x49, 0x14, 0x49, 0x7F, 0x49, 0x14, 0x49, 0x24, 0x49, 0x44, 0x43, 0x00, 0x40, 0x00, 0x00]
		]
	}, {
		"name": "雄",
		"code": [
			[0x00, 0x04, 0x08, 0x23, 0xC8, 0x70, 0x38, 0x2C, 0x8F, 0x23, 0x08, 0x28, 0x28, 0x70, 0x10, 0x00],
			[0xFC, 0xFF, 0x4B, 0x22, 0x48, 0x22, 0xF9, 0x3F, 0x4A, 0x22, 0x48, 0x22, 0x08, 0x20, 0x00, 0x00]
		]
	}, {
		"name": "常",
		"code": [
			[0x20, 0x00, 0x18, 0x00, 0x08, 0x3E, 0xEA, 0x02, 0xAC, 0x02, 0xA8, 0x02, 0xA8, 0x02, 0xAF, 0xFF],
			[0xA8, 0x02, 0xA8, 0x02, 0xAC, 0x12, 0xEA, 0x22, 0x08, 0x1E, 0x28, 0x00, 0x18, 0x00, 0x00, 0x00]
		]
	}, {
		"name": "思",
		"code": [
			[0x00, 0x40, 0x00, 0x38, 0xFE, 0x01, 0x92, 0x00, 0x92, 0x3C, 0x92, 0x40, 0x92, 0x40, 0xFE, 0x42],
			[0x92, 0x4C, 0x92, 0x40, 0x92, 0x40, 0x92, 0x70, 0xFE, 0x05, 0x00, 0x08, 0x00, 0x30, 0x00, 0x00]
		]
	}, {
		"name": "攀",
		"code": [
			[0xA4, 0x04, 0x94, 0x24, 0xFF, 0x22, 0x94, 0x2A, 0xA4, 0x29, 0x80, 0x2A, 0xD5, 0xAA, 0xA2, 0xFE],
			[0xD5, 0x2A, 0x80, 0x2A, 0xA4, 0x29, 0x94, 0x2A, 0xFF, 0x22, 0x94, 0x24, 0xA4, 0x04, 0x00, 0x00]
		]
	}]
}
// and some general interfaces
ljx.util.drawPoint = function(event, fillColor, strokeWidth, strokeColor, hasControls, hasBorders, radius, evented, selectable) {
	// get a circle object use as point. - in fact this is for polygon
	// specially, the radius of this circle is stable
	// 		everyone except programmer is not able to change it
	return new deeptech.Circle({
		left: parseInt(event.pointer.x) - ljx.value.CIRCLE_RADIUS,
		top: parseInt(event.pointer.y) - ljx.value.CIRCLE_RADIUS,
		fill: fillColor,
		strokeWidth: strokeWidth,
		stroke: strokeColor,
		hasControls: hasControls,
		hasBorders: hasBorders,
		radius: radius,
		evented: evented,
		selectable: selectable
	});
}
ljx.util.linkWithLine = function(start, end, fillColor, strokeWidth, strokeColor, hasControls, hasBorders, evented, selectable) {
	// get a straight line object - in fact, this is for polygon
	// specially, this straight line is not created by dragging manually, but automatically
	return new deeptech.Line([start.x, start.y, end.x, end.y], {
		fill: fillColor,
		stroke: strokeColor,
		strokeWidth: strokeWidth,
		selectable: selectable,
		evented: evented,
		hasBorders: hasControls,
		hasControls: hasControls
	})
}
// draw items we choose - including rect, ellipse, circle, straight line and so on.
ljx.util.drawItem = function() {
	// flag - to inform when can you draw
	let canYouDraw = false;
	// get current object. if this object is going to appear twice or more, then remove the last one
	let currentObj = null;
	// store start position
	let startPoint = {
		x: 0,
		y: 0
	};
	// store end position
	let endPoint = {
		x: 0,
		y: 0
	};
	// 当确认当前工具为橡皮的时候， 开始清除图源
	if(__currentTool == "橡皮") {
		// 点击选中的部分才能触发
		__canvas.on('mouse:down', function() {
			// 获取选中的所有元素（一个也算）
			__canvas.getActiveObjects().forEach(function(item) {
				// 从画布上移出该元素
				__canvas.remove(item);
			});
			// 刷新画布
			__canvas.renderAll();
		});
	} else if(__currentTool == '填充') {
		// 当确认当前工具为填充工具的时候，开始填充图源
		__canvas.on('mouse:down', function(downEvent) {
			// listen mouse:down event
			// if you clicked an object but not canvas, this object will be filled with different color
			if(downEvent.target !== null) {
				ljx.util.fill()
			}
		});
	}
	// listen mouse:down event to update start position
	__canvas.on('mouse:down', function(downEvent) {
		ljx.value.back = ljx.value.front = 0;
		startPoint = {
			x: downEvent.pointer.x,
			y: downEvent.pointer.y
		};
		// if what you clicked is not canvas, then you can not draw
		if(downEvent.target !== null) {
			canYouDraw = false;
		} else {
			// else if what you clicked is just canvas, do whatever you want
			canYouDraw = true;
		}
	});
	__canvas.on('mouse:move', function(moveEvent) {
		// if current object is going to appear twice, then just remove the last one
		if(currentObj) {
			__canvas.remove(currentObj);
		}
		// you can not draw when 'flag' is false
		if(canYouDraw == false) {
			return;
		}
		// end position is updated whenever you moved your mouse
		endPoint = {
			x: moveEvent.pointer.x,
			y: moveEvent.pointer.y
		};
		// commands above is generally useful for rect, ellipse, line
		switch(__currentTool) {
			case '矩形':
				currentObj = ljx.util.drawRectangle(startPoint, endPoint, __lineWidth, __color, __fillColor, true, true, true, true);
				break;
			case '椭圆':
				currentObj = ljx.util.drawEllipse(startPoint, endPoint, __lineWidth, __color, __fillColor, true, true, true, true);
				break;
			case '直线':
				if(__lineHelp == true) {
					let k = Math.abs((endPoint.y - startPoint.y) / (endPoint.x - startPoint.x));
					if(k < 0.1) {
						endPoint.y = startPoint.y;
					} else if(k > 10) {
						endPoint.x = startPoint.x;
					}
				}
				currentObj = ljx.util.drawLine(startPoint, endPoint, __lineWidth, __color, __fillColor, true, true, true, true, __lineStyle);
				break;
			case '圆角矩形':
				currentObj = ljx.util.drawRoundRectangle(startPoint, endPoint, __lineWidth, __color, __fillColor, true, true, true, true, __roundX, __roundY);
				break;
			case '文字':
				// for text, color to fill makes up the most but color to stroke makes up the least
				// so fillColor is the same as strokeColor
				currentObj = ljx.util.appendText(startPoint, __lineWidth * 10, __color, __color, true, true, true, true, 0, 0)
				break;
				/*case '圆弧':
				console.log('圆弧')
					bLine();
					return;*/
				// if what you choose is none of above, then exit to avoid unexpected errors
			default:
				return;
		}
		// add rect, ellipse, line or something else into canvas
		__canvas.add(currentObj);
		// 当使用文字的时候能够立马开始输入文字进行编辑
		if(__currentTool == '文字') {
			currentObj.enterEditing();
			currentObj.hiddenTextarea.focus();
		}
	});
	__canvas.on('mouse:up', function(moveEvent) {
		// when you release your mouse, stop drawing and clear current object for further use
		canYouDraw = false;
		//		console.log(currentObj);
		if(currentObj !== null) {
			grids.push({
				x: currentObj.aCoords.tl.x,
				y: currentObj.aCoords.tl.y
			});
			grids.push({
				x: currentObj.aCoords.tr.x,
				y: currentObj.aCoords.tr.y
			});
			grids.push({
				x: currentObj.aCoords.bl.x,
				y: currentObj.aCoords.bl.y
			});
			grids.push({
				x: currentObj.aCoords.br.x,
				y: currentObj.aCoords.br.y
			});
		}
		xlines.length = ylines.length = 0;
		if(grids.length > 4) {
			for(let i = 0; i < grids.length; i++) {
				xlines.push({
					obj: new deeptech.Line([grids[i].x, 0, grids[i].x, canvas_height], {
						strokeWidth: 1,
						stroke: 'rgba(0,0,0,0.3)',
						strokeDashArray: [15, 5]
					}),
					flag: 0
				});
				ylines.push({
					obj: new deeptech.Line([0, grids[i].y, canvas_width, grids[i].y], {
						strokeWidth: 1,
						stroke: 'rgba(0,0,0,0.3)',
						strokeDashArray: [15, 5]
					}),
					flag: 0
				});
			}
		}
		currentObj = null;
		__canvasStack.push(__canvas.toJSON());
	});
}
ljx.util.drawRectangle = function(startPoint, endPoint, strokeWidth, strokeColor, fillColor, hasControls, hasBorders, evented, selectable) {
	// get a rectangle object
	return new deeptech.Rect({
		top: startPoint.y,
		left: startPoint.x,
		width: endPoint.x - startPoint.x,
		height: endPoint.y - startPoint.y,
		fill: 'red',
		strokeWidth: strokeWidth,
		stroke: strokeColor,
		fill: fillColor,
		hasControls: hasControls,
		hasBorders: hasBorders,
		evented: evented,
		selectable: selectable,
		centeredRotation: true
	});
}
ljx.util.drawCircle = function(startPoint, endPoint, strokeWidth, strokeColor, fillColor, hasControls, hasBorders, evented, selectable, startAngle, endAngle) {
	// get a circle object
	// especially, if your mouse moves top-left while drawing a circle
	// 		we will help you to update start position of this circle for better use
	let left = startPoint.x < endPoint.x ? startPoint.x : endPoint.x;
	let top = startPoint.y < endPoint.y ? startPoint.y : endPoint.y;
	return new deeptech.Circle({
		left: left,
		top: top,
		radius: (endPoint.y - startPoint.y) / 2,
		fill: fillColor,
		strokeWidth: strokeWidth,
		stroke: strokeColor,
		hasControls: hasControls,
		hasBorders: hasBorders,
		evented: true,
		selectable: true,
		centeredRotation: true,
		startAngle: startAngle,
		endAngle: endAngle
	});
}
ljx.util.drawEllipse = function(startPoint, endPoint, strokeWidth, strokeColor, fillColor, hasControls, hasBorders, evented, selectable) {
	// get a ellipse object
	// especially, if your mouse moves top-left while drawing an ellipse
	// 		we will help you to update start position of this ellipse for better use
	// and also we will make ellipses smaller for you to better handle it.
	let left = startPoint.x < endPoint.x ? startPoint.x : endPoint.x;
	let top = startPoint.y < endPoint.y ? startPoint.y : endPoint.y;
	return new deeptech.Ellipse({
		left: left,
		top: top,
		originX: "left",
		originY: "top",
		rx: Math.abs(endPoint.x - startPoint.x) / 2,
		ry: Math.abs(endPoint.y - startPoint.y) / 2,
		fill: fillColor,
		stroke: strokeColor,
		strokeWidth: strokeWidth,
		hasControls: hasControls,
		hasBorders: hasBorders,
		evented: true,
		selectable: true,
		centeredRotation: true
	})
}
ljx.util.fill = function() {
	// 获取选中的所有元素（一个也算）
	__canvas.getActiveObjects().forEach(function(item) {
		// 设置该元素的属性
		item.set({
			fill: __color
		});
	});
	// !!! - CAUTION - !!! remember renderAll to refresh canvas after fill
	__canvas.renderAll();
}
ljx.util.eraser = function() {
	// 获取选中的所有元素（一个也算）
	__canvas.getActiveObjects().forEach(function(item) {
		__canvas.remove(item);
	});
	__canvas.renderAll();
}
ljx.util.drawLine = function(startPoint, endPoint, strokeWidth, strokeColor, fillColor, hasControls, hasBorders, evented, selectable, lineStyle) {
	// get a line object
	if(lineStyle == 1) {
		return new deeptech.Line([startPoint.x, startPoint.y, endPoint.x, endPoint.y], {
			stroke: __color,
			strokeWidth: __lineWidth
		});
	} else {
		return new deeptech.Line([startPoint.x, startPoint.y, endPoint.x, endPoint.y], {
			stroke: __color,
			strokeWidth: __lineWidth,
			strokeDashArray: lineStyle
		});
	}

}
ljx.util.drawPolygon = function() {
	// to store key point of every polygon
	let circles = [];
	// to store key point of all polygon
	let polygonPoints = [];
	// to store all lines of all polygon
	let polygonLines = [];
	// listen object:moving event
	// if you click key point, the key point will be dragged with your mouse
	// and coordinates of lines associated with this point will be updated too
	__canvas.on('object:moving', function(movingEvent) {
		// every point is under spy
		for(let i = 0; i < polygonPoints.length; i++) {
			// if you clicked one of these points
			if(movingEvent.target == polygonPoints[i]) {
				// the last line and  the first line are associated with the first point
				if(i == 0) {
					polygonLines[i].set({
						x1: movingEvent.target.left + ljx.value.CIRCLE_RADIUS,
						y1: movingEvent.target.top + ljx.value.CIRCLE_RADIUS,
						x2: polygonPoints[i + 1].aCoords.tl.x + ljx.value.CIRCLE_RADIUS,
						y2: polygonPoints[i + 1].aCoords.tl.y + ljx.value.CIRCLE_RADIUS
					});
					polygonLines[polygonLines.length - 1].set({
						x1: polygonPoints[polygonLines.length - 1].aCoords.tl.x + ljx.value.CIRCLE_RADIUS,
						y1: polygonPoints[polygonLines.length - 1].aCoords.tl.y + ljx.value.CIRCLE_RADIUS,
						x2: movingEvent.target.left + ljx.value.CIRCLE_RADIUS,
						y2: movingEvent.target.top + ljx.value.CIRCLE_RADIUS
					});
				} else if(i != polygonPoints.length - 1) {
					// the ist. line and the (i - 1)st. line are associated with the ist. point
					polygonLines[i].set({
						x1: movingEvent.target.left + ljx.value.CIRCLE_RADIUS,
						y1: movingEvent.target.top + ljx.value.CIRCLE_RADIUS,
						x2: polygonPoints[i + 1].aCoords.tl.x + ljx.value.CIRCLE_RADIUS,
						y2: polygonPoints[i + 1].aCoords.tl.y + ljx.value.CIRCLE_RADIUS
					});
					polygonLines[i - 1].set({
						x1: polygonPoints[i - 1].aCoords.tl.x + ljx.value.CIRCLE_RADIUS,
						y1: polygonPoints[i - 1].aCoords.tl.y + ljx.value.CIRCLE_RADIUS,
						x2: movingEvent.target.left + ljx.value.CIRCLE_RADIUS,
						y2: movingEvent.target.top + ljx.value.CIRCLE_RADIUS
					});
				} else {
					// the last two line are associated with the last point
					polygonLines[i].set({
						x1: movingEvent.target.left + ljx.value.CIRCLE_RADIUS,
						y1: movingEvent.target.top + ljx.value.CIRCLE_RADIUS,
						x2: polygonPoints[0].aCoords.tl.x + ljx.value.CIRCLE_RADIUS,
						y2: polygonPoints[0].aCoords.tl.y + ljx.value.CIRCLE_RADIUS
					});
					polygonLines[i - 1].set({
						x1: polygonPoints[i - 1].aCoords.tl.x + ljx.value.CIRCLE_RADIUS,
						y1: polygonPoints[i - 1].aCoords.tl.y + ljx.value.CIRCLE_RADIUS,
						x2: movingEvent.target.left + ljx.value.CIRCLE_RADIUS,
						y2: movingEvent.target.top + ljx.value.CIRCLE_RADIUS
					});
				}
				// what deserves to mention is that:
				// 		we better get point object using event.target, but not itself
				// 		it is useless if you use the name of variable to update other objects
			}
		}
	});

	__canvas.on('mouse:down', function(downEvent) {
		// check if you are still using polygon tool
		// if not, you can not click to draw a circle as key point
		if(__currentTool == '多边形') {
			if(downEvent.target === null) {
				// if clicked nothing, draw a circle
				let circle = ljx.util.drawPoint(downEvent, 'rgba(255, 0, 0, 0.75)', 1, 'lightgrey', false, false, ljx.value.CIRCLE_RADIUS, true, true);
				// store for every single polygon
				circles.push(circle);
				// store for all polygon
				polygonPoints.push(circle);
				// add this circle into canvas
				__canvas.add(circle);
				// if there's more than 2 circles, draw lines between circles
				if(circles.length > 1) {
					let end = {
						x: circles[circles.length - 1].aCoords.tl.x + ljx.value.CIRCLE_RADIUS,
						y: circles[circles.length - 1].aCoords.tl.y + ljx.value.CIRCLE_RADIUS
					};
					let start = {
						x: circles[circles.length - 2].aCoords.tl.x + ljx.value.CIRCLE_RADIUS,
						y: circles[circles.length - 2].aCoords.tl.y + ljx.value.CIRCLE_RADIUS
					};
					// create a line automatically
					// start, end, fillColor, strokeWidth, strokeColor, hasControls, hasBorders, evented, selectable
					let line = ljx.util.linkWithLine(start, end, '#000', __lineWidth, __color, false, false, false, true);
					polygonLines.push(line);
					__canvas.add(line);
				}
			} else if(circles.length > 0 && downEvent.target === circles[0]) {
				// if clicked the first circle, end drawing polygon
				let start = {
					x: circles[circles.length - 1].aCoords.tl.x + ljx.value.CIRCLE_RADIUS,
					y: circles[circles.length - 1].aCoords.tl.y + ljx.value.CIRCLE_RADIUS
				};
				let end = {
					x: circles[0].aCoords.tl.x + ljx.value.CIRCLE_RADIUS,
					y: circles[0].aCoords.tl.y + ljx.value.CIRCLE_RADIUS
				};
				let line = ljx.util.linkWithLine(start, end, __fillColor, __lineWidth, __color, false, false, false, true);
				// add line into canvas
				__canvas.add(line);
				// store lines for all polygon
				polygonLines.push(line);
				// clear circles array, to start a new polygon
				circles.length = 0;
			}
		}
	});
}
// 画圆角矩形
ljx.util.drawRoundRectangle = function(startPoint, endPoint, strokeWidth, strokeColor, fillColor, hasControls, hasBorders, evented, selectable, rx, ry) {
	// get a rectangle object
	return new deeptech.Rect({
		top: startPoint.y,
		left: startPoint.x,
		width: endPoint.x - startPoint.x,
		height: endPoint.y - startPoint.y,
		fill: 'red',
		strokeWidth: strokeWidth,
		stroke: strokeColor,
		fill: fillColor,
		hasControls: hasControls,
		hasBorders: hasBorders,
		evented: evented,
		selectable: selectable,
		rx: rx,
		ry: ry,
		centeredRotation: true
	});
}
// 向画布上添加图片
ljx.util.appendImg = function(result) {
	deeptech.Image.fromURL(result, function(img) {
		img.scale(0.5).set({
			left: 100,
			top: 100,
			centeredRotation: true
		});
		__canvas.add(img).setActiveObject(img);
	});
	$('#file').unbind('change')
}
// 向图源中添加图片
ljx.util.fillImage = function(result) {
	deeptech.util.loadImage(result, function(img) {
		if(__canvas.getActiveObject() != null) {
			console.log(__canvas.getActiveObject());
			__canvas.getActiveObject().set({
				'fill': new deeptech.Pattern({
					source: img
				}),
				centeredRotation: true
			});
			__canvas.renderAll();
		} else {
			alert("当前没有被选中的对象！");
		}
	});
	$('#file').unbind('change')
}
// 添加文字
ljx.util.appendText = function(startPoint, strokeWidth, strokeColor, fillColor, hasControls, hasBorders, evented, selectable, rx, ry) {
	return new deeptech.Textbox("", {
		left: startPoint.x - 60,
		top: startPoint.y - 20,
		width: 150,
		fontSize: strokeWidth,
		fill: __color,
		hasControls: true,
		borderColor: "#2c2c2c",
		color: __color
	});
}
// 撤销
ljx.util.getBack = function() {
	// 点击恢复按钮次数归零
	ljx.value.front = 0;
	// 当画布元素栈内什么都没有的时候，加载最初画布
	if(__canvasStack.length == 0) {
		__canvas.loadFromJSON(__init, () => {
			__canvas.renderAll();
		});
		// 将最初的样子压栈，保持能够回溯到最初的样子
		__canvasStack.push(__init);
		// 弹窗提示
		layer.msg('已经是初始状态了！', {
			icon: 1
		});
	} else {
		// 当第一次点击撤销按钮的时候，首先将栈顶弹出并压入历史记录栈
		if(ljx.value.back == 0) {
			__historyStack.push(__canvasStack.pop());
		}
		// 撤销按钮点击次数增加
		ljx.value.back++;
		// 再才弹出上一个
		let currentState = __canvasStack.pop();
		__canvas.loadFromJSON(currentState, () => {
			__canvas.renderAll();
		});
		__historyStack.push(currentState);
	}
	console.log(__canvasStack.length);
}
ljx.util.getFront = function() {
	ljx.value.back = 0;
	console.log(__historyStack)
	if(__historyStack.length == 0) {
		layer.msg('已经是初始状态了！', {
			icon: 1
		});
	} else {
		if(ljx.value.front == 0) {
			__canvasStack.push(__historyStack.pop());
		}
		ljx.value.front++;
		let currentState = __historyStack.pop();
		__canvas.loadFromJSON(currentState, () => {
			__canvas.renderAll();
		});
		__canvasStack.push(currentState);
	}
}
// 清除画布中所有内容
ljx.util.clearCanvas = function() {
	__canvas.clear();
	grids.length = 0;
}
// 清除浏览器缓存
ljx.util.clearStorage = function() {
	// 询问是否清空缓存
	layer.confirm('确定清空缓存？清空后您将丢失存档', {
		btn: ['确定', '取消'], //按钮
		icon: 3
	}, function() {
		// 确定清空
		localStorage.setItem('savedImage', null);
		layer.msg('已清空', {
			icon: 1
		});
	}, function() {
		// 否则什么都不做
	});
}
// 保存当前画布状态
ljx.util.saveCanvas = function() {
	// 确定保存
	if(typeof(Storage) !== "undefined") {
		localStorage.setItem('savedImage', JSON.stringify(__canvas.toJSON()));
	}
	layer.msg('已保存，下次启动将从当前状态开始', {
		icon: 1
	});
}
// 自动从上次保存开始
ljx.util.loadStorage = function() {
	if(typeof(Storage !== "undefined")) {
		if(localStorage.getItem('savedImage') != 'null') {
			layer.msg('检测到本地存储，已恢复上次保存', {
				icon: 1
			});
			__canvas.loadFromJSON(localStorage.getItem('savedImage'));
		}
	}
}
ljx.util.align = function() {
	__canvas.on({
		'object:moving': onChange,
		'object:scaling': onChange,
		'object:rotating': onChange,
	});
	var target = null;
	__canvas.on('mouse:down', function(downEvent) {
		target = downEvent.target;
		__canvas.on('mouse:move', function() {
			if(target !== null && xlines.length > 0 && ylines.length > 0) {
				for(let i = 0; i < grids.length; i++) {
					let dx = Math.abs(target.aCoords.tl.x - grids[i].x);
					let dy = Math.abs(target.aCoords.tl.y - grids[i].y);
					if(dx < ljx.value.CHECK_DISTANCE) {
						if(xlines[i].flag == 0) {
							__canvas.add(xlines[i].obj);
							xlines[i].flag = 1;
						}
						target.set({
							left: grids[i].x
						});
					} else {
						__canvas.remove(xlines[i].obj);
						xlines[i].flag = 0;
					}

					if(dy < ljx.value.CHECK_DISTANCE) {
						if(ylines[i].flag == 0) {
							__canvas.add(ylines[i].obj);
							ylines[i].flag = 1;
						}
						target.set({
							top: grids[i].y
						});
					} else {
						__canvas.remove(ylines[i].obj);
						ylines[i].flag = 0;
					}
				}
			}
		});
	});

	function onChange(options) {
		var canMove = true;
		if(canMove) {
			options.target.setCoords();
		}
		__canvas.forEachObject(function(obj) {
			if(obj === options.target) return;
			obj.set('opacity', options.target.intersectsWithObject(obj) ? 0.5 : 1);
		});
	}
	__canvas.on('mouse:up', function() {
		xlines.forEach(function(item) {
			__canvas.remove(item.obj);
		});
		ylines.forEach(function(item) {
			__canvas.remove(item.obj);
		});
		target = null;
	});
}
ljx.util.leftAlign = function() {
	__canvas.getObjects().forEach(function(item) {
		item.set({
			left: 100
		});
	});
	__canvas.renderAll();
}
ljx.util.rightAlign = function() {
	__canvas.getObjects().forEach(function(item) {
		item.set({
			left: canvas_width - 100 - item.width
		});
	});
	__canvas.renderAll();
}
ljx.util.centerAlign = function() {
	__canvas.getObjects().forEach(function(item) {
		item.set({
			left: (canvas_width - item.width) / 2
		});
	});
	__canvas.renderAll();
}
ljx.util.filp = function() {
	layer.confirm('对称方向', {
		btn: ['X', 'Y'],
		icon: 3
	}, function(index) {
		if(__canvas.getActiveObjects().length === 0) {
			layer.msg('当前没有选中任何对象！', {
				icon: 0
			});
		} else {
			__canvas.getActiveObjects().forEach(function(item) {
				console.log('x - ' + item.flipX);
				item.set({
					flipX: true
				});
				console.log('x - ' + item.flipX);
			});
		}
		layer.close(index);
	}, function(index) {
		__canvas.getActiveObjects().forEach(function(item) {
			console.log('y - ' + item.flipY);
			item.set({
				flipY: true
			});
		});
		layer.close(index);
	});
}
ljx.util.saveImage = function() {
	layer.confirm('保存格式', {
		btn: ['PNG', 'JPG', '取消'], //按钮
		icon: 3
	}, function() {
		layer.msg('下载成功', {
			icon: 1
		});
		download(saveAs('PNG'));
	}, function() {
		layer.msg('下载成功', {
			icon: 1
		});
		download(saveAs('JPG'));
	}, function() {});

	function saveAs(form) {
		return __canvas.toDataURL("image/" + form);
	}

	function download(url) {
		var oA = document.createElement("a");
		oA.download = ''; // 设置下载的文件名，默认是'下载'
		oA.href = url;
		document.body.appendChild(oA);
		oA.click();
		oA.remove(); // 下载之后把创建的元素删除
	}
}