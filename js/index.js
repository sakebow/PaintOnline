/* EDITOR: 邢文圣
 * SUMMARY: 页面动作
 * DETAILS: 点击变色表示选中
 * */
// 左侧工具栏中选中直线的时候额外弹出虚线线型选择
$('#left .tool').click(function() {
	if($(this).attr('title') == '直线') {
		// 如果是直线，显示
		$('#lineDash').show();
		$("#lineHelp").show();
		// 如果取消选择，隐藏
		if($(this).hasClass('selected')) {
			$('#lineDash').hide();
			$("#lineHelp").hide();
		}
	} else {
		// 如果不是直线，隐藏
		$('#lineDash').hide();
		$("#lineHelp").hide();
	}
	if($(this).attr('title') == '圆角矩形') {
		// 如果是直线，显示
		$('#slideTest1').show();
		// 如果取消选择，隐藏
		if($(this).hasClass('selected')) {
			$('#slideTest1').hide();
		}
	} else {
		// 如果不是直线，隐藏
		$('#slideTest1').hide();
	}
	if($(this).attr('title') == '圆弧') {
		// 如果是直线，显示
		$('.bline').show();
		// 如果取消选择，隐藏
		if($(this).hasClass('selected')) {
			$('.bline').hide();
		}
	} else {
		// 如果不是直线，隐藏
		$('.bline').hide();
	}
	// 如果被选中，修改颜色
	$(this).hasClass('selected') ? $(this).removeClass('selected') : $(this).addClass('selected').siblings().removeClass('selected');
});

for (let i = 0; i < $('#left .tool').length; i++) {
	$('#left .tool').eq(i).mouseover(function(){
		$("#info").val($(this).attr('title'));
	});
}

$('#left .tool').mouseout(function(){
	$("#info").val('');
});
// 线型部分 - 点击变色
$('#left #lineDash p').click(function() {
	$(this).addClass('selected').siblings().removeClass('selected');
});
// 直线对齐部分 - 点击变色
$('#left #lineHelp p').click(function() {
	if($(this).hasClass('selected')) {
		$(this).removeClass('selected');
		__lineHelp = false;
	} else {
		$(this).addClass('selected');
		__lineHelp = true;
	}
});

// 线宽部分 - 点击变色产生反馈
$('#availableColor .colors span').click(function() {
	let currentColor = $(this).css("background-color");
	//	console.log(currentColor)
	$('#currentColor span').css('background-color', currentColor)
});
// 线宽部分 - 点击变色表示选中
$('#left #lineWeight p').click(function() {
	$(this).addClass('selected').siblings().removeClass('selected');
})
layui.use('slider', function() {
	var $ = layui.$,
		slider = layui.slider;
	//默认滑块
	slider.render({
		elem: '#slideTest1',
		value: 20 //初始值
			,
		change: function(value) {
			__roundX = __roundY = value;
		}
	});
});