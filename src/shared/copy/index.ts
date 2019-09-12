import * as home from './home';
import * as information from './information';
import * as authentication from './authentication';

export enum LocaleCode {
    EN = 'en',
    PL = 'pl',
}

export type copyIndexer = {
    auth: { [key in LocaleCode]: authentication.authCopy };
    home: { [key in LocaleCode]: home.homeCopy };
    information: { [key in LocaleCode]: information.informationCopy };
};

export default {
    auth: authentication,
    home: home,
    information: information,
} as copyIndexer;
