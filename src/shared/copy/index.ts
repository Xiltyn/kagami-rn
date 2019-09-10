import * as Authentication from './Authentication';
import { authCopy } from './Authentication';

export enum LocaleCode {
    EN = 'en',
    PL = 'pl',
}

export type copyIndexer = {
    auth: { [key in LocaleCode]: authCopy };
};

export default {
    auth: Authentication,
} as copyIndexer;
