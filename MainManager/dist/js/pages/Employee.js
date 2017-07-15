/**
 * Created by pc on 2017/7/13.
 */
function show1(name)  //显示隐藏层和弹出层
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

function show2(name)  //显示隐藏层和弹出层
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

var vm  = new Vue({
    el:'#container',
    data:{
        deleteName:'',
        items1:[

        ],
        items2:[

        ]
    },
    methods:{
        deleteFinanceConfirm:function () {
            hide1();
            this.$http.delete("http://localhost:8080/account/Finance",{
                body : this.deleteName
            }).then(function (response) {
                if(response.body.errorCode == 0){
                    console.log(response.data.data);
                    console.log(this.deleteName)
                    alert("删除成功！");
                    window.location.reload();
                }
            }).catch(function (error) {
                console.log(this.deleteName);
                alert("删除失败！");
            })
        },
        deleteFinance:function (name) {
            show1();
            this.deleteName = name
        },

        deleteStoreConfirm:function () {
            hide2();
            this.$http.delete("http://localhost:8080/account/store",{
                body : this.deleteName
            }).then(function (response) {
                if(response.body.errorCode == 0){
                    console.log(response.data.data);
                    console.log(this.deleteName)
                    alert("删除成功！");
                    window.location.reload();
                }
            }).catch(function (error) {
                console.log(this.deleteName);
                alert("删除失败！");
            })
        },
        deleteStore:function (name) {
            show2();
            this.deleteName = name
        }
    },
    mounted(){
        this.$http.get("http://localhost:8080/account/finance").then(function (response) {
            if(response.data.errorCode == 0){
                this.items1 = response.data.data;
                setTimeout(function () {
                    $('#example1').DataTable();
                },0);
                console.log(response.data.data);
                console.log(this.items1);
            }
        }).catch(function (error) {
            alert("发生了未知的错误！");
        });

        this.$http.get("http://localhost:8080/account/store").then(function (response) {
            if(response.data.errorCode == 0){
                this.items2 = response.data.data;
                setTimeout(function () {
                    $('#example2').DataTable();
                },0);
                console.log(response.data.data);
                console.log(this.items2);
            }
        }).catch(function (error) {
            alert("发生了未知的错误！");
        })
    }
});