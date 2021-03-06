/**
 * Created by pc on 2017/7/13.
 */
/**
 * Created by pc on 2017/7/13.
 */
/**
 * Created by pc on 2017/7/13.
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

function isChinese(str){
    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
    return reg.test(str);
}

var vm = new Vue({
    el:'#container',
    data:{

        username:'',
        items:[
            {
                username:'',
                password:'',
                phoneNumber:'',
                authority:"2"
            }
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

        saveAdd:function () {

            if(!isChinese(this.items.username.toString())){
                alert("请输入中文字符！");
                hide1();
            }else{
                this.$http.post("http://106.15.199.21:8080/account",{
                    username:this.items.username,
                    password:this.items.password,
                    phoneNumber:this.items.phoneNumber,
                    authority:2

                },
                    {
                        headers:{
                            username:encodeURI(this.username)
                        }
                    }).then(function (response) {
                    if(response.data.errorCode == 0){
                        hide1();
                        alert("添加成功！");
                        window.location.href="Employee.html";
                    }
                }).catch(function (error) {
                    console.log(error);
                    hide1();
                    alert("添加失败！")
                })
            }

        }
    },
    mounted(){
        this.username = this.getCookieValue("username");
        if(this.username ==""){
            alert("请先登录！");
            window.location.href = "../index.html"
        }else if(this.getCookieValue("authority")!=0){
            alert("抱歉，您无权浏览当前页面，如有疑问，请与管理员联系");
            window.location.href = "../index.html"
        }
    }
});