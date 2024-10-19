import { BaseObject } from '../models/base.interface';
import { mapToURLParams } from './api-services/param.helper';
import { Words } from '../models/words.interface';
import { setStorageValues, getStorageItem } from './api-services/storage';
import { UsersWord } from '../models/users-words.interface';
import { Settings, Statistics } from '../models/statistics.interface';
import { AggregatedWords } from '../models/aggregatedWords.interface';
import { newStatistics } from './statistics';

export const SERVER = 'https://react-rslang-be-h11f.onrender.com';

export default class Loader {
  private static errorHandler(res: Response): Response {
    // if (!res.ok) {
    //   console.log('Loader error');
    // }
    return res;
  }

  private static load(url: URL, method: string, data?: BaseObject): Promise<Response> {
    return fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method,
      body: data ? JSON.stringify(data) : undefined,
    })
      .then((res: Response) => Loader.errorHandler(res));
  }

  private static authorizedLoad(
    url: URL,
    method: string,
    token: string,
    data?: BaseObject | UsersWord | Statistics | Settings,
  ): Promise<Response> {
    return fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method,
      body: data ? JSON.stringify(data) : undefined,
    })
      .then((res: Response) => Loader.errorHandler(res));
  }

  public static getPage(url: string, params?: BaseObject): Promise<Words> {
    const query = new URL(url, SERVER);

    if (params) {
      query.search = new URLSearchParams(mapToURLParams(params, true)).toString();
    }

    return Loader.load(query, 'GET')
      .then((res: Response) => res.json()
        .then((items: Words) => items));
  }

  public static get<T>(url: string, params?: BaseObject): Promise<T> {
    const query = new URL(url, SERVER);

    if (params) {
      query.search = new URLSearchParams(mapToURLParams(params)).toString();
    }

    return Loader.load(query, 'GET').then((res: Response) => res.json());
  }

  public static authorizedGet<T>(url: string, token: string, params?: BaseObject): Promise<T> {
    const query = new URL(url, SERVER);

    if (params) {
      query.search = new URLSearchParams(mapToURLParams(params)).toString();
    }

    return Loader.authorizedLoad(query, 'GET', token).then((res) => res.json());
  }

  public static createUser(user: BaseObject) {
    return Loader.load(new URL('users', SERVER), 'POST', user).then((res: Response) => res.json());
  }

  public static loginUser(user: BaseObject) {
    return Loader.load(new URL('signin', SERVER), 'POST', user).then((res: Response) => res.json()).then((data) => {
      setStorageValues(['userId', data.userId], ['name', data.name], ['token', data.token], ['refreshToken', data.refreshToken]);
    });
  }

  public static createWord = (wordId: string, params: UsersWord) => {
    const token = localStorage.getItem('token');
    const query = new URL(`users/${localStorage.getItem('userId')}/words/${wordId}`, SERVER);

    return Loader.authorizedLoad(query, 'POST', token, params);
  };

  public static updateWord = (wordId: string, params: UsersWord) => {
    const token = localStorage.getItem('token');
    const query = new URL(`users/${localStorage.getItem('userId')}/words/${wordId}`, SERVER);

    return Loader.authorizedLoad(query, 'PUT', token, params);
  };

  public static deleteWord = (wordId: string) => {
    const token = localStorage.getItem('token');
    const query = new URL(`users/${localStorage.getItem('userId')}/words/${wordId}`, SERVER);

    return Loader.authorizedLoad(query, 'DELETE', token);
  };

  public static updateLearnedPage = (data: Settings, method: 'add' | 'remove') => {
    const token = localStorage.getItem('token');
    const query = new URL(`users/${localStorage.getItem('userId')}/settings`, SERVER);
    const group = +getStorageItem('group');
    const page = +getStorageItem('page');

    const params = { optional: data.optional };
    if (method === 'add') params.optional.learnedPages[group][page] = 1;
    if (method === 'remove') params.optional.learnedPages[group][page] = 0;

    return Loader.authorizedLoad(query, 'PUT', token, params);
  };

  public static initSettings = (userId: string, token: string, data: Settings) => {
    const query = new URL(`users/${userId}/settings`, SERVER);
    return Loader.authorizedLoad(query, 'PUT', token, data);
  };

  public static initStatistics = (userId: string, token: string, data: Statistics) => {
    const query = new URL(`users/${userId}/statistics`, SERVER);
    return Loader.authorizedLoad(query, 'PUT', token, data);
  };

  public static upsertStatistics = (data: Statistics) => {
    const token = localStorage.getItem('token');
    const query = new URL(`users/${localStorage.getItem('userId')}/statistics`, SERVER);
    return Loader.authorizedLoad(query, 'PUT', token, data);
  };

  public static async getStatistics(): Promise<Statistics> {
    const token = localStorage.getItem('token');
    if (token) {
      const query = new URL(`users/${localStorage.getItem('userId')}/statistics`, SERVER);
      const response = await Loader.authorizedLoad(query, 'GET', token).then((res: Response) => res.json());
      delete response.id;
      return response;
    }
    return newStatistics;
  }

  public static getUserWord: (wordId: string) => Promise<UsersWord> = (wordId: string) => {
    const token = localStorage.getItem('token');
    const query = new URL(`users/${localStorage.getItem('userId')}/words/${wordId}`, SERVER);

    return Loader.authorizedLoad(query, 'GET', token).then((res: Response) => res.json());
  };

  public static getAggregatedUserWords: (difficulty?: string) =>
  Promise<AggregatedWords> = (difficulty = 'hard') => {
      const token = localStorage.getItem('token');
      const query = new URL(`users/${localStorage.getItem('userId')}/aggregatedWords?wordsPerPage=100&filter=%7B%22userWord.difficulty%22%3A%22${difficulty}%22%7D`, SERVER);

      return Loader.authorizedLoad(query, 'GET', token).then((res: Response) => res.json());
    };
}
