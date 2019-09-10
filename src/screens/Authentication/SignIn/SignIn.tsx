import React from 'react';
import {FormStateMap} from 'redux-form';
import {NavigationTransitionProps} from 'react-navigation';
import {connect} from '../../../shared/types/ReduxConnect';
import {SignUpHeader, SignUpWrapper, TextRow} from '../SignUp/SignUp.styles';
import { KeyboardAvoidingView, View } from 'react-native';
import { RootState } from '../../../modules';
import global from '../../../shared/styles/global.styles';
import copy, { LocaleCode } from '../../../shared/copy';
import { bindActionCreators, Dispatch } from 'redux';
import { Layout, Functional, Universal } from '../../../components';
import { AuthSaga } from '../../../modules/Authentication/sagas';
import { Action } from 'redux-actions';
import { AuthSagaArgs } from '../../../models/Authentication';
import { AuthenticationActions } from '../../../modules/Authentication/actions';

export namespace SignIn {
    export interface Props {
        forms?:FormStateMap;
        actions: LinksActions;
    }

    export type LinksActions = {
        login: (email: string, password: string) => void;
    };
}

@connect(
    (state: RootState): Pick<SignIn.Props, 'forms'> => ({
        forms: state.form,
    }),
    (dispatch: Dispatch): Pick<SignIn.Props, 'actions'> => ({
        actions: bindActionCreators({
            login: (email, password) => AuthenticationActions.login({ email, password }),
        }, dispatch),
    }),
)
export class SignIn extends React.Component<SignIn.Props & NavigationTransitionProps> {
    render() {
        const { actions, forms, navigation } = this.props;

        return (
            <Layout.AppBg>
                <KeyboardAvoidingView
                    style={{
                        height: '100%',
                        paddingTop: 128,
                        paddingBottom: 150,
                        paddingLeft: 32,
                        paddingRight: 32,
                    }}
                    behavior='padding'
                    enabled>
                    <View style={ { flex: 0.4, alignItems: 'center', justifyContent: 'center' } }>
                        <Layout.Logotype noText/>
                    </View>
                    <SignUpWrapper>
                        <SignUpHeader>
                            { copy.auth[ LocaleCode.EN ].signin_header }
                        </SignUpHeader>
                    </SignUpWrapper>
                    <Functional.SignInForm
                        navigate={ navigation.navigate }
                        login={ actions.login }
                        formValues={ forms && forms.sign_in_form && forms.sign_in_form.values }
                    />
                    <View>
                        <TextRow>
                            <Universal.Button
                                options={{
                                    color: global.colours.secondary,
                                    background: global.colours.dark,
                                    label: copy.auth[ LocaleCode.EN ].signin_signup_btn_label,
                                }}
                                onPress={() => navigation.navigate('SignUp')}
                                onLongPress={() => navigation.navigate('SignUp')}
                            />
                        </TextRow>
                    </View>
                </KeyboardAvoidingView>
            </Layout.AppBg>
        );
    }
}
