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
        items:[
            {
                username:'',
                address:'',
                phoneNumber:'',
            }
        ]
    },

    methods:{
        saveAdd:function () {

            if(!isChinese(this.items.username.toString())){
                alert("请输入中文字符！");
                hide1();
            }else{
                this.$http.post("http://localhost:8080/businessman",{
                    name:this.items.username,
                    address:this.items.address,
                    phone_number:this.items.phoneNumber,

                }).then(function (response) {
                    if(response.data.errorCode == 0){
                        hide1();
                        alert("添加成功！");
                        window.location.href="Businessman.html";
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

    }
});