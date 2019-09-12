export enum informationKeys {
    header = 'header',
    features_header = 'features_header',
    features_list = 'features_list',
}

export type informationCopy = {[key in informationKeys]: string|string[]};

export const en: informationCopy = {
    [informationKeys.header]: 'Details',
    [informationKeys.features_header]: 'Features included in the build',
    [informationKeys.features_list]: [
        'Expo SDK 34 powered',
        'Typescript based codebase',
        'Linting with TSLint',
        'Testing units build with Jest',
        'React Native Debugger setup for Dev',
        'Environmental Variables with Expo release-channels',
        'Redux with Saga for handling data logic',
        'Premade Authentication module for token based auth',
        'Premade Google Maps module as an example of data flow',
        'Data Architecture based on Typescript classes implementation',
        'MockRequest util for API-less testing with real-life responses',
        'Styling with Styled-Components and globals in `~src/shared/styles/global.styles.ts`',
    ],
};

export const pl: informationCopy = {
    [informationKeys.header]: 'Ekran Startowy',
    [informationKeys.features_header]: 'Home Screen',
    [informationKeys.features_list]: 'Home Screen',
};
