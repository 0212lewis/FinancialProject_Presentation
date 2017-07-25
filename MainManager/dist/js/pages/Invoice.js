/**
 * Created by pc on 2017/4/25.
 */
/**
 * Created by pc on 2017/4/25.
 */
String.prototype.trim=function() {
    return this.replace(/(^\s*)|(\s*$)/g,'');
}

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
var vm = new Vue({
    el:'#container',
    data:{
        username:'',
        invoicers:[

        ],

        invoiceOrder:{
            unit:'',
            orderId:'',
            money:'',
            comment:'',
            date:'',
            hour:'',
            minute:'',
            second:''
        }

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


        addUnit:function(){
            var name=document.getElementById("newinput1").value;
            for(var i=0;i<this.invoicers.length;i++){
                if(this.invoicers[i].name==name){
                    alert('该付款单位已经存在');
                    document.getElementById("newinput1").value="";
                    hide1();
                    return;
                }
            }
            this.invoicers.push({name});
            this.$http.get("http://106.14.224.189/server/contents/AddContent.php",{
                params:{
                    contentName:"ticket_order_ticketUnit",
                    value:name
                }
            })
                .then(function(response){
                    document.getElementById("newinput1").value="";
                    hide1();
                    alert("添加付款单位成功!")
                }).catch(function(error){
                alert("出现了未知的错误！请重新进行输入")
            })
        },

        deleteUnit:function(){
            var mySelect=document.getElementById("payunit");
            var index=mySelect.selectedIndex;
            var name=mySelect.options[index].value;
            if(name==""){
                alert('请选择要删除的内容');
                hide2();
                return;
            }
            this.$http.get("http://106.14.224.189/server/contents/deleteContent.php",{
                params:{
                    contentName:"ticket_order_ticketUnit",
                    value:name
                }
            }).then(function(response){
                    mySelect.options.remove(index);//下拉框中删除该元素
                    hide2();
                    alert("删除付款单位成功!")
                }).catch(function(error){
                    // console.log(error.data);
                alert("出现了未知的错误！请重新进行输入")
                hide2();
            })
        },

        addTicketOrder:function () {
            hide5();
            var list = document.getElementById("datepicker").value.split("/");
            var month = list[0];
            var day = list[1];
            var year = list[2]
            var newDate = year+'-'+month+'-'+day+" "+this.invoiceOrder.hour+":"+this.invoiceOrder.minute+":"+this.invoiceOrder.second;
            // alert(newDate);
            if(this.invoiceOrder.unit==null||this.invoiceOrder.unit.length==0){
                alert("请选择开票单位！");

            }else if(this.invoiceOrder.orderId==null||this.invoiceOrder.orderId.length==0){
                alert("请输入编号！");

            }else if(this.invoiceOrder.money==null){
                alert("请输入开票金额！");
            }else if((this.invoiceOrder.hour.toString().length==2)&&(this.invoiceOrder.minute.toString().length==2)&&(this.invoiceOrder.second.toString().length==2)) {
                    const self = this;
                    this.$http.post("http://localhost:8080/order/open_ticket", {
                        clientID: '',
                        clientName: self.invoiceOrder.unit.trim(),
                        orderID: self.invoiceOrder.orderId.trim(),
                        money: self.invoiceOrder.money,
                        comment: self.invoiceOrder.comment.trim(),
                        date: newDate
                    },{headers:{
                        username:encodeURI(this.username)
                    }}).then(function (response) {
                        if (response.body.errorCode == 0) {
                            document.getElementById("save").disabled = true;
                            alert("添加成功！");

                        } else if(response.data.errorCode ==80000001){// console.log(response.data);
                            alert("请先登录！");
                        }
                    }).catch(function (error) {
                        alert("添加失败！");
                    })
                }else{
                alert("请规范输入时间格式！");
            }

        }
    },
    mounted(){
        this.username = this.getCookieValue("username");
        if(this.username = ""){
            alert("请先登录！");
            window.location.href = "../index.html"
        }else{
            const self = this;
            this.$http.get('http://localhost:8080/client/allName')
                .then(function(response){
                    if(response.body.errorCode == 0) {
                        self.invoicers = response.data.data;
                    }
                }).catch(function(error){
                alert("出现了未知的错误！请重新进行输入")
            });
        }

    }
});

