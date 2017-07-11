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
        receives:[

        ],
        goodNames:[

        ],
        goodModels:[

        ],
        deliveryMen:[

        ],
        taxes:[
            {text:'是'},
            {text:'否'}
        ],
        businessMen:[

        ],

        deliveryOrder:{
            receive:"",
            good1:{
                goodName:"",
                model:"",
                num:0,
                money:0,
                total:0,
            },
            good2:{
                goodName:"",
                model:"",
                num:0,
                money:0,
                total:0,
            },
            good3:{
                goodName:"",
                model:"",
                num:0,
                money:0,
                total:0,
            },
            good4:{
                goodName:"",
                model:"",
                num:0,
                money:0,
                total:0,
            },
            good5:{
                goodName:"",
                model:"",
                num:0,
                money:0,
                total:0,
            },
            comment:"",
            deliveryMoney:0,
            createOrderMan:"",
            businessMan:"",
            deliveryMan:"",
            totalWeight:0,
            totalMoney:0,
            date:'',
            tax:''
        }

        },
    methods:{
        addDeliveryOrder:function () {
            if(this.deliveryOrder.receive==null||this.deliveryOrder.receive.length==0){
                alert("请选择收货方！");
                return;
            }else if(this.deliveryOrder.deliveryMoney==null||this.deliveryOrder.deliveryMoney.length==0){
                alert("请输入运费！");
                return;
            }else if(this.deliveryOrder.good1.goodName==null||this.deliveryOrder.good1.goodName.length==0){
                alert("请输入货品！！");
            }
            else{
                var list = this.deliveryOrder.date.split("/");

                var month = list[0];
                var day = list[1];
                var year = list[2]
                var newDate = year+'-'+month+'-'+day;
                alert(newDate);

                var hastax = false;
                if(this.deliveryOrder.tax.equals('是')){
                    hastax = true;
                }
                this.$http.post("http://localhost:8080/order/delivery_product",{
                    params:{
                        clientId:'',
                        clientName:this.deliveryOrder.receive.trim(),
                        deliveryMan:this.deliveryOrder.deliveryMan.trim(),
                        comment:this.deliveryOrder.comment.trim(),
                        deliveryMoney:this.deliveryOrder.deliveryMoney,
                        hasTax:hastax,
                        // totalWeight:parseFloat(this.deliveryOrder.totalWeight),
                        // totalMoney:parseFloat(this.deliveryOrder.totalMoney),
                        businessman:this.deliveryOrder.businessMan.trim(),
                        ticketMaker:this.deliveryOrder.createOrderMan.trim(),
                            date:newDate,
                            products:[
                                {
                                    orderId:'',
                                    quantity:this.deliveryOrder.good1.num,
                                    totalMoney:this.deliveryOrder.good1.total,
                                    product:{
                                        id:'',
                                        name:this.deliveryOrder.good1.goodName.trim(),
                                        type:this.deliveryOrder.good1.model.trim(),
                                        unitPrice:this.deliveryOrder.good1.money.trim()
                                    }
                                },
                                {
                                    orderId:'',
                                    quantity:this.deliveryOrder.good2.num,
                                    totalMoney:this.deliveryOrder.good2.total,
                                    product:{
                                        id:'',
                                        name:this.deliveryOrder.good2.goodName.trim(),
                                        type:this.deliveryOrder.good2.model.trim(),
                                        unitPrice:this.deliveryOrder.good2.money.trim()
                                    }
                                },
                                {
                                    orderId:'',
                                    quantity:this.deliveryOrder.good3.num,
                                    totalMoney:this.deliveryOrder.good3.total,
                                    product:{
                                        id:'',
                                        name:this.deliveryOrder.good3.goodName.trim(),
                                        type:this.deliveryOrder.good3.model.trim(),
                                        unitPrice:this.deliveryOrder.good3.money.trim()
                                    }
                                },
                                {
                                    orderId:'',
                                    quantity:this.deliveryOrder.good4.num,
                                    totalMoney:this.deliveryOrder.good4.total,
                                    product:{
                                        id:'',
                                        name:this.deliveryOrder.good4.goodName.trim(),
                                        type:this.deliveryOrder.good4.model.trim(),
                                        unitPrice:this.deliveryOrder.good4.money.trim()
                                    }
                                },
                                {
                                    orderId:'',
                                    quantity:this.deliveryOrder.good5.num,
                                    totalMoney:this.deliveryOrder.good5.total,
                                    product:{
                                        id:'',
                                        name:this.deliveryOrder.good5.goodName.trim(),
                                        type:this.deliveryOrder.good5.model.trim(),
                                        unitPrice:this.deliveryOrder.good5.money.trim()
                                    }
                                },

                            ],

                    }
                }).then(function (response) {
                    console.log(response.body);
                    if(response.body.error == 0){
                        console.log(response.data);
                        console.log(response.body);
                        alert("添加成功！");
                    }else{
                        console.log(response.data);
                        console.log(response.body);
                        alert("成功但是responsedata错误！");
                    }
                }).catch(function (error) {
                    alert("添加失败!");
                })
            }
        },
        addReceiver:function(){
            var name=document.getElementById("newinput1").value;
            for(var i=0;i<this.receives.length;i++){
                if(this.receives[i].name==name){
                    alert('该收货方已经存在');
                    document.getElementById("newinput1").value="";
                    hide1();
                    return;
                }
            }
            this.receives.push({name});
            const self = this;
            this.$http.get("http://106.14.224.189/server/contents/AddContent.php",{
                params:{
                    contentName:"delivery_order_receiver",
                    value:name
                }
            })
                .then(function(response){
                    document.getElementById("newinput1").value="";
                    hide1();
                    alert("添加收货方成功!")
                }).catch(function(error){
                alert("出现了未知的错误！请重新进行输入");
                hide1();
            })
        },

        deleteReceiver:function(){
            var mySelect=document.getElementById("receiver");
            var index=mySelect.selectedIndex;
            var name=mySelect.options[index].value;
            if(name==""){
                alert('请选择要删除的内容');
                hide2();
                return;
            }
            this.$http.get("http://106.14.224.189/server/contents/deleteContent.php",{
                params:{
                    contentName:"delivery_order_receiver",
                    value:name
                }
            })
                .then(function(response){
                    mySelect.options.remove(index);//下拉框中删除该元素
                    hide2();
                    alert("删除收货方成功!");
                }).catch(function(error){
                    // console.log(error.data);
                alert("出现了未知的错误！请重新进行输入");
                hide2();
            })
        },

        addGoods:function(){
            var name=document.getElementById("newinput3").value;
            for(var i=0;i<this.goodNames.length;i++){
                if(this.goodNames[i].name==name){
                    alert('该货品已经存在');
                    document.getElementById("newinput3").value="";
                    hide3();
                    return;
                }
            }
            this.goodNames.push({name});
            const self = this;
            this.$http.get("http://106.14.224.189/server/contents/AddContent.php",{
                params:{
                    contentName:"delivery_order_goodName",
                    value:name
                }
            })
                .then(function(response){
                    document.getElementById("newinput3").value="";
                    hide3();
                    alert("添加货品成功!");
                }).catch(function(error){
                alert("出现了未知的错误！请重新进行输入");
                hide3();
            })
        },

        addType:function(){
            var name=document.getElementById("newinput4").value;
            for(var i=0;i<this.goodModels.length;i++){
                if(this.goodModels[i].name==name){
                    alert('该类型已经存在');
                    document.getElementById("newinput4").value="";
                    hide4();
                    return;
                }
            }
            this.goodModels.push({name});
            const self = this;
            this.$http.get("http://106.14.224.189/server/contents/AddContent.php",{
                params:{
                    contentName:"delivery_order_goodType",
                    value:name
                }
            })
                .then(function(response){
                    document.getElementById("newinput4").value="";
                    hide4();
                    alert("添加类型成功!");
                }).catch(function(error){
                alert("出现了未知的错误！请重新进行输入");
                hide4();
            })
        },
        addDeliveryMan:function () {
            var name=document.getElementById("newinput5").value;
            for(var i=0;i<this.deliveryMen.length;i++){
                if(this.deliveryMen[i].name==name){
                    alert('该运货人已经存在');
                    document.getElementById("newinput5").value="";
                    hide5();
                    return;
                }
            }
            this.deliveryMen.push({name});

            this.$http.get("http://106.14.224.189/server/contents/AddContent.php",{
                params:{
                    contentName:"deliveryMan",
                    value:name
                }
            })
                .then(function(response){
                    document.getElementById("newinput5").value="";
                    hide5();
                    alert("添加运货人成功!");
                }).catch(function(error){
                alert("出现了未知的错误！请重新进行输入");
                hide5();
            })
        },

        deleteDeliveryMan:function(){
            var mySelect=document.getElementById("DeliveryMan");
            var index=mySelect.selectedIndex;
            var name=mySelect.options[index].value;
            if(name==""){
                alert('请选择要删除的内容');
                hide6();
                return;
            }
            this.$http.get("http://106.14.224.189/server/contents/deleteContent.php",{
                params:{
                    contentName:"deliveryMan",
                    value:name
                }
            })
                .then(function(response){
                    mySelect.options.remove(index);//下拉框中删除该元素
                    hide6();
                    alert("删除运货人成功!");
                }).catch(function(error){
                    // console.log(error.data);
                alert("出现了未知的错误！请重新进行输入");
                hide6();
            })
        }

    },

    mounted(){
        const self = this;
        this.$http.get('http://localhost:8080/',{
            params:{
                contentName:"delivery_order_receiver"
            }
        })
            .then(function(response){
                self.receives=response.data;
            }).catch(function(error){
            alert("出现了未知的错误！请重新进行输入")
        });

        this.$http.get('http://localhost:8080/contents/GetContent.php',{
            params:{
                contentName:"delivery_order_goodName"
            }
        })
            .then(function(response){
                self.goodNames=response.data;
            }).catch(function(error){
            alert("出现了未知的错误！请重新进行输入")
        });

        this.$http.get('http://106.14.224.189/server/contents/GetContent.php',{
            params:{
                contentName:"delivery_order_goodType"
            }
        })
            .then(function(response){
                self.goodModels=response.data;
            }).catch(function(error){
            alert("出现了未知的错误！请重新进行输入")
        });
        this.$http.get('http://106.14.224.189/server/contents/GetContent.php',{
            params:{
                contentName:"deliveryMan"
            }
        })
            .then(function(response){
                self.deliveryMen=response.data;
            }).catch(function(error){
            alert("出现了未知的错误！请重新进行输入")
        })
    },
    computed:{
        getTotal1:function() {
            return parseFloat(this.deliveryOrder.good1.num)*parseFloat(this.deliveryOrder.good1.money);
        },
        getTotal2:function() {
            return parseFloat(this.deliveryOrder.good2.num)*parseFloat(this.deliveryOrder.good2.money);
        },
        getTotal3:function() {
            return parseFloat(this.deliveryOrder.good3.num)*parseFloat(this.deliveryOrder.good3.money);
        },
        getTotal4:function() {
            return parseFloat(this.deliveryOrder.good4.num)*parseFloat(this.deliveryOrder.good4.money);
        },
        getTotal5:function() {
            return parseFloat(this.deliveryOrder.good5.num)*parseFloat(this.deliveryOrder.good5.money);
        },
        getTotal:function () {
            return parseFloat(this.getTotal1+this.getTotal2+this.getTotal3+this.getTotal4+this.getTotal5)
        }
    }

});

