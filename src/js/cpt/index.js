// import SuperContract from '@/components/Super/SuperContract/index.vue'; // 合同框架
// import Service from '@/components/Super/SuperContract/chip/Service.vue'; // 服务信息
// import SubjectAccount from '@/components/Super/SuperContract/chip/SubjectAccount.vue'; // 主体信息

const SuperCpts = import.meta.glob('/src/components/Super/*/index.vue');
const Super = [];
Object.keys(SuperCpts).forEach((it) => {
  const name = it.match(/\/Super\/(\S*)\/index.vue/)[1];
  Super.push({
    name,
    cpt: SuperCpts[it],
  });
});

const MvcCpts = import.meta.glob('/src/components/Mvc/*/index.vue');
const Mvc = [];
Object.keys(MvcCpts).forEach((it) => {
  const name = it.match(/\/Mvc\/(\S*)\/index.vue/)[1];
  Mvc.push({
    name,
    cpt: MvcCpts[it],
  });
});

const WidgetCpt = import.meta.glob('/src/components/Widget/*/index.vue');
const Widget = [];
Object.keys(WidgetCpt).forEach((it) => {
  const name = it.match(/\/Widget\/(\S*)\/index.vue/)[1];
  Widget.push({
    name,
    cpt: WidgetCpt[it],
  });
});
// import TableColumn from '/src/components/Mvc/Table/TableColumn.js';
// 第三方

import Draggable from 'vuedraggable';
export default (app) => {
  const all = [...Super, ...Mvc, ...Widget];
  all.forEach((it) => {
    it.cpt().then((r) => {
      app.component(it.name, r.default);
    });
    // app.component('TableColumn',TableColumn);
  });
  app.component('Draggable', Draggable);
};
