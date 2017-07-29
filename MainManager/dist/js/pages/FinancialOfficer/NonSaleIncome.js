/**
 * Created by dell- on 2017/7/27.
 */
/**
 * Created by pc on 2017/7/12.
 */
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
        payers:[

        ],

        payMethods:[

        ],

        IncomeOrder:{
            payer:'',
            money:'',
            payMethod:'',
            comment:'销售外收入',
            date:'',
            hour:'',
            minute:'',
            second:''
        }

    },
    methods:{
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
        //删除cookies
        deleteCookie:function (cname) {
            this.setCookie("username","",-1);
            window.location.href="../index.html"
        },

        //登出
        logout:function () {
            this.deleteCookie("username");
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

        },

        addPayMethod:function(){
            var name=document.getElementById("newinput3").value;
            for(var i=0;i<this.payMethods.length;i++){
                if(this.payMethods[i]==name){
                    alert('该进款方式已存在');
                    document.getElementById("newinput3").value="";
                    hide3();
                    return;
                }
            }
            this.payMethods.push(name);
            this.$http.post("http://localhost:8080/paymentMethod",{
                name:name
            })
                .then(function(response){
                    document.getElementById("newinput3").value="";
                    hide3();
                    alert("添加进款方式成功!")
                }).catch(function(error){
                alert("出现了未知的错误！请重新进行输入")
            })
        },

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

                alert("删除进款方式成功!!")
            }).catch(function(error){
                // console.log(error.data);
                alert("出现了未知的错误！请重新进行输入")
                hide4();
            })

        },

        addIncomeOrder:function () {
            hide5()
            var list = document.getElementById("datepicker").value.split("/");
            var month = list[0];
            var day = list[1];
            var year = list[2]
            var newDate = year+'-'+month+'-'+day+" "+this.IncomeOrder.hour+":"+this.IncomeOrder.minute+":"+this.IncomeOrder.second;


            if(this.IncomeOrder.payer==null || this.IncomeOrder.payer.length==0){
                alert("请输入对方单位！");
                return;
            }
            if(this.IncomeOrder.money== null|| this.IncomeOrder.money.length==0){
                alert("请输入金额！");
                return;
            }else if((this.IncomeOrder.hour.toString().length==2)&&(this.IncomeOrder.minute.toString().length==2)&&(this.IncomeOrder.second.toString().length==2)){
                this.$http.post("http://localhost:8080/order/no_sales_income",{
                    otherName:this.IncomeOrder.payer.trim(),
                    money:this.IncomeOrder.money.trim(),
                    pay_method:this.IncomeOrder.payMethod.trim(),
                    comment:this.IncomeOrder.comment.trim(),
                    date:newDate
                },{
                    headers:{
                        username:encodeURI(this.username)
                    }
                }).then(function (response) {
                    if(response.body.errorCode ==0){
                        alert("添加成功！");
                        document.getElementById("save").disabled=true;
                    }else if(response.data.errorCode == 80000001){
                        alert("请先登录！");
                        window.location.href = "../index.html"

                    }
                }).catch(function (error) {
                    console.log(error.data);
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
            window.location.href = "../index.html"
            return;
        }else{
            this.$http.get('http://localhost:8080/paymentMethod/allName').then(function(response){
                this.payMethods=response.data.data;
                console.log(response.data.data);
                console.log(this.payMethods);
            }).catch(function(error){
                alert("出现了未知的错误！请重新进行输入")
            })
        }

    }
});

