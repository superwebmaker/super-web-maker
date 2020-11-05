import useAuthStore from '@/common/store/auth';
import useUserStore from './user';

export default {
  ...useAuthStore(),
  ...useUserStore()
};
