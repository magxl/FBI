const files = import.meta.glob('./chip/*.js', { eager: true });
let routes = {
  path: '/A',
  name: 'A',
  meta: {
    label: 'A',
    position: ['navbar', 'menu'],
    sort: 20,
  },
  component: () => import('@views/A/AFrame/AFrame.vue'),
  children: [],
};
Object.keys(files).forEach((it) => {
  routes.children.push(files[it].default);
});
routes.children.sort((a, b) => a.meta.sort - b.meta.sort);
export default routes;
