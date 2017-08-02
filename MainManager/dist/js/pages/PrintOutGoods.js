/**
 * Created by dell- on 2017/7/23.
 */
function leave(){
    window.localStorage.clear();
}

function dateConvert(content) {
    data=content.split("/");
    year = data[2];
    month = data[0];
    day = data[1];
    return year + "-" + month + "-" + day;
}

var storage=window.localStorage;
var cname=storage.getItem("clientName");
var deliveryman = storage.getItem("deliveryMan");
var comment = storage.getItem("comment");
var date;
if(storage.getItem("date")==""){
    date=""
}else {
    date=dateConvert(storage.getItem("date"))
}
var goodname1 = storage.getItem("goodname1");
var goodtype1 = storage.getItem("goodtype1");
var goodammount1 = storage.getItem("goodammount1");
var goodunitprice1 = storage.getItem("goodunitprice1");
var goodtotal1 = storage.getItem("goodtotal1");

var goodname2 = storage.getItem("goodname2");
var goodtype2 = storage.getItem("goodtype2");
var goodammount2 = storage.getItem("goodammount2");
var goodunitprice2 = storage.getItem("goodunitprice2");
var goodtotal2 = storage.getItem("goodtotal2");

var goodname3 = storage.getItem("goodname3");
var goodtype3 = storage.getItem("goodtype3");
var goodammount3 = storage.getItem("goodammount3");
var goodunitprice3 = storage.getItem("goodunitprice3");
var goodtotal3 = storage.getItem("goodtotal3");

var goodname4 = storage.getItem("goodname4");
var goodtype4 = storage.getItem("goodtype4");
var goodammount4 = storage.getItem("goodammount4");
var goodunitprice4 = storage.getItem("goodunitprice4");
var goodtotal4 = storage.getItem("goodtotal4");

var goodname5 = storage.getItem("goodname5");
var goodtype5 = storage.getItem("goodtype5");
var goodammount5 = storage.getItem("goodammount5");
var goodunitprice5 = storage.getItem("goodunitprice5");
var goodtotal5 = storage.getItem("goodtotal5");

var ticketmaker = storage.getItem("ticketmaker");
var businessman = storage.getItem("businessman");

if(goodammount1==0) {
    goodammount1='';
}
if(goodammount2==0) {
    goodammount2='';
}
if(goodammount3==0) {
    goodammount3='';
}
if(goodammount4==0) {
    goodammount4='';
}
if(goodammount5==0) {
    goodammount5='';
}
if(goodunitprice1==0) {
    goodunitprice1 = '';
}
if(goodunitprice2==0) {
    goodunitprice2 = '';
}
if(goodunitprice3==0) {
    goodunitprice3 = '';
}
if(goodunitprice4==0) {
    goodunitprice4 = '';
}
if(goodunitprice5==0) {
    goodunitprice5 = '';
}
if(goodtotal1==0) {
    goodtotal1 = '';
}
if(goodtotal2==0) {
    goodtotal2 = '';
}
if(goodtotal3==0) {
    goodtotal3 = '';
}
if(goodtotal4==0) {
    goodtotal4 = '';
}
if(goodtotal5==0) {
    goodtotal5 = '';
}

document.getElementById("goodname1").innerHTML = goodname1;
document.getElementById("goodtype1").innerHTML = goodtype1;
document.getElementById("goodammount1").innerHTML = goodammount1;
document.getElementById("singleprice1").innerHTML = goodunitprice1;
document.getElementById("totalprice1").innerHTML = goodtotal1;

document.getElementById("goodname2").innerHTML = goodname2;
document.getElementById("goodtype2").innerHTML = goodtype2;
document.getElementById("goodammount2").innerHTML = goodammount2;
document.getElementById("singleprice2").innerHTML = goodunitprice2;
document.getElementById("totalprice2").innerHTML = goodtotal2;

document.getElementById("goodname3").innerHTML = goodname3;
document.getElementById("goodtype3").innerHTML = goodtype3;
document.getElementById("goodammount3").innerHTML = goodammount3;
document.getElementById("singleprice3").innerHTML = goodunitprice3;
document.getElementById("totalprice3").innerHTML = goodtotal3;

document.getElementById("goodname4").innerHTML = goodname4;
document.getElementById("goodtype4").innerHTML = goodtype4;
document.getElementById("goodammount4").innerHTML = goodammount4;
document.getElementById("singleprice4").innerHTML = goodunitprice4;
document.getElementById("totalprice4").innerHTML = goodtotal4;

document.getElementById("goodname5").innerHTML = goodname5;
document.getElementById("goodtype5").innerHTML = goodtype5;
document.getElementById("goodammount5").innerHTML = goodammount5;
document.getElementById("singleprice5").innerHTML = goodunitprice5;
document.getElementById("totalprice5").innerHTML = goodtotal5;

document.getElementById("cname").innerHTML=cname;
document.getElementById("date").innerHTML=date;
document.getElementById("comment").innerHTML = comment;
document.getElementById("ticketmaker").innerHTML = ticketmaker;
document.getElementById("businessman").innerHTML = businessman;

var vm = new Vue({
    el:'#container',
    data:{

    },
    mounted(){
        if(cname=="") {
            alert("请选择收货单位");
            window.location.href="../Nodes/OutGoods.html"
            // return;
        }
        this.$http.get("http://localhost:8080/order/orderid", {
            params: {
                clientName: cname,
            },
            headers:{
                username:encodeURI(this.username)
            }
        }).then(function (response) {
            document.getElementById("orderid").innerHTML = response.data.data;
        }).catch(function (error) {
            alert("未能获取订单编号，请与系统管理员联系");
            window.history.back()
        });

    },
});