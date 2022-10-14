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

export default (app) => {
  [...Super, ...Mvc].forEach((it) => {
    it.cpt().then((r) => {
      app.component(it.name, r.default);
    });
  });
};
