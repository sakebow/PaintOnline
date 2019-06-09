function Copy() {
	// clone what are you copying since you
	// may want copy and paste on different moment.
	// and you do not want the changes happened
	// later to reflect on the copy.
	__canvas.getActiveObject().clone(function(cloned) {
		_clipboard = cloned;
	});
}

function Paste() {
	// clone again, so you can do multiple copies.
	_clipboard.clone(function(clonedObj) {
		__canvas.discardActiveObject();
		clonedObj.set({
			left: clonedObj.left + 10,
			top: clonedObj.top + 10,
			evented: true,
		});
		if(clonedObj.type === 'activeSelection') {
			// active selection needs a reference to the canvas.
			clonedObj.canvas = __canvas;
			clonedObj.forEachObject(function(obj) {
				__canvas.add(obj);
			});
			// this should solve the unselectability
			clonedObj.setCoords();
		} else {
			__canvas.add(clonedObj);
		}
		_clipboard.top += 10;
		_clipboard.left += 10;
		__canvas.setActiveObject(clonedObj);
		__canvas.requestRenderAll();
	});
}