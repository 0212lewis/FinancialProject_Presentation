/**
 * Created by pc on 2017/4/25.
 */


var tool=new Vue(
{
	el:'#app',
	data:{
	    username:'',
		years:[
        ],
		year:0,
		items:[

		]
	},
	mounted(){

        var date=new Date;
        var year=parseInt(date.getFullYear());

        for(var i=0;i<10;i++){
            this.years.push(year-i);
        }
        this.year = year;
        this.username = this.getCookieValue("username");
        if(this.username == ""){
            alert("请先登录!");
            window.location.href = "../index.html"
        }else if(this.getCookieValue("authority")!=0){
            alert("抱歉，您无权浏览当前页面，如有疑问，请与管理员联系");
            window.location.href = "../index.html"
        }else{
                    this.$http.get('http://localhost:8080/flow/money/'+this.year)
                        .then(function(response){
                                this.items=response.body;
                                console.log(this.items);
                            setTimeout(function () {
                                $('#example1').DataTable({
                                    dom: 'Bfrtip',
                                    buttons: [
                                        'copyHtml5',
                                        'excelHtml5',
                                    ]
                                });
                            }, 0);
                        }).catch(function(error){
                        alert("出现了未知的错误！请重新进行输入")
                    })
        }
	},
    methods:{

	    getMyYears:function () {
            var date=new Date;
            var year=date.getFullYear();

        },

        setCookie:function (cname,cvalue,exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*20*60*60*1000));
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
        },

        deleteCookie:function (cname) {
            this.setCookie("username","",-1);
            window.location.href="../index.html"
        },

        logout:function () {
            this.deleteCookie("username");
        },
        
        changeYear:function () {
            var select = document.getElementById("select");
            var value = select.value;
            this.year = parseInt(value);
            console.log(this.year);
            this.$http.get('http://localhost:8080/flow/money/'+this.year)
                .then(function(response){
                        this.items=response.body;
                }).catch(function(error){
                alert("出现了未知的错误！请重新进行输入")
            })

        }
    }
});
