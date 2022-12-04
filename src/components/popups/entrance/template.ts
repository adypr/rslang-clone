const templatePopupEntrance: string = `
   <div class="popup entrance-popup">
    <div class="popup__wrapper">
      <div class="popup__image">
      <img class="popup__dog" src="./assets/images/popups/popup-entrance.svg" alt="Entrance">
      </div>
      <div class="popup__content">
        <div class="popup__header">
          <h3 class="popup__header_heading">Добро пожаловать!</h3>
          <p class="popup__header_text">Рислинг очень рад вас видеть! Войдите, чтобы видеть свой прогресс и сохранённые слова</p>
        </div>
        <form class="popup__inputs"  id="entranceForm">
          <input class="popup__input" type="email" placeholder="Email" required>
          <input class="popup__input" type="password" placeholder="Пароль"  minlength="8" required>
          <div class="popup__footer">
            <button class="button button-additional popup__button button-entrance">Войти</button>
            <div class="popup__proposal">
              <span class="popup__proposal_text">Еще нет аккаунта?</span>
              <button class="button-transparent popup__proposal_button" data-popup="registration">Регистрация</button>
            </div>
          </div>
          <p class="popup__error no-display">Неверное имя или пароль.</p>
        </form>
      </div>
    </div>
  </div>`;

export default templatePopupEntrance;
