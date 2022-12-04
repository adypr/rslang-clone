import templateLogin from './template';

export const addLogin: () => void = () => {
  const container = document.querySelector('.options') as HTMLDivElement;
  container.innerHTML = templateLogin;
};
