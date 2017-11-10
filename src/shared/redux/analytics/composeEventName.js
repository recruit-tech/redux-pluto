import {
  PAGE_NAME,
  EVENTS,
} from './variableNames';

export default (variables, state) => {
  const pageName = variables[PAGE_NAME] || '*';
  const eventCd = Array.isArray(variables[EVENTS]) ? variables[EVENTS].sort().join('+') : '*';

  return `${pageName}/${eventCd}`;
};
