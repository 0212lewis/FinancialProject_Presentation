/**
 * Created by pc on 2017/4/25.
 */

var tool=new Vue(
{
	el:'#app1',
	data:{
	    years:[

        ],
	    year:'',
	    username:'',
		totalMoney:0,
		totalNum:0,
		totalDeliveryMoney:0,
		average:0,
		items:[

		],
		table:'',
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
            alert("请先登录！");
            window.location.href = "../index.html";
        }else if(this.getCookieValue("authority")!=0){
            alert("抱歉，您无权浏览当前页面，如有疑问，请与管理员联系");
            window.location.href = "../index.html"
        }else{
                    this.$http.get('http://localhost:8080/flow/sales/'+this.year)
                        .then(function(response){
                            this.items=response.data.data;
                        }).catch(function(error){
                        alert("出现了未知的错误！请重新进行输入")
                    })
                }
	},
	methods:{

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

		getTotalMoney:function () {
			var sum = 0;
			for(var i = 0;i<items.length;i++){
				sum = parseFloat(this.item[i].total)+sum;
			}
			return sum;
        },
		getTotalNum:function () {
            // window.setTimeout(this.getTotalNum,5000);
            var table = document.getElementById("example1");
            var sum = 0;
            for(var i=1;i<table.rows.length-2;i++)
            {
                sum = parseFloat(parseFloat(table.rows[i].cells[5].innerHTML)+parseFloat(sum));
            }
            return sum;
        },
		getTotalDeliveryMoney:function () {
            var table = document.getElementById("example1");
            var sum = 2;
            for(var i=1;i<table.rows.length-2;i++)
            {
                sum = parseFloat(table.rows[i].cells[9].innerHTML+sum);
            }
            return sum;
        },
		getAverage:function () {
			var result = parseFloat((this.getTotalMoney-this.getTotalDeliveryMoney)/this.getTotalNum);
			return result;
        },
        changeYear:function () {
            var select = document.getElementById("select");
            var value = select.value;
            this.year = parseInt(value);
            console.log(this.year);
            this.$http.get('http://localhost:8080/flow/sales/'+this.year)
                .then(function(response){
                    this.items=response.data.data;
                }).catch(function(error){
                alert("出现了未知的错误！请重新进行输入")
            })

        }
	}
});
