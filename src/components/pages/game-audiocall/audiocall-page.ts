/* eslint-disable no-await-in-loop */
import {
  getGroupNumber,
  notLearnedMongoDBQuery,
  renderElement,
} from '../../../controllers/helpers';
import {
  templateAudiocall,
  templateAudiocallListening,
  templateAudiocallWindow,
  templateResults,
} from './template';
import { getWords } from '../../../controllers/api-services/vocabulary';
import { getGroupPage, getStorageItem } from '../../../controllers/api-services/storage';
import { Words } from '../../../models/words.interface';
import { Word } from '../../../models/word.interface';
import Loader, { SERVER } from '../../../controllers/loader';
import {
  playAudioAtResultsScreen,
  playAudioForCorrectAnswer,
  playAudioForWrongAnswer,
  randomizerWord,
} from '../game-common/game-common';
import {
  addUsersRightWordFromAudiocall, addUsersWrongWordFromAudiocall,
} from '../../../controllers/api-services/games';
import { templateGameResults } from '../game-common/game-templates';
import {
  AggregatedUserWord,
  AggregatedUserWords,
  ReceivedUserAggregatedWords,
} from '../../../models/users-words.interface';
import { parseAggregatedWords } from '../vocabulary/hard-page';
import { drawWaitForServer } from '../../preloader/preloader';

const groupNumber: number = getGroupNumber();

let pageWords: Words;
let pageWordsSet: Set<Word>;
let rightAnswer: Word;
let allGroupWords: Words;

const rightWords: Words = [];
const wrongWords: Words = [];

const randomizerWords = (array: Words, answer: Word) => {
  const wordsSet: Set<Word> = new Set([answer]);

  while (wordsSet.size < 5) {
    wordsSet.add(array[Math.floor(Math.random() * array.length)]);
  }

  const result: Words = Array.from(wordsSet).slice(1);
  result.splice(Math.floor(Math.random() * (result.length + 1)), 0, answer);
  return result;
};

const playAudio: (word: Word) => void = (word: Word) => {
  const audio: HTMLAudioElement = new Audio(`${SERVER + word.audio}`);
  audio.autoplay = true;
};

const startRound = () => {
  const audiocall: HTMLButtonElement = document.querySelector('.audiocall');
  rightAnswer = randomizerWord(pageWordsSet);

  const audiocallWords: Words = randomizerWords(pageWords, rightAnswer);

  audiocall.innerHTML = templateAudiocallListening(audiocallWords);
  playAudio(rightAnswer);
};

// генерация слов для игры из меню (20 любых слов без учета изученных/сложных)
const getGroupWords: (group: number) => Promise<Words> = (group: number) => {
  const promiseArray: Promise<Words>[] = Array(30)
    .fill(null)
    .map((item, page: number) => getWords({ group, page }));

  return Promise.all(promiseArray).then((wordsArray: Words[]) => {
    const array: Words = wordsArray.flat();
    allGroupWords = array;
    const wordsSet: Set<Word> = new Set();

    while (wordsSet.size < 20) {
      wordsSet.add(array[Math.floor(Math.random() * array.length)]);
    }

    return Array.from(wordsSet);
  });
};

const formPageWords: (array: Words) => void = async (array: Words) => {
  if (array.length < 5) {
    if (!array.length) {
      pageWords = await getGroupWords(groupNumber);
      pageWordsSet = new Set(pageWords);
    } else {
      pageWords = await getWords({
        group: groupNumber,
        page: +getStorageItem('page'),
      });

      pageWords = [...array, ...pageWords
        .filter((item: Word) => array.every((word: Word) => word.id !== item.id))].slice(0, 20);

      pageWordsSet = new Set(pageWords.filter((item: Word) => array
        .some((arrayItem: Word) => item.id === arrayItem.id)));
    }
  } else {
    pageWords = array;
    pageWordsSet = new Set(array);
  }
};

const getAggregatedUserWords = async (group: number, page: number) => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const query = `group=${group}&page=0&wordsPerPage=20&filter=${notLearnedMongoDBQuery(page)}`;
  const url = `users/${userId}/aggregatedWords?${query}`;

  return (
    await Loader.authorizedGet<ReceivedUserAggregatedWords>(url, token)
  )[0].paginatedResults;
};

// генерация слов для игры из учебника (20 слов со страницы - для незарег. пользователей,
// для зарег. пользователей - с учетом изученных слов)
const getVocabWords = async (group: number, page: number) => {
  let currentPage: number = page;
  const userId = localStorage.getItem('userId');

  let vocabWords: AggregatedUserWords = [];

  if (!userId) {
    const promiseArray: Promise<Words> = getWords({ group, page });
    return promiseArray.then((words: Words) => words);
  }

  if (groupNumber === 6 && Number(localStorage.getItem('hardWordsCount')) >= 5) {
    const hardWordsReceived = await Loader.getAggregatedUserWords();
    const hardWords = parseAggregatedWords(hardWordsReceived);
    return hardWords.slice(0, 20);
  }

  if (groupNumber === 6 && Number(localStorage.getItem('hardWordsCount')) < 5) {
    window.location.href = 'audiocall.html';
  }

  while (currentPage >= 0 && vocabWords.length < 20) {
    const words: AggregatedUserWords = await getAggregatedUserWords(group, currentPage);

    vocabWords = [...vocabWords, ...words];
    currentPage -= 1;
  }

  const vocabWordsWithId = vocabWords.slice(0, 20).map((word: AggregatedUserWord) => {
    const newWord = word;
    // eslint-disable-next-line no-underscore-dangle
    newWord.id = newWord._id;
    return word;
  });

  return vocabWordsWithId;
};

const startAudiocall = (group: number, page: number) => {
  getVocabWords(
    group,
    page,
  ).then(async (words: Words) => {
    await formPageWords(words);
    startRound();
  });
};

const randomizerArrayOfWords: (array: Words) => Words = (array: Words) => {
  const randomWordsSet: Set<Word> = new Set();

  while (randomWordsSet.size < 20) {
    randomWordsSet.add(array[Math.floor(Math.random() * array.length)]);
  }

  return Array.from(randomWordsSet);
};

const renderGameResultsScreen: () => void = () => {
  const audiocallGameContent: HTMLElement = document.querySelector('.audiocall-game__content');
  const buttonContinue: HTMLElement = document.querySelector('.button-continue');
  const audiocallGameWrapper: HTMLElement = document.querySelector('.audiocall-game__wrapper');

  if (!pageWordsSet.size) {
    buttonContinue.remove();
    renderElement('button', 'Результаты', audiocallGameContent, ['button', 'audiocall-content__button', 'button-results']);

    const buttonResults: HTMLElement = document.querySelector('.button-results');

    buttonResults.addEventListener('click', () => {
      const audiocallGame: HTMLElement = document.querySelector('.audiocall-game');
      audiocallGameWrapper.innerHTML = templateGameResults(rightWords, wrongWords);

      const statisticRight: HTMLElement = document.querySelector('.statistic-right');
      const statisticWrong: HTMLElement = document.querySelector('.statistic-wrong');

      audiocallGame.classList.add('results');
      playAudioAtResultsScreen();

      if (!rightWords.length) {
        statisticRight?.remove();
      }

      if (!wrongWords.length) {
        statisticWrong?.remove();
      }
    });
  }
};

const changeButtonContinue: () => void = () => {
  const audiocallGameContent: HTMLElement = document.querySelector('.audiocall-game__content');
  const buttonDontKnow: HTMLElement = document.querySelector('.button-dont-know');

  buttonDontKnow.remove();
  renderElement('button', 'Продолжить', audiocallGameContent, ['button', 'audiocall-content__button', 'button-continue']);
  renderGameResultsScreen();
};

const addEventListeners: () => void = () => {
  // переход из ссылки хэдера Аудиовызов
  document.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.game-window__button[data-group]');

    if (!eventTargetClosest) {
      return;
    }

    const gameText: HTMLElement = document.querySelector('.game-window__text-content') as HTMLElement;
    const loading = setTimeout(drawWaitForServer, 500, gameText);

    getGroupWords(+eventTargetClosest.dataset.group)
      .then(async (words: Words) => {
        await formPageWords(words);
        clearTimeout(loading);
        startRound();
      });
  });
  // проигрывание аудио
  document.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.button-play-audio');

    if (!eventTargetClosest) {
      return;
    }

    playAudio(rightAnswer);
  });

  // выбор варианта ответа
  document.addEventListener('click', (event: MouseEvent) => {
    const audiocallGameContainer: HTMLElement = document.querySelector('.audiocall-game__container');
    const audiocallContentItems: HTMLElement = document.querySelector('.audiocall-content__items');

    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('[data-id]');
    const eventTargetRight: HTMLElement = document.querySelector(`[data-id="${rightAnswer?.id}"]`);

    if (!eventTargetClosest || eventTargetClosest.parentElement.classList.contains('no-events')) {
      return;
    }

    if (eventTargetClosest.dataset.id === rightAnswer.id) {
      rightWords.push(rightAnswer);
      playAudioForCorrectAnswer();

      if (localStorage.getItem('token')) {
        addUsersRightWordFromAudiocall(rightAnswer.id);
      }
    }

    if (eventTargetClosest.dataset.id === 'button-dont-know') {
      wrongWords.push(rightAnswer);
      playAudioForWrongAnswer();

      if (localStorage.getItem('token')) {
        addUsersWrongWordFromAudiocall(rightAnswer.id);
      }
    }

    if (eventTargetClosest.dataset.id !== rightAnswer.id && eventTargetClosest.dataset.id !== 'button-dont-know') {
      eventTargetClosest.classList.add('wrong');
      wrongWords.push(rightAnswer);
      playAudioForWrongAnswer();

      if (localStorage.getItem('token')) {
        addUsersWrongWordFromAudiocall(rightAnswer.id);
      }
    }

    audiocallGameContainer.innerHTML = templateResults(rightAnswer);
    eventTargetRight.classList.add('right');
    audiocallContentItems.classList.add('no-events');

    changeButtonContinue();
  });
  // нажатие на кнопку Продолжить
  document.addEventListener('click', (event: MouseEvent) => {
    const audiocallGameContainer: HTMLElement = document.querySelector('.audiocall-game__container');
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.button-continue');

    if (!eventTargetClosest) {
      return;
    }

    audiocallGameContainer.innerHTML = '';
    startRound();
  });
  // начало игры по кнопке Начать
  document.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.button-play-game');

    if (!eventTargetClosest) {
      return;
    }

    startRound();
  });
  // начало игры по кнопке Еще раз(страница результатов)
  document.addEventListener('click', async (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.game-results__button_play-game');

    if (!eventTargetClosest) {
      return;
    }

    rightWords.length = 0;
    wrongWords.length = 0;

    if (Number.isInteger(getGroupNumber())) {
      startAudiocall(groupNumber, getGroupPage(groupNumber));
    } else {
      await formPageWords(randomizerArrayOfWords(allGroupWords));
      startRound();
    }
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

const addKeyboardEventListeners: () => void = () => {
  document.addEventListener('keyup', (event: KeyboardEvent) => {
    let userAnswerSelect: HTMLElement;

    if (event.code === 'Space') {
      userAnswerSelect = document.querySelector('.audiocall-content__button');
    } else if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      userAnswerSelect = document.querySelector('.button-play-audio');
    } else {
      userAnswerSelect = document.querySelector(`[data-number="${event.key}"]`);
    }

    if (!userAnswerSelect) {
      return;
    }

    userAnswerSelect.click();
  });
};

const addAudiocallWindow: () => void = async () => {
  const audiocallWindow: HTMLElement = document.querySelector('.game-window');

  if (!Number.isInteger(getGroupNumber()) || (groupNumber === 6 && Number(localStorage.getItem('hardWordsCount')) < 5)) {
    renderElement('div', templateAudiocallWindow, audiocallWindow, 'game-window__wrapper');
  } else if (!localStorage.getItem('token')) {
    renderElement('div', templateAudiocallWindow, audiocallWindow, ['game-window__wrapper', 'active']);
    const gameVocabText: HTMLElement = document.querySelector('.game-window__vocab-text');
    const buttonBeginGame: HTMLButtonElement = document.querySelector('.game-window__buttonBegin');

    gameVocabText.classList.remove('no-display');
    buttonBeginGame.disabled = true;

    const currentWords: Words = await getWords({
      group: groupNumber,
      page: getGroupPage(groupNumber),
    });
    await formPageWords(currentWords);

    buttonBeginGame.disabled = false;
  } else {
    renderElement('div', templateAudiocallWindow, audiocallWindow, ['game-window__wrapper', 'active']);
    const gameVocabText: HTMLElement = document.querySelector('.game-window__vocab-text');
    const buttonBeginGame: HTMLButtonElement = document.querySelector('.game-window__buttonBegin');

    buttonBeginGame.disabled = true;

    let currentWords: Words | AggregatedUserWords = (await getAggregatedUserWords(
      groupNumber,
      getGroupPage(groupNumber),
    ))
      .map((word: AggregatedUserWord) => {
        const newWord = word;
        // eslint-disable-next-line no-underscore-dangle
        newWord.id = newWord._id;
        return word;
      });

    if (currentWords.length < 20) {
      buttonBeginGame.disabled = true;
      currentWords = await getVocabWords(groupNumber, getGroupPage(groupNumber));

      if (!currentWords.length) {
        const gameNoVocabWordsText: HTMLElement = document.querySelector('.game-window__no-vocab-words');

        gameNoVocabWordsText.classList.remove('no-display');

        currentWords = await getGroupWords(groupNumber);

        buttonBeginGame.disabled = true;
      } else {
        gameVocabText.classList.remove('no-display');
      }
    } else {
      gameVocabText.classList.remove('no-display');
    }

    await formPageWords(currentWords);
    buttonBeginGame.disabled = false;
  }

  addEventListeners();
  addKeyboardEventListeners();
};

const addAudiocall: () => void = () => {
  renderElement('main', templateAudiocall, document.body, ['audiocall', 'color-audiocall']);
  addAudiocallWindow();
};

export { addAudiocall };
