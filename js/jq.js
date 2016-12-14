if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}
var ctx = window.location.origin;
var colorArr1 = ["red","red","red"];
var colorArr2 = ["red","red","red"];
marquee();
//滚动文字函数
function marquee() {
    var url = ctx+"/portal/getdmyFDL.do";
    $.ajax({
        url: url,
        dataType: "json",
        success: function(data) {
            var scrollStr = "<ul class=\"content\">";
            for (var i = 0; i < data.length; i++) {
                scrollStr += "<li><em>" + data[i].ORGNAME + "</em><em>日发电量最高&nbsp;" + data[i].DAYVALUE + "万KWh</em><em>" + data[i].DAYDATE + "</em><em>月发电量最高&nbsp;"+d[0].MONTHVALUE+"亿kWh</em><em>"+d[0].MONTHDATE+"</em></li>"; 
            }
            scrollStr += "</ul>";
            $(".scrollText").html(scrollStr);
            //文字向上滚动
            setInterval(function () {
                $(".content").animate({
                    marginTop: "-" + _scrollHeight + "px"
                },500,function () {
                    $(this).css({marginTop: "0px"}).find("li:first").appendTo(this);
                });
            },3000);
        }
    });
}
//显示时间
setInterval(function () {
    var timeStr = showLocale();
    $(".time").html(timeStr);
},1000);
function ajax(url, tableId, columns, diff) {
	$.ajax({
		url : url,
		dataType : "json",
		success : function(data) {
			var tableHtml = '';
			if(data!=="[]"&&data.pagedata){
				if(data.pagedata.length>0 ){
					tableHtml = prearData(data.pagedata, columns, tableId, diff);
				}
			}else{
				if(data.length!==0){
					tableHtml = prearData(data, columns, tableId, diff);
				}
				
			}									
			$("#" + tableId).html(tableHtml);
			styleTable("#" + tableId);
		},
		
	});
}
function prearData(data, columns, table,diff) {
	var htmlArray = new Array();
	var min = 10;
	for (var i = 0; i < min; i++) {
		var d = data[i];
		htmlArray.push("<tr>");
		for (var j = 0; j < columns.length; j++) {
			var columnValue = getColumnValue(table, columns[j], d[columns[j]]);
			if(table == "table3"){
				htmlArray.push("<td align='left' class='ellipsis' ><a  title=\"" + columnValue + "\" href='#' >" + columnValue + "</a></td>");
			}
			
		//
			
		}
		
		htmlArray.push("</tr>");

	}
	return htmlArray.join('');
}
function getColumnValue(table, column, columnValue) {
		
	if (table == 'yujingTable'||table=='yjtzd') {
		if (column == 'W_LEVEL') {
			if (columnValue == 0) {
				columnValue = "一般预警";
			} else if (columnValue == 1) {
				columnValue = "严重预警";
			}

		} else if (column == 'AUDIT_STATUS') {
			columnValue = getAudit_Status(columnValue);
		} else if (column == 'W_DATE') {
			columnValue = columnValue.split(" ")[0];
		}else if(column=='R'){
			if (columnValue == 0) {
				columnValue = "一般预警";
			} else if (columnValue == 1||columnValue == 2) {
				columnValue = "严重预警";
			}
		}

	}else if(table == "jianduTable"||table == "JTjianduTable"){
		if (column == 'CREATE_DATE') {
			columnValue = columnValue.split(" ")[0];
		}
	}else if(table == "jianduzhixingTable"){
		if (column == 'CREATE_DATE') {
			columnValue = columnValue.split(" ")[0];
		}
	}else if(table == "baojingTable"){
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
	}else if(table == "zongjieTable"){
		if (column == 'CREATE_DATE') {
			columnValue = columnValue.split(" ")[0];
		}
	}else if(table == 'baojingTable' || table == 'JTbaojing'){
		if(column =='W_DATE'){

			/*columnValue = columnValue.replace(/\s/g,"&#13;")*/

			
		}
	}else if(table == "table_5" || table == 'ycqktable' || table == "JTycqk"|| table =="JTjzqt"){
		if(column == "g_id"||column =="G_ID" || column == "UNIT_ID"){
			if(Number(columnValue)){
				columnValue = "#"+columnValue;
			}
		}

	}

	return columnValue;
}