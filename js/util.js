/**
 * Created by lei on 2015/7/25 0026.
 */



// 返回用户所在电厂
function _getUserOrgId() {
    var org_id = "";
    $.ajax({
        url: ctx + "/jsjd/portal/getUserOrgId.do",
        type: "POST",
        async: false,
        success: function (data) {
            org_id = data;
        }
    })
    return org_id;
}

/*
 * 当前 host + 端口
 * eg：return => http://localhost:8080
 */
function _ctx() {
    if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }
    var ctx = window.location.origin;
    return ctx;
}

/*
 * 返回JSON格式 url中请求数据
 * 
 * eg: url = http:a.b.html?a=b&c=d
 *     return => {a:b,c:d} 
 */
function _GetRequest(url) {
    if(url.indexOf("?")<0){
        return;
    }
    url = url.split('?')[1]; //获取url中"?"符后的字串
    var theRequest = {};
    var strs = url.split("&");
    for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
    }
    return theRequest;
}

