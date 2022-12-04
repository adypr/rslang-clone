import Loader from '../../../controllers/loader';
import { BaseObject } from '../../../models/base.interface';
import { ReceivedUserWord, UsersWord } from '../../../models/users-words.interface';
import { addActiveCardBtns, checkPage } from './active-classes';
import { getStorageItem } from '../../../controllers/api-services/storage';
import { addLearnedWordStat, removeLearnedWordStat } from '../../../controllers/statistics';
import { HARD_WORDS_LIMIT } from './hard-page';

const sendWord = (wordId: string, difficulty: string) => {
  const query = `users/${localStorage.getItem('userId')}/words/${wordId}`;
  Loader.authorizedGet<ReceivedUserWord>(query, localStorage.getItem('token')).then((data: ReceivedUserWord) => {
    if (difficulty === data.difficulty) { // Повторное нажатие на кнопку для снятия выделения
      const isUsedWord = Object.keys(data.optional)
        .filter((option) => ((data.optional as BaseObject)[option] as number) !== 0).length !== 0;
      if (!isUsedWord) Loader.deleteWord(wordId); // Если слово не использовалось в минииграх
      else {
        const params = {
          difficulty: 'new',
          optional: data.optional,
        };
        Loader.updateWord(wordId, params);
      }
    } else {
      const params = {
        difficulty,
        optional: data.optional,
      };
      Loader.updateWord(wordId, params);
    }
  })
    .catch(() => {
      const params: UsersWord = {
        difficulty,
        optional: {
          audioSuccess: 0,
          audioTotal: 0,
          sprintSuccess: 0,
          sprintTotal: 0,
          successStreak: 0,
        },
      };
      return Loader.createWord(wordId, params);
    });
};

const addCardButtons = () => {
  if (localStorage.getItem('token')) {
    ['.btn-hard', '.btn-learn', '.games-stat'].forEach((elem) => {
      document.querySelector(elem).classList.remove('no-display');
    });
  }

  const wordId = getStorageItem('id') as string;
  const btnHard = document.querySelector('.btn-hard');
  const btnLearn = document.querySelector('.btn-learn');
  const card = document.querySelector(`.word-list__card[data-word="${wordId}"]`);
  btnHard.addEventListener('click', async () => {
    if (!card) return;

    let hardWordsCount = +localStorage.getItem('hardWordsCount');
    if (hardWordsCount && hardWordsCount === HARD_WORDS_LIMIT && !card.classList.contains('hard')) {
      const message = document.querySelector('.word-display__message') as HTMLParagraphElement;
      message.style.display = 'block';
      setTimeout(() => {
        message.style.display = 'none';
      }, 3500);
      return;
    }

    card.classList.toggle('hard');
    card.classList.remove('learned');
    btnHard.classList.toggle('active');
    if (btnLearn.classList.contains('active')) {
      const stat = await Loader.getStatistics();
      removeLearnedWordStat(stat);
      Loader.upsertStatistics(stat);
      btnLearn.classList.remove('active');
    }
    if (card.classList.contains('hard')) {
      hardWordsCount = hardWordsCount ? hardWordsCount + 1 : 1;
    } else {
      hardWordsCount -= 1;
    }
    localStorage.setItem('hardWordsCount', String(hardWordsCount));

    sendWord(wordId, 'hard');
    checkPage();
  });
  btnLearn.addEventListener('click', async () => {
    if (!card) return;
    card.classList.toggle('learned');

    if (card.classList.contains('hard')) {
      let hardWordsCount = +localStorage.getItem('hardWordsCount');
      hardWordsCount -= 1;
      localStorage.setItem('hardWordsCount', String(hardWordsCount));
      card.classList.remove('hard');
    }
    btnHard.classList.remove('active');
    btnLearn.classList.toggle('active');
    sendWord(wordId, 'learned');

    const stat = await Loader.getStatistics();
    if (btnLearn.classList.contains('active')) {
      addLearnedWordStat(stat);
    } else removeLearnedWordStat(stat);
    Loader.upsertStatistics(stat);
    checkPage();
  });
  addActiveCardBtns(btnHard as HTMLButtonElement, btnLearn as HTMLButtonElement);
};

export { addCardButtons };
