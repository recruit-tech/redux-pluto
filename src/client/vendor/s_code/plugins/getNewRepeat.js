// dependencies
//   + s.split
/*
 * Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
 */
export default new Function('d', 'cn', ''
+ 'var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:'
+ "'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length="
+ "=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct"
+ "-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N"
+ "ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");
