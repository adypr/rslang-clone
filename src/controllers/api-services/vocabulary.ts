import Loader from '../loader';
import { Word } from '../../models/word.interface';
import { BaseObject } from '../../models/base.interface';
import { Words } from '../../models/words.interface';

export function getWords(paginator: BaseObject): Promise<Words> {
  return Loader.getPage('words', paginator);
}

export function getWord(id: string): Promise<Word> {
  return Loader.get(`words/${id}`);
}
