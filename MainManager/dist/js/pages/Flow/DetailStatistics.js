/**
 * Created by pc on 2017/7/16.
 */


var tool=new Vue(
    {
        el:'#app',
        data:{
            username:'',
            clientId:'',
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
            }
        },
        mounted(){

            this.username = this.getCookieValue("username");
            var thisUrl = document.URL;
            var getVal = thisUrl.split('?')[1];
            var id = getVal.split('=')[1];
            this.clientId = id;
            console.log(this.clientId);
            if(this.username == ""){
                alert("请先登录！");
                window.location.href = "../index.html"
            }else if(this.getCookieValue("authority")!=0){
                alert("抱歉，您无权浏览当前页面，如有疑问，请与管理员联系");
                window.location.href = "../index.html"
            }
         else{
                this.$http.get('http://106.14.224.189:8080/ticketAndFund',{
                    params:{
                        clientId:this.clientId
                    }
                }).then(function(response){
                    if(response.data.errorCode == 0){
                        console.log(this.clientId);
                        this.items=response.data;
                        setTimeout(function () {
                            $('#example1').DataTable({
                                dom: 'Bfrtip',
                                buttons: [
                                    'copyHtml5',
                                    'excelHtml5',
                                ]
                            });
                        }, 0);
                    }

                }).catch(function(error){
                    alert("获取信息失败，请刷新重试！")
                })
            }

        }
    });
