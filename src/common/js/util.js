/**
 * Created by libo on 2018/1/11.
 */
import axios from 'axios'
var now = new Date();                    //当前日期
var nowDay = now.getDate();              //当前日
var nowMonth = now.getMonth();           //当前月
var nowYear = now.getYear();             //当前年
nowYear += (nowYear < 2000) ? 1900 : 0;  //
var nowDayOfWeek = now.getDay() //今天本周的第几天
nowDayOfWeek = nowDayOfWeek == 0 ? 7:nowDayOfWeek
Date.prototype.format = function(fmt)
{ //author: meizz
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}


export  function getMonthStartDate() {
  let weekStartDate = new Date(nowYear,nowMonth,1)
  return weekStartDate
}

export function getWeekStartDate() {
  let weekStartDate = new Date(nowYear,nowMonth,nowDay - nowDayOfWeek + 1)
  return weekStartDate
}
