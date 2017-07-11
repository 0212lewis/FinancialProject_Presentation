var vm=new Vue({
	el:'#container',
	data:{},
	methods:{
		checkLogin:function(){
			var userName=document.getElementById("username").value;
			var password=document.getElementById("password").value;
			const self=this;
			this.$http.get("http://106.14.224.189/server/user/checkLogin.php",{
				params:{
					username:self.userName,
					password:self.password
				}
			}).then(function(response){
					alert('登录成功');                    
                }).catch(function(error){
                alert("登录失败");
            })
		}
	}

}) 