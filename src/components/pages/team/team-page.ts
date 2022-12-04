import templateTeam from './template';
import { renderElement } from '../../../controllers/helpers';

export const addTeam: () => void = () => {
  renderElement('main', templateTeam, document.body, 'team');
  document.body.classList.add('main-page');
};
