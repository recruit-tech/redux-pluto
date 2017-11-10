import {scDateDiff} from './utils';

export default (s) => {
  let sc_firstVisitTime, sc_lastVisitTime, sc_arrfirstVisitTime, sc_arrlastVisitTime, sc_diffDate, sc_diffDate2;
  /****************************************
  * 新規・再来訪の取得
  *****************************************/
  s.prop3 = s.getNewRepeat(730, 's_nr');
  /****************************************
  * 初回、前回からの訪問間隔
  *****************************************/
  s.fr_exp = new Date();
  s.fr_exp.setTime(s.fr_exp.getTime() + (365 * 24 * 60 * 60 * 1000));
  if (s.prop3 == 'New') {
    sc_firstVisitTime = sc_lastVisitTime = s.currentYear + ':' + s.currentM + ':' + s.currentD;
    s.c_w('s_fr', sc_firstVisitTime, s.fr_exp);
    s.c_w('s_lst', sc_lastVisitTime, s.fr_exp);
    sc_diffDate = sc_diffDate2 = 'First visit';
  }else {
    sc_firstVisitTime = s.c_r('s_fr');
    if (sc_firstVisitTime) {
      sc_arrfirstVisitTime = sc_firstVisitTime.split(':');
      if (sc_arrfirstVisitTime.length == 3) {
        sc_diffDate = scDateDiff(parseInt(s.currentYear, 10), parseInt(s.currentM, 10), parseInt(s.currentD, 10),
        parseInt(sc_arrfirstVisitTime[0], 10), parseInt(sc_arrfirstVisitTime[1], 10), parseInt(sc_arrfirstVisitTime[2], 10));
      }else {
        sc_firstVisitTime = s.currentYear + ':' + s.currentM + ':' + s.currentD;
        s.c_w('s_fr', sc_firstVisitTime, s.fr_exp);
        sc_diffDate = 'Failed cookie validation';
      }
    }else {
      sc_firstVisitTime = s.currentYear + ':' + s.currentM + ':' + s.currentD;
      s.c_w('s_fr', sc_firstVisitTime, s.fr_exp);
      sc_diffDate = 'Cookie not found';
    }

    sc_lastVisitTime = s.c_r('s_lst');
    if (sc_lastVisitTime) {
      sc_arrlastVisitTime = sc_lastVisitTime.split(':');
      if (sc_arrlastVisitTime.length == 3) {
        sc_diffDate2 = scDateDiff(parseInt(s.currentYear, 10), parseInt(s.currentM, 10), parseInt(s.currentD, 10),
        parseInt(sc_arrlastVisitTime[0], 10), parseInt(sc_arrlastVisitTime[1], 10), parseInt(sc_arrlastVisitTime[2], 10));
        sc_lastVisitTime = s.currentYear + ':' + s.currentM + ':' + s.currentD;
        s.c_w('s_lst', sc_lastVisitTime, s.fr_exp);
      }else {
        sc_lastVisitTime = s.currentYear + ':' + s.currentM + ':' + s.currentD;
        s.c_w('s_lst', sc_lastVisitTime, s.fr_exp);
        sc_diffDate2 = 'Failed cookie validation';
      }
    }else {
      sc_lastVisitTime = s.currentYear + ':' + s.currentM + ':' + s.currentD;
      s.c_w('s_lst', sc_lastVisitTime, s.fr_exp);
      sc_diffDate2 = 'Cookie not found';
    }
  }

  s.prop7 = (sc_diffDate == 0) ? 'Same day' : sc_diffDate;
  s.prop17 = (sc_diffDate2 == 0) ? 'Same day' : sc_diffDate2;
};
