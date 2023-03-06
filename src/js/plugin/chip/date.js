import moment from 'moment';
export default {
  install(app) {
    window.$moment = moment;
    window.$m = moment;
  },
};
