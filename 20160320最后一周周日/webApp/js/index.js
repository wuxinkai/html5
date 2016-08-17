//->计算中间区域的高度
var sectionBox = document.querySelector(".sectionBox");
sectionBox.style.height = document.documentElement.clientHeight / 100 - 0.94 + "rem";

$(function () {

    //->整体数据的二级缓存
    function matchDetailCallback(data) {
        //->实现数据绑定
        console.log(data);

        if (!flag) {
            var jsonData = {
                "time": new Date().toString(),
                "data": data
            };
            localStorage.setItem("matchInfo", JSON.stringify(jsonData));
        }
    }

    var flag = false;
    var matchInfo = localStorage.getItem("matchInfo");
    if (matchInfo) {
        var jsonData = JSON.parse(matchInfo);
        var oldTime = new Date(jsonData["time"]);
        var newTime = new Date();
        if (newTime - oldTime <= 6000) {
            flag = true;
            matchDetailCallback(jsonData["data"]);
            return;
        }
        localStorage.removeItem("matchInfo");
    }

    $.ajax({
        url: "http://sportswebapi.qq.com/html/matchDetail?mid=100000:1468094&_=" + Math.random(),
        type: "get",
        dataType: "jsonp",
        jsonpCallback: "matchDetailCallback",
        success: matchDetailCallback
    });
});








