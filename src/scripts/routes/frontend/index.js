import getRouter from '@/routes/common';
import otherRoutes from '@/routes/common/other';
import baseRoutes from './base';

const routes = [].concat(baseRoutes, otherRoutes);

export default getRouter(routes);
