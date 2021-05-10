import { useHttp } from '@/plugins/http';

const http = useHttp();

async function getUsers() {
  let data = await http.get('/users');
  return data;
}

function createUser() {
  console.log('createUser');
}

function updateUser() {
  console.log('updateUser');
}

function removeUser(id) {
  console.log(`remove user: ${id}`);
}

const useUserStore = () => {
  return {
    getUsers,
    createUser,
    updateUser,
    removeUser
  };
};

export default useUserStore;
