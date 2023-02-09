import * as echarts from 'echarts';
import BigNumber from 'bignumber.js';
export default {
  install(app) {
    window.$echarts = echarts;
    window.$bigNumber = BigNumber;
    // echarts 渐变颜色

    window.$linearColor = ({ i = 0, color }) => {
      const colors = window.global.config.color;
      color = color || colors[i];
      const top = color + 'FF';
      const bottom = color + '00';
      return {
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: top,
          },
          {
            offset: 1,
            color: bottom,
          },
        ],
      };
    };

    // 随机整数
    const randomNumebr = (v, min = 0) => {
      // v: 最大值
      // min: 最小值
      let r = parseInt(Math.random() * v);
      r += min;
      return r;
    };
    window.$randomNumber = randomNumebr;
    window.$rn = randomNumebr;
    // 随机颜色
    const randomColor = (v = {}) => {
      const { alpha, name } = v;
      // 传入alpha使用此alpha进行name随机
      // 传入name使用此name进行alpha随机
      const colorNames = ['blue', 'red', 'orange', 'green', 'pink', 'purple'];
      const colorAlphas = ['', 1, 3, 5, 7];
      const randomName =
        name || colorNames[parseInt(Math.random() * colorNames.length)];
      const randomAlpha =
        alpha || colorAlphas[parseInt(Math.random() * colorAlphas.length)];
      return `${randomName}${randomAlpha}`;
    };
    window.$randomColor = randomColor;
    window.$rc = randomColor;

    const fakeData = (total, v) => {
      let dt = [];
      for (let i = 0; i < total; i++) {
        dt.push(v(i));
      }
      return dt;
    };
    window.$fakeData = fakeData;
    window.$fd = fakeData;

    app.config.globalProperties.$setTimeout = function (cb = () => {}, time) {
      //自动卸载Timeout
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        cb();
        clearTimeout(this.timer);
      }, time);
    };

    app.config.globalProperties.$toUpperCamel = (v) => {
      return v.substr(0, 1).toUpperCase() + v.substr(1, v.length).toLowerCase();
    };
    window.$toUpperCamel = (v) => {
      return v.substr(0, 1).toUpperCase() + v.substr(1, v.length).toLowerCase();
    };
    const formatAmount = (v, fixed = 2) => {
      const type = window.$getType(v);
      if (type === 'Number') {
        v = String(v);
      }
      // 分割小数
      const arr = v.split('.');
      let prevPartArr = arr[0].split('');
      prevPartArr = prevPartArr.reverse();
      let dt = [];
      prevPartArr.forEach((it, i) => {
        if (i !== 0 && i % 3 === 0) {
          dt.push(',');
        }
        dt.push(it);
      });
      const prev = dt.reverse().join('');
      let r = prev;
      if (window.$getType(fixed) === 'Number') {
        if (fixed > 0) {
          r = prev + '.' + arr[1].padEnd(fixed, 0).substr(0, fixed);
        }
      }
      return r;
    };
    window.$formatAmount = formatAmount;
    window.$fa = formatAmount;
  },
};
