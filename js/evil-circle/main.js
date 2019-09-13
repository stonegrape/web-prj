const BALLS_COUNT = 5;
const BALL_SIZE_MIN = 10;
const BALL_SIZE_MAX = 20;
const BALL_SPEED_MAX = 7;

// 设定画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// 设定画布长宽
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//计算得分
var p = document.querySelector('p');
var score = BALLS_COUNT;
//计算球的数量
p.textContent ='还剩 ' + score + ' 个球';


// 生成随机数的函数
function random(min,max) {
  return Math.floor(Math.random()*(max-min)) + min;
}

// 生成随机颜色的函数
function randomColor() {
  return 'rgb(' +
         random(0, 255) + ', ' +
         random(0, 255) + ', ' +
         random(0, 255) + ')';
}

//构造器
//x 和 y 坐标 —— 小球在屏幕上最开始的坐标
//velX velY 水平和竖直速度
//color 小球颜色
//size 小球大小--小球半径 单位：像素
//构造器Shape();
//exists:小球是否存在 布尔类型
function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

function EvilCircle(x, y, velX, velY, exists, color, size) {
  Shape.call(this,x, y, 20, 20, exists);
  this.color =  'yellow';
  this.size = 20;//恶魔球的半径
}
EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = Ball;

function Ball (x, y, velX, velY, exists, color, size) {
  Shape.call(this, x, y, velX, velY, exists);
  this.color = color;
  this.size = size;
}
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

//定义恶魔球的函数
//定义绘制恶魔球的函数
EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.lineWidth = 3;//是 Canvas 2D API 设置线段厚度的属性（即线段的宽度）。
  ctx.strokeStyle = this.color; //描述画笔的颜色或者样式
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  //Canvas 2D API 使用非零环绕规则，根据当前的画线样式，绘制当前或已经存在的路径的方法。
  ctx.stroke();//空心
  //ctx.fill();//实心
};

//定义更新恶魔球的函数
EvilCircle.prototype.checkBounds = function(){
  //若小球 （x+半径size>=width）表示小球右边缘碰到画布，则小球从右边缘离开
  if((this.x + this.size) >= width){
    this.x = this.x -this.size;
  }
  //小球从左边离开
  if((this.x - this.size) <= 0){
    this.x = this.x + this.size;
  }
  //小球从下边缘离开
  if((this.y + this.size) >= height){
    this.y = this.y - this.size;
  }
  //小球从上边缘离开
  if((this.y - this.size) <= 0){
    this.y = this.y + this.size;
  }
}

//定义移动恶魔球
EvilCircle.prototype.setControls = function() {
  window.onkeydown = e => {
    //按下a 向左移动 移动距离velX
    if(e.key === 'a') {
      this.x = this.x - this.velX;
    }
    if(e.key === 'd') {
      this.x = this.x + this.velX;
    }
    if(e.key === 'w') {
      this.y = this.y - this.velY;
    }
    if(e.key === 's') {
      this.y = this.y + this.velY;
    }
  }
  
}


//定义碰撞检测函数
EvilCircle.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {
    if (balls[j].exists) {
      //检测小球与恶魔球发生碰撞
      //distance 两个小球之间的距离
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx*dx+dy*dy);
      //若小球之间的距离小于半径之和，发生碰撞
      if(distance < (this.size + balls[j].size)){
        //若发生碰撞，则小球不存在
        balls[j].exists = false;
        score--;
        p.textContent = '还剩 ' +score + ' 个球';
      }
    }
  }
}

//draw(); 画出一个小球
//ctx 的内容区域像是一张白纸
//beginPath() 声明开始在纸上画一张图形
//arc() 在纸上画出圆弧 
//x,y 圆弧的中心坐标，即小球的中心坐标  size：圆弧的半径，小球的半径
//0，2*PI 开始，结束 圆弧对应的夹角 2*PI：360度
//fill() 方法，声明 结束了以 beginPath() 开始的绘画，
//并且使用之前设置的颜色进行填充

Ball.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
  ctx.fill();
}

//让小球运动
Ball.prototype.update = function(){
  //小球从右边缘离开
  if((this.x + this.size) >= width){
    this.velX = -(this.velX);
  }
  //小球从左边离开
  if((this.x - this.size) <= 0){
    this.velX= -(this.velX);
  }
  //小球从下边缘离开
  if((this.y + this.size) >= height){
    this.velY = -(this.velY);
  }
  //小球从上边缘离开
  if((this.y - this.size) <= 0){
    this.velY = -(this.velY);
  }
  this.x += this.velX;
  this.y += this.velY;
}

//定义碰撞检测函数
Ball.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {
    //this:当前collisionDetect所在的对象  balls[j]:循环到的小球
    //若不相等，则是两个球
    //球与自己不能发生碰撞
    if (this !== balls[j]) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx*dx+dy*dy);

      //一个常见的算法来检测两个小球是否相撞了，两个小球中心的距离是否小于两个小球的半径之和  。
      if(distance < (this.size + balls[j].size)){
        balls[j].color = this.color = randomColor();
      }
    }
  }
}

// 定义一个数组来保存所有的球
var balls = [];

var evilCircle = new EvilCircle(200,200,20,20,true,'yellow',20);
evilCircle.setControls();//?


//bug:控制台:预期为颜色，却显示'14'  new Ball() 少了一个参数exists 
//控制打印loop();一步一步调试
function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)'; //画布的填充颜色
  ctx.fillRect(0,0,width,height); //画一张填充满整个画布的矩形
  while (balls.length < BALLS_COUNT) {
    var ball = new Ball(
      random(0,width), 
      random(0,height),
      random(-BALL_SPEED_MAX,BALL_SPEED_MAX),
      random(-BALL_SPEED_MAX,BALL_SPEED_MAX),
      true,
      randomColor(),
      random(BALL_SIZE_MIN,BALL_SIZE_MAX)
      );
      
      balls.push(ball);
      //score++;
      //p.textContent= '还剩 '+ score +' 个球';
  }
  for (let i = 0; i < balls.length; i++) {
    //遍历数组中的所有小球，每个小球都调用draw()和update();将自己画出来
    //并且再接下来的每一帧都按照其速度进行位置的更新。
    if(balls[i].exists) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
    evilCircle.draw();
    evilCircle.checkBounds();
    evilCircle.collisionDetect();
    //计算球的数量 bug:以下两行代码放在此处，score一直减少
    //score--;
    //p.textContent = '还剩 ' +score + ' 个球';
  }
  requestAnimationFrame(loop);
}

loop();




