/**
 * Created by pc on 2017/7/10.
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


var vm = new Vue({
   el:'#container' ,
    data:{
       items:[

       ],
        deleteName:''
    },
    methods:{
       deleteConfirm:function () {
           hide1();
           this.$http.delete("http://localhost:8080/client",{
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
        deleteSingleClient:function (name) {
           show1();
            this.deleteName = name
        }
    },
    beforeCreate(){
       this.$http.get("http://localhost:8080/client/allClient").then(function (response) {
           this.items = response.data.data;
           setTimeout(function () {
               $('#example1').DataTable();
           },0);
       }).catch(function (error) {
           alert("出现了未知的错误！");
       })
    }
});