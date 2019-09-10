import styled from 'styled-components/native';

enum fonts {
    regular = 'Raleway_Regular',
    medium = 'Raleway_Medium',
    bold = 'Raleway_Bold',
    black = 'Raleway_Black',
}

enum colours {
    light = '#f3f3f9',
    grey = '#3d3d43',
    dark = '#18181f',
    black = '#000',

    primary = '#7d6ae8',
    primary_dark = '#5649a4',
    primary_light = '#a69ae8',

    secondary = '#50b4fa',
    secondary_dark = '#3881b4',
    secondary_light = '#a0d6fc',

    error = '#bf223c',
    success = '#4bf28e',
}

const typography = {
    caption: `
        font-size: 32px;
        line-height: 42px;
        letter-spacing: 1.4px;
        text-transform: uppercase
        font-family: ${fonts.black};
    `,
    screenTitle: `
        font-size: 21px;
        line-height: 24px;
        color: ${colours.light};
        font-family: ${fonts.regular}
    `,
    message: `
        font-size: 14px;
        line-height: 20px;
        font-family: ${fonts.bold}
    `,
    button: `
        font-size: 18px;
        line-height: 22px;
        font-family: ${fonts.bold}
    `,
    input: `
        font-size: 18px;
        line-height: 22px;
        font-family: ${fonts.regular}
    `,
    smallText: `
        font-size: 14px;
        line-height: 18px;
        font-family: ${fonts.regular}
    `,
};

const layout = {
    spacing: {
        narrow: '8px',
        normal: '16px',
        wide: '32px',
    },
    display: {
        flex_horizontal: `
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around
        `,
        flex_vertical: `
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around
        `,
        block: 'display: block; margin: auto',
    },
    position: {
        absolute_centered: 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)',
    },
};

export default {
    fonts,
    colours,
    layout,
};

// ============= Components ==============
// ============== Defaults ===============

export const ScreenWrapper = styled.View`
    width: 100%;
    height: 100%;
    padding: ${layout.spacing.normal};
    ${layout.display.flex_vertical};
`;

// ============= Typography ==============

export const HeroHeader = styled.Text`
    width: auto;
    height: auto;
    text-align: center;
    flex-wrap: wrap;
    ${typography.caption};
`;

export const ScreenTitle = styled.Text`
    text-align: center;
    ${typography.screenTitle};
`;

export const MessageText = styled.Text`
    text-align: center;
    ${typography.message};
`;

export const ButtonCaption = styled.Text`
    width: 100%;
    text-align: center;
    ${typography.button};
`;

export const InputText = styled.TextInput`
    text-align: left;
    ${typography.input};
`;

export const SmallText = styled.Text`
    ${typography.smallText};
`;

export const FormWrapper = styled.View`
    position: relative;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 0 ${layout.spacing.wide};
`;
