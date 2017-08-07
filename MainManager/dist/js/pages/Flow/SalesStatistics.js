/**
 * Created by pc on 2017/4/25.
 */

function show1()  //显示隐藏层和弹出层
{
    var hideobj=document.getElementById("hidebg1");
    hidebg1.style.display="block";  //显示隐藏层
    hidebg1.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度
    document.getElementById("login1").style.display="block";  //显示弹出层
}
function hide1()  //去除隐藏层和弹出层
{
    document.getElementById("hidebg1").style.display="none";
    document.getElementById("login1").style.display="none";
}
function show2()  //显示隐藏层和弹出层
{


    var hideobj=document.getElementById("hidebg2");
    hidebg2.style.display="block";  //显示隐藏层
    hidebg2.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度
    document.getElementById("login2").style.display="block";  //显示弹出层
}
function hide2()  //去除隐藏层和弹出层
{
    document.getElementById("hidebg2").style.display="none";
    document.getElementById("login2").style.display="none";
}
function show3()  //显示隐藏层和弹出层
{
    var hideobj=document.getElementById("hidebg3");
    hidebg3.style.display="block";  //显示隐藏层
    hidebg3.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度
    document.getElementById("login3").style.display="block";  //显示弹出层
}
function hide3()  //去除隐藏层和弹出层
{
    document.getElementById("hidebg3").style.display="none";
    document.getElementById("login3").style.display="none";
}

function show4()  //显示隐藏层和弹出层
{
    var hideobj=document.getElementById("hidebg4");
    hidebg4.style.display="block";  //显示隐藏层
    hidebg4.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度
    document.getElementById("login4").style.display="block";  //显示弹出层
}
function hide4()  //去除隐藏层和弹出层
{
    document.getElementById("hidebg4").style.display="none";
    document.getElementById("login4").style.display="none";
}
function show5()  //显示隐藏层和弹出层
{
    var hideobj=document.getElementById("hidebg5");
    hidebg5.style.display="block";  //显示隐藏层
    hidebg5.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度
    document.getElementById("login5").style.display="block";  //显示弹出层
}
function hide5()  //去除隐藏层和弹出层
{
    document.getElementById("hidebg5").style.display="none";
    document.getElementById("login5").style.display="none";
}
function isNum(str){
    if(""==str){
        return false;
    }
    var reg = /\D/;
    return str.match(reg)==null;
}
var tool=new Vue(
{
	el:'#app',
	data:{
	    years:[],
	    year:'',
	    username:'',
		clientId:'',
		items:[

		],
        items1:[

        ],
        ticketBalance:'',
        fundBalance:''
	},
	methods:{
	  viewDetail:function (clientName) {
	      this.$http.get("http://106.14.224.189:8080/client/clientID",{
	          params:{
	              name:clientName
              }
          }).then(function (response) {
             if(response.data.errorCode == 0){
                 this.clientId = response.data.data;
                 window.location.href='DetailStatistics.html?id='+this.clientId;
             }
          }).catch(function (error) {
              console.log("发生了未知的错误!");
          });
      },

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
        },
        changeYear:function () {
            var select = document.getElementById("select");
            var value = select.value;
            this.year = parseInt(value);
            console.log(this.year);
            this.$http.get('http://106.14.224.189:8080/flow/sales_analysis/'+this.year)
                .then(function(response){

                        this.items=response.data.data;
                        // var dt = $('#example1').DataTable();
                        // dt.destroy();
                        // setTimeout(function () {
                        //     $('#example1').DataTable();
                        // },0);

                }).catch(function(error){
                alert("出现了未知的错误！请重新进行输入")
            })
        },
        closePeriod:function () {
            this.$http.put("http://106.14.224.189:8080/closePeriod").then(function (response) {
                if(response.data.errorCode == 0){
                    alert("本期已成功结转！");
                    window.location.href = "DetailStatistics.html"
                }
            }).catch(function (error) {
                alert("发生了未知的错误！")
            })
        },


        modifyTicket:function () {

	      hide2();
            this.$http.put("http://106.14.224.189:8080/ticket_balance/"+this.clientId,
                this.ticketBalance,{
                    headers:{
                        username:encodeURI(this.username)
                    }
                }).then(function (response) {
                if(response.data.errorCode == 0){
                    alert("修改成功！");
                    window.location.reload();
                }
            }).catch(function (error) {
                alert("发生了未知的错误！");
            });
        },
        modifyFund:function () {
	      hide3();
            this.$http.put("http://106.14.224.189:8080/fund_balance/"+this.clientId,
                this.fundBalance,{
                headers:{
                    username:encodeURI(this.username)
                }
                }).then(function (response) {
                if(response.data.errorCode == 0){
                    alert("修改成功！");
                    window.location.reload();
                }
            }).catch(function (error) {
                alert("发生了未知的错误！");
            });
        },
        modifyTicketGetClient:function (clientId) {
            this.clientId = clientId;
            console.log(this.clientId);
	      show4();
        },
        modifyTicketGetTicketBalance:function () {

            this.ticketBalance = document.getElementById("ticketBalance").value;
            if(!isNum(this.ticketBalance)){
                alert("请输入数字！");
            }else{
                hide4();
                show2();
            }
        },
        modifyFundGetClient:function (clientId) {
            this.clientId = clientId;
	      show5();
        },
        modifyFundGetFundBalance:function () {

            this.fundBalance = document.getElementById("fundBalance").value;
            if(!isNum(this.fundBalance)){
                alert("请输入数字！");
            }else{
                hide5();
                show3();
            }


        },
    },
	mounted(){

        var date=new Date;
        var year=parseInt(date.getFullYear());
        var month = date.getMonth()+1;
        var day = date.getDate();

        if((month!="12")&&(day!="31")){
            document.getElementById("closePeriod").disabled = true;
        }

        for(var i=0;i<10;i++){
            this.years.push(year-i);
        }
        this.year = year;

        this.username = this.getCookieValue("username");
        if(this.username == ""){
            alert("请先登录！");
            window.location.href = "../index.html";
        }else if(this.getCookieValue("authority")!=0){
            alert("抱歉，您无权浏览当前页面，如有疑问，请与管理员联系");
            window.location.href = "../index.html"
        }else {
            this.$http.get('http://106.14.224.189:8080/flow/sales_analysis/' + this.year)
                .then(function (response) {

                    this.items = response.data.data;
                    setTimeout(function () {
                        $('#example1').DataTable({
                            dom: 'Bfrtip',
                            buttons: [
                                'copyHtml5',
                                'excelHtml5',
                            ]
                        });
                    }, 0);

                }).catch(function (error) {
                alert("获取信息失败，请刷新重试！")
            });

            this.$http.get("http://106.14.224.189:8080/ticketAndFunds/all").then(function (response) {
                this.items1 = response.data.data;
                setTimeout(function () {
                    $('#example2').DataTable({
                        dom: 'Bfrtip',
                        buttons: [
                            'copyHtml5',
                            'excelHtml5',
                        ]
                    });
                }, 0);
            }).catch(function (error) {
                alert('获取信息失败，请刷新重试！');
            })
        }
	}
});
