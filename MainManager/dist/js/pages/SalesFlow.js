/**
 * Created by pc on 2017/4/25.
 */

var tool=new Vue(
{
	el:'#app1',
	data:{
		items:[

		]
	},
	mounted(){
		const self = this;
		this.$http.get('http://106.14.224.189/server/flow/SalesFlow.php')
		.then(function(response){
			self.items=response.data;
            setTimeout(function () {
                $('#example1').DataTable();
            },0);
		}).catch(function(error){
			alert("出现了未知的错误！请重新进行输入")
		})
	}
});
