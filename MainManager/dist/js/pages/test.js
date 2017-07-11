/**
 * Created by pc on 2017/7/10.
 */
var a = "07/12/2012";
var list = a.split("/");

var month = list[0];
var day = list[1];
var year = list[2]
var newDate = year+'-'+month+'-'+day;
alert(newDate);