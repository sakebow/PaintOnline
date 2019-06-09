/* EDITOR: 邢文圣
 * SUMMARY: 允许多次上传图片
 * DETAILS: 使用input[type='file']进行文件上传的选择
 * 			将选择的图片转换成base64的格式，转存入img标签的src属性中
 * 			通过不断添加img标签达到多次上传的效果
 * 			每次上传之后就将src属性中的值，也就是转换成base64的图片，返回到主函数中
 * */
function changepic() {
	let reads = new FileReader();
	f = document.getElementById('file').files[0];
	reads.readAsDataURL(f);
	let result = null;
	reads.onload = function(e) {
		var newImg = `<img class="uploadImg" src=${this.result} />`;
		result= this.result;
	};
	return result;
}