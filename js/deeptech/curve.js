function curve() {
	if(__currentTool == '曲线') {
		__canvas.on({
			'object:selected': onObjectSelected,
			'object:moving': onObjectMoving,
			'before:selection:cleared': onBeforeSelectionCleared
		});

		(function drawQuadratic() {

			// deeptech.Object.prototype.originX = deeptech.Object.prototype.originY = 'center';

			var line = new deeptech.Path('M 65 10 Q 42, 0, 10, 10', {
				fill: '',
				stroke: 'black',
				objectCaching: false
			});

			line.path[0][1] = 100;
			line.path[0][2] = 100;

			line.path[1][1] = 200;
			line.path[1][2] = 200;

			line.path[1][3] = 300;
			line.path[1][4] = 100;

			line.selectable = false;
			__canvas.add(line);

			var p1 = makeCurvePoint(20, 20, null, line, null)
			p1.name = "p1";
			__canvas.add(p1);

			var p0 = makeCurveCircle(100, 100, line, p1, null);
			p0.name = "p0";
			__canvas.add(p0);

			var p2 = makeCurveCircle(300, 100, null, p1, line);
			p2.name = "p2";
			__canvas.add(p2);

		})();

		function makeCurveCircle(left, top, line1, line2, line3) {
			var c = new deeptech.Circle({
				left: left - 2,
				top: top - 2,
				strokeWidth: 5,
				radius: 1,
				fill: '#fff',
				stroke: '#666'
			});

			c.hasBorders = c.hasControls = false;

			c.line1 = line1;
			c.line2 = line2;
			c.line3 = line3;

			return c;
		}

		function makeCurvePoint(left, top, line1, line2, line3) {
			var c = new deeptech.Circle({
				left: left,
				top: top,
				strokeWidth: 1,
				radius: 3,
				fill: '#fff',
				stroke: '#666'
			});

			c.hasBorders = c.hasControls = false;

			c.line1 = line1;
			c.line2 = line2;
			c.line3 = line3;

			return c;
		}

		function onObjectSelected(e) {
			var activeObject = e.target;

			if(activeObject.name == "p0" || activeObject.name == "p2") {
				activeObject.line2.animate('opacity', '1', {
					duration: 200,
					onChange: __canvas.renderAll.bind(__canvas),
				});
				activeObject.line2.selectable = true;
			}
		}

		function onBeforeSelectionCleared(e) {
			var activeObject = e.target;
			if(activeObject.name == "p0" || activeObject.name == "p2") {
				activeObject.line2.animate('opacity', '0', {
					duration: 200,
					onChange: __canvas.renderAll.bind(__canvas),
				});
				activeObject.line2.selectable = false;
			} else if(activeObject.name == "p1") {
				activeObject.animate('opacity', '0', {
					duration: 200,
					onChange: __canvas.renderAll.bind(__canvas),
				});
				activeObject.selectable = false;
			}
		}

		function onObjectMoving(e) {
			if(e.target.name == "p0" || e.target.name == "p2") {
				var p = e.target;

				if(p.line1) {
					p.line1.path[0][1] = p.left;
					p.line1.path[0][2] = p.top;
					p.line1.path
				} else if(p.line3) {
					p.line3.path[1][3] = p.left;
					p.line3.path[1][4] = p.top;
				}
			} else if(e.target.name == "p1") {
				var p = e.target;

				if(p.line2) {
					p.line2.path[1][1] = p.left;
					p.line2.path[1][2] = p.top;
				}
			} else if(e.target.name == "p0" || e.target.name == "p2") {
				var p = e.target;

				p.line1 && p.line1.set({
					'x2': p.left,
					'y2': p.top
				});
				p.line2 && p.line2.set({
					'x1': p.left,
					'y1': p.top
				});
				p.line3 && p.line3.set({
					'x1': p.left,
					'y1': p.top
				});
				p.line4 && p.line4.set({
					'x1': p.left,
					'y1': p.top
				});
			}
		}
	}
}