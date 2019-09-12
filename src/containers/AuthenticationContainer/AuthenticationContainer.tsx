import * as React from 'react';
import { connect } from '../../shared/types/ReduxConnect';
import { RootState } from '../../modules';
import { bindActionCreators, Dispatch } from 'redux';
import { FormStateMap } from 'redux-form';
import { NavigationScreenProps } from 'react-navigation';
import { ScreenWrapper } from '../../components/_layout/ScreenWrapper/ScreenWrapper';
import { SignIn } from '../../screens/Authentication/SignIn/SignIn';
import { SignUp } from '../../screens/Authentication/SignUp/SignUp';
import { AuthenticationActions } from '../../modules/Authentication/actions';
import { Action } from 'redux-actions';
import { AuthSagaArgs } from '../../models/Authentication';
import { AuthSaga } from '../../modules/Authentication/sagas';
import { ScrollView } from 'react-native';

export namespace AuthenticationContainer {
    export interface Props extends NavigationScreenProps {
        forms?:FormStateMap;
        actions: authenticationActions;
    }

    export type authenticationActions = {
        login: (email: string, password: string) => void;
        register: (action: Action<AuthSagaArgs>) => void;
    };
}

@connect(
    (state: RootState):Pick<AuthenticationContainer.Props, 'forms'> => ({
        forms: state.form,
    }),
    (dispatch:Dispatch):Pick<AuthenticationContainer.Props, 'actions'> => ({
        actions: bindActionCreators({
            login: (email, password) => AuthenticationActions.login({ email, password }),
            register: (action) => AuthSaga.dispatchRegister(action),
        }, dispatch),
    }),
)
export class AuthenticationContainer extends React.Component<AuthenticationContainer.Props> {
    public render() {
        const {
            navigation,
            actions,
            forms,
        } = this.props;

        const { state: { params } } = navigation;

        return (
            <ScreenWrapper
                noHeader
                navigation={ navigation }>
                    {
                        params && params.view === 'login' &&
                        <SignIn
                            navigation={ navigation }
                            actions={ actions }
                            forms={ forms }/>
                    }
                    {
                        params && params.view === 'register' &&
                        <SignUp
                            navigation={ navigation }
                            actions={ actions }
                            forms={ forms }/>
                    }
            </ScreenWrapper>
        );
    }
}
