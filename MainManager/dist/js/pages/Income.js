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
        addUnit:function(){
            var name=document.getElementById("newinput1").value;
            for(var i=0;i<this.payers.length;i++){
                if(this.payers[i]==name){
                    alert('该付款单位已经存在');
                    document.getElementById("newinput1").value="";
                    hide1();
                    return;
                }
            }

            this.payers.push(name);

            this.$http.post("http://localhost:8080/client",{

            }).then(function(response){
                    document.getElementById("newinput1").value="";
                    hide1();
                    alert("添加付款单位成功!")
                }).catch(function(error){
                    // console.log(error.data);
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
            this.$http.delete("http://localhost")
                .then(function(response){
                    mySelect.options.remove(index);//下拉框中删除该元素
                    hide2();
                    alert("删除付款单位成功!")
                }).catch(function(error){
                    // console.log(error.data);
                alert("出现了未知的错误！请重新进行输入")
                hide2();
            })
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
            this.payMethods.push({name});
            this.$http.post("http://localhost:8080/paymentMethod")
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
            var name=mySelect.options[index].value;
            if(name==""){
                alert('请选择要删除的内容');
                hide4();
                return;
            }
            this.$http.deletePaymentMethod("http://localhost:8080/paymentMethod").then(function(response){
                    mySelect.options.remove(index);//下拉框中删除该元素
                    hide4();
                    alert("删除进款方式成功!")
                }).catch(function(error){
                    // console.log(error.data);
                alert("出现了未知的错误！请重新进行输入")
                hide4();
            })

        },

        addIncomeOrder:function () {

            var list = document.getElementById("datepicker").value.split("/");
            var month = list[0];
            var day = list[1];
            var year = list[2]
            var newDate = year+'-'+month+'-'+day+" "+this.IncomeOrder.hour+":"+this.IncomeOrder.minute+":"+this.IncomeOrder.second;
            alert(newDate);

            if(this.IncomeOrder.payer==null || this.IncomeOrder.payer.length==0){
                alert("请输入收货单位！");
                return;
            }
            if(this.IncomeOrder.money== null|| this.IncomeOrder.money.length==0){
                alert("请输入运费！");
                return;
            }
            this.$http.post("http://localhost:8080/order/sales_income",{
                    clientId:'',
                    clientName:this.IncomeOrder.payer.trim(),
                    money:this.IncomeOrder.money.trim(),
                    pay_method:this.IncomeOrder.payMethod.trim(),
                    comment:this.IncomeOrder.comment.trim(),
                    date:newDate
            }).then(function (response) {
                alert(response.body.errorCode);
                if(response.body.errorCode ==0){
                    alert("添加成功！");
                    document.getElementById("save").disabled=true;
                }else{
                    alert("成功但是responsedata错误！");

                }
            }).catch(function (error) {
                console.log(error.data);
                alert("添加失败！");
            })

            hide5()
        }
    },

    mounted(){
        const self = this;
        this.$http.get("http://localhost:8080/client/allName").then(function(response){
                self.payers=response.data.data;
            }).catch(function(error){

            alert("出现了未知的错误！请重新进行输入")
        });

        this.$http.get('http://localhost:8080/paymentMethod/allName').then(function(response){
                self.payMethods=response.data.data;
            }).catch(function(error){
            alert("出现了未知的错误！请重新进行输入")
        })


    }
});

