/****************************************
* 日付計算用関数
*****************************************/
export function scDateDiff(year1, month1, date1, year2, month2, date2) {
  let sc_diff = '';
  let sc_dt1 = new Date(year1, month1 - 1, date1);
  let sc_dt2 = new Date(year2, month2 - 1, date2);
  sc_diff = (sc_dt1 - sc_dt2) / (24 * 60 * 60 * 1000);
  return sc_diff;
}
/****************************************
*ゼロ埋め用関数
*****************************************/
export function scZeroFormat(num, max) {
  let tmp = '' + num;
  while (tmp.length < max) {
    tmp = '0' + tmp;
  }

  return tmp;
}
