var clock=null;
var speed=4;
$(document).ready(function() {
	init();	
});
function init() {
	for (var i = 0; i < 4; i++) {
		createRow();
	}

	$('#main').click(function(event){
		judge(event);
	});
	clock=setInterval(move,30);
}
function createCell(){//创建随机className数组
	var temp=['cell','cell','cell','cell'];
	var i=Math.floor(Math.random()*4);
	temp[i]='cell black';
	return temp;
}
function createRow(){
	var row=$('<div></div>').addClass('row');
	var arr=createCell();
	for (var i = 0; i < 4; i++) {//创建cell，并加入到行里
		row.append($('<div></div>').addClass(arr[i]));
	}
	//行加入到con中
	if ($('#con').children()==null) {
		$('#con').append(row);
	}else{
		$('#con').prepend(row);
	}
}
function deleteRow(){
	if ($('#con').children().length==6) {
		$('#con').children().last().remove();//删除最后一个子元素
	}	
}
function move(){
	var top=parseInt($('#con').css('top'));//top要变为数值才能进行加减运算
	if (top+speed>0) {
		top=0;
	}else{
		top+=speed;
	}
	$('#con').css('top',top+'px');
	if (top==0) {
		createRow();
		$('#con').css('top','-100px');
		deleteRow();
	}else if(top==(-100+speed)){
		var rows=$('#con').children();
		if((rows.length>=5)&&(rows[rows.length-1].pass!==1)){
			fail();
		}
	}
}
function judge(ev){//判断是否点击黑色
	if (ev.target.className.indexOf('black')==-1) {
		fail();
	}else{//是黑色则变白 并且增加score，标记点击改行
		ev.target.className='cell';
		ev.target.parentNode.pass=1;
		score();
	}	
}
function fail(){
	clearInterval(clock);
	confirm('Your score is:'+parseInt($('#score').text()));
	clear();
}
function clear(){
	speed=4;
	$('#con').empty();
	$('#score').empty();
}
function score(){
	var newScore=parseInt($('#score').text())+1;//text()获取内部文本内容
	$('#score').text(newScore);
	if(newScore%10==0){
		speed+=2;
		if (speed==20) {
			alert('niubiality!');
		}
	}
}
