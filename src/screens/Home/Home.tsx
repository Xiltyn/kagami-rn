import React from 'react';
import { AnchorText, ScreenLayout, TextRegular } from '../../shared/styles/global.styles';
import { Layout } from '../../components';
import { logoTypes } from '../../components/_layout/Logotype/Logotype.styles';
import copy, { LocaleCode } from '../../shared/copy';
import { HomeBody, HomeTitle } from './Home.styles';
import { TouchableHighlight } from 'react-native';
import {
    NavigationAction,
    NavigationNavigateAction,
    NavigationParams,
} from 'react-navigation';
import { TextLink } from '../../components/_universal/TextLink/TextLink';

export namespace Home {
    export interface Props {
        navigate: (options: {
            routeName:
                | string
                | {
                routeName: string;
                params?: NavigationParams;
                action?: NavigationNavigateAction;
                key?: string;
            };
            params?: NavigationParams;
            action?: NavigationAction;
            key?: string;
        }) => boolean;
    }
}

export class Home extends React.Component<Home.Props> {
    public render() {
        const { navigate } = this.props;

        return (
            <ScreenLayout
                contentContainerStyle={ {
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                } }>
                <HomeTitle>
                    { copy.home[ LocaleCode.EN ].header }
                </HomeTitle>
                <Layout.Logotype noText size={ logoTypes.MEDIUM }/>
                <HomeBody>
                    { copy.home[ LocaleCode.EN ].intro_caption }
                </HomeBody>
                <TextLink
                    navigate={ () => navigate({ routeName: 'Map' }) }
                    text={ copy.home[ LocaleCode.EN ].map_anchor as string } />
                <TextLink
                    navigate={ () => navigate({ routeName: 'Info' }) }
                    text={ copy.home[ LocaleCode.EN ].info_anchor as string } />
            </ScreenLayout>
        );
    }
}
