// 项目配置
import map from '@js/map/index.js'; // 字典
const config = {
  title: 'iADBrain', // 网站抬头
  // 开发模式开关，开启后使用假登录信息
  dev: true,
  // 假登录信息
  login: {
    username: 'Magxl',
    mobile: '10086',
    type: 'staff',
    level: 1,
    permission: '5KsZVwBbWyC1vn2d',
    authID: '1|90104c7c372cb622415c7c247c116933',
    beegosessionID: '66ebb6f19ab9ed4e61688c277f62b38e'
  },
  // 多色图标 <Icon name='' /> 组件
  colorIcon: '//at.alicdn.com/t/c/font_3695803_hshf8yanyi4.js',
};
// 装载到全局
window.global = window.global || {};
window.global.config = config;
window.$map = map;
export default config;