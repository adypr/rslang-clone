const templateTextbook: string = `
  <div class="textbook__wrapper  wrapper">
    <div class="textbook__container">
      <h2 class="textbook__heading">Выберите категорию</h2>
      <div  class="textbook__image">
        <img class="textbook__dog" src="assets/images/textbook/textbook-dog.png" alt="Risling">
        <a class="textbook__hard"  data-group="6" href="vocabulary.html?group=6">
          <div class="textbook__cloud"></div>
          <h4 class="textbook__subtitle">Сложные слова</h4>
          <p class="textbook__description">Сохраненные лично вами</p>
        </a>
      </div>
      <div class="textbook__content">
        <ul class="textbook__list">
            <li class="textbook__item textbook__item-a1" data-group="0">
            <a class="textbook__link" href="vocabulary.html?group=0">
              <h3 class="textbook__title">A1</h3>
              <h4 class="textbook__subtitle">Начальный</h4>
              <p class="textbook__description">Повседневные фразы и личные темы</p>
            </a>
          </li>
          <li class="textbook__item textbook__item-a2" data-group="1">
            <a class="textbook__link" href="vocabulary.html?group=1">
              <h3 class="textbook__title">A2</h3>
              <h4 class="textbook__subtitle">Базовый</h4>
              <p class="textbook__description">Насущные аспекты жизни</p>
            </a>
          </li>
          <li class="textbook__item textbook__item-b1" data-group="2">
            <a class="textbook__link" href="vocabulary.html?group=2">
              <h3 class="textbook__title">B1</h3>
              <h4 class="textbook__subtitle">Пороговый</h4>
              <p class="textbook__description">Ситуации и деловое общение</p>
            </a>
          </li>
          <li class="textbook__item textbook__item-b2" data-group="3">
            <a class="textbook__link" href="vocabulary.html?group=3">
              <h3 class="textbook__title">B2</h3>
              <h4 class="textbook__subtitle">Средний</h4>
              <p class="textbook__description">Широкий круг вопросов и тем</p>
            </a>
          </li>
          <li class="textbook__item textbook__item-c1" data-group="4">
            <a class="textbook__link" href="vocabulary.html?group=4">
              <h3 class="textbook__title">С1</h3>
              <h4 class="textbook__subtitle">Эксперт</h4>
              <p class="textbook__description">Профессиональное общение</p>
            </a>
          </li>
          <li class="textbook__item textbook__item-c2" data-group="5">
            <a class="textbook__link" href="vocabulary.html?group=5">
              <h3 class="textbook__title">С2</h3>
              <h4 class="textbook__subtitle">Мастер</h4>
              <p class="textbook__description">Редкие специфичные слова</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>`;

export default templateTextbook;
