// 项目配置
import map from '@js/map/index.js'; // 字典
const config = {
  title: '应用雷达智投平台', // 网站抬头
  // 开发模式开关，开启后使用假登录信息
  dev: true,
  defaultPage: 'A_Overview',
  // 假登录信息
  login: {
    username: 'Magxl',
    mobile: '10086',
    type: 'staff',
    level: 1,
    permission: '5KsZVwBbWyC1vn2d',
    authID: '1|90104c7c372cb622415c7c247c116933',
    beegosessionID: '66ebb6f19ab9ed4e61688c277f62b38e',
  },
  // 多色图标 <Icon name='' /> 组件
  colorIcon: '//at.alicdn.com/t/c/font_3695803_hshf8yanyi4.js',

  color: [
    '#5F63F2',
    '#FFBB00',
    '#409EFF',
    '#20C997',
    '#6CEC8E',
    '#35D5EB',
    '#39EBCB',
    '#619AEF',
    '#908EFE',
    '#7869D2',
    '#854CFF',
    '#AF73EC',
    '#CF47FF',
    '#6A717D',
  ],
  date: {
    fullDate: 'YYYY-MM-DD',
    fullTime: 'YYYY-MM-DD hh:mm:ss',
    time: 'hh:mm:ss',
  },
  frame: {
    header: 56,
    menu: 200,
  },
  page: {
    paddingTop: 4,
    paddingRight: 0,
    paddingBottom: 4,
    paddingLeft: 8,
    header: 48,
  },
  table: {
    header: 40,
    pagination: 48,
    tool: 48,
  },
  drawer: {
    footer: 56,
  },
};
// 装载到全局
window.global = window.global || {};
window.global.config = config;
window.$map = map;
export default config;
