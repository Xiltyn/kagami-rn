import styled from 'styled-components/native';
import global, { HeroHeader, TextRegular } from '../../shared/styles/global.styles';

export const HomeTitle = styled(HeroHeader)`
    padding-top: ${global.layout.spacing.normal};
`;

export const HomeBody = styled(TextRegular)`
    padding-bottom: ${global.layout.spacing.wide};
`;
