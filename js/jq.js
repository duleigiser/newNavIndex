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
if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}
var ctx = window.location.origin;
var moreURL = ctx + "jsjd/main?xwl=23WPD5TO7GWR?orgId=4961c78b-178d-423e-bec4-453fc11262cd";
$("#table3 .more").prop("href",moreURL);
var url = ctx + "jsjd/main?xwl=23WPD5TO7GWR";
var _scrollHeight = $(".content>li").height();
//显示时间
setInterval(function () {
    var timeStr = showLocale();
    $(".time").html(timeStr);
},1000);
//文字向上滚动
setInterval(function () {
    $(".content").animate({
        marginTop: "-" + _scrollHeight + "px"
    },500,function () {
        $(this).css({marginTop: "0px"}).find("li:first").appendTo(this);
    });
},3000);
//函数体
function showLocale() {
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var day = myDate.getDate();
    var hour = myDate.getHours();
    var minute = myDate.getMinutes();
    var second = myDate.getSeconds();
    if (month<10) {
        month = "0" + month;
    }
    if (day<10) {
        day = "0" + day;
    }
    if (hour<10) {
        hour = "0" + hour;
    }
    if (minute<10) {
        minute = "0" + minute;
    }
    if (second<10) {
        second = "0" + second;
    }
    var str = year + "年" + month + "月" + day + "日" + " " + hour + ":" + minute + ":" + second;
    return str;
}
$(function () {
    var cha = new Highcharts.Chart({
        chart: {
            //将图表放进id为container的容器内
            renderTo: 'container', 
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        //去掉Highcharts.com的水印
        credits: {
            enabled: false
        },
        colors:  ["red","red","red"],
        
        //去掉导出的按钮
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                }
            }
        },
        /*labels: {
            style: {
                "fontFamily": "微软雅黑",
                "fontSize": "12px",
                "fontWeight": "normal",
                "textShadow": "none",
                "color":"#000"
            },
            items: [
                {
                    html: "#1机组",
                    style: {
                        "left": '200px',
                        "top": '10px'
                    },
                },
                {
                    html: "#2机组",
                    style: {
                        left: "125px",
                        top: "170px"
                    }
                },
                {
                    html: "#3机组",
                    style: {
                        left: "50px",
                        top: "10px"
                    }
                }
            ]
        },*/
        title: {
            text: '',
            align: 'center',
            verticalAlign: 'middle',
            y: 50
        },
        tooltip: {
            pointFormatter: function() {
                //this表示鼠标悬浮选中的机组
                return  this.x+'负荷: <b>'+this.y+'</b>'
            }
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: false,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                startAngle: 0,
                endAngle: 360,
                center: ['50%', '45%']
            }
        },
        series: [{
            type: 'pie',
            /*dataLabels: {
                style: {
                    "fontFamily": "微软雅黑",
                    "fontSize": "12px",
                    "fontWeight": "normal",
                    "textShadow": "none",
                    "color":"#000"
                },
                y: 15,
                padding: 0,
                distance: 0
            },*/
            name: '',
            innerSize: '50%',
            data: [
                ['#1', 33.3],
                ['#2', 33.3],
                ['#3', 33.3],
                /*{
                    name: 'Others',
                    y: 0.1,
                    dataLabels: {
                        enabled: false
                    }
                }*/
            ]
        }]
    });
});


