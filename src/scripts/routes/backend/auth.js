import store from '@/store';

const ifNotAuthenticated = (to, from, next) => {
  if (store.isAuthenticated) {
    next({ name: 'admin.index' }, { replace: true });
  } else {
    store.auth();
    store.isAuthenticated
      ? next({ name: 'admin.index' }, { replace: true })
      : next();
  }
};

const ifAuthenticated = (to, from, next) => {
  if (store.isAuthenticated) {
    next();
  } else {
    store.auth();
    store.isAuthenticated ? next() : next({ name: 'login' }, { replace: true });
  }
};

export { ifNotAuthenticated, ifAuthenticated };
