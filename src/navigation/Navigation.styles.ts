import styled from 'styled-components/native';
import global from '../shared/styles/global.styles';

export const AddButtonWrapper = styled.TouchableOpacity`
    position: absolute;
    top: -24px;
    left: 50%;

    width: 64px;
    height: 64px;
    margin-left: -32px;

    display: flex;
    align-items: center;
    justify-content: space-around;

    background: ${global.colours.light};
    border-radius: 32px;
    border: 1px solid ${global.colours.black};
`;
