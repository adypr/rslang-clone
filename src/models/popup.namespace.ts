import templatePopupEntrance from '../components/popups/entrance/template';
import templatePopupRegistration from '../components/popups/registration/template';

export namespace Popup {
  export enum Type {
    Entrance = 'entrance',
    Registration = 'registration',
  }

  export const templateMap: Record<Type, string> = {
    [Type.Entrance]: templatePopupEntrance,
    [Type.Registration]: templatePopupRegistration,
  };
}
