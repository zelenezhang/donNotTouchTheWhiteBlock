var clock=null;
var speed=4;
function init(){
	for (var i = 0; i < 4; i++) {
		createRow();
	}
	$('main').onclick=function(event){
		judge(event);
	}
	clock=window.setInterval('move()',30);
}
// 点击黑块意味着删除一个<div class="row"></div>，
// 然后从最上边添加一行新的row，需要通过JS控制行的删除和生成
function createDiv(className){
	var div=document.createElement('div');
	div.className=className;
	return div;
}
function createCell(){//返回cellclassname数组
//创建类名数组，一个为cell black，其他为cell
	var temp=['cell','cell','cell','cell'];
	var i=Math.floor(Math.random()*4);//random返回0-1之间的一个随机数
	temp[i]='cell black';
	return temp;
}
function createRow() {
	// 创造一个<div class="row">并且有四个子节点<div class="cell">
	var con=$('con');
	var row=createDiv('row');//创建div class=row
	var arr=createCell();//cell数组
	// con.appendChild(row);//将row添加为con的子节点
	for (var i = 0; i < 4; i++) {
		row.appendChild(createDiv(arr[i]));//添加row的子节点4个cell
	}
	if (con.firstChild==null) {//从init第一次进入时，是空的，所以直接插入，后边像上插入可以兼容
	//如果con下边是空的，直接插入子节点，如果不是空的，则在上边插入
		con.appendChild(row);
	} else {
		con.insertBefore(row,con.firstChild);
	}
}
function deleteRow() {
	// 删除最后一个row
	var con=$('con');
	if (con.childNodes.length==6) {
	//因为先创建行再删除，第一次创建时是5，第二次往后再创建就是6，删除以后再变成5
		con.removeChild(con.lastChild);
	}
}
// 是否点击黑块
function judge(ev){
	if (ev.target.className.indexOf('black')==-1) {//点击的不是黑块
	//target 事件属性可返回事件的目标节点（触发该事件的节点）
		//ev.target.style.background='red';
		fail();
	}else{//点击黑块,该块变白
		ev.target.className='cell';
		ev.target.parentNode.pass=1;//定义属性pass，表明此行row被点击
		score();
	}
}
//用JS控制CON下移，下移同时判断是否触底
function move(){
	var con=$('con');
	var top=parseInt(window.getComputedStyle(con,null)['top']);
	//getComputedStyle('elem','伪类') gives the final used values of all the CSS properties of an element.
	if (speed+top>0) {//说明已经触底
		top=0;
	} else {
		top+=speed;
	}
	con.style.top=top+'px';
	if (top==0) {//全部显现，则创建新行，删除旧行	
		createRow();
		con.style.top='-100px';
		deleteRow();
	}else if(top==(-100+speed)){
		var rows=con.childNodes;
		// console.log(rows);出错是因为$(#con)的开始和结束之间有空格，造成有一个文本节点
		if ((rows.length>=5) &&(rows[rows.length-1].pass!==1)) {
			//最后一行触底
			fail();
		}
	}
}
function fail(){
	clearInterval(clock);
	confirm('你的最终得分为'+parseInt($('score').innerHTML));
	clear();
}
function clear(){
	$('con').innerHTML='';
	$('score').innerHTML=0;
	clock=0;
	state=0;
	speed=4;
}
function score(){
	var newScore=parseInt($('score').innerHTML)+1;
	$('score').innerHTML=newScore;
	if(newScore%10==0){
		speedUp();
	}
}
function speedUp(){
	speed+=2;
	if(speed==20){
		alert('牛逼了');
	}
}
function $(id){
	return document.getElementById(id);
}
window.onload=function(){
	var btn=document.getElementsByTagName('button')[0];
	btn.onclick=function(){
		init();
	}
}
