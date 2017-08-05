/**
 * Created by pc on 2017/7/12.
 */
function show1(name)  //显示隐藏层和弹出层
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

var vm = new Vue({
   el:'#container',
    data:{
       username:'',

       deleteName:'',

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
        ,
        deleteConfirm:function () {
            hide1();
            this.$http.delete("http://106.14.224.189:8080/businessman",{
                body : this.deleteName,
                headers: {
                    username: encodeURI(this.username)
                }
            }).then(function (response) {
                if(response.body.errorCode == 0){
                    console.log(response.data.data);
                    console.log(this.deleteName)
                    alert("删除成功！");
                    window.location.reload();
                }
            }).catch(function (error) {
                console.log(this.deleteName);
                alert("删除失败！");
            })
        },
        deleteBusinessman:function (name) {
            show1();
            this.deleteName = name
        }
    },
    mounted(){
        this.username = this.getCookieValue("username");

        if(this.username == ""){
            alert("请先登录！");
            window.location.href = "../index.html"
        }else if(this.getCookieValue("authority")!=0){
            alert("抱歉，您无权浏览当前页面，如有疑问，请与管理员联系");
            window.location.href = "../index.html"
        }else{
            this.$http.get("http://106.14.224.189:8080/businessman").then(function (response) {
                this.items = response.data.data;
                setTimeout(function () {
                    $('#example1').DataTable();
                },0);
            }).catch(function (error) {
                alert("获取信息失败，请刷新重试");
            })
        }

    }
});