var vm=new Vue({
	el:'#container',
	data:{
	    items:[{
            username:'',
            password:'',
            authority:'',
            phoneNumber:''
        }
        ]

	},
	methods:{
        login:function () {
            if(this.getCookieValue("username")==this.username){
                alert("您已登录！")
            }else{
                const self = this;
                this.$http.post("http://localhost:8080/account/login",{
                    username:this.items.username,
                    password:this.items.password,
                    authority:'',
                    phoneNumber:'',
                }).then(function (response) {
                    if(response.data.errorCode === 0 ) {
                        self.items = response.data.data;
                        var username = response.data.data.username;
                        this.setCookie('username',self.items.username,1);

                        if(this.items.authority == 0){
                            window.location.href = "Login/MainUi.html";

                        }else if(this.items.authority == 1){
                            window.location.href = "Login/MainUi1.html";
                        }else if(this.items.authority == 2){
                            window.location.href = "Login/MainUi2.html";
                        }
                    }else if(response.data.errorCode === 90000001){
                        alert("您输入的账号不存在！");
                    }else if(response.data.errorCode === 10000001){
                        alert("输入的密码错误！");
                    }
                }).catch(function (error) {
                    alert("发生了未知的错误");
                })


            }

		},

        setCookie:function (cname,cvalue,exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        },
        getCookieValue:function (cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return "";
        }
	}

}) ;