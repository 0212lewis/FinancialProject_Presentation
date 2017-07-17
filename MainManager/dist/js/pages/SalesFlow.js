/**
 * Created by pc on 2017/4/25.
 */

var idTmr;
function  getExplorer() {
    var explorer = window.navigator.userAgent ;
    //ie
    if (explorer.indexOf("MSIE") >= 0) {
        return 'ie';
    }
    //firefox
    else if (explorer.indexOf("Firefox") >= 0) {
        return 'Firefox';
    }
    //Chrome
    else if(explorer.indexOf("Chrome") >= 0){
        return 'Chrome';
    }
    //Opera
    else if(explorer.indexOf("Opera") >= 0){
        return 'Opera';
    }
    //Safari
    else if(explorer.indexOf("Safari") >= 0){
        return 'Safari';
    }
}
function method5(tableid) {
    if(getExplorer()=='ie')
    {
        var curTbl = document.getElementById(tableid);
        var oXL = new ActiveXObject("Excel.Application");
        var oWB = oXL.Workbooks.Add();
        var xlsheet = oWB.Worksheets(1);
        var sel = document.body.createTextRange();
        sel.moveToElementText(curTbl);
        sel.select();
        sel.execCommand("Copy");
        xlsheet.Paste();
        oXL.Visible = true;

        try {
            var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
        } catch (e) {
            print("Nested catch caught " + e);
        } finally {
            oWB.SaveAs(fname);
            oWB.Close(savechanges = false);
            oXL.Quit();
            oXL = null;
            idTmr = window.setInterval("Cleanup();", 1);
        }

    }
    else
    {
        tableToExcel(tableid)
    }
}
function Cleanup() {
    window.clearInterval(idTmr);
    CollectGarbage();
}
var tableToExcel = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
        base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
        format = function(s, c) {
            return s.replace(/{(\w+)}/g,
                function(m, p) { return c[p]; }) }
    return function(table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
        window.location.href = uri + base64(format(template, ctx))
    }
})()


var tool=new Vue(
{
	el:'#app1',
	data:{
		totalMoney:0,
		totalNum:0,
		totalDeliveryMoney:0,
		average:0,
		items:[

		],
		table:'',
	},
	mounted(){
		const self = this;
		this.$http.get('http://localhost:8080/flow/sales/'+'2017')
		.then(function(response){
			self.items=response.data.data;
            setTimeout(function () {
                $('#example1').DataTable();
            },0);
        }).catch(function(error){
			alert("出现了未知的错误！请重新进行输入")
		});
		// this.totalMoney = this.getTotalMoney;
		// this.totalNum = this.getTotalNum();
		// this.totalDeliveryMoney = this.getTotalDeliveryMoney;
		// this.average = this.getAverage;
		// console.log(this.getTotalMoney);

        // window.onload=function(){
        //         window.setTimeout(function () {
        //             var table = document.getElementById("example1");
        //             alert(table.rows.length);
        //             var sum = 0;
        //             for(var i=1;i<table.rows.length-3;i++)
        //             {
        //                 sum = parseFloat(parseFloat(table.rows[i].cells[5].innerHTML)+parseFloat(sum));
        //             }
        //             this.totalNum=sum;
        //             return sum;
        //         },3000);
        //     }


	},
	methods:{

		getTotalMoney:function () {
			var sum = 0;
			for(var i = 0;i<items.length;i++){
				sum = parseFloat(this.item[i].total)+sum;
			}
			return sum;
        },
		getTotalNum:function () {
            // window.setTimeout(this.getTotalNum,5000);
            var table = document.getElementById("example1");
            var sum = 0;
            for(var i=1;i<table.rows.length-2;i++)
            {
                sum = parseFloat(parseFloat(table.rows[i].cells[5].innerHTML)+parseFloat(sum));
            }
            return sum;
        },
		getTotalDeliveryMoney:function () {
            var table = document.getElementById("example1");
            var sum = 2;
            for(var i=1;i<table.rows.length-2;i++)
            {
                sum = parseFloat(table.rows[i].cells[9].innerHTML+sum);
            }
            return sum;
        },
		getAverage:function () {
			var result = parseFloat((this.getTotalMoney-this.getTotalDeliveryMoney)/this.getTotalNum);
			return result;
        }
	}
});
