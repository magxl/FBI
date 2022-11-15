export default {
  install(app) {
    // echarts 渐变颜色
    window.$linearColor = (
      top = 'RGBA(86, 162, 253, 1)',
      bottom = 'RGBA(86, 162, 253, 0)',
    ) => {
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
    window.$randomNumber = function (dt, min = 0) {
      // dt: 最大值
      // min: 最小值
      let r = parseInt(Math.random() * dt);
      r += min;
      return r;
    };
    // 随机颜色
    window.$randomColor = (v = {}) => {
      const { alpha, name } = v;
      // 传入alpha使用此alpha进行name随机
      // 传入name使用此name进行alpha随机
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
  },
};