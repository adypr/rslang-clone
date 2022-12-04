import { addLogin } from './login/login';
import { addLogout } from './logout/logout';
import { removeStorageValues } from '../../controllers/api-services/storage';
import { registration } from '../popups/registration/registration';
import { entrance } from '../popups/entrance/entrance';
import Loader from '../../controllers/loader';
import { BaseObject } from '../../models/base.interface';

const renderLogout = () => {
  addLogout();
  const buttonOut = document.querySelector('.autorization__out');
  buttonOut.addEventListener('click', () => {
    removeStorageValues('userId', 'refreshToken', 'token', 'name', 'hardWordsCount');
    (document.querySelector('.popup-overlay') as HTMLDivElement).style.display = 'none';
    document.location.reload();
  });
};

export const renderAutorization = () => {
  if (!localStorage.getItem('token')) {
    addLogin();
    return;
  }

  const url = `users/${localStorage.getItem('userId')}/tokens`;
  const token = localStorage.getItem('refreshToken');
  Loader.authorizedGet<BaseObject>(url, token).then((data: BaseObject) => {
    localStorage.setItem('token', data.token as string);
    localStorage.setItem('refreshToken', data.refreshToken as string);
    localStorage.removeItem('tokenTime');
    renderLogout();
  }).catch(() => {
    removeStorageValues('userId', 'refreshToken', 'token', 'name', 'hardWordsCount');
    addLogin();
  });
};

export const addAutorization = (type: string): void => {
  if (type === 'registration') registration();
  else if (type === 'entrance') entrance();
};
