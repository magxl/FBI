import data from './data.js';
import directive from './directive.js';
export default (app) => {
  data(app);
  directive(app);
};
