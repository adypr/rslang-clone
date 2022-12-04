import '../../../global.scss';
import { addHeader } from '../../header/header';
import { addFooter } from '../../footer/footer';

import { templateVocab, templateWordCard } from './templates';
import { getGroupNumber, renderElement } from '../../../controllers/helpers';

import { Word } from '../../../models/word.interface';
import { getWords } from '../../../controllers/api-services/vocabulary';
import { Words } from '../../../models/words.interface';
import { initWordCard, selectWordCard } from './word-card';
import { setWords } from './words-map';
import { addLearnedPages, addActiveWords } from './active-classes';
import {
  getGroupPage,
  getStorageItem,
  savePages,
  setStorageItem,
} from '../../../controllers/api-services/storage';
import Loader from '../../../controllers/loader';
import { parseAggregatedWords } from './hard-page';
import { drawWaitForServer } from '../../preloader/preloader';

const TEXTBOOK_GROUPS: string[] = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2', 'hard'];
const groupNumber: number = getGroupNumber() || Number(getStorageItem('group')) || 0;

const renderWords = (wordList: HTMLElement, words: Words) => {
  const templatesOfWords: string = words.map((word, i) => {
    if (i === 0) setStorageItem('id', word.id);
    return templateWordCard(word);
  }).join('');

  // eslint-disable-next-line
  wordList.innerHTML = templatesOfWords;

  setWords(
    words.reduce(
      (wordsMap: Record<string, Word>, word: Word) => ({ ...wordsMap, [word.id]: word }),
      {},
    ),
  );

  addActiveWords();
  selectWordCard();
};

const renderWordList: () => void = () => {
  const wordList: HTMLElement = document.querySelector('.word-list') as HTMLElement;
  const loading = setTimeout(drawWaitForServer, 500, wordList);

  if (document.querySelector('main').classList.contains('colors-hard')) {
    Loader.getAggregatedUserWords().then((data) => {
      const hardWords = parseAggregatedWords(data);
      clearTimeout(loading);
      renderWords(wordList, hardWords);
    }).then(() => {
      if (wordList.querySelectorAll('.word-list__card').length === 0) {
        throw new Error();
      }
    })
      .catch(() => {
        (document.querySelector('.vocab__container') as HTMLDivElement).style.height = '1px';
        if (wordList.innerHTML === '' || wordList.querySelector('.wait-for-server')) wordList.innerHTML = '<p class="word-list__message">Войдите в аккаунт для доступа к сохраненным сложным словам</p>';
      });
  } else {
    getWords({
      group: groupNumber,
      page: getGroupPage(groupNumber),
    }).then((words: Words) => {
      clearTimeout(loading);
      renderWords(wordList, words);
    });
  }
};

const setPage = (currentPage: number = 0, isRemoveId?: boolean) => {
  const currentPageNext: HTMLElement = document.querySelector(`[data-page="${currentPage + 1}"]`);
  const currentPageActive: HTMLElement = document.querySelector('.page-selector__btn.active');
  const currentPageNumSpan: HTMLSpanElement = document.querySelector('.page-num__curr-page');

  const buttonSwitchLeft: HTMLElement = document.querySelector('.page-switch__btn.left');
  const buttonSwitchRight: HTMLElement = document.querySelector('.page-switch__btn.right');

  setStorageItem('page', `${+currentPage}`);
  currentPageActive?.classList?.remove('active');
  currentPageNext.classList.add('active');
  currentPageNumSpan.textContent = `${currentPage + 1}`;

  if (isRemoveId) {
    setStorageItem('id', null);
  }

  buttonSwitchLeft.classList.toggle('disabled', currentPage < 1);
  buttonSwitchRight.classList.toggle('disabled', currentPage >= 29);

  savePages(groupNumber, currentPage);
  renderWordList();
};

const addSwitches: () => void = () => {
  document.body.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('.page-switch__btn');

    if (!eventTargetClosest) {
      return;
    }

    if (eventTargetClosest.classList.contains('left')) {
      setPage(getGroupPage(groupNumber) - 1, true);
    } else {
      setPage(getGroupPage(groupNumber) + 1, true);
    }
  });
};

const addPagination: () => void = () => {
  addSwitches();
  addLearnedPages();

  document.body.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const eventTargetClosest: HTMLElement = eventTarget.closest('[data-page]');

    if (!eventTargetClosest) {
      return;
    }

    const currentPage: string = eventTargetClosest.dataset.page;

    setPage(+currentPage - 1, true);
  });

  setPage(getGroupPage(groupNumber));
};

const initWordList: () => void = () => {
  const vocab: HTMLElement = document.querySelector('.vocab');

  vocab.classList.add(`${TEXTBOOK_GROUPS[groupNumber]}`, `colors-${TEXTBOOK_GROUPS[groupNumber]}`);

  addPagination();
};

const renderVocabulary: () => void = () => {
  renderElement('main', templateVocab(groupNumber), document.body, 'vocab');
  initWordCard();
};

addHeader();
renderVocabulary();
addFooter();
initWordList();
