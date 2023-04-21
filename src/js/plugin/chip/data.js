import { $l } from '@js/lang';
// import { store } from '@js/pinia';

export default {
  install(app) {
    window.$l = $l;
    app.config.globalProperties.$l = $l;
    Array.prototype.filter1 = function (cb) {
      if (!cb || typeof cb !== 'function') {
        throw new TypeErrpr(cb + ' is not a function');
      }
      const len = this.length;
      let data;
      let index;
      for (let i = 0; i < len; i++) {
        if (cb(this[i], i, this)) {
          index = i;
          data = this[i];
          break;
        }
      }
      return {
        index,
        data,
      };
    };
    window.$getType = (v) => {
      return Object.prototype.toString.call(v).slice(8, -1);
    };
    //拷贝到剪切板
    const copy = (v, showV) => {
      let url = v;
      let oInput = document.createElement('input');
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select();
      document.execCommand('Copy'); // 无可替代更新
      const copyTxt = {
        zh_cn: '已复制',
        en_us: 'Copied',
      }[window.$getLang()];
      let message = showV ? copyTxt + ' ' + v : copyTxt;
      app.config.globalProperties.$message.success({
        message,
        grouping: true,
        center: true,
      });
      oInput.remove();
    };
    window.$copy = copy;
    app.config.globalProperties.$copy = copy;

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
            (window.$getType(dt[k]) === 'Object' || (window.$getType(dt[k]) && dt[k] !== null)) ===
            'Array'
          ) {
            r[k] = this.$deepClone(dt[k]);
          } else {
            r[k] = dt[k];
          }
        }
      }
      return r;
    };

    const removeEmptyParams = (v) => {
      if (v) {
        const type = window.$getType(v);
        if (type === 'Object') {
          const r = {};
          Object.keys(v).forEach((it) => {
            const itv = v[it];
            const itt = window.$getType(itv);
            if (itt === 'Object' && Object.keys(itv) !== 0) {
              r[it] = itv;
            } else if (itt === 'Array' && itv.length !== 0) {
              r[it] = itv;
            } else if (['Number', 'String'].indexOf(itt) > -1 && itv) {
              r[it] = itv;
            }
          });
          return r;
        }
      }
    };
    window.$removeEmptyParams = removeEmptyParams;
    window.$rep = removeEmptyParams;
  },
};
