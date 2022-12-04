import Loader from '../../../controllers/loader';
import { Settings } from '../../../models/statistics.interface';
import { ReceivedUserWords, ReceivedUserWord } from '../../../models/users-words.interface';
import { setStorageValues, getStorageItem } from '../../../controllers/api-services/storage';

const addActiveBtns = (
  word: HTMLDivElement,
  btnHard: HTMLButtonElement,
  btnLearn: HTMLButtonElement,
) => {
  if (!word) return;
  if (word.classList.contains('hard')) btnHard.classList.add('active');
  if (word.classList.contains('learned')) btnLearn.classList.add('active');
};

export const addLearnedPages = () => {
  const userId = localStorage.getItem('userId');
  if (!userId || document.querySelector('main').classList.contains('colors-hard')) return;

  const url = `users/${userId}/settings`;
  const token = localStorage.getItem('token');
  Loader.authorizedGet<Settings>(url, token).then((data: Settings) => {
    const serverGroup = data.optional.learnedPages[Number(getStorageItem('group'))];
    const pageSelectors = document.querySelectorAll('.page-selector__btn');
    pageSelectors.forEach((selector, index) => {
      if (serverGroup[index] === 1) {
        selector.classList.add('learned');
      }
    });
  });
};

export const checkPage = () => {
  if (document.querySelector('main').classList.contains('colors-hard')) return;
  const url = `users/${localStorage.getItem('userId')}/settings`;
  const token = localStorage.getItem('token');
  const words = document.querySelectorAll('.word-list__card');
  const learnedwords = Array.from(words).filter((word) => word.classList.contains('learned'));
  const page = document.querySelector(`[data-page="${+getStorageItem('page') + 1}"]`);
  if (learnedwords.length === 20) {
    document.querySelector('.words-page__audio-img').classList.add('grayscale80');
    document.querySelector('.words-page__sprint-img').classList.add('grayscale80');
    document.querySelector('.word-list').classList.add('learned');
    page.classList.add('learned');
    Loader.authorizedGet<Settings>(url, token).then((data: Settings) => Loader.updateLearnedPage(data, 'add'));
  }
  if (learnedwords.length < 20) {
    document.querySelector('.words-page__audio-img').classList.remove('grayscale80');
    document.querySelector('.words-page__sprint-img').classList.remove('grayscale80');
    document.querySelector('.word-list').classList.remove('learned');
  }
  if (learnedwords.length < 20 && page.classList.contains('learned')) {
    page.classList.remove('learned');
    Loader.authorizedGet<Settings>(url, token).then((data: Settings) => Loader.updateLearnedPage(data, 'remove'));
  }
};

const updateGamesParams = (data: ReceivedUserWord) => {
  document.querySelector('.games-stat__audio-success').textContent = String(data.optional.audioSuccess);
  document.querySelector('.games-stat__audio-total').textContent = String(data.optional.audioTotal);
  document.querySelector('.games-stat__sprint-success').textContent = String(data.optional.sprintSuccess);
  document.querySelector('.games-stat__sprint-total').textContent = String(data.optional.sprintTotal);
};

export const addActiveWords = () => {
  const userId = localStorage.getItem('userId');
  if (!userId) return;

  const url = `users/${userId}/words`;
  const token = localStorage.getItem('token');
  Loader.authorizedGet<ReceivedUserWords>(url, token).then((serverWords) => {
    const storageWords: ReceivedUserWords = [];
    const words = document.querySelectorAll('.word-list__card');
    (Array.from(words) as HTMLDivElement[]).forEach((word) => {
      let difficulty: string;
      const res = serverWords.find((serverWord) => {
        difficulty = serverWord.difficulty;
        return serverWord.wordId === word.dataset.word;
      });
      if (res) storageWords.push(res);
      if (res && (difficulty === 'hard' || difficulty === 'learned')) word.classList.add(difficulty);
    });
    setStorageValues(['userWords', JSON.stringify(storageWords)]);

    const wordId = getStorageItem('id') as string;
    const word = document.querySelector(`[data-word="${wordId}"]`) as HTMLDivElement;
    const btnHard = document.querySelector('.btn-hard') as HTMLButtonElement;
    const btnLearn = document.querySelector('.btn-learn') as HTMLButtonElement;
    addActiveBtns(word, btnHard, btnLearn);
    const recievedWord = (Array.from(storageWords) as ReceivedUserWords)
      .find((serverWord: ReceivedUserWord) => serverWord.wordId === word.dataset.word);
    if (recievedWord) updateGamesParams(recievedWord);
    checkPage();
  });
};

export const addActiveCardBtns = (btnHard: HTMLButtonElement, btnLearn: HTMLButtonElement) => {
  const word = document.querySelector(`[data-word="${getStorageItem('id') as string}"]`) as HTMLDivElement;
  if (!word) return;
  addActiveBtns(word, btnHard, btnLearn);

  const serverWords = JSON.parse(localStorage.getItem('userWords'));
  if (!serverWords) return;
  const recievedWord = (Array.from(serverWords) as ReceivedUserWords)
    .find((serverWord: ReceivedUserWord) => serverWord.wordId === word.dataset.word);
  if (recievedWord) updateGamesParams(recievedWord);
};
