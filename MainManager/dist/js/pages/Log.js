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
        el:'#app',
        data:{
            username:'',
            year:2017,
            items:[

            ]
        },
        mounted(){

            this.username = this.getCookieValue("username");
            if(this.username == ''){
                alert("请先登录！");
                window.location.href = 'index.html'
            }else if(this.getCookieValue("authority")!=0){
                alert("抱歉，您无权浏览当前页面，如有疑问，请与管理员联系");
                window.location.href = "../index.html"
            }else{
                const self = this;
                this.$http.get('http://106.15.199.21:8080/logs/'+this.year)
                    .then(function(response){
                        self.items=response.data.data;
                        setTimeout(function () {
                            $('#example1').DataTable();
                        },0);
                    }).catch(function(error){
                    alert("获取信息失败，请刷新重试！")
                })
            }

        },
        methods:{

            setCookie:function (cname,cvalue,exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays*20*60*60*1000));
                var expires = "expires="+d.toUTCString();
                document.cookie = cname + "=" + cvalue + "; " + expires;
            },

            getCookieValue:function (cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for(var i=0; i<ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0)==' ') c = c.substring(1);
                    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
                }
                return "";
            },

            deleteCookie:function (cname) {
                this.setCookie("username","",-1);
                window.location.href="../index.html"
            },

            logout:function () {
                this.deleteCookie("username");
            }
        }
    });
