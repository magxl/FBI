import SuperContract from '@/components/Super/SuperContract/index.vue';
import Service from '@/components/Super/SuperContract/chip/Service.vue';
import SubjectAccount from '@/components/Super/SuperContract/chip/SubjectAccount.vue';
import Drawer from '@/components/Mvc/Drawer/Drawer.vue';
import WaterMark from '@/components/Super/WaterMark/index.vue';
export default (app) => {
  app.component('SuperContract', SuperContract);
  app.component('Service', Service); // 服务信息
  app.component('SubjectAccount', SubjectAccount); // 主体账户信息
  app.component('Drawer', Drawer);
  app.component('WaterMark', WaterMark);
};
