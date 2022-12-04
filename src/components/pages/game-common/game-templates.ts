import { countGameResults } from '../../../controllers/helpers';
import { SERVER } from '../../../controllers/loader';
import { Word } from '../../../models/word.interface';
import { Words } from '../../../models/words.interface';

const templateStatisticWord = (word: Word) => `
  <div class="statistic-item">
  <audio src="${SERVER + word.audio}"></audio>
    <button class="statistic-item__button"><img src="./assets/images/icons/btn-listen.svg"
        class="btn-listen__img" alt="👂">
    </button>
    <span class="statistic-item__text"><span class="statistic-item__name">${word.word}</span> — ${word.wordTranslate}</span>
  </div>
`;

const templateGameResults = (rightWords: Words, wrongWords: Words, gameResults?: string) => `
  <div class="game-results">
    <span class="game-results__heading">Правильных ответов:  ${rightWords.length} из ${rightWords.length + wrongWords.length}</span>
    
    <div class="game-results__wrapper">
      <div class="game-results__mark">
        <span class="game-results__text">
          ${gameResults || countGameResults(rightWords, wrongWords)}
        </span>
      </div>
      <div class="game-results__statistic">
        <div class="statistic statistic-wrong">
          <span class="statistic__heading">Ошибки:</span>
          <div class="statistic__items">
            ${wrongWords.map((word: Word) => templateStatisticWord(word)).join('')}
          </div>
        </div>
  
        <div class="statistic statistic-right">
          <span class="statistic__heading">Правильные ответы:</span>
          <div class="statistic__items">
            ${rightWords.map((word: Word) => templateStatisticWord(word)).join('')}
          </div>
        </div>
      </div>
    </div>
    <div class="game-results__buttons">
    <button class="button game-results__button game-results__button_play-game">Еще раз!</button>
    <a class="button game-results__button game-results__button_textbook" href="vocabulary.html">В учебник</a>
    </div>
  </div>
  
`;

export {
  templateGameResults,
};
