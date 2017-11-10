import { scZeroFormat } from './utils'

export default (s) => {
  /* TimeParting plug-in Config */
  s.dstStart = '1/1/2008'
  s.dstEnd = '1/1/2008'
  s.currentDT = new Date()
  s.currentYear = s.currentDT.getFullYear()
  s.currentM = scZeroFormat(s.currentDT.getMonth() + 1, 2)
  s.currentD = scZeroFormat(s.currentDT.getDate(), 2)
  s.currentH = scZeroFormat(s.currentDT.getHours(), 2)
  s.currentm = scZeroFormat(s.currentDT.getMinutes(), 2)
  s.currentS = scZeroFormat(s.currentDT.getSeconds(), 2)
}
