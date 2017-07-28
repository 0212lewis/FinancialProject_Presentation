/**
 * Created by pc on 2017/7/10.
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
var vm  = new Vue({
    el:'#container',
    data:{
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
        saveModify:function () {
            this.$http.put("http://localhost:8080/provider",{
                id:this.items.id,
                name:this.items.name,
                taxId:this.items.tax_id,
                address:this.items.address,
                phoneNumber:this.items.phone_number,
                bank:this.items.bank,
                account:this.items.account,
                mailAddress:this.items.mail_address,
                linkman:this.items.linkman
            },{
                headers:{
                    username:encodeURI(this.username)
                }

            }).then(function (response) {
                if(response.data.errorCode == 0){
                    hide1();
                    alert("修改成功！");
                    window.location.href = "Provider.html"
                }
            }).catch(function (error) {
                hide1();
                alert("修改失败！")
            })
        }
    },
    mounted(){
        var thisUrl = document.URL;
        var getVal = thisUrl.split('?')[1];
        var id = getVal.split('=')[1];
        this.id = id;
        this.username = this.getCookieValue("username");
        if(this.username == ""){
            alert("请先登录！");
            window.location.href = "../index.html"
        }else if(this.getCookieValue("authority")!=0){
            alert("抱歉，您无权浏览当前页面，如有疑问，请与管理员联系");
            window.location.href = "../index.html"
        }else{
            this.$http.get("http://localhost:8080/provider/singleProvider",{
                params:{
                    providerId:this.id
                }
            }).then(function (response) {
                if(response.body.errorCode == 0){
                    console.log(this.items)
                    console.log(response.data.data);
                    this.items = response.data.data[0];
                }
            }).catch(function (error) {
                alert("出现了未知的错误!");
            })
        }

    }
});