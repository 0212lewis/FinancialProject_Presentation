/**
 * Created by dell- on 2017/7/27.
 */
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
        authority:'',
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

        print:function () {
            if(document.getElementById("save").disabled == false){
                alert("请先录入再执行打印操作！");
                return;
            }
            window.print();
        },


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

        //自动获取当前时间
        getCurrentTime:function () {
            var date = new Date();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();

            if(hour.toString().length<2){
                this.invoiceOrder.hour = '0'+hour;
            }else{
                this.invoiceOrder.hour = hour;
            }
            if(minute.toString().length<2){
                this.invoiceOrder.minute = '0'+minute;
            }else{
                this.invoiceOrder.minute = minute;
            }

            if(second.toString().length<2){
                this.invoiceOrder.second = '0'+second;
            }else{
                this.invoiceOrder.second = second;
            }

        },

        //添加客户
        addUnit:function(){
            var name=document.getElementById("newinput1").value;
            for(var i=0;i<this.invoicers.length;i++){
                if(this.invoicers[i].name==name){
                    alert('该客户已经存在');
                    document.getElementById("newinput1").value="";
                    hide1();
                    return;
                }
            }
            this.invoicers.push(name);
            this.$http.post("http://106.15.199.21:8080/client", {
                account: document.getElementById("newClientAccount").value,
                address: document.getElementById("newClientAddress").value,
                bank: document.getElementById("newClientBank").value,
                id: document.getElementById("newClientID").value,
                linkman: document.getElementById("newClientLinkMan").value,
                mailAddress: document.getElementById("newClientMailAddress").value,
                name: document.getElementById("newinput1").value,
                phoneNumber: document.getElementById("newClientPhone").value,
                taxId: document.getElementById("newClientTaxID").value
            },{
                headers:{
                    username:encodeURI(this.username)
                }
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
        deleteUnit:function(){
            var mySelect = document.getElementById("client");
            var index=mySelect.selectedIndex;
            var name=document.getElementById("client").value;
            if(name==""){
                alert('请选择要删除的内容');
                hide2();
                return;
            }
            this.$http.delete("http://106.15.199.21:8080/client",{
                body:name,

                headers:{
                    username:encodeURI(this.username)
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
        //录入开票单
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
                this.$http.post("http://106.15.199.21:8080/order/open_ticket", {
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
                        document.getElementById("client").disabled = true;
                        document.getElementById("orderId").disabled = true;
                        document.getElementById("money").disabled = true;
                        document.getElementById("comment").disabled = true;
                        document.getElementById("datepicker").disabled = true;
                        document.getElementById("hour").disabled = true;
                        document.getElementById("minute").disabled = true;
                        document.getElementById("second").disabled = true;
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
            const self = this;
            this.$http.get('http://106.15.199.21:8080/client/allName')
                .then(function(response){
                    if(response.body.errorCode == 0) {
                        self.invoicers = response.data.data;
                    }
                }).catch(function(error){
                alert("获取信息失败，请刷新重试！")
            });
        }

    }
});

