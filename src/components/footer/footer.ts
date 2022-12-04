import templateFooter from './template';
import { renderElement } from '../../controllers/helpers';
import { renderPopupOverlay } from '../popups/popups';

export const addFooter: () => void = () => {
  renderElement('footer', templateFooter, document.body, 'footer');
  renderPopupOverlay();
};
