var dayToArray = ['日','一','二','三','四','五','六'];
export const formateTime = (timestamp) => {
  if(new Date(timestamp).toString()==="Invalid Date") return "";
  var time = new Date(timestamp);
  var now = new Date();
  var timeTo = (time.getTime() - now.getTime())/1000;
  if (timeTo < 0) return '已截止'
  var month = time.getMonth() + 1;
  var date = time.getDate();
  date = (date > 9) ? date : ('0'+date)
  month = (month > 9) ? month : ('0'+month);
  var hours = (time.getHours() > 9) ? time.getHours() : ('0'+time.getHours());
  var minutes = (time.getMinutes() > 9) ? time.getMinutes() : ('0'+time.getMinutes());
  timeTo = timeTo.toFixed();
  if(timeTo < 86400) {
    if(timeTo < 3600) return '只剩'+ (timeTo/60).toFixed() + '分钟了喔';
    else return '还有' + (timeTo/3600).toFixed() + "小时";
  } else {
    return month+'/'+date+' '+hours+':'+minutes;
  }
}