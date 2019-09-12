import styled from 'styled-components/native';
import global, { TextRegular } from '../../shared/styles/global.styles';
import { Ionicons } from 'expo-vector-icons';

export const FeaturesHeader = styled(TextRegular)`
    color: ${global.colours.primary_light};
    margin-bottom: ${global.layout.spacing.narrow};
    border-bottom-width: 1px;
    border-bottom-color: ${global.colours.primary_light};
`;

export const FeaturesList = styled.View`
    width: 100%;
    padding: ${global.layout.spacing.wide} ${global.layout.spacing.narrow};
`;

export const FeatureElement = styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding-top: 4px;
`;

export const FeatureDecorator = styled(Ionicons)`
    padding: ${global.layout.spacing.narrow};
    padding-left: ${global.layout.spacing.normal};
`;

export const FeatureText = styled(TextRegular)`
    width: 95%;
    padding-top: 4px;
`;
