import styled from 'styled-components/native';
import global, { ScreenTitle } from '../../../shared/styles/global.styles';
import { Color } from 'csstype';

export const ModalWrapper = styled.Modal`
    position: relative;
    width: 100%;
    padding: ${global.layout.spacing.narrow};
`;

export const Header = styled.View`
    width: 100%;
    height: 80px;
    padding: 48px ${global.layout.spacing.narrow} 0;

    background: ${(props: {bgColor?: Color}) => props.bgColor || global.colours.dark};
    ${ global.layout.display.flex_horizontal };
    align-items: flex-end;
`;

export const LeftButton = styled.View`
    position: absolute;
    left: 16px;
    bottom: 4px;
`;

export const Title = styled(ScreenTitle)`
    width: 60%;
    height: 100%;
    font-family: ${global.fonts.bold};
    text-align: center;
`;
