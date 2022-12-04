import { Popup } from '../../models/popup.namespace';
import { renderElement } from '../../controllers/helpers';
import { addAutorization } from '../autorization/autorization';

const addPopup = (template: string) => {
  const popup: HTMLElement = document.querySelector('.popup-overlay');

  popup.innerHTML = template;
  document.body.classList.add('hidden');
  popup.classList.add('popup-overlay-active');
};

const destroyPopup: () => void = () => {
  const popup: HTMLElement = document.querySelector('.popup-overlay');

  popup.innerHTML = '';
  popup.classList.remove('popup-overlay-active');
  document.body.classList.remove('hidden');
};

const createPopup: () => void = () => {
  document.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('[data-popup]');

    if (!eventTargetClosest) {
      return;
    }

    destroyPopup();

    addPopup(Popup.templateMap[eventTargetClosest.dataset.popup as Popup.Type]);
    addAutorization(eventTargetClosest.dataset.popup);
  });
};

export const renderPopupOverlay: () => void = () => {
  renderElement('div', '', document.body, 'popup-overlay');

  const popup: HTMLElement = document.querySelector('.popup-overlay');

  popup.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;

    if (eventTarget.closest('.popup')) {
      return;
    }

    destroyPopup();
    document.location.reload();
  });

  createPopup();
};

export default { renderPopupOverlay };
