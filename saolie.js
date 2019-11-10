
var sett,t=0

// sett = setInterval(time,100);
var board = make_board()
var playboard = make_board(-1)
var if_init = false

function main() {
	var canvas = document.getElementById('main');
	var c = canvas.getContext("2d");
	draw_border();
	draw_zone(playboard)
	console.log(playboard,'pboard')
	console.log(board,'board')
}

function init(cx,cy) {
	if_init = true
	var board = this.board;
	// var board = make_board()
	// var playboard = make_board(-1)
	var x,y;

	for (var i = 0; i < 10; i++) {
		x = Math.floor(Math.random()*10);
		y = Math.floor(Math.random()*10);
		// console.log(board[x],x,y)
		if (cx<y+2&&cx>y-2&&cy<x+2&&cy>x-2) {i-=1;continue;}

		if (board[x][y]==-2) {i-=1}

		board[x][y] = -2;
	}

	// var board = cal_border(JSON.parse(JSON.stringify(board)));
	var board = cal_border(board)
	draw_zone(playboard)
	console.log(playboard,'pboard')
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
			draw_block(455+i1*40,105+i*40,b)
		}
	}
}

function draw_border() {
	var canvas = document.getElementById('main');
	var c = canvas.getContext("2d");
	c.lineWidth = 2
	c.beginPath();
	c.moveTo(450,100);
	c.lineTo(450,505);
	c.lineTo(855,505);
	c.lineTo(855,100);
	c.closePath();
	c.stroke();
}

function draw_block(x,y,type) {
	var canvas = document.getElementById('main');
	var c = canvas.getContext("2d");
	//type:-1 hidden,  -2 bomb,2 
	if (type==-2) {
		c.fillStyle="#aaaaaa";
		c.fillRect(x,y,35,35);
	}
	else if (type==-1){
		c.fillStyle="#cc00cc";
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
			if (lay1[x]==-2) {console.log('jump');continue;}
			t = 0;

			if (y>0) {
				if (l[y-1][x]==-2) {t+=1;}
			}
			if (y<9){
				if (l[y+1][x]==-2) {t+=1;}
			}
			if (x>0) {
				if (l[y][x-1]==-2) {t+=1;}
			}
			if (x<9) {
				if (l[y][x+1]==-2) {t+=1;}
			}
			if (y>0&&x>0){
				if (l[y-1][x-1]==-2) {t+=1;}
			}
			if (y>0&&x<9) {
				if (l[y-1][x+1]==-2) {t+=1;}
			}
			if (y<9&&x>0) {
				if (l[y+1][x-1]==-2) {t+=1;}
			}
			if (y<9&&x<9){
				if (l[y+1][x+1]==-2) {t+=1;}
			}
			b[y][x] = t;
		}

	}
	return b
}

function time() {
	if (t>0) {
		t-=1
	}
}

function cl(ev) {
	// console.log(ev);
	var sx = ev.offsetX;
	var sy = ev.offsetY;
	var x = Math.floor((sx-450)/40);
	var y = Math.floor((sy-100)/40);
	if (if_init==false) {init(x,y)}
	// console.log(sx-450,sy-100,x,y,this.board)
	if (x<10&&x>-1&&y<10&&y>-1){
		find_blank(board,x,y)
		// this.board[y][x] = 9
		// clean_canvas()
		// draw_border()
		// draw_zone(this.board)
	}
	console.log(playboard,'pboard')
	var times = 0;
	for (var i = 0; i < this.playboard.length; i++) {
		var li = this.playboard[i]

		for (var j = 0; j < li.length; j++) {
			if(li[j]==-1&&board[i][j]!=-2) {times += 1;}
			// console.log(li[j]);
		}
	}
	console.log(times)
	if (times==0) {win();}
}

function find_blank(board,x,y) {
	if (this.playboard[y][x]!=-1) {return}
	else if (board[y][x]==-2) {
		// console.log('dead')
		lose()
		return 'dead'
	}
	else if (board[y][x]==0) {
		this.playboard[y][x] = 0
		// console.log(x,y)
		if (x<9) {find_blank(board,x+1,y);}
		if (x>0) {find_blank(board,x-1,y);}
		if (y<9) {find_blank(board,x,y+1);}
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

}

function make_board(num=0) {
	var li = []
	for (var i = 0; i < 10; i++) {
		li.push([num])
		for (var i1 = 0; i1 < 9; i1++) {
			li[i].push(num)
		}
	}
	return li
}

function win() {
	var canvas = document.getElementById('main');
	var c = canvas.getContext("2d");
	c.font = "30px bold 黑体";
	c.fillStyle = 'red';
	c.fillText('youwin',600,80)
}
function lose() {
	var canvas = document.getElementById('main');
	var c = canvas.getContext("2d");
	c.font = "30px bold 黑体";
	c.fillStyle = 'red';
	c.fillText('youlose',600,80)
}
// var playboard = make_board(-1);
// var board = make_board();
// global board;
// console.log(this.board)
main()
