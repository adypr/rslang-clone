import Loader from '../../../controllers/loader';
import { newOptions, newStatistics } from '../../../controllers/statistics';

const registration = () => {
  const form = document.getElementById('registrationForm') as HTMLFormElement;
  const message = document.querySelector('.popup__error') as HTMLParagraphElement;

  form.addEventListener('input', () => {
    message.classList.add('no-display');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (document.querySelector('input[type=text]') as HTMLInputElement).value;
    const email = (document.querySelector('input[type=email]') as HTMLInputElement).value.toLowerCase();
    const password = (document.querySelector('input[type=password]') as HTMLInputElement).value;
    return Loader.createUser({ email, name, password })
      .then(() => Loader.loginUser({ email, password }))
      .then(() => {
        Loader.initSettings(localStorage.getItem('userId'), localStorage.getItem('token'), newOptions);
        Loader.initStatistics(localStorage.getItem('userId'), localStorage.getItem('token'), newStatistics);
        form.innerHTML = '<h4 class="popup__success">Поздравляем, вы зарегистрированы!</h4>';
        setTimeout(document.location.reload.bind(document.location), 2000);
      })
      .catch(() => {
        message.classList.remove('no-display');
      });
  });
};

export { registration };
