var vm=new Vue({
	el:'#container',
	data:{
	    items:[{
            userName:'',
            password:'',
            authority:'',
            phoneNumber:''
        }
        ]

	},
	methods:{
        login:function () {
            this.$http.post("http://localhost:8080/account/login",{
                username:this.items.username,
                password:this.items.password,
				authority:'',
                phoneNumber:'',
            }).then(function (response) {
                if(response.data.errorCode === 0 ) {
                this.items = response.data.data;
                    if(this.items.authority == 0){
                        window.location.href = "Login/MainUi.html";
                    }else if(this.items.authority == 1){
                        window.location.href = "Login/Finance/MainUi1.html";
                    }else if(this.items.authority == 2){
                        window.location.href = "Login/Store/MainUi2.html";
                    }
                }else if(response.data.errorCode === 30000001){
                    alert("输入的帐号密码不匹配！");
                }
            }).catch(function (error) {
                alert("发生了未知的错误");
            })
		}
	}

}) ;