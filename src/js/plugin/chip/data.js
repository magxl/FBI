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
    // UpperCamelCase
    window.$toUpperCamelCase = (v) => {
      return v.substr(0, 1).toUpperCase() + v.substr(1, v.length).toLowerCase();
    };
  },
};
