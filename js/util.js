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
    if (url.indexOf("?") < 0) {
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

/**
 * 二次封装ajax
 * @url: 请求地址
 * @tableId:请求地址
 * @column: 列字段
 */
function _ajax(url, tableId, columns) {
    $.ajax({
        url: url,
        dataType: "json",
        success: function (data) {
            var tableHtml = '';
            if (data !== "[]" && data.pagedata) {
                if (data.pagedata.length > 0) {
                    tableHtml = predata(data.pagedata, columns, tableId);
                }
            } else {
                tableHtml = predata(data, columns, tableId);
            }
            $("#" + tableId).html(tableHtml);
        }
    });
}


/**
 * 
 * 
 **/


function _predata(data, columns, table) {
    var htmlArray = [];
    var d="";
    for (var i = 0; i < data.length; i++) {
        d = data[i];
        htmlArray.push("<tr>");
        for (var j = 0; j < columns.length; j++) {
            var columnValue = getColumnValue(table, columns[j], d[columns[j]]);
            htmlArray.push("<td class='overflow'><a title=" + columnValue + ">" + columnValue + "</a></td>");
        }
        htmlArray.push("</tr>");
    }
    return htmlArray.join('');
}
function _getColumnValue(table, column, columnValue) {
	if(table == "baojingTable"){
		if (column == 'W_LEVEL') {
			switch (columnValue) {
			case '1':
				columnValue='班组';
				break;
			case '2':
				columnValue='部门';
				break;
			case '3':
				columnValue='电厂';
				break;
			case '4':
				columnValue='集团';
				break;
			default:
				columnValue='';
				break;
			}
		}
	}
	return columnValue;
}