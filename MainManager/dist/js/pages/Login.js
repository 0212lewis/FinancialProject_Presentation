var vm=new Vue({
	el:'#container',
	data:{
		userName:'',
		password:'',
		authority:''
	},
	methods:{
        login:function () {
            const self = this;
            this.$http.post("http://localhost:8080/login",{
                username:self.userName,
                password:self.password,
				authority:self.authority
            }).then(function (response) {
                if(response.data.errorCode === 0 ) {
//                          console.log("登录成功！");
                    var x_token = response.data.data;
                    self.setCookie("x_token", x_token, 1);
                    self.setCookie("phoneNumber", self.userName, 1);
//                          alert("登录成功！");
                    window.location.href = "Main.html";
                }else if(response.data.errorCode === 30000001){
                    alert("输入的帐号密码不匹配！");
                }
                else {
                    alert("发生了未知的错误");
                }
            }).catch(function (error) {
                alert("发生了未知的错误");
            })
		}
	}

}) 