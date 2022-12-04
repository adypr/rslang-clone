const templatePopupRegistration: string = `
   <div class="popup registration-popup">
    <div class="popup__wrapper">
      <div class="popup__image">
      <img class="popup__dog" src="./assets/images/popups/popup-registration.svg" alt="Entrance">
      </div>
      <div class="popup__content">
        <div class="popup__header">
          <h3 class="popup__header_heading">Регистрация</h3>
          <p class="popup__header_text">Сохраняйте сложные слова, ваш прогресс изучения слов и статистику</p>
        </div>
        <form class="popup__inputs" id="registrationForm">
          <input class="popup__input" type="text" placeholder="Имя" required>
          <input class="popup__input" type="email" placeholder="Email" required>
          <input class="popup__input" type="password" placeholder="Пароль: от 8 до 12 символов" minlength="8" maxlength="12" required title="Пароль должен быть длиной от 8 до 12 символов">
          <div class="popup__footer">
            <button class="button button-additional popup__button button-registration">Зарегистрироваться</button>
            <div class="popup__proposal">
              <span class="popup__proposal_text">Уже есть аккаунт?</span>
              <button class="button-transparent popup__proposal_button" data-popup="entrance">Войти</button>
            </div>
          </div>
          <p class="popup__error no-display">Ошибка регистрации. Может, такой пользователь уже есть?</p>
        </form>
      </div>
    </div>
  </div>`;

export default templatePopupRegistration;
