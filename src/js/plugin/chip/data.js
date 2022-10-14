import { $l } from '@js/lang';
// import { store } from '@js/pinia';

export default {
  install(app) {
    window.$l = $l;
    app.config.globalProperties.$l = $l;

    window.$getType = (v) => {
      return Object.prototype.toString.call(v).slice(8, -1);
    };
    //拷贝到剪切板
    window.$copy = (v, showV) => {
      let url = v;
      let oInput = document.createElement('input');
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select();
      document.execCommand('Copy'); // 无可替代更新
      let message = showV ? '已复制 ' + v : '已复制';
      app.config.globalProperties.$message.success({
        message,
        center: true,
      });
      oInput.remove();
    };
    window.$deepClone = function (dt) {
      //递归深拷贝
      const type = window.$getType(dt);
      let r = null;
      if (type === 'Object') {
        r = {};
      } else if (type === 'Array') {
        r = [];
      } else {
        return dt;
      }
      for (let k in dt) {
        if (Object.prototype.hasOwnProperty.call(dt, k)) {
          if (
            (window.$getType(dt[k]) === 'Object' ||
              (window.$getType(dt[k]) && dt[k] !== null)) === 'Array'
          ) {
            r[k] = this.$deepClone(dt[k]);
          } else {
            r[k] = dt[k];
          }
        }
      }
      return r;
    };
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
