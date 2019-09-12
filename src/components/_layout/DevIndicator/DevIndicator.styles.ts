import styled from 'styled-components/native';
import global, { TextRegular } from '../../../shared/styles/global.styles';

export const IndicatorContainer = styled.TouchableOpacity`
    position: absolute;
    bottom: -24px;
    right: -24px;

    width: 72px;
    height: 72px;
    padding-top: 10px;
    padding-left: 14px;

    border-radius: 36px;
    background: ${global.colours.error};
    z-index: 999;
`;

export const InfoContainer = styled.View`
    position: absolute;
    bottom: 10%;
    left: 5%;

    width: 90%;
    padding: ${global.layout.spacing.narrow};

    background: ${global.colours.light};
    z-index: 999;
`;

export const InfoSection = styled.View`
    padding-bottom: ${global.layout.spacing.normal};
`;

export const InfoSectionText = styled(TextRegular)`
    padding-bottom: ${global.layout.spacing.narrow};
    color: ${global.colours.dark};
`;

export const InfoSectionHeader = styled(TextRegular)`
    padding-bottom: ${global.layout.spacing.normal};
    font-size: 16px;
    font-family: ${global.fonts.black};
    color: ${global.colours.error};
`;
