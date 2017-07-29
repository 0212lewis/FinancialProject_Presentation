/**
 * Created by pc on 2017/7/28.
 */
/**
 * Created by pc on 2017/7/10.
 */
var vm = new Vue({
    el:'#container' ,
    data:{
        clientId:'',
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
        getClientId:function () {

        }
    },
    mounted(){

        var thisUrl = decodeURI(document.URL);
        var getVal = thisUrl.split('?')[1];
        var id = getVal.split('=')[1];

        this.username = this.getCookieValue("username");
        if(this.username == ""){
            alert("请先登录！");
            window.location.href = "../index.html"
        }else if(this.getCookieValue("authority")!=0){
            alert("抱歉，您无权浏览当前页面，如有疑问，请与管理员联系");
            window.location.href = "../index.html"
        }else{
            this.$http.get("http://localhost:8080/clientId",{
                params:{
                    clientName:id,
                }
            }).then(function (response) {
               this.clientId = response.data.data;
                console.log(this.clientId);

                this.$http.get("http://localhost:8080/history_fund",{
                    params:{
                        clientId:this.clientId
                    }
                }).then(function (response) {
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
                    // setTimeout(function () {
                    //     $('#example1').DataTable();
                    // },0);
                }).catch(function (error) {
                    alert("出现了未知的错误！");
                })
            }).catch(function (error) {
                alert("发生了未知的错误！");
            });


        }

    }
});