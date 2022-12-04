/* eslint-disable no-await-in-loop */
import { getGroupNumber, notLearnedMongoDBQuery, renderElement } from '../../../controllers/helpers';
import {
  templateSprint,
  templateSprintGame,
  templateSprintWindow,
} from './template';
import { getWords } from '../../../controllers/api-services/vocabulary';
import { getGroupPage } from '../../../controllers/api-services/storage';
import { Words } from '../../../models/words.interface';
import { Word } from '../../../models/word.interface';
import {
  playAudio, playAudioAtResultsScreen,
  playAudioForCorrectAnswer,
  playAudioForWrongAnswer,
  randomizerWord,
} from '../game-common/game-common';
import { templateGameResults } from '../game-common/game-templates';
import { addUsersRightWordFromSprint, addUsersWrongWordFromSprint } from '../../../controllers/api-services/games';
import Loader from '../../../controllers/loader';
import { AggregatedWord, AggregatedWords } from '../../../models/aggregatedWords.interface';
import { parseAggregatedWords } from '../vocabulary/hard-page';
import { drawWaitForServer } from '../../preloader/preloader';

const groupNumber: number = getGroupNumber();
let pageNumber: number;
let pageNumberCurrent: number;
if (Number.isInteger(getGroupNumber())) pageNumber = getGroupPage(groupNumber);

let rightWord: Word;
let wrongWord: Word;
let correctAnswer: boolean;
let score: number;
let combo: number;
let comboMod: number;
let time: number;
let timer: NodeJS.Timer;

let gameStarted: boolean;
let gameWords: Words | AggregatedWord[];
let gameWordsCurrent: Set<Word | AggregatedWord>;

const rightWords: Words = [];
const wrongWords: Words = [];

/** Генерация слов всей категории (если из меню) */
const getGroupWords: (group: number) => Promise<Words> = (group: number) => {
  const promiseArray: Promise<Words>[] = Array(30)
    .fill(null)
    .map((item, page: number) => getWords({ group, page }));

  return Promise.all(promiseArray).then((wordsArray: Words[]) => {
    const array: Words = wordsArray.flat();
    return array;
  });
};

/** Генерация слов при переходе со страницы учебника.
 * Если не авторизован, вернуть слова с указанной страницы.
 * Если авторизован, запросить и вернуть только
 * изученные слова с указанной страницы. */
const getVocabWords = async (group: number, page: number) => {
  const userId = localStorage.getItem('userId');

  if (!userId) {
    const promiseArray: Promise<Words> = getWords({ group, page });
    return promiseArray.then((words: Words) => words);
  }

  const query = `group=${group}&page=0&wordsPerPage=20&filter=${notLearnedMongoDBQuery(page)}`;
  const url = `users/${userId}/aggregatedWords?${query}`;
  const token = localStorage.getItem('token');

  const vocabWords = await Loader.authorizedGet<AggregatedWords>(url, token);
  const vocabWordsWithId = parseAggregatedWords(vocabWords);
  return vocabWordsWithId;
};

// Счётчик комбо
const comboCounter = () => {
  if (combo < 4) comboMod = 1;
  if (combo >= 4 && combo < 8) comboMod = 2;
  if (combo >= 8 && combo < 12) comboMod = 4;
  if (combo >= 12) comboMod = 8;
};

/** Вывод экрана результатов */
const renderGameResultsScreen: () => void = () => {
  const gameWrapper: HTMLElement = document.querySelector('.sprint-game__wrapper');
  const sprintGame: HTMLElement = document.querySelector('.sprint-game');
  const gameResults = `Очки: ${score}`;
  gameWrapper.innerHTML = templateGameResults(rightWords, wrongWords, gameResults);

  const statisticRight: HTMLElement = document.querySelector('.statistic-right');
  const statisticWrong: HTMLElement = document.querySelector('.statistic-wrong');

  sprintGame.classList.add('results');
  playAudioAtResultsScreen();

  if (!rightWords.length) {
    statisticRight?.remove();
  }

  if (!wrongWords.length) {
    statisticWrong?.remove();
  }
};

