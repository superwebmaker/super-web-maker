import getRouter from '@/common/routes';
import otherRoutes from '@/common/routes/other';
import baseRoutes from './base';

const routes = [].concat(baseRoutes, otherRoutes);

export default getRouter(routes, '/app/');
