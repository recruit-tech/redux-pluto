import {
  URL,
  SERVER,
  SITE_ID,
  USER_AGENT,
  TITLE,
  EVAR_PAGE_NAME,
  EVAR_NEW_OR_REPEAT,
} from './variableNames';
import { SERVICE_SITE_ID } from './const';

export default (state) => {
  /* eslint-disable no-unused-vars */
  const { app: { auth } } = state;
  return {
    [SERVER]: window.location.hostname,
    [URL]: 'D=g', // uses s.PageURL on server
    [TITLE]: 'D=pageName', // captures the pageName value, temporary.
    [EVAR_PAGE_NAME]: 'D=pageName',
    [EVAR_NEW_OR_REPEAT]: 'D=c3',
    [SITE_ID]: SERVICE_SITE_ID,
    [USER_AGENT]: 'D=User-Agent', // set automatically on server
  };
};
