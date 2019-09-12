import React from 'react';
import {FormStateMap} from 'redux-form';
import { NavigationScreenProps } from 'react-navigation';
import { KeyboardAvoidingView, View } from 'react-native';
import global from '../../../shared/styles/global.styles';
import copy, { LocaleCode } from '../../../shared/copy';
import { Layout, Functional, Universal } from '../../../components';
import { AuthenticationContainer } from '../../../containers/AuthenticationContainer/AuthenticationContainer';
import { SignInHeader } from './SignIn.styles';

export namespace SignIn {
    export interface Props extends Pick<NavigationScreenProps, 'navigation'>{
        forms?: FormStateMap;
        actions: AuthenticationContainer.authenticationActions;
    }
}

export class SignIn extends React.Component<SignIn.Props> {
    render() {
        const { actions, forms, navigation } = this.props;

        console.log(navigation);

        return (
            <KeyboardAvoidingView
                style={ { height: '100%' } }
                behavior='padding'>
                <Layout.AppBg>
                    <Layout.Logotype noText/>
                    <SignInHeader>
                        { copy.auth[ LocaleCode.EN ].signin_header }
                    </SignInHeader>
                    <Functional.SignInForm
                        navigate={ navigation.navigate }
                        login={ actions.login }
                        formValues={ forms && forms.sign_in_form && forms.sign_in_form.values }
                    />
                    <Universal.Button
                        options={{
                            color: global.colours.secondary,
                            background: global.colours.dark,
                            label: copy.auth[ LocaleCode.EN ].signin_signup_btn_label,
                        }}
                        onPress={() => navigation.navigate({
                            routeName: 'Auth',
                            params: {
                                view: 'register',
                                step: undefined,
                            },
                        })}
                        onLongPress={() => navigation.navigate({
                            routeName: 'Auth',
                            params: {
                                view: 'register',
                                step: undefined,
                            },
                        })}
                    />
                </Layout.AppBg>
            </KeyboardAvoidingView>
        );
    }
}
