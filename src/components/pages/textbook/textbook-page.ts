import templateTextbook from './template';
import { renderElement } from '../../../controllers/helpers';
import { setStorageItem } from '../../../controllers/api-services/storage';
import addAuthorizedStyles from './textbook-authorize';

const saveGroupNum: () => void = () => {
  document.body.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('[data-group]');

    if (!eventTargetClosest) {
      return;
    }

    setStorageItem('group', eventTargetClosest.dataset.group);
    setStorageItem('id', null);
  });
};

export const addTextbook: () => void = () => {
  renderElement('main', templateTextbook, document.body, 'textbook');
  saveGroupNum();
  addAuthorizedStyles();
};
