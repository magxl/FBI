import rq from './rq.js';
export default (app) => {
  window.$get = rq.get;
  window.$post = rq.post;
  app.config.globalProperties.$getType = (v) => {
    return Object.prototype.toString.call(v).slice(8, -1);
  };
  window.$getType = (v) => {
    return Object.prototype.toString.call(v).slice(8, -1);
  };
  window.$randomNumber = function (dt, min = 0) {
    // 随机整数
    // dt: 最大值
    // min: 最小值
    let r = parseInt(Math.random() * dt);
    r += min;
    return r;
  };
  window.$randomColor = (v = {}) => {
    const { alpha, name } = v;
    const colorNames = ['blue', 'red', 'orange', 'green'];
    const colorAlphas = ['', 1, 3, 5, 7];
    const randomName =
      name || colorNames[parseInt(Math.random() * colorNames.length)];
    const randomAlpha =
      alpha || colorAlphas[parseInt(Math.random() * colorAlphas.length)];
    return `${randomName}${randomAlpha}`;
  };

  window.$fakeData = (total, v) => {
    let dt = [];
    for (let i = 0; i < total; i++) {
      dt.push(v(i));
    }
    return dt;
  };
  window.$copy = (v, showV) => {
    //拷贝到剪切板
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
};
