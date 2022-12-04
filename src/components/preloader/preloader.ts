import { templatePreloader } from './template';

export function drawWaitForServer(container: HTMLElement) {
  if (document.querySelector('.wait-for-server')) return;
  const waitForServer = document.createElement('div');
  waitForServer.classList.add('wait-for-server', 'text');
  waitForServer.innerHTML = templatePreloader;
  container.append(waitForServer);
}
