import React from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { FormStateMap } from 'redux-form';
import { NavigationScreenProps } from 'react-navigation';
import copy, { LocaleCode } from '../../../shared/copy';
import { SignUpForm } from '../../../components/SignUpForm/SignUpForm';
import { Layout, Universal, Functional } from '../../../components/';
import { ButtonContainer, SignUpHeader, SignUpWrapper } from './SignUp.styles';
import global from '../../../shared/styles/global.styles';
import { AuthenticationContainer } from '../../../containers/AuthenticationContainer/AuthenticationContainer';

export namespace SignUp {
    export interface Props extends Pick<NavigationScreenProps, 'navigation'> {
        forms?: FormStateMap;
        actions?: AuthenticationContainer.authenticationActions;
    }
}

export class SignUp extends React.Component<SignUp.Props> {
    protected _steps = Object.freeze({
        mailForm: 'RegisterWithMail',
    });

    public render() {
        const { navigation: { navigate, state: { params } }, forms, actions } = this.props;
        const { mailForm } = this._steps;

        return (
            <KeyboardAvoidingView
                style={ { height: '100%' } }
                behavior='padding'>
                <Layout.AppBg>
                    <View style={ { flex: 0.4, alignItems: 'center', justifyContent: 'center' } }>
                        <Layout.Logotype />
                    </View>
                    <SignUpWrapper>
                        <SignUpHeader>
                            { copy.auth[ LocaleCode.EN ].signup_header }
                        </SignUpHeader>
                        {
                            (params && params.step) !== mailForm ?
                                <ButtonContainer>
                                    <Universal.Button
                                        options={ {
                                            label: copy.auth[ LocaleCode.EN ].signup_email_btn_label,
                                            color: global.colours.light,
                                            gradient: {
                                                from: global.colours.primary,
                                                to: global.colours.secondary,
                                            },
                                        } }
                                        onPress={ () =>
                                            navigate({
                                                routeName: 'Auth',
                                                params: {
                                                    view: 'register',
                                                    step: mailForm,
                                                },
                                            })
                                        }
                                        onLongPress={ () =>
                                            navigate({
                                                routeName: 'Auth',
                                                params: {
                                                    view: 'register',
                                                    step: mailForm,
                                                },
                                            })
                                        }
                                    />
                                </ButtonContainer> :
                                <Functional.SignUpForm
                                    navigate={ navigate }
                                    dispatchSignUp={ actions && actions.register }
                                    formValues={
                                        forms &&
                                            forms.sign_up_form &&
                                                forms.sign_up_form.values as SignUpForm.formValues }
                                />
                        }
                    </SignUpWrapper>
                    <View>
                        <Universal.Button
                            options={ {
                                color: global.colours.secondary,
                                background: global.colours.dark,
                                label: copy.auth[ LocaleCode.EN ].signup_btn_go_to_login,
                            } }
                            onPress={() => navigate({
                                routeName: 'Auth',
                                params: {
                                    view: 'login',
                                    step: undefined,
                                },
                            })}
                            onLongPress={() => navigate({
                                routeName: 'Auth',
                                params: {
                                    view: 'login',
                                    step: undefined,
                                },
                            })}
                        />
                    </View>
                </Layout.AppBg>
            </KeyboardAvoidingView>
        );
    }
}
