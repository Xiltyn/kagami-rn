export enum homeKeys {
    header = 'header',
    intro_caption = 'intro_caption',
    info_anchor = 'info_anchor',
    map_anchor = 'map_anchor',
}

export type homeCopy = {[key in homeKeys]: string|string[]};

export const en: homeCopy = {
    [homeKeys.header]: 'Welcome!',
    [homeKeys.intro_caption]: 'Welcome to Kagami React Native Starter for mobile apps development.',
    [homeKeys.info_anchor]: 'For more details on all features of this boilerplate, please check out the information section.',
    [homeKeys.map_anchor]: 'To see your location and a bunch of randomly generated markers nearby, checkout out the map section.',
};

export const pl: homeCopy = {
    [homeKeys.header]: 'Ekran Startowy',
    [homeKeys.intro_caption]: 'Home Screen',
    [homeKeys.info_anchor]: 'For more details, check out the Info Screen',
    [homeKeys.map_anchor]: 'Checkout the built in Map Screen to see your current location and a couple of markers generated nearby',
};
