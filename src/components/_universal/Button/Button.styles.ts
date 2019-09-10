import styled from 'styled-components/native';
import global, { ButtonCaption } from '../../../shared/styles/global.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Color } from 'csstype';

export interface ButtonStyleProps {
    width?: string;
    height?: string;
    color?: Color;
}

export const ButtonContainer = styled(LinearGradient)`
    position: relative;
    height: ${(props: ButtonStyleProps) => props.height};
    width: ${(props: ButtonStyleProps) => props.width};
    margin: ${global.layout.spacing.narrow} 0 0;
    padding: 0;
    border-radius: 4px;
    overflow: hidden;
`;

export const Btn = styled.TouchableOpacity`
    height: 100%;
    width: 100%;
    padding: 0;

    ${global.layout.display.flex_horizontal};
`;

export const Label = styled(ButtonCaption)`
    color: ${(props: ButtonStyleProps) => props.color || global.colours.grey};
`;
