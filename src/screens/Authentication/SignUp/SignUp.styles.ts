import styled from 'styled-components/native';
import global, { HeroHeader } from '../../../shared/styles/global.styles';

export const SignUpWrapper = styled.View`
    align-items: center;
    margin-top: 72px;
    margin-bottom: 16px;
`;

export const SignUpHeader = styled(HeroHeader)`
    color: ${global.colours.light};
`;

export const ButtonContainer = styled.View`
    align-items: center;
    margin-top: 10px;
`;

export const TextRow = styled.View`
    margin-top: ${global.layout.spacing.wide};
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;
