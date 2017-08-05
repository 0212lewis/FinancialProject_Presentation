/**
 * Created by pc on 2017/4/25.
 */
var tool=new Vue(
{
	el:'#app',
	data:{
	    years:[],
	    year:'',
	    username:'',
		items:[

		]
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
        },
        changeYear:function () {
            var select = document.getElementById("select");
            var value = select.value;
            this.year = parseInt(value);
            console.log(this.year);
            this.$http.get('http://localhost:8080/flow/tickets/'+this.year)
                .then(function(response){
                    this.items=response.data.data;
                    // var dt = $('#example1').DataTable();
                    // dt.destroy();
                    // setTimeout(function () {
                    //     $('#example1').DataTable();
                    // },0);

                }).catch(function(error){
                alert("获取信息失败，请刷新重试！")
            })

        }
    },
	mounted(){
        var date=new Date;
        var year=parseInt(date.getFullYear());

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
        }else{
                    this.$http.get('http://localhost:8080/flow/tickets/'+this.year)
                        .then(function(response){
                            this.items=response.data.data;
                            setTimeout(function () {
                                $('#example1').DataTable({
                                    dom: 'Bfrtip',
                                    buttons: [
                                        'copyHtml5',
                                        'excelHtml5',
                                    ]
                                });
                            }, 0);
                        }).catch(function(error){
                        alert("获取信息失败，请刷新重试！")
                    })
                }
	}
});
