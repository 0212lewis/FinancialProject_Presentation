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

function isChinese(str){
    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
    return reg.test(str);
}

var vm  = new Vue({
    el:'#container',
    data:{
        items:[
            {
                clientId:'',
                clientName:'',
                taxId:'',
                address:'',
                phoneNumber:'',
                bank:'',
                account:'',
                mailAddress:'',
                linkman:''
            }

        ]
    },
    methods:{
        saveAdd:function () {

            if(isChinese(this.items.clientId.toString())){
                alert("请勿输入中文字符！");
                hide1();
            }else{
                this.$http.post("http://localhost:8080/client",{
                    id:this.items.clientId,
                    name:this.items.clientName,
                    taxId:this.items.taxId,
                    address:this.items.address,
                    phoneNumber:this.items.phoneNumber,
                    bank:this.items.bank,
                    account:this.items.account,
                    mailAddress:this.items.mailAddress,
                    linkman:this.items.linkman
                }).then(function (response) {
                    if(response.data.errorCode == 0){
                        hide1();
                        alert("添加成功！");
                        window.location.href="Client.html";
                    }
                }).catch(function (error) {
                    hide1();
                    alert("添加失败！")
                })
            }

        }

    },
    mounted(){
    }
});