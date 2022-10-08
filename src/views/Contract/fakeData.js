export default [
  {
    name: 'ZhuCeJiZhang', // 合同名称
    main: {
      // 主体信息
      subject: {
        title: '记账服务合同', // 合同名称显示
        number: 'NNB-XXXXXXXX', // 编号
        type: 'beijing_xiaomiao', // 主体type: 地区全拼_企业简称
        date: '2022年09月02日', // 生成日期
        a: {
          name: '', // 企业
          phone: '',
          email: '',
          address: '',
          username: '', // 代表人
          department: '',
        },
        b: {
          name: '', // 企业
          phone: '',
          email: '',
          address: '',
          username: '', // 代表人
          department: '',
        },
      },
      // 服务信息
      service: {
        detail: [
          {
            name: 'JiZhang',
          },
          {
            name: 'ZhuCe',
          },
          {
            name: 'BianGeng',
          },
        ],
        price: {
          totalAmount: '壹佰贰拾叁圆肆角伍分', // 总价大写
          totalAmountNumber: '123.45', // 总价数字
          paiedAmount: '壹佰元整', // 已付大写
          paiedAmountNumber: '100.00', // 已付数字
          unpaiedAmount: '肆角伍分', // 未付大写
          unpaiedAmountNumber: '0.45', // 未付数字
        },
      },
    },
  },
];
