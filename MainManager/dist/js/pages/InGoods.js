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

var vm = new Vue({
    el:'#container',
    data:{
        providers:[
        ],
        goodNames:[
            
        ],
        deliveryMen:[
            
            ],


        InGoodsOrder:{
            provider:'',
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
        addProviders:function () {
            var name=document.getElementById("newinput1").value;
            for(var i=0;i<this.providers.length;i++){
                if(this.providers[i].name==name){
                    alert('该供货方已经存在');
                    document.getElementById("newinput1").value="";
                    hide1();
                    return;
                }
            }
            this.providers.push({name});
            this.$http.get("http://106.14.224.189/server/contents/AddContent.php",{
                params:{
                    contentName:"purchase_order_goodProvider",
                    value:name
                }
            }).then(function(response){
                    document.getElementById("newinput1").value="";
                    hide1();
                    alert("添加供货方成功!")
                }).catch(function(error){
                alert("出现了未知的错误！请重新进行输入")
            })
        },


        deleteProviders:function(){
            var mySelect=document.getElementById("goodsprovider");
            var index=mySelect.selectedIndex;
            var name=mySelect.options[index].value;
            if(name==""){
                alert('请选择要删除的内容');
                hide2();
                return;
            }
            this.$http.get("http://106.14.224.189/server/contents/deleteContent.php",{
                params:{
                    contentName:"purchase_order_goodProvider",
                    value:name
                }
            })
                .then(function(response){
                    mySelect.options.remove(index);//下拉框中删除该元素
                    hide2();
                    alert("删除供货方成功!")
                }).catch(function(error){
                    // console.log(error.data);
                alert("出现了未知的错误！请重新进行输入")
                hide2();
            })
        },

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
            this.deliveryMen.push({name});
            this.$http.get("http://106.14.224.189/server/contents/AddContent.php",{
                params:{
                    contentName:"deliveryMan",
                    value:name
                }
            }).then(function(response){
                    document.getElementById("newinput3").value="";
                    hide3();
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
                hide4();
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
                    hide4();
                    alert("删除运货人成功!")
                }).catch(function(error){
                    // console.log(error.data);
                alert("出现了未知的错误！请重新进行输入")
                hide4();
            })
        },

        addGood:function () {
            var name=document.getElementById("newinput5").value;
            for(var i=0;i<this.goodNames.length;i++){
                if(this.goodNames[i].name==name){
                    alert('该货品已经存在');
                    document.getElementById("newinput5").value="";
                    hide5();
                    return;
                }
            }
            this.goodNames.push({name});
            this.$http.get("http://106.14.224.189/server/contents/AddContent.php",{
                params:{
                    contentName:"purchase_order_goodName",
                    value:name
                }
            }).then(function(response){
                document.getElementById("newinput5").value="";
                hide5();
                alert("添加货品成功!")
            }).catch(function(error){
                alert("出现了未知的错误！请重新进行输入")
            })
        },

        

        addInGoodsOrder:function () {
            if(this.InGoodsOrder.provider==null||this.InGoodsOrder.provider.length==0){
                alert("请选择供货方！");

            }else if(this.InGoodsOrder.deliveryMan==null||this.InGoodsOrder.deliveryMan.length==0){
                alert("请选择运货人！");
                // return;
            }else if(this.InGoodsOrder.deliveryMoney==null||this.InGoodsOrder.deliveryMoney.length==0){
                alert("请输入运费！");
                // return;
            }else{
                const self=this;
                this.$http.get("http://106.14.224.189/server/addOrder/AddPurchaseOrder.php",{
                    params:{
                        providedUnit:self.InGoodsOrder.provider.trim(),
                        goodName:self.InGoodsOrder.goodName,
                        model:self.InGoodsOrder.type,
                        num:self.InGoodsOrder.amount,
                        unitPrice:self.InGoodsOrder.singlePrice,
                        total:self.InGoodsOrder.total,
                        deliveryMan:self.InGoodsOrder.deliveryMan.trim(),
                        deliveryMoney:self.InGoodsOrder.deliveryMoney.trim(),
                        comment:self.InGoodsOrder.comment.trim()
                    }
                }).then(function (response) {
                    if(response.body.error ==0){
                        console.log(response.data);
                        console.log(response.body);
                        alert("添加成功！");
                    }else{
                        console.log(response.data);
                        console.log(response.body);
                        alert("成功但是responsedata错误！");
                    }
                }).catch(function (error) {
                    alert("添加失败！");
                })

            }
        }
    },
    mounted(){
        this.$http.get('http://106.14.224.189/server/contents/GetContent.php',{
            params:{
                contentName:"purchase_order_goodProvider"
            }
        })
            .then(function(response){
                this.providers=response.data;
            }).catch(function(error){
            alert("出现了未知的错误！请重新进行输入")
        });

        this.$http.get('http://106.14.224.189/server/contents/GetContent.php',{
            params:{
                contentName:"purchase_order_goodName"
            }
        })
            .then(function(response){
                this.goodNames=response.data;
            }).catch(function(error){
            alert("出现了未知的错误！请重新进行输入")
        });

        this.$http.get('http://106.14.224.189/server/contents/GetContent.php',{
            params:{
                contentName:"deliveryMan"
            }
        })
            .then(function(response){
                this.deliveryMen=response.data;
            }).catch(function(error){
            alert("出现了未知的错误！请重新进行输入")
        });
    }
});

