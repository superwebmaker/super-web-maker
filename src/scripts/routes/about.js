import AboutIndex from '@/views/about/index';
import AboutBalmUI from '@/views/about/balm-ui';
import AboutBalmUILite from '@/views/about/balm-ui-lite';

let routes = [
  {
    path: '/about',
    name: 'about',
    component: AboutIndex,
    redirect: '/about/balm-ui',
    children: [
      {
        path: 'balm-ui',
        name: 'about.balm-ui',
        component: AboutBalmUI
      },
      {
        path: 'balm-ui-lite',
        name: 'about.balm-ui-lite',
        component: AboutBalmUILite
      }
    ]
  }
];

export default routes;
