import styled from 'styled-components/native';
import global, { ScreenTitle } from '../../../shared/styles/global.styles';

export const HeaderWrapper = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 96px;
    width: 100%;
    padding-top: 40px;

    background-color: ${ global.colours.dark };

    z-index: 10;
`;

export const HeaderLogout = styled.TouchableOpacity`
    position: absolute;
    bottom: 16px;
    left: 12px;

    width: 32px;
    height: 32px;
`;

export const HeaderTitle = styled(ScreenTitle)`
    color: ${ global.colours.light };
    font-weight: 800;
    letter-spacing: 1px;
`;

export const HeaderLogo = styled.View`
    position: absolute;
    bottom: -8px;
    right: 4px;

    width: 72px;
    height: 72px;
`;
