// import dayjs from 'dayjs';
import moment from 'moment';
export default {
  install(app) {
    // window.$dayjs = dayjs;
    window.$moment = moment;
    window.$getFullTime = function (v) {
      // v 传入日期实例
      const date = v || new Date();
      let Y = date.getFullYear();
      let M = date.getMonth();
      let D = date.getDate() + 1;
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      Y = Y > 9 ? Y : `0${Y}`;
      M = M > 9 ? M : `0${M}`;
      D = D > 9 ? D : `0${D}`;
      h = h > 9 ? h : `0${h}`;
      m = m > 9 ? m : `0${m}`;
      s = s > 9 ? s : `0${s}`;
      return `${Y}-${M}-${D} ${h}:${m}:${s}`;
    };
    window.$getTime = function (v) {
      // v 传入日期实例
      const date = v || new Date();
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      h = h > 9 ? h : `0${h}`;
      m = m > 9 ? m : `0${m}`;
      s = s > 9 ? s : `0${s}`;
      return {
        h,
        m,
        s,
        time: `${h}:${m}:${s}`,
        stamp: +date,
      };
    };
    window.$formatTime = function (dt, usems = false) {
      //转换豪秒数为 时:分:秒
      // usems 回显毫秒
      dt = parseInt(dt);
      const sData = parseInt(dt / 1000); // 秒数
      const ms = dt % 1000; // 毫秒数
      let r = '00:00';
      if (dt) {
        let h = parseInt(sData / 3600),
          m = parseInt(sData / 60) - h * 60,
          s = sData % 60;
        m = m > 9 ? m : '0' + m;
        s = s > 9 ? s : '0' + s;
        r = m + ':' + s;
        if (h) {
          r = h + ':' + r;
        }
        if (usems) {
          r = r + ' ' + ms;
        }
      }
      return r;
    };
  },
};
