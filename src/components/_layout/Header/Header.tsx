import * as React from 'react';
import { HeaderLogo, HeaderLogout, HeaderTitle, HeaderWrapper } from './Header.styles';
import { Layout } from '../..';
import { AntDesign } from 'expo-vector-icons';
import { logoTypes } from '../Logotype/Logotype.styles';
import global from '../../../shared/styles/global.styles';
import { connect } from '../../../shared/types/ReduxConnect';
import { Dispatch, bindActionCreators } from 'redux';
import { RootState } from '../../../modules';
import { AuthenticationActions } from '../../../modules/Authentication/actions';

export namespace Header {
    export interface Props {
        title?: string;
        noLogo?: boolean;
        actions?: HeaderActions;
    }

    export type HeaderActions = {
        logout: () => void;
    };
}

@connect(
    (state: RootState) => ({}),
    (dispatch: Dispatch): Pick<Header.Props, 'actions'> => ({
        actions: bindActionCreators({
            logout: () => AuthenticationActions.logout(),
        }, dispatch),
    }),
)
export class Header extends React.Component<Header.Props> {
    public static defaultProps: Partial<Header.Props> = {
        title: 'This is just a header',
    };

    public render() {
        const { title, noLogo, actions } = this.props;

        return (
            <HeaderWrapper>
                <HeaderLogout
                    onPress={ actions && actions.logout }>
                    <AntDesign
                        name='logout'
                        color={ global.colours.secondary }
                        size={ 32 }/>
                </HeaderLogout>
                <HeaderTitle>
                    { title }
                </HeaderTitle>
                {
                    !noLogo &&
                        <HeaderLogo>
                            <Layout.Logotype
                                noText
                                size={ logoTypes.AUTO }/>
                        </HeaderLogo>
                }
            </HeaderWrapper>
        );
    }
}
