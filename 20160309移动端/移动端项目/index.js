var main = document.querySelector("#main");
var oLis = document.querySelectorAll("#list>li");
var winW = document.documentElement.clientWidth;
/*设备的宽度*/
var winH = document.documentElement.clientHeight;
/*设备的高度*/
var desW = 640;
/*设计稿的宽度*/
var desH = 960;
/*设计稿的高度*/
/*设备的宽高比例 320/568
 * 设计稿的宽高比例 320/480
 * 320/568 <320/480  -->说明按照高度去缩放(960->568)  568/960 ->winH/desH
 * */
if (winW / winH < desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}
[].forEach.call(oLis, function () {
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener("touchstart", start, false);
    oLi.addEventListener("touchmove", move, false);
    oLi.addEventListener("touchend", end, false);
})

function start(e) {
    this.touchStart = e.changedTouches[0].pageY;
}

function move(e) {
    e.preventDefault();
    this.flag = true;
    var touchMove = e.changedTouches[0].pageY;
    var pos = touchMove - this.touchStart;
    var index = this.index;//当前这张的索引
    [].forEach.call(oLis, function () {
        arguments[0].className = "";
        arguments[0].style.paddingTop = "8px";
        if (arguments[1] != index) {//只有当前这张是显示的
            arguments[0].style.display = "none"
        }
        arguments[0].firstElementChild.id = "";
    })
    if (pos > 0) {/*↓*/
        //往下滑获得上一张索引
        this.prevsIndex = (index == 0 ? oLis.length - 1 : index - 1);
        var duration = -winH + pos;  //winH是由自己定的

    } else if (pos < 0) {/*↑*/
        //往上滑获得下一张索引
        this.prevsIndex = (index == oLis.length - 1 ? 0 : index + 1);
        var duration = winH + pos;
    }
    //按照移动的距离/设备的高度
    oLis[index].style.webkitTransform = "scale(" + (1 - Math.abs(pos) / winH * 1 / 2) + ") translate(0," + pos + "px)";//按照滑动的距离移动
    oLis[this.prevsIndex].style.webkitTransform = "translate(0," + duration + "px)";
    oLis[this.prevsIndex].style.display = "block";
    oLis[this.prevsIndex].className = "zIndex";//保证在最上面
}
function end(e) {
    if (this.flag) {   // 判断是点击还是滑动
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevsIndex].style.webkitTransition = "0.5s";
        oLis[this.prevsIndex].addEventListener("webkitTransitionEnd", function () {
            this.style.webkitTransition = "";
            this.firstElementChild.id = "a" + (this.index + 1)
        }, false)
    }
}

//以下代码是用来调试
document.addEventListener("touchmove", function (e) {
    //console.log(e.target.id);
}, false)

//音乐
window.addEventListener("load", function() {
    var a = document.querySelector(".music")
        , b = a.querySelector("audio");
    b.addEventListener("canplay", function() {
        a.style.display = "block",
            a.className = "music move"
    }, !1),
        b.play(),
        $t.tap(a, {
            end: function() {
                return b.paused ? (b.play(),
                    a.className = "music move",
                    void 0) : (b.pause(),
                    a.className = "music", void 0)
            }
        })
}, !1);
