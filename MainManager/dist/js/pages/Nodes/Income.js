/**
 * Created by cyz on 2017/4/25.
 */
/**
 * Created by cyz on 2017/4/25.
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

function show3()  //显示隐藏层和弹出层
{
    var hideobj=document.getElementById("hidebg3");
    hidebg3.style.display="block";  //显示隐藏层
    hidebg3.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度
    document.getElementById("login3").style.display="block";  //显示弹出层
}
function hide3()  //去除隐藏层和弹出层
{
    document.getElementById("hidebg3").style.display="none";
    document.getElementById("login3").style.display="none";
}

function show4()  //显示隐藏层和弹出层
{
    var hideobj=document.getElementById("hidebg4");
    hidebg4.style.display="block";  //显示隐藏层
    hidebg4.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度
    document.getElementById("login4").style.display="block";  //显示弹出层
}
function hide4()  //去除隐藏层和弹出层
{
    document.getElementById("hidebg4").style.display="none";
    document.getElementById("login4").style.display="none";
}


function show5()  //显示隐藏层和弹出层
{
    var hideobj5=document.getElementById("hidebg5");
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
        authority:'',
        newpayer:'',
        payers:[

        ],

        payMethods:[

        ],

        IncomeOrder:{
            payer:'',
            money:'',
            payMethod:'',
            comment:'',
            date:'',
            hour:'',
            minute:'',
            second:''
        }

    },
    methods:{
        //设置cookie
        setCookie:function (cname,cvalue,exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*20*60*60*1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        },

        //得到当前的cookie
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

        //删除cookie
        deleteCookie:function (cname) {
            this.setCookie("username","",-1);
            window.location.href="../index.html"
        },
        //登出
        logout:function () {
            this.deleteCookie("username");
        },


        //添加新的客户
        addClient:function () {
            var name=document.getElementById("newinput1").value;
            for(var i=0;i<this.payers.length;i++){
                if(this.payers[i]==name){
                    alert('该客户已经存在');
                    document.getElementById("newinput1").value="";
                    hide1();
                    return;
                }
            }
            this.payers.push(name);
            this.$http.post("http://localhost:8080/client", {
                account: document.getElementById("newClientAccount").value,
                address: document.getElementById("newClientAddress").value,
                bank: document.getElementById("newClientBank").value,
                id: document.getElementById("newClientID").value,
                linkman: document.getElementById("newClientLinkMan").value,
                mailAddress: document.getElementById("newClientMailAddress").value,
                name: document.getElementById("newinput1").value,
                phoneNumber: document.getElementById("newClientPhone").value,
                taxId: document.getElementById("newClientTaxID").value
            }).then(function (response) {
                document.getElementById("newinput1").value = "";
                document.getElementById("newClientAccount").value = "";
                document.getElementById("newClientAddress").value = "";
                document.getElementById("newClientBank").value = "";
                document.getElementById("newClientID").value = "";
                document.getElementById("newClientLinkMan").value = "";
                document.getElementById("newClientMailAddress").value = "";
                document.getElementById("newClientPhone").value = "";
                document.getElementById("newClientTaxID").value = "";
                hide1();
                alert("添加客户成功!")
            }).catch(function (error) {
                alert("出现了未知的错误！请重新进行输入")
            });
        },
        //删除客户
        deleteClient:function(){
            var mySelect = document.getElementById("Client");
            var index=mySelect.selectedIndex;
            var name=document.getElementById("Client").value;
            if(name==""){
                alert('请选择要删除的客户');
                hide2();
                return;
            }
            this.$http.delete("http://localhost:8080/client",{
                body:name,
                    headers:{
                    username:encodeURI(this.username)
                }
            })
                .then(function(response){
                    if(response.data.errorCode == 0){
                        mySelect.options.remove(index);//下拉框中删除该元素
                        hide2();
                        alert("删除客户成功!")
                    }
                }).catch(function(error){
                console.log(error.data);
                alert("出现了未知的错误！请重新进行输入")
                hide2();
            })
        },
        //添加新的付款方式
        addPayMethod:function(){
            var name=document.getElementById("newinput3").value;
            for(var i=0;i<this.payMethods.length;i++){
                if(this.payMethods[i]==name){
                    alert('该方式已经存在');
                    document.getElementById("newinput3").value="";
                    hide3();
                    return;
                }
            }
            this.payMethods.push(name);
            this.$http.post("http://localhost:8080/paymentMethod",{
                name:name
            }).then(function(response){
                document.getElementById("newinput3").value="";
                hide3();
                alert("添加方式成功!")
            }).catch(function(error){
                alert("出现了未知的错误！请重新进行输入")
            })
        },
        //删除付款方式
        deletePayMethod:function(){
            var mySelect=document.getElementById("PayMethod");
            var index=mySelect.selectedIndex;
            var name=document.getElementById("PayMethod").value;
            if(name==""){
                alert('请选择要删除的内容');
                hide4();
                return;
            }
            this.$http.delete("http://localhost:8080/paymentMethod",{
                body:{
                    name:name
                }
            }).then(function(response){
                    mySelect.options.remove(index);//下拉框中删除该元素
                    hide4();
                    alert("删除方式成功!")
                }).catch(function(error){
                console.log(error.data);
                alert("出现了未知的错误！请重新进行输入")
                hide4();
            })
        },
        //添加进款单
        addIncomeOrder:function () {
                hide5()
                var list = document.getElementById("datepicker").value.split("/");
                var month = list[0];
                var day = list[1];
                var year = list[2]
                var newDate = year+'-'+month+'-'+day+" "+this.IncomeOrder.hour+":"+this.IncomeOrder.minute+":"+this.IncomeOrder.second;


                if(this.IncomeOrder.payer==null || this.IncomeOrder.payer.length==0){
                    alert("请输入收货单位！");
                    return;
                }
                if(this.IncomeOrder.money== null|| this.IncomeOrder.money.length==0){
                    alert("请输入运费！");
                    return;
                }else if((this.IncomeOrder.hour.toString().length==2)&&(this.IncomeOrder.minute.toString().length==2)&&(this.IncomeOrder.second.toString().length==2)){
                    this.$http.post("http://localhost:8080/order/sales_income",
                        {
                        clientId:'',
                        clientName:this.IncomeOrder.payer.trim(),
                        money:this.IncomeOrder.money.trim(),
                        pay_method:this.IncomeOrder.payMethod.trim(),
                        comment:this.IncomeOrder.comment.trim(),
                        date:newDate
                    },
                        {headers:{
                            username:encodeURI(this.username)
                        }}).then(function (response) {
                        if(response.body.errorCode ==0){
                            alert("添加成功！");
                            document.getElementById("client").disabled = true;
                            document.getElementById("money").disabled = true;
                            document.getElementById("payMethod").disabled = true;
                            document.getElementById("comment").disabled = true;
                            document.getElementById("datepicker").disabled = true;
                            document.getElementById("hour").disabled = true;
                            document.getElementById("minute").disabled = true;
                            document.getElementById("second").disabled = true;
                            document.getElementById("save").disabled=true;
                        }else if(response.body.errorCode==80000001) {
                            alert("请重新登录!");
                        }
                    }).catch(function (error) {
                        console.log(error.data);
                        alert("添加失败！");
                    })
                }else{
                    alert("请规范输入时间格式！");
                }



            },

        //自动获取当前时间
        getCurrentTime:function () {
            var date = new Date();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();

            if(hour.toString().length<2){
                this.IncomeOrder.hour = '0'+hour;
            }else{
                this.IncomeOrder.hour = hour;
            }
            if(minute.toString().length<2){
                this.IncomeOrder.minute = '0'+minute;
            }else{
                this.IncomeOrder.minute = minute;
            }

            if(second.toString().length<2){
                this.IncomeOrder.second = '0'+second;
            }else{
                this.IncomeOrder.second = second;
            }

        }
    },

    mounted(){

        var date = new Date();
        var month = date.getMonth()+1;
        var day = date.getDate();

        if(month.toString().length<2){
            month = '0'+month;
        }
        if(day.toString().length<2){
            day = '0'+day;
        }
        document.getElementById("datepicker").value = month + '/' + day + '/' + date.getFullYear();

        this.username = this.getCookieValue("username");

        this.authority=this.getCookieValue("authority");

        if(this.username == ''){
            alert("请先登录！")
            window.location.href = '../index.html';
        }else if(this.authority!=0){
            alert("抱歉，您无权浏览当前页面，如有疑问，请与管理员联系");
            window.location.href = '../index.html';
            return;
        }else{
            const self = this;
            this.$http.get("http://localhost:8080/client/allName").then(function(response){
                self.payers=response.data.data;
            }).catch(function(error){
                alert("获取信息失败，请刷新重试！")
            });

            this.$http.get('http://localhost:8080/paymentMethod/allName').then(function(response){
                self.payMethods=response.data.data;
                console.log(response.data.data);
                console.log(self.payMethods);
            }).catch(function(error){
                alert("获取信息失败，请刷新重试！")
            })
        }



        //没有cookie的时候需要直接跳转到index.html

    }
});

