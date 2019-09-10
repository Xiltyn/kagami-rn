import styled from 'styled-components/native';
import global, { InputText } from '../../../shared/styles/global.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomField } from './CustomField';

export const InputContainer = styled.View`
    position: relative;
    width: ${(props: CustomField.ContainerProps) => props.width ? props.width : '350px'};
    height: ${(props: CustomField.ContainerProps) => props.height ? props.height : '44px'};
    display: flex;
    padding: ${global.layout.spacing.narrow};
    margin-top: ${global.layout.spacing.narrow};
    justify-content: space-between;
    align-items: center;
    border-radius: ${(props: CustomField.ContainerProps) => props.withoutRadius ? '4px' : '25px'};
    background-color: rgba(219,219,219,0.30);
`;

export const Underline = styled(LinearGradient)`
    position: absolute;
    bottom: -1px;
    left: ${(props: CustomField.ContainerProps) => (props.width && parseFloat(props.width) / 2) || '6%'};
    height: 1px;
    width: ${(props: CustomField.ContainerProps) => props.width ? props.width : '92%'};
    align-self: center;
`;

export const InputField = styled(InputText).attrs({
    placeholderFont: global.fonts.regular,
    fontColor: global.colours.dark,
})`
    color: ${global.colours.dark};
    width: 90%;
    height: 100%;
    padding-top: 0;
    padding-bottom: 0;
`;

export const IconWrapper = styled.View`
    position: absolute;
    right: 12px;
    top: 10px;

    width: 25px;
    height: 25px;
`;
