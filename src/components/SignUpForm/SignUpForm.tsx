// Dependancies
import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Alert } from 'react-native';
// Shared
import copy, { LocaleCode } from '../../shared/copy';
// UI
import { WrappedField } from '../_universal/WrappedField/WrappedField';
import { Button } from '../_universal/Button/Button';
// Styling
import global from '../../shared/styles/global.styles';
import { SignUpFormWrapper } from './SignUpForm.styles';
import { Action } from 'redux-actions';
import { AuthSagaArgs } from '../../models/Authentication';
import { AuthenticationActions } from '../../modules/Authentication/actions';

export namespace SignUpForm {
    export interface Props {
        formValues?: formValues;
        navigate?: (location: string, params?: any) => void;
        dispatchSignUp?: (action: Action<AuthSagaArgs>) => any;
        info?: string;
    }

    export interface State {
        hidePassword: boolean;
    }

    export type formValues = {
        email: string;
        password: string;
        password_confirm: string;
    };
}

class SignUpComponent extends React.Component<SignUpForm.Props & InjectedFormProps<SignUpForm.formValues>> {
    public state: SignUpForm.State = {
        hidePassword: false,
    };

    private toggleHidePassword = () => {
        this.setState({ hidePassword: !this.state.hidePassword });
    };

    private handleSubmit = () => {
        const {formValues, navigate, dispatchSignUp} = this.props;

        if (formValues && dispatchSignUp) {
            dispatchSignUp({
                type: AuthenticationActions.Type.REGISTER,
                payload: {
                    email: formValues.email,
                    password: formValues.password,
                },
            }).then((res: boolean) => {
                if (navigate && res) navigate('RegisterSuccess', {
                    email: formValues.email,
                });
                //tmp
                else Alert.alert('Connection error');
            });
        }
    };

    public render() {
        const { formValues, dispatchSignUp } = this.props;

        return (
            <SignUpFormWrapper>
                <Field
                    name={ 'email' }
                    component={ WrappedField }
                    placeholder={ copy.auth[ LocaleCode.EN ].email_placeholder }
                    autocomplete={ false }
                    autoFocus={ false }
                    color={ global.colours.light }
                    keyboardType={ 'email-address' }
                    width={ 320 }
                    withoutRadius
                    value={ formValues && formValues.email }
                />
                <Field
                    name={ 'password' }
                    component={ WrappedField }
                    placeholder={ copy.auth[ LocaleCode.EN ].password_placeholder }
                    autocomplete={ false }
                    color={ global.colours.light }
                    iconColor={ global.colours.light }
                    width={ 320 }
                    withoutRadius
                    value={ formValues && formValues.password }
                    secureTextEntry={ this.state.hidePassword }
                    secureTextSwitch={ this.toggleHidePassword }
                />
                <Field
                    name={ 'password_confirm' }
                    component={ WrappedField }
                    placeholder={ copy.auth[ LocaleCode.EN ].password_confirm_placeholder }
                    autocomplete={ false }
                    color={ global.colours.light }
                    iconColor={ global.colours.light }
                    width={ 320 }
                    withoutRadius
                    value={ formValues && formValues.password }
                    secureTextEntry={ this.state.hidePassword }
                    secureTextSwitch={ this.toggleHidePassword }
                />
                <Button
                    options={ {
                        label: copy.auth[ LocaleCode.EN ].signup_btn_label,
                        color: global.colours.light,
                        gradient: {
                            from: global.colours.primary,
                            to: global.colours.secondary,
                        },
                    } }
                    onPress={ dispatchSignUp }
                    onLongPress={ dispatchSignUp }/>
            </SignUpFormWrapper>
        );
    }
}

export const SignUpForm = reduxForm<SignUpForm.formValues, SignUpForm.Props>({
    form: 'sign_up_form',
    destroyOnUnmount: false,
})(SignUpComponent);
