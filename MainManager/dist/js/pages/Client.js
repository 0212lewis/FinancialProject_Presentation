/**
 * Created by pc on 2017/7/10.
 */
var vm = new Vue({
   el:'#container' ,
    data:{
       items:[

       ]
    },
    methods:{

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