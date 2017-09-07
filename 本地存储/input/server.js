var http = require("http");
var url = require("url");
var fs = require("fs");

var server = http.createServer(function (request, response) {
    //->前端路由:通过用户请求的地址不一样,我们在本JS中给进行分别的处理
    var urlObj = url.parse(request.url, true);
    var pathName = urlObj.pathname;

    //->检测邮箱是否存在的接口地址
    if (pathName === "/checkEmail") {
        var userEmail = urlObj.query.email;
        var flag = false;

        var con = fs.readFileSync("./EmailData.json", "utf8");
        con = JSON.parse(con);
        for (var i = 0; i < con.length; i++) {
            if (con[i] === userEmail) {
                flag = true;
            }
        }

        var responseData = {"isExist": flag};
        response.writeHead(200, {"content-type": "application/json"});
        response.end(JSON.stringify(responseData));
        return;
    }

    //->把请求的index.html页面返回给客户端
    if (pathName === "/index.html") {
        con = fs.readFileSync("./index.html", "utf8");
        response.writeHead(200, {"content-type": "text/html"});
        response.end(con);
    }
});
server.listen(7777);
