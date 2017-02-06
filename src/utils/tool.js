var dayToArray = ['日','一','二','三','四','五','六'];
export const formateTime = (timestamp) => {
  timestamp = parseInt(timestamp, 10);
  if(new Date(timestamp).toString()==="Invalid Date") return "";
  var time = new Date(timestamp);
  var now = new Date();
  var timeTo = (time.getTime() - now.getTime())/1000;
  if (timeTo < 0) return '已'
  var month = time.getMonth() + 1;
  month = (month > 9) ? month : ('0'+month);
  var hours = (time.getHours() > 9) ? time.getHours() : ('0'+time.getHours());
  var minutes = (time.getMinutes() > 9) ? time.getMinutes() : ('0'+time.getMinutes());
  timeTo = timeTo.toFixed();
  if(timeTo < 86400) {
    if(timeTo < 3600) return (timeTo/60).toFixed() + '';
    else return (timeTo/3600).toFixed() + "小时";
  } else {
    return (time.getMonth() + 1)+'/'+time.getDate()+' '+hours+minutes;
  }
}