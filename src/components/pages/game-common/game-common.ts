import { Word } from '../../../models/word.interface';
import { SERVER } from '../../../controllers/loader';

export const randomizerWord = (wordsSet: Set<Word>, remove: boolean = true) => {
  const answer: Word = Array.from(wordsSet)[Math.floor(Math.random() * wordsSet.size)];

  if (remove) wordsSet.delete(answer);

  return answer;
};

export const playAudio: (word: Word) => void = (word: Word) => {
  const audio: HTMLAudioElement = new Audio(`${SERVER + word.audio}`);
  audio.autoplay = true;
};

const checkAudioSettings: (sound: HTMLAudioElement) => void = (sound: HTMLAudioElement) => {
  const audio: HTMLAudioElement = sound;

  if (localStorage.getItem('isSoundOn') === 'true' || !localStorage.getItem('isSoundOn')) {
    audio.autoplay = true;
  } else {
    audio.autoplay = false;
  }
};

export const playAudioForCorrectAnswer: () => void = () => {
  const audio: HTMLAudioElement = new Audio('./assets/audio/right.mp3');

  checkAudioSettings(audio);
};

export const playAudioForWrongAnswer: () => void = () => {
  const audio: HTMLAudioElement = new Audio('./assets/audio/wrong.mp3');

  checkAudioSettings(audio);
};

export const playAudioAtResultsScreen: () => void = () => {
  const audio: HTMLAudioElement = new Audio('./assets/audio/results.mp3');

  checkAudioSettings(audio);
};
