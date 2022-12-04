// import { Words } from '../../../models/words.interface';
// import { Word } from '../../../models/word.interface';
// import { SERVER } from '../../../controllers/loader';
// import { countGameResults } from '../../../controllers/helpers';

import { Word } from '../../../models/word.interface';

const templateSprint: string = `
  <div class="sprint__wrapper wrapper">
    <div class="game-window game-window_sprint"></div>
  </div>
`;

const templateSprintWindow: string = `
    <div class="game-window__text-content">
      <h4 class="game-window__heading">Спринт</h4>
      <p class="game-window__text">Правильный перевод или нет? Дайте как можно больше ответов за 30 секунд!</p>
      <p class="game-window__note">Для управления с клавиатуры:<br>Если перевод неправильный&nbsp;—&nbsp;“◀”, если правильный&nbsp;—&nbsp;“▶”.</p>
    </div>
    
    <div class="game-window__categories">
      <p class="game-window__text">Выберите категорию:</p>
      <div class="game-window__buttons">
        <button class="game-window__button game-window__button_a1" data-group="0">A1</button>
        <button class="game-window__button game-window__button_a2" data-group="1">A2</button>
        <button class="game-window__button game-window__button_b1" data-group="2">B1</button>
        <button class="game-window__button game-window__button_b2" data-group="3">B2</button>
        <button class="game-window__button game-window__button_c1" data-group="4">C1</button>
        <button class="game-window__button game-window__button_c2" data-group="5">C2</button>
      </div>
    </div>
    
    <div class="game-window__begin">
      <p class="game-window__text game-window__vocab-text">Используются слова со страницы учебника</p>
      <p class="game-window__text game-window__no-vocab-words no-display">Игра будет со словами из всей категории.<br>На текущей и предыдущих страницах<br>учебника нет неизученных слов.</p>
      <button class="button game-window__buttonBegin button-play-game"></button>
    </div>
`;

const templateSprintGame = (
  score: number,
  comboMod: number,
  time: number,
  rightWord: Word,
  secondWord: Word,
) => {
  const timeLeft = Math.floor((time - Date.now()) / 1000);
  return `
<div class="sprint-game">
<div class="sprint-game__wrapper wrapper">

  <div class="sprint-game__hud">
    <div class="sprint-score">
      <div class="sprint-score__label">Очки:</div>
      <div class="sprint-score__img x${comboMod}"></div>
      <div class="sprint-score__number">${score}</div>
    </div>
    <div class="sprint-resleeng-img x${comboMod}"></div>
    <div class="sprint-time">
      <div class="sprint-time__label">Время:</div>
      <div class="sprint-time__number">${timeLeft}</div>
    </div>
  </div>

  <div class="sprint-game__word">
    <div class="sprint-word-en">
      <div class="sprint-word-en__text">${rightWord.word}</div>
      <button class="sprint-word-en__btn-listen"><img src="./assets/images/icons/btn-listen.svg"
          class="btn-listen__img" alt="👂"></button>
    </div>
    <div class="sprint-word-ru">${secondWord.wordTranslate}</div>
  </div>

  <div class="sprint-game__buttons">
    <button class="button button-answer sprint-button__wrong" data-id="button-wrong">Неверно</button>
    <button class="button button-answer sprint-button__correct" data-id="button-correct">Верно</button>
  </div>

</div>
</div>`;
};

export {
  templateSprint,
  templateSprintWindow,
  templateSprintGame,
};
