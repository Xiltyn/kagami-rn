import styled from 'styled-components/native';
import global, { FormWrapper } from '../../shared/styles/global.styles';

export const SignInFormWrapper = styled(FormWrapper)`
    position: relative;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 0 ${global.layout.spacing.wide};
`;
