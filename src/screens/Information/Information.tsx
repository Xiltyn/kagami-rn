import React from 'react';
import global, { HeroHeader, ScreenLayout } from '../../shared/styles/global.styles';
import {
    FeatureDecorator,
    FeatureElement,
    FeaturesHeader,
    FeaturesList,
    FeatureText,
} from './Information.styles';
import copy, { LocaleCode } from '../../shared/copy';

export namespace Information {
    export interface Props {
    }
}

export class Information extends React.Component<Information.Props> {

    public render() {
        return (
            <ScreenLayout>
                <HeroHeader>
                    { copy.information[ LocaleCode.EN ].header }
                </HeroHeader>
                <FeaturesList>
                    <FeaturesHeader>
                        { copy.information[ LocaleCode.EN ].features_header }
                    </FeaturesHeader>
                    {
                        (copy.information[ LocaleCode.EN ].features_list as string[]).map((para, index) =>
                            <FeatureElement key={ index }>
                                <FeatureDecorator
                                    name='md-arrow-dropright'
                                    size={ 12 }
                                    color={ global.colours.light }
                                />
                                <FeatureText>
                                    { para }
                                </FeatureText>
                            </FeatureElement>)
                    }
                </FeaturesList>
            </ScreenLayout>
        );
    }
}
