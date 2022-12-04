const styles = ['textbook', 'textbook__wrapper', 'textbook__container', 'textbook__heading', 'textbook__image', 'textbook__dog', 'textbook__content', 'textbook__hard'];

const addAuthorizedStyles = () => {
  if (!localStorage.getItem('token')) return;
  styles.forEach((style: string) => {
    const element = document.querySelector(`.${style}`) as HTMLElement;
    element.classList.remove(style);
    element.classList.add(`authorized-${style}`);
  });
};

export default addAuthorizedStyles;
