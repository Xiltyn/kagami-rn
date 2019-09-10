import styled from 'styled-components/native';
import global, { MessageText } from '../../shared/styles/global.styles';

export const StatusWrapper = styled.View`
    position: absolute;
    bottom: 8px;
    left: 0;

    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

export const Status = styled(MessageText)`
    padding: ${global.layout.spacing.normal};
    color: ${global.colours.dark};
    background: ${global.colours.light};
    border-radius: 12px;
`;