/** Новое загаданное слово.
 * Если слов больше не осталось, попробовать добыть еще.
 * Если все равно нет, показать экран результатов */
const newGameRound = async () => {
  const sprint: HTMLButtonElement = document.querySelector('.sprint');

  if (gameWordsCurrent.size < 1) {
    while (pageNumberCurrent > 0 && gameWordsCurrent.size < 1) {
      pageNumberCurrent -= 1;
      const newWords = await getVocabWords(groupNumber, pageNumberCurrent);
      gameWordsCurrent = new Set(newWords);
    }
    if (gameWordsCurrent.size < 1) {
      clearInterval(timer);
      gameStarted = false;
      renderGameResultsScreen();
    }
  }

  if (gameWordsCurrent.size === 1) {
    rightWord = randomizerWord(gameWordsCurrent);
    wrongWord = rightWord;
    correctAnswer = true;

    sprint.innerHTML = templateSprintGame(
      score,
      comboMod,
      time,
      rightWord,
      correctAnswer ? rightWord : wrongWord,
    );
  }

  if (gameWordsCurrent.size > 1) {
    rightWord = randomizerWord(gameWordsCurrent);
    wrongWord = randomizerWord(gameWordsCurrent, false);
    correctAnswer = Math.random() < 0.5;

    sprint.innerHTML = templateSprintGame(
      score,
      comboMod,
      time,
      rightWord,
      correctAnswer ? rightWord : wrongWord,
    );
  }
};

/** Начало игры.
 * Сбросить очки, комбо, время, запустить таймер
 * и начать загадывать слова. */
const startGame = () => {
  gameWordsCurrent = new Set(gameWords);
  score = 0;
  combo = 0;
  comboMod = 1;
  time = Date.now() + 30000;

  gameStarted = true;
  timer = setInterval(() => {
    const timeNumber = document.querySelector('.sprint-time__number');
    if (timeNumber) timeNumber.innerHTML = String(Math.floor((time - Date.now()) / 1000));

    if ((time - Date.now()) < 0) {
      clearInterval(timer);
      gameStarted = false;
      renderGameResultsScreen();
    }
  }, 500);
  newGameRound();
};

/** Если нажатие на кнопку "Верно" */
const clickCorrect = () => {
  if (correctAnswer) {
    score += 10 * comboMod;
    combo += 1;
    comboCounter();
    if (localStorage.getItem('token')) {
      addUsersRightWordFromSprint(rightWord.id);
    }
    rightWords.push(rightWord);
    playAudioForCorrectAnswer();
  } else {
    combo = 0;
    comboCounter();
    if (localStorage.getItem('token')) {
      addUsersWrongWordFromSprint(rightWord.id);
    }
    wrongWords.push(rightWord);
    playAudioForWrongAnswer();
  }
};

/** Если нажатие на кнопку "Неверно" */
const clickWrong = () => {
  if (!correctAnswer) {
    score += 10 * comboMod;
    combo += 1;
    comboCounter();
    if (localStorage.getItem('token')) {
      addUsersRightWordFromSprint(rightWord.id);
    }
    rightWords.push(rightWord);
    playAudioForCorrectAnswer();
  } else {
    combo = 0;
    comboCounter();
    if (localStorage.getItem('token')) {
      addUsersWrongWordFromSprint(rightWord.id);
    }
    wrongWords.push(rightWord);
    playAudioForWrongAnswer();
  }
};

// Добавление ивентлиснеров для кнопок (спасибо, Белла!)
const addEventListeners: () => void = () => {
  // переход из ссылки хедера
  document.addEventListener('click', async (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.game-window__button[data-group]');

    if (!eventTargetClosest) {
      return;
    }

    const gameText: HTMLElement = document.querySelector('.game-window__text-content') as HTMLElement;
    const loading = setTimeout(drawWaitForServer, 500, gameText);

    gameWords = await getGroupWords(+eventTargetClosest.dataset.group);
    clearTimeout(loading);
    startGame();
  });

  // Переход из учебника и начало игры по кнопке Начать
  document.addEventListener('click', async (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.button-play-game:not([disabled])');

    if (!eventTargetClosest) {
      return;
    }

    pageNumberCurrent = pageNumber;
    startGame();
  });

  // проигрывание аудио
  document.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.sprint-word-en__btn-listen');

    if (!eventTargetClosest) {
      return;
    }

    playAudio(rightWord);
  });

  // выбор варианта ответа
  document.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.button-answer');

    const eventTargetWrong: HTMLElement = document.querySelector('.sprint-button__wrong');
    const eventTargetCorrect: HTMLElement = document.querySelector('.sprint-button__correct');

    if (!eventTargetClosest) {
      return;
    }

    if (eventTargetClosest === eventTargetCorrect) {
      clickCorrect();
    }

    if (eventTargetClosest === eventTargetWrong) {
      clickWrong();
    }

    newGameRound();
  });

  // Выбор варианта ответа с помощью клавиатуры
  document.addEventListener('keydown', (e) => {
    if (!gameStarted) return;

    if (e.code === 'ArrowLeft' && !e.repeat) {
      clickWrong();
      newGameRound();
    }

    if (e.code === 'ArrowRight' && !e.repeat) {
      clickCorrect();
      newGameRound();
    }
  });

  // начало игры по кнопке Еще раз(страница результатов)
  document.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.game-results__button_play-game');

    if (!eventTargetClosest) {
      return;
    }

    rightWords.length = 0;
    wrongWords.length = 0;
    pageNumberCurrent = pageNumber;
    startGame();
  });

  // включение аудио на странице результатов игры
  document.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.statistic-item__button');
    const wordAudio: HTMLAudioElement = eventTargetClosest
      ?.previousElementSibling as HTMLAudioElement;

    if (!eventTargetClosest) {
      return;
    }

    wordAudio.play();
  });
};

/** Генерация стартового экрана.
 * Если с учебника (есть номер страницы), сразу загружает слова
 * и показывает кнопку Начать (блокируя ее на время загрузки).
 * Если с меню, покажет экран выбора категории */
const addSprintWindow: () => Promise<void> = async () => {
  const sprintWindow: HTMLElement = document.querySelector('.game-window');

  if (pageNumber >= 0) {
    renderElement('div', templateSprintWindow, sprintWindow, ['game-window__wrapper', 'active']);
    const startGameButton: HTMLButtonElement = document.querySelector('.button-play-game');
    startGameButton.disabled = true;

    if (groupNumber === 6) {
      if (Number(localStorage.getItem('hardWordsCount')) >= 1) {
        const vocabWords = await Loader.getAggregatedUserWords();
        const hardWords = parseAggregatedWords(vocabWords);
        gameWords = hardWords;
      } else {
        sprintWindow.innerHTML = '';
        pageNumber = -1;
      }
    }

    if (groupNumber >= 0 && groupNumber < 6) {
      gameWords = await getVocabWords(groupNumber, pageNumber);

      while (gameWords.length < 1) {
        if (pageNumber === 0) {
          const gameVocabText: HTMLElement = document.querySelector('.game-window__vocab-text');
          const gameNoVocabWordsText: HTMLElement = document.querySelector('.game-window__no-vocab-words');
          gameVocabText.classList.add('no-display');
          gameNoVocabWordsText.classList.remove('no-display');
          gameWords = await getGroupWords(groupNumber);
          break;
        }
        pageNumber -= 1;
        gameWords = await getVocabWords(groupNumber, pageNumber);
      }
    }
    startGameButton.disabled = false;
  }

  if (pageNumber === undefined || pageNumber < 0) {
    renderElement('div', templateSprintWindow, sprintWindow, 'game-window__wrapper');
  }

  addEventListeners();
};

/** Базовое окно, в котором будет рисоваться блок игры */
const addSprint: () => void = () => {
  renderElement('main', templateSprint, document.body, ['sprint', 'color-sprint']);
  addSprintWindow();
};

export { addSprint };
