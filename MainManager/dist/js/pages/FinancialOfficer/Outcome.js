/**
 * Created by dell- on 2017/7/27.
 */
/**
 * Created by pc on 2017/4/25.
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
        authority:'',
        receives:[

        ],

        methods:[

        ],
        payMoneyOrder:{
            receive:"",
            method:"",
            payMoneyDate:"",
            comment:"",
            money:"",
            date:'',
            hour:'',
            minute:'',
            second:''
        },

    },
    methods:{

        print:function () {
            if(document.getElementById("save").disabled == false){
                alert("请先录入再执行打印操作！");
                return;
            }
            window.print();
        },

        //登出
        logout:function () {
            this.deleteCookie("username");
        },
        //设置cookies
        setCookie:function (cname,cvalue,exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*20*60*60*1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        },

        //得到cookies
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
        //自动获取当前时间
        getCurrentTime:function () {
            var date = new Date();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();

            if(hour.toString().length<2){
                this.payMoneyOrder.hour = '0'+hour;
            }else{
                this.payMoneyOrder.hour = hour;
            }
            if(minute.toString().length<2){
                this.payMoneyOrder.minute = '0'+minute;
            }else{
                this.payMoneyOrder.minute = minute;
            }

            if(second.toString().length<2){
                this.payMoneyOrder.second = '0'+second;
            }else{
                this.payMoneyOrder.second = second;
            }

        },

        //删除cookies
        deleteCookie:function (cname) {
            this.setCookie("username","",-1);
            window.location.href="../index.html"
        },

        //添加新的供应商
        addProviders:function () {
            var name=document.getElementById("newinput1").value;
            for(var i=0;i<this.receives.length;i++){
                if(this.receives[i]==name){
                    alert('该供货方已经存在');
                    document.getElementById("newinput1").value="";
                    hide1();
                    return;
                }
            }
            this.receives.push(name);
            this.$http.post("http://106.14.224.189:8080/provider", {
                account: document.getElementById("newProviderAccount").value,
                address: document.getElementById("newProviderAddress").value,
                bank: document.getElementById("newProviderBank").value,
                id: document.getElementById("newProviderID").value,
                linkman: document.getElementById("newProviderLinkMan").value,
                mail_address: document.getElementById("newProviderMailAddress").value,
                name: document.getElementById("newinput1").value,
                phone_number: document.getElementById("newProviderPhone").value,
                tax_id: document.getElementById("newProviderTaxID").value
            },{
                headers:{
                    username:encodeURI(this.username)
                }
            }).then(function (response) {
                document.getElementById("newinput1").value = "";
                document.getElementById("newProviderAccount").value = "";
                document.getElementById("newProviderAddress").value = "";
                document.getElementById("newProviderBank").value = "";
                document.getElementById("newProviderID").value = "";
                document.getElementById("newProviderLinkMan").value = "";
                document.getElementById("newProviderMailAddress").value = "";
                document.getElementById("newProviderPhone").value = "";
                document.getElementById("newProviderTaxID").value = "";
                hide1();
                alert("添加供货方成功!")
            }).catch(function (error) {
                alert("出现了未知的错误！请重新进行输入")
            });
        },
        //删除供应商
        deleteProviders:function(){
            var mySelect=document.getElementById("goodsprovider");
            var index=mySelect.selectedIndex;
            var name=document.getElementById("goodsprovider").value;
            if(name==""){
                alert('请选择要删除的内容');
                hide2();
                return;
            }
            this.$http.delete("http://106.14.224.189:8080/provider",{
                body:name,
                headers:{
                    username:encodeURI(this.username)
                }
            })
                .then(function(response){
                    mySelect.options.remove(index);//下拉框中删除该元素
                    hide2();
                    alert("删除供货方成功!")
                }).catch(function(error){
                console.log(error.data);
                alert("出现了未知的错误！请重新进行输入")
                hide2();
            })
        },
        //添加新的付款方式
        addPayMethod:function(){
            var name=document.getElementById("newinput3").value;
            for(var i=0;i<this.methods.length;i++){
                if(this.methods[i]==name){
                    alert('该方式已经存在');
                    document.getElementById("newinput3").value="";
                    hide3();
                    return;
                }
            }
            this.methods.push(name);
            this.$http.post("http://106.14.224.189:8080/paymentMethod",{
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
            var mySelect=document.getElementById("paymentMethod");
            var index=mySelect.selectedIndex;
            var name=document.getElementById("paymentMethod").value;
            if(name==""){
                alert('请选择要删除的内容');
                hide4();
                return;
            }
            this.$http.delete("http://106.14.224.189:8080/paymentMethod",{
                body:{
                    name:name
                }
            })
                .then(function(response){
                    mySelect.options.remove(index);//下拉框中删除该元素
                    hide4();
                    alert("删除方式成功!")
                }).catch(function(error){
                console.log(error.data);
                alert("出现了未知的错误！请重新进行输入")
                hide4();
            })
        },
        //录入付款单
        addOutcomeOrder:function () {
            hide5();
            if(this.payMoneyOrder.receive==null||this.payMoneyOrder.receive.length==0){
                alert("请选择对方名称！");
                return;
            }else if(this.payMoneyOrder.money==null||this.payMoneyOrder.money.length==0){
                alert("请输入运费！");
                return;
            }else if((this.payMoneyOrder.hour.toString().length==2)&&(this.payMoneyOrder.minute.toString().length==2)&&(this.payMoneyOrder.second.toString().length==2)){
                const self=this;
                var list = document.getElementById("datepicker").value.split("/");
                var month = list[0];
                var day = list[1];
                var year = list[2]
                var newDate = year+'-'+month+'-'+day+" "+this.payMoneyOrder.hour+":"+this.payMoneyOrder.minute+":"+this.payMoneyOrder.second;
                this.$http.post("http://106.14.224.189:8080/order/pay_money",{
                        providerID:'',
                        providerName:this.payMoneyOrder.receive.trim(),
                        pay_method:this.payMoneyOrder.method.trim(),
                        money:this.payMoneyOrder.money,
                        comment:this.payMoneyOrder.comment.trim(),
                        date:newDate

                    },
                    {
                        headers:{
                            username:encodeURI(this.username)
                        }
                    }).then(function (response) {
                    if(response.body.errorCode ==0){
                        alert("添加成功！");
                        document.getElementById("provider").disabled = true;
                        document.getElementById("money").disabled = true;
                        document.getElementById("payMethod").disabled = true;
                        document.getElementById("comment").disabled = true;
                        document.getElementById("datepicker").disabled = true;
                        document.getElementById("hour").disabled = true;
                        document.getElementById("minute").disabled = true;
                        document.getElementById("second").disabled = true;
                        document.getElementById("save").disabled=true;
                    }else if(response.data.errorCode == 80000001){
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
        this.authority = this.getCookieValue("authority");

        if(this.username == ""){
            alert("请先登录！");
            window.location.href = "../index.html"
        }else if(this.authority!=1) {
            alert("抱歉，您无权浏览当前页面，如有疑问，请与管理员联系");
            window.location.href = "../index.html";
            return;
        }else{
            const self = this;
            this.$http.get('http://106.14.224.189:8080/provider/allName')
                .then(function(response){
                    self.receives=response.data.data;
                }).catch(function(error){
                alert("获取信息失败，请刷新重试！");
            });

            this.$http.get('http://106.14.224.189:8080/paymentMethod/allName')
                .then(function(response){
                    self.methods=response.data.data;
                }).catch(function(error){
                alert("获取信息失败，请刷新重试！");
            })
        }

    }


});