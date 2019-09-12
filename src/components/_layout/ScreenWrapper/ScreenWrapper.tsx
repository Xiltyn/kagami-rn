import * as React from 'react';
import { ScreenContainer } from './ScreenWrapper.styles';
import { Header } from '../Header/Header';
import { LayoutEvent, NavigationScreenProps } from 'react-navigation';

export namespace ScreenWrapper {
    export interface Props extends NavigationScreenProps {
        noHeader?: boolean;
        noHeaderLogo?: boolean;
        onLayout?: (event: LayoutEvent) => void;
    }
}

export class ScreenWrapper extends React.Component<ScreenWrapper.Props> {

    public render() {
        const {
            children,
            noHeader,
            onLayout,
            noHeaderLogo,
            navigation: { state: { routeName } },
        } = this.props;

        return (
            <ScreenContainer
                onLayout={ onLayout }>
                {
                    !noHeader &&
                        <Header
                            noLogo={ noHeaderLogo }
                            title={ routeName } />
                }
                { children }
            </ScreenContainer>
        );
    }
}
