import global from '../../shared/styles/global.styles';
import styled from 'styled-components/native';

export const LoaderContainer = styled.View`
    height: 100%;
    width: 100%;
    padding-top: 60%;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: ${global.colours.dark};
`;

export const LoaderMessage = styled.Text`
    height: 32px;
    width: 100%;
    margin-top: ${global.layout.spacing.normal}

    font-size: 24px;
    font-family: ${global.fonts.medium};
    color: ${global.colours.primary_light};
    text-align: center;
`;

export const LoaderSpinner = styled.ActivityIndicator`
    width: 72px;
    height: 72px;
`;
