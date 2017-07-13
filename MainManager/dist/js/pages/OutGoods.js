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

       goodModels1:[

       ],

        goodModels2:[

        ],

        goodModels3:[

        ],

        goodModels4:[

        ],

        goodModels5:[

        ],

        // goodModels:{
        //     models1:this.goodModels1,
        //     models2:this.goodModels2,
        //     models3:this.goodModels3,
        //     models4:this.goodModels4,
        //     models5:this.goodModels5,
        // },

        goodModels:[this.goodModels1,this.goodModels2,this.goodModels3,this.goodModels4,this.goodModels5],

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
                alert("请选择收货方");
                return;
            }
            if(this.deliveryOrder.good1.goodName==null||this.deliveryOrder.good1.goodName.length==0){
                alert("请输入货品信息");
                return;
            }
            if(this.deliveryOrder.deliveryMan==null||this.deliveryOrder.deliveryMan==""){
                alert("请选择运货人");
                return;
            }
            if(this.deliveryOrder.businessMan==null||this.deliveryOrder.businessMan==""){
                alert("请选择业务员");
                return;
            }
            if(this.deliveryOrder.deliveryMoney==null||this.deliveryOrder.deliveryMoney.length==0){
                alert("请输入运费");
                return;
            }

            var newDate = this.convertDate(this.convertDate(document.getElementById("datepicker").value));
            alert(newDate);

            var hasTax = false;
            if(this.deliveryOrder.tax.equals('是')){
                hasTax = true;
            }
            this.$http.post("http://localhost:8080/order/delivery_product",{
                params:{
                    clientId:'',
                    clientName:this.deliveryOrder.receive.trim(),
                    deliveryMan:this.deliveryOrder.deliveryMan.trim(),
                    comment:this.deliveryOrder.comment.trim(),
                    deliveryMoney:this.deliveryOrder.deliveryMoney,
                    hasTax:hasTax,
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
        },

        setCommentByTax:function () {
            var mySelect=document.getElementById("taxSelect");
            var index=mySelect.selectedIndex;
            var content=mySelect.options[index].value;
            if(content=="否") {
                this.deliveryOrder.comment="不含税";
            }
        },

        convertDate:function (content) {
            data=content.split("/");
            year = data[2];
            month = data[0];
            day = data[1];
            return year + "-" + month + "-" + day;
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
            this.$http.get("http://localhost:8080/",{
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
            var type=document.getElementById("productType").value;
            var nameExist = 0;  //0表示未出现在下拉框中，1表示出现

            this.goodModels.forEach(function(item){
                alert(item)
            });

            for(var i=0;i<this.goodNames.length;i++){
                if(this.goodNames[i]==name){
                    nameExist = 1;
                    for(var j=0;j<this.goodModels.length;j++) {
                        alert(this.goodModels.get(0));
                        for(var k=0;k<this.goodModels[j].length;k++) {
                            if(this.goodModels[j][k]==type) {
                                alert('该货品已经存在');
                                document.getElementById("newinput3").value="";
                                document.getElementById("productType").value="";
                                hide3();
                                return;
                            }
                        }
                    }
                }
            }
            const self = this;
            this.$http.get("http://localhost:8080/product/product",{
                name:name,
                type:type
            }).then(function(response){
                document.getElementById("newinput3").value="";
                document.getElementById("newProductType").value="";
                hide3();
                if(nameExist==0) {
                    this.goodNames.push(name);
                }
                this.goodModels.push(type);
                alert("添加货品成功!");
                }).catch(function(error){
                alert("出现了未知的错误！请重新进行输入");
                hide3();
            })
        },

        getType:function (content) {
            // alert(content)
            // this.goodModels1=[];
            var mySelect=document.getElementById(content);
            var index=mySelect.selectedIndex;
            var name=mySelect.options[index].value;
            var number=content.substring(8)
            this.$http.get("http://localhost:8080/product/type",{
                params:{name:name}
            })
                .then(function(response){
                    alert(response.data.data)
                    this.goodModels1=response.data.data;
                    this.goodModels.push(this.goodModels1);
                    alert(this.goodModels);
                }).catch(function(error){
                console.log(error.data);
                alert("出现了未知的错误！请重新进行输入")
            })
        },

        addType:function(){

            var productName = document.getElementById("newinput3").value;
            if(productName==""||productName==null) {
                alert("请选择要为之增加型号的货物");
                return;
            }
            var name = document.getElementById("newinput4").value;
            for(var i=0;i<this.goodModels.length;i++){
                if(this.goodModels[i]==name){
                    alert('该类型已经存在');
                    document.getElementById("newinput4").value="";
                    hide4();
                    return;
                }
            }
            const self = this;
            this.$http.post("http://localhost:8080/product/product",{
                name:productName,
                type:name
            }).then(function(response){
                    document.getElementById("newinput4").value="";
                    hide4();
                    this.goodModels.push(name);
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
            this.$http.post("http://localhost:8080/deliveryman",{
                name:name
            }).then(function(response){
                document.getElementById("newinput5").value="";
                hide5();
                alert("添加运货人成功!")
            }).catch(function(error){
                alert("出现了未知的错误！请重新进行输入")
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
            this.$http.delete("http://localhost:8080/deliveryman",{
                body:{
                    name:name
                }
            })
                .then(function(response){
                    mySelect.options.remove(index);//下拉框中删除该元素
                    hide6();
                    alert("删除运货人成功!")
                }).catch(function(error){
                // console.log(error.data);
                alert("出现了未知的错误！请重新进行输入")
                hide6();
            })
        }

    },

    mounted(){
        const self = this;

    this.$http.get("http://localhost:8080/client/allName").then(function(response){
                self.receives=response.data.data;
            }).catch(function(error){
            alert("出现了未知的错误！请重新进行输入")
        });

        this.$http.get("http://localhost:8080/product/product/name").then(function(response){
                self.goodNames=response.data.data;
            }).catch(function(error){
            alert("出现了未知的错误！请重新进行输入")
        });

        // this.$http.get("http://localhost:8080/product/").then(function(response){
        //         self.goodModels=response.data.data;
        //     }).catch(function(error){
        //     alert("出现了未知的错误！请重新进行输入")
        // });

        this.$http.get("http://localhost:8080/deliveryman/allName").then(function(response){
            self.deliveryMen=response.data.data;
        }).catch(function(error){
            alert("出现了未知的错误！请重新进行输入")
        });

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

