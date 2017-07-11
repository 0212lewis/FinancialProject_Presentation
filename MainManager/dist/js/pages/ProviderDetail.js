/**
 * Created by pc on 2017/7/10.
 */
var vm  = new Vue({
    el:'#container',
    data:{
        items:[

        ]
    },
    methods:{

    },
    mounted(){
        var thisUrl = document.URL;
        var getVal = thisUrl.split('?')[1];
        var id = getVal.split('=')[1];
        this.id = id;

        this.$http.get("http://localhost:8080/provider/singleProvider",{
            params:{
                providerId:this.id
            }
        }).then(function (response) {
            if(response.body.errorCode == 0){
                console.log(this.items)
                console.log(response.data.data);
                this.items = response.data.data[0];
            }
        }).catch(function (error) {
            alert("出现了未知的错误!");
        })
    }
});