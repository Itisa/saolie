var size = 10
var bombs = 10
var sett,t=0,dataev,if_click=false

sett = setInterval(time,100);
var board = make_board()
var playboard = make_board(-1)
var if_init = false
var if_lose,if_win
var mousex = 0
var mousey = 0

function main() {
	var canvas = document.getElementById('main');
	var c = canvas.getContext("2d");
	draw_border();
	draw_zone(playboard)
	console.log(playboard,'pboard')
	// console.log(board,'board')
}

function init(cx,cy) {
	if_init = true
	var board = this.board;
	var x,y;

	for (var i = 0; i < bombs; i++) {
		x = Math.floor(Math.random()*size);
		y = Math.floor(Math.random()*size);
		if (cx<y+2&&cx>y-2&&cy<x+2&&cy>x-2) {i-=1;continue;}
		if (board[x][y]==-2) {i-=1}
		board[x][y] = -2;
	}

	// var board = cal_border(JSON.parse(JSON.stringify(board)));
	var board = cal_border(board)
	draw_zone(playboard)
	// draw_zone(board)
	console.log(board,'board')
}

function clean_canvas() {
	var canvas = document.getElementById('main');
	var c = canvas.getContext("2d");
	c.clearRect(0,0,1425,1000)
}

function draw_zone(board) {
	for (var i = 0; i < board.length; i++) {
		var bb = board[i];
		for (var i1 = 0; i1 < bb.length; i1++) {
			var b = bb[i1]
			// console.log(i,i1,b)
			draw_block(i1*40,i*40,b)
		}
	}
}

function draw_border() {
	// var canvas = document.getElementById('main');
	// var c = canvas.getContext("2d");
	// c.lineWidth = 2
	// c.beginPath();
	// c.moveTo(450,100);
	// c.lineTo(450,505);
	// c.lineTo(855,505);
	// c.lineTo(855,100);
	// c.closePath();
	// c.stroke();
}

function draw_block(x,y,type) {
	var canvas = document.getElementById('main');
	var c = canvas.getContext("2d");
	//type:-1 hidden,  -2 bomb, -3 hidbomb
	if (type==-2) {
		c.fillStyle="#aaaaaa";
		c.fillRect(x,y,35,35);
	}
	else if (type==-1){
		c.fillStyle="#cc00cc";
		c.fillRect(x,y,35,35);
	}
	else if (type==-3) {
		c.fillStyle="red";
		c.fillRect(x,y,35,35);
	}
	else {
		c.fillStyle="#ffffff";
		c.fillRect(x,y,35,35);
		if (type==0) {}
		else {
			c.font = "30px bold 黑体";
			c.fillStyle = 'red';
			c.fillText(type+'',x+10,y+25)
		}		
	}
	// c.fillRect(x,y,30,30);

}

function cal_border(l) {
	// var b = JSON.parse(JSON.stringify(l));
	var b = l;
	var t = 0
	for (var y = 0; y < l.length; y++) {
		var lay1 = l[y]
		for (var x = 0; x < lay1.length; x++) {
			if (lay1[x]==-2) {continue;}
			t = 0;

			if (y>0) {
				if (l[y-1][x]==-2) {t+=1;}
			}
			if (y<size-1){
				if (l[y+1][x]==-2) {t+=1;}
			}
			if (x>0) {
				if (l[y][x-1]==-2) {t+=1;}
			}
			if (x<size-1) {
				if (l[y][x+1]==-2) {t+=1;}
			}
			if (y>0&&x>0){
				if (l[y-1][x-1]==-2) {t+=1;}
			}
			if (y>0&&x<size-1) {
				if (l[y-1][x+1]==-2) {t+=1;}
			}
			if (y<size-1&&x>0) {
				if (l[y+1][x-1]==-2) {t+=1;}
			}
			if (y<size-1&&x<size-1){
				if (l[y+1][x+1]==-2) {t+=1;}
			}
			b[y][x] = t;
		}

	}
	return b
}

