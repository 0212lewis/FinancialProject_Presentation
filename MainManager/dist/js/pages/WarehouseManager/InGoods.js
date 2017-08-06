/**
 * Created by dell- on 2017/7/27.
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
    var hideobj=document.getElementById("hidebg5");
    hidebg5.style.display="block";  //显示隐藏层
    hidebg5.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度
    document.getElementById("login5").style.display="block";  //显示弹出层
}
function hide5()  //去除隐藏层和弹出层
{
    document.getElementById("hidebg5").style.display = "none";
    document.getElementById("login5").style.display = "none";
}
function show6()  //显示隐藏层和弹出层
{
    var hideobj=document.getElementById("hidebg6");
    hidebg6.style.display="block";  //显示隐藏层
    hidebg6.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度
    document.getElementById("login6").style.display="block";  //显示弹出层
}
function hide6()  //去除隐藏层和弹出层
{
    document.getElementById("hidebg6").style.display = "none";
    document.getElementById("login6").style.display = "none";
}


var vm = new Vue({
    el:'#container',
    data:{
        username:'',
        authority:'',
        providers:[
        ],
        goodNames:[

        ],
        deliveryMen:[
        ],

        goodTypes:[

        ],

        totalMoney:"0",

        InGoodsOrder:{
            provider:'',
            pid:'',
            goodName:'',
            type:'',
            amount:'',
            singlePrice:'',
            total:'',
            deliveryMan:'',
            deliveryMoney:'',
            comment:'',
            date:''
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


        //添加供应商
        addProviders:function () {
            var name=document.getElementById("newinput1").value;
            for(var i=0;i<this.providers.length;i++){
                if(this.providers[i]==name){
                    alert('该供货方已经存在');
                    document.getElementById("newinput1").value="";
                    hide1();
                    return;
                }
            }
            this.providers.push(name);
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
            var mySelect = document.getElementById("Client");
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

        //得到货品类型
        getType:function () {
            this.goodTypes=[];
            var mySelect=document.getElementById("goodName");
            var index=mySelect.selectedIndex;
            var name=mySelect.options[index].value;
            this.$http.get("http://106.14.224.189:8080/product/type",{
                params:{name:name}
            })
                .then(function(response){
                    this.goodTypes=response.data.data;
                }).catch(function(error){
                console.log(error.data);
                alert("出现了未知的错误！请重新进行输入")
            })

        },

        convertDate:function (content) {
            data = content.split("/");
            year = data[2];
            month = data[0];
            day = data[1];
            return year + "-" + month + "-" + day;
        },

        //添加运货人
        addDeliveryMan:function () {
            var name=document.getElementById("newinput3").value;
            for(var i=0;i<this.deliveryMen.length;i++){
                if(this.deliveryMen[i].name==name){
                    alert('该运货人已经存在');
                    document.getElementById("newinput3").value="";
                    hide3();
                    return;
                }
            }
            this.$http.post("http://106.14.224.189:8080/deliveryman",{
                name:name
            }).then(function(response){
                document.getElementById("newinput3").value="";
                hide3();
                this.deliveryMen.push({name});
                alert("添加运货人成功!")
            }).catch(function(error){
                alert("出现了未知的错误！请重新进行输入")
            })
        },

        //删除运货人
        deleteDeliveryMan:function(){
            var mySelect=document.getElementById("DeliveryMan");
            var index=mySelect.selectedIndex;
            var name=document.getElementById("DeliveryMan").value;
            if(name==""){
                alert('请选择要删除的内容');
                hide4();
                return;
            }
            this.$http.delete("http://106.14.224.189:8080/deliveryman",{
                body:{
                    name:name
                }
            })
                .then(function(response){
                    mySelect.options.remove(index);//下拉框中删除该元素
                    hide4();
                    alert("删除运货人成功!")
                }).catch(function(error){
                console.log(error.data);
                alert("出现了未知的错误！请重新进行输入")
                hide4();
            })
        },

        //添加货品
        addGood:function () {
            var name=document.getElementById("newinput5").value;
            var type=document.getElementById("newProductType").value;
            var nameExist=0; //0表示未出现在下拉框中，1表示出现
            for(var i=0;i<this.goodNames.length;i++){
                if(this.goodNames[i]==name){
                    nameExist=1;
                    for(var j=0;j<this.goodTypes.length;j++) {
                        if(this.goodTypes[j]==type) {
                            alert('该货品已经存在');
                            document.getElementById("newinput5").value="";
                            document.getElementById("newProductType").value="";
                            hide5();
                            return;
                        }
                    }
                }
            }
            this.$http.post("http://106.14.224.189:8080/product/material",{
                name:name,
                type:type
            },{
                headers:{
                    username:encodeURI(this.username)
                }
            }).then(function(response){
                document.getElementById("newinput5").value="";
                document.getElementById("newProductType").value="";
                hide5();
                if(nameExist==0) {
                    this.goodNames.push(name);
                }
                this.goodTypes.push(type);
                alert("添加货品成功!")
            }).catch(function(error){
                alert("出现了未知的错误！请重新进行输入")
            })
        },

        calTotalMoney:function () {
            const self = this;
            unitPrice = self.InGoodsOrder.singlePrice;
            ammount = self.InGoodsOrder.amount;
            self.InGoodsOrder.total = unitPrice * ammount;
        },

        //录入进货单
        addInGoodsOrder:function () {
            hide6();
            var selectedDate=document.getElementById("datepicker").value;
            var newDate = this.convertDate(selectedDate);

            if(this.InGoodsOrder.provider==null||this.InGoodsOrder.provider.length==0){
                alert("请选择供货方！");
                return;
            }
            if(this.InGoodsOrder.goodName==""||this.InGoodsOrder.goodName==null) {
                alert("请选择进货商品名称及型号，并输入购买数量和单价");
                return;
            }
            if(this.InGoodsOrder.deliveryMan==null||this.InGoodsOrder.deliveryMan.length==0){
                alert("请选择运货人！");
                return;
            }
            if(this.InGoodsOrder.deliveryMoney==null||this.InGoodsOrder.deliveryMoney.length==0){
                alert("请输入运费！");
                return;
            }
            if(selectedDate==null||selectedDate=="") {
                alert("请选择进货日期！");
                return;
            }

            const self=this;
            this.$http.post("http://106.14.224.189:8080/order/income_product",{
                    comment: this.InGoodsOrder.comment.trim(),
                    date: newDate,
                    deliveryMan: this.InGoodsOrder.deliveryMan.trim(),
                    deliveryMoney: this.InGoodsOrder.deliveryMoney.trim(),
                    orderID: '',
                    product: {
                        orderId: '',
                        pid: this.InGoodsOrder.pid,
                        quantity: this.InGoodsOrder.amount,
                        totalMoney:this.totalMoney,
                        unitPrice: this.InGoodsOrder.singlePrice
                    },
                    providerID: '',
                    providerName: this.InGoodsOrder.provider

                },
                {headers:{
                    username:encodeURI(this.username)
                }}).then(function (response) {
                if(response.body.errorCode ==0){
                    alert("添加成功！");
                    document.getElementById("save").disabled=true;
                    document.getElementById("deliveryMan").disabled = true;
                    document.getElementById("provider").disabled = true;
                    document.getElementById("goodName").disabled = true;
                    document.getElementById("goodType").disabled = true;
                    document.getElementById("amount").disabled = true;
                    document.getElementById("singlePrice").disabled = true;
                    document.getElementById("datepicker").disabled = true;
                    document.getElementById("deliveryMoney").disabled = true;
                    document.getElementById("comment").disabled = true;
                }else if(response.data.errorCode == 80000001){
                    alert("请先登录！");
                }
            }).catch(function (error) {
                alert("添加失败！");
            })
        },

        //得到货品id
        getProductID:function () {
            var name=document.getElementById("goodName").value;
            var type=document.getElementById("goodType").value;

            this.$http.get("http://106.14.224.189:8080/product/id",{
                params:{
                    name:this.InGoodsOrder.goodName,
                    type:this.InGoodsOrder.type
                }
            },{
                headers:{
                    username:encodeURI(this.username)
                }
            }).then(function(response){
                this.InGoodsOrder.pid = response.data.data[0];
                if(this.InGoodsOrder.pid==""){
                    alert("未能获取货物ID，请刷新重试");
                    return;
                }
            }).catch(function(error){
                alert("未能获取货物ID，请刷新重试");
                hide3();
            })
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

        const self = this;
        this.username = this.getCookieValue("username");
        this.authority=this.getCookieValue("authority");

        if(this.username == ''){
            alert("请先登录！");
            window.location.href = "../index.html"
        }else if(this.authority!=2){
            alert("抱歉，您无权浏览当前页面，如有疑问，请与管理员联系");
            window.location.href = "../index.html"
            return;
        }else{
            this.$http.get("http://106.14.224.189:8080/provider/allName").then(function(response){
                self.providers=response.data.data;
            }).catch(function(error){
                alert("获取信息失败，请刷新重试！")
            });

            this.$http.get("http://106.14.224.189:8080/product/material/name").then(function(response){
                self.goodNames=response.data.data;
            }).catch(function(error){
                alert("获取信息失败，请刷新重试！")
            });

            this.$http.get("http://106.14.224.189:8080/deliveryman/allName").then(function(response){
                self.deliveryMen=response.data.data;
            }).catch(function(error){
                alert("获取信息失败，请刷新重试！")
            });
        }

    },
    computed:{
        getTotal:function() {
            if(this.InGoodsOrder.amount==""||this.InGoodsOrder.singlePrice=="") {
                this.totalMoney="0";
                return 0;
            }
            this.totalMoney=parseFloat(this.InGoodsOrder.amount)*parseFloat(this.InGoodsOrder.singlePrice);
            return parseFloat(this.InGoodsOrder.amount)*parseFloat(this.InGoodsOrder.singlePrice);
        }
    }
});

