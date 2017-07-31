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

        ]
	},
	methods:{
	  viewDetail:function (clientName) {
	      this.$http.get("http://localhost:8080/client/clientID",{
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
            this.$http.get('http://localhost:8080/flow/sales_analysis/'+this.year)
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
            this.$http.put("http://localhost:8080/closePeriod").then(function (response) {
                if(response.data.errorCode == 0){
                    alert("本期已成功结转！");
                    window.location.href = "DetailStatistics.html"
                }
            }).catch(function (error) {
                alert("发生了未知的错误！")
            })
        }
    },
	mounted(){

        var date=new Date;
        var year=parseInt(date.getFullYear());
        var month = date.getMonth();
        var day = date.getDay();
        //
        // if((month!="12")&&(day!="31")){
        //     document.getElementById("closePeriod").disabled = true;
        // }

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
            this.$http.get('http://localhost:8080/flow/sales_analysis/' + this.year)
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
                alert("出现了未知的错误！请重新进行输入")
            });

            this.$http.get("http://localhost:8080/ticketAndFunds/all").then(function (response) {
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
                alert('发生了未知的错误！');
            })
        }
	}
});
