import styled from 'styled-components/native';
import global from '../../../shared/styles/global.styles';

export enum logoTypes {
    BIG = '288px',
    AUTO = '100%',
    SMALL = '120px',
    MEDIUM = '240px',
}

type LogoWrapperProps = {
    theme: {
        size: logoTypes;
    };
};

export const LogoWrapper = styled.View`
    position: relative;
    width: ${ (props: LogoWrapperProps) => props.theme.size };
    height: ${ (props: LogoWrapperProps) => props.theme.size };
    padding: ${global.layout.spacing.narrow};
    ${global.layout.display.flex_vertical};
`;

export const Image = styled.Image`
    width: 100%;
    height: 100%;
`;

LogoWrapper.defaultProps = {
    theme: {
        size: logoTypes.MEDIUM,
    },
};
