// Dependencies
import React from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { FormState } from 'redux-form';
import { bindActionCreators, Dispatch } from 'redux';
import { NavigationTransitionProps } from 'react-navigation';
// Shared
import copy, { LocaleCode } from '../../../shared/copy';
import { connect } from '../../../shared/types/ReduxConnect';
// Models
import { RootState } from '../../../modules';
import { AuthSagaArgs } from '../../../models/Authentication';
import { SignUpForm } from '../../../components/SignUpForm/SignUpForm';
// UI
import { Layout, Universal, Functional } from '../../../components/';
// Styles
import { ButtonContainer, SignUpHeader, SignUpWrapper } from './SignUp.styles';
import global from '../../../shared/styles/global.styles';
import { AuthSaga } from '../../../modules/Authentication/sagas';
import { Action } from 'redux-actions';

export namespace SignUp {
    export interface Props {
        formValues?: FormState;
        actions?: SignUpActions;
    }

    export interface NavigationOptions {
        header: boolean|null;
        headerTransparent: boolean|null;
    }

    export type SignUpActions = {
        register: (action: Action<AuthSagaArgs>) => void;
    };
}
@connect(
    (state: RootState): Pick<SignUp.Props, 'formValues'> => ({
        formValues: state.form.sign_up_form,
    }),
    (dispatch: Dispatch): Pick<SignUp.Props, 'actions'> => ({
        actions: bindActionCreators({
            register: (action) =>
                AuthSaga.dispatchRegister(action),
        }, dispatch),
    }),
)
export class SignUp extends React.Component<SignUp.Props&NavigationTransitionProps> {
    protected _steps = Object.freeze({
        mailForm: 'RegisterWithMail',
    });

    public render() {
        const { navigation: { navigate, state: { params } }, formValues, actions } = this.props;
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
                                                routeName: 'SignUp',
                                                params: {
                                                    step: mailForm,
                                                },
                                            })
                                        }
                                        onLongPress={ () =>
                                            navigate({
                                                routeName: 'SignUp',
                                                params: {
                                                    step: mailForm,
                                                },
                                            })
                                        }
                                    />
                                </ButtonContainer> :
                                <Functional.SignUpForm
                                    navigate={ navigate }
                                    dispatchSignUp={ actions && actions.register }
                                    formValues={ formValues && formValues.values as SignUpForm.formValues }/>
                        }
                    </SignUpWrapper>
                    <View>
                        <Universal.Button
                            options={ {
                                color: global.colours.secondary,
                                background: global.colours.dark,
                                label: copy.auth[ LocaleCode.EN ].signup_btn_go_to_login,
                            } }
                            onPress={() => navigate('SignIn')}
                            onLongPress={() => navigate('SignIn')}
                        />
                    </View>
                </Layout.AppBg>
            </KeyboardAvoidingView>
        );
    }
}
