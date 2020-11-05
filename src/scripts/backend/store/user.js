import { useHttp } from '@/plugins/http';

const http = useHttp();

async function getUsers() {
  let data = await http.get('/users');
  return data;
}

const useUserStore = () => {
  return {
    getUsers
  };
};

export default useUserStore;
