function getEle(ele) {
    return document.querySelector(ele);
}
var main = getEle("#main");
var winW = document.documentElement.clientWidth;
/*设备的宽*/
var winH = document.documentElement.clientHeight;
/*设备的高*/
var desW = 640;
var desH = 1008;
if (winW / winH <= desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}

var bell = getEle("#bell");
var say = getEle("#say");
var music = getEle("#music");

var num = 0;
function fnLoad() {
    var progress = getEle(".progress");
    var loading = getEle("#loading");
    var arr = ['phoneBg.jpg', 'cubeBg.jpg', 'cubeImg1.png', 'cubeImg2.png', 'cubeImg3.png', 'cubeImg4.png', 'cubeImg5.png', 'cubeImg6.png', 'phoneBtn.png', 'phoneKey.png', 'messageHead1.png', 'messageHead2.png', 'messageText.png', 'phoneHeadName.png'];
    for (var i = 0; i < arr.length; i++) {
        var oImg = new Image();//创建一个图片实例
        oImg.src = "images/" + arr[i];
        oImg.onload = function () {
            num++;
            //加载成功的图片的个数占所有图片的百分比就是progress的宽度
            progress.style.width = num / arr.length * 100 + "%";
            //动画执行完的时候都会触发webkitTransitionEnd这个事件
            if (num == arr.length && loading) {
                progress.addEventListener("webkitTransitionEnd", function () {
                    //最后一张图片加载完之后把整个loading这个div全删了
                    main.removeChild(loading);
                    loading = null;//把定义的loading这个变量也释放掉
                    fnPhone.init();
                }, false)
            }
        }
    }
}
fnLoad();

var fnPhone = {
    init: function () {
        bell.play();
        this.phone = getEle("#phone");
        this.speaker = getEle(".speaker");
        //在移动端不会直接用click事件,也不会用touchstart来模拟click事件,用tap组件来表示click(click会有300ms的延迟)
        this.phone.addEventListener("click", this.touch, false);
    },
    touch: function (e) {
        var target = e.target;
        if (target.className == "listenTouch") {//接听电话
            bell.pause();
            say.play();
            target.parentNode.style.display = "none";//answer这个div隐藏
            fnPhone.speaker.style.webkitTransform = "translate(0,0)";//从下面回到一开始的位置
        } else if (target.className == "hangUp") {//挂断
            say.pause();
            fnPhone.closePhone()
        }
    },
    closePhone: function () {//把phone这个div移到最下面,然后删除
        this.phone.style.webkitTransform = "translate(0," + desH + "px)";
        var that = this;
        window.setTimeout(function () {
            main.removeChild(that.phone);
            fnMessage();
        }, 1000)
    }
}


function fnMessage() {
    //1.一开始每个li是隐藏的,然后每隔1秒出现一个,并且每次移动到没有偏移的位置
    //2.出现超过三个li之后,ul整体往上移动(已经显示的li)的总的高度
    //3.所有的li都出现后整个message删除掉,定时器清理掉,进入魔方页面
    music.play();
    var message = getEle("#message");
    var oLis = document.querySelectorAll("#message>ul>li");
    var oUl = getEle("#message>ul");
    var num = 0;
    /*初始化索引*/
    var h = null;
    /*累积li的高度*/
    var timer = window.setInterval(function () {
        if (num == oLis.length) {
            window.clearInterval(timer);
            window.setTimeout(function () {
                main.removeChild(message);
                fnCube();
            }, 1000);
            return;
        }
        var oLi = oLis[num];
        oLi.style.opacity = 1;
        /*让li显示*/
        oLi.style.webkitTransform = "translate(0,0)";
        /*回到没有偏移的位置*/
        h += oLi.offsetHeight - 30;
        if (num >= 3) {
            oUl.style.webkitTransform = "translate(0,-" + h + "px)";
        }
        num++;
    }, 1000)
}


function fnCube() {
    var cubeBox = getEle("#cubeBox");
    cubeBox.style.webkitTransform = "scale(0.7) rotateY(-45deg) rotateX(135deg)";
    //rotateY()的角度是水平方向滑动的距离
    //rotateX()的角度是垂直方向滑动的距离
    var startX = -45;
    var startY = 135;
    var x = 0;
    /*表示水平滑动的距离*/
    var y = 0;
    /*表示垂直滑动的距离*/
    document.addEventListener("touchstart", start, false);
    document.addEventListener("touchmove", move, false);
    document.addEventListener("touchend", end, false)
    function start(e) {
        var touch = e.changedTouches[0];
        this.startTouch = {x: touch.pageX, y: touch.pageY};
        this.flag = false;
    }

    function move(e) {
        e.preventDefault();/*阻止默认滚动的行为*/
        this.flag = true;//是点击还是滑动
        var touch = e.changedTouches[0];
        var moveTouch = {x: touch.pageX, y: touch.pageY};
        x = moveTouch.x - this.startTouch.x;
        y = moveTouch.y - this.startTouch.y;
        //startX+x 起始的角度+滑动的距离
        cubeBox.style.webkitTransform = "scale(0.7) rotateY(" + (startX + x) + "deg) rotateX(" + (startY + y) + "deg)";
    }

    function end(e) {
        if(this.flag){
            //把这次滑动的距离作为下一次滑动起始的角度
            startX += x;
            startY += y
        }

    }


}