function time() {
	if (t>0) {
		if_click=true;
		t-=1;
	}
	else if (if_click==true){
		oncl(dataev);
		if_click=false;
	}
}

function right_mouse() {
	var x = Math.floor(mousex/40);
	var y = Math.floor(mousey/40);
	if (x<size&&x>-1&&y<size&&y>-1){
		if (playboard[y][x]==-1) {playboard[y][x]=-3;}
		else if (playboard[y][x]==-3) {playboard[y][x]=-1;}
	}
	clean_canvas()
	draw_zone(this.playboard)
	draw_win()
}

function lr_mouse(ev) {
	if (if_init==false) {init(x,y)}
	var sx = ev.offsetX;
	var sy = ev.offsetY;
	var x = Math.floor(sx/40);
	var y = Math.floor(sy/40);

	if (y>0) {find_blank(board,x,y-1,true)}
	if (y<size-1) {find_blank(board,x,y+1,true)}
	if (x>0) {find_blank(board,x-1,y,true)}
	if (x<size-1) {find_blank(board,x+1,y,true)}
	if (y>0&&x>0) {find_blank(board,x-1,y-1,true)}
	if (y>0&&x<size-1) {find_blank(board,x+1,y-1,true)}
	if (y<size-1&&x>0) {find_blank(board,x-1,y+1,true)}
	if (y<size-1&&x<size-1) {find_blank(board,x+1,y+1,true)}

}

function move(ev) {
	// console.log(ev);
	mousex = ev.offsetX;
	mousey = ev.offsetY;
}

function oncl(ev) {
	var sx = ev.offsetX;
	var sy = ev.offsetY;
	var x = Math.floor(sx/40);
	var y = Math.floor(sy/40);
	var which = ev.which
	// console.log(playboard,'pboard')
	if (which==1) {
		if (if_init==false) {init(x,y)}
		// console.log(sx-450,sy-100,x,y,this.board)
		if (x<size&&x>-1&&y<size&&y>-1){
			find_blank(board,x,y)
		}

		///ifwin
		var times = 0;
		for (var i = 0; i < this.playboard.length; i++) {
			var li = this.playboard[i]

			for (var j = 0; j < li.length; j++) {
				if(li[j]==-1&&board[i][j]!=-2) {times += 1;}
			}
		}
		if (times==0) {if_win=true;draw_win();}
	}
	else if (which==3) {
		right_mouse()
	}
}

function cl(ev) {
	if (t==0) {
		t = 1
		dataev = ev
	}
	else {
		t = 0;
		if_click = false;
		lr_mouse(ev)
	}
}

function find_blank(board,x,y,lr=false) {
	if (lr==true){
		if (playboard[y][x]==-3) {return;}
	}
	if (playboard[y][x]==-1||playboard[y][x]==-3) {}
	else {return}
	if (board[y][x]==-2) {
		console.log('dead')	
		if_lose = true;
		draw_zone(board)
		draw_win()
		return
	}
	else if (board[y][x]==0) {
		this.playboard[y][x] = 0
		if (x<size-1) {find_blank(board,x+1,y);}
		if (x>0) {find_blank(board,x-1,y);}
		if (y<size-1) {find_blank(board,x,y+1);}
		if (y>0) {find_blank(board,x,y-1)}
	}
	else {
		this.playboard[y][x] = board[y][x]
	}
	// console.log(board)
	// console.log(playboard,'play')
	clean_canvas()
	draw_border()
	draw_zone(this.playboard)
	draw_win()

}

function make_board(num=0) {
	var li = []
	for (var i = 0; i < size; i++) {
		li.push([num])
		for (var i1 = 0; i1 < size-1; i1++) {
			li[i].push(num)
		}
	}
	return li
}


function draw_win() {
	var canvas = document.getElementById('main');
	var c = canvas.getContext("2d");
	c.font = "30px bold 黑体";
	c.fillStyle = 'black';
	if (if_win==true){
		c.fillText('youwin',0,80)
	}
	else if (if_lose==true){
		c.fillText('youlose',0,80)
	}
}

main()
