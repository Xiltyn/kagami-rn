import * as React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Alert, AsyncStorage } from 'react-native';
import global from '../../shared/styles/global.styles';
import { WrappedField } from '../_universal/WrappedField/WrappedField';
import { Button } from '../_universal/Button/Button';
import copy, { LocaleCode } from '../../shared/copy';
import { SignInFormWrapper } from './SignInForm.styles';

export namespace SignIn {
    export interface Props {
        formValues?: formValues;
        navigate?: (location: string, params?: any) => void;
        placeholder?: string;
        login?: (email: string, password: string) => any;
    }

    export type formValues = {
        [ fieldName: string ]: string;
    };
}

class SignIn extends React.Component<SignIn.Props&InjectedFormProps<SignIn.formValues>> {
    handleSubmit = async () => {
        const { formValues, navigate, login } = this.props;
        if (
            navigate &&
            formValues &&
            formValues[ 'email' ] &&
            formValues[ 'password' ] &&
            login
        ) {
         await login(formValues[ 'email' ].toLowerCase(), formValues[ 'password' ]);
        }
    };

    state = {
        secureText: true,
    };

    secureTextSwitch = () => {
        this.setState({ secureText: !this.state.secureText });
    };

    public render() {
        const { handleSubmit, formValues } = this.props;

        return (
            <SignInFormWrapper>
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
                    value={ formValues && formValues.name_surname }
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
                    secureTextEntry={ this.state.secureText }
                    secureTextSwitch={ this.secureTextSwitch }
                />
                <Button
                    options={ {
                        label: copy.auth[ LocaleCode.EN ].login_btn_title,
                        color: global.colours.light,
                        gradient: { from: global.colours.primary, to: global.colours.secondary },
                    } }
                    onPress={ handleSubmit(this.handleSubmit) }
                    onLongPress={ handleSubmit(this.handleSubmit) }
                />
            </SignInFormWrapper>
        );
    }
}

export const SignInForm = reduxForm<SignIn.formValues, SignIn.Props>({
    form: 'sign_in_form',
    //validate,
    destroyOnUnmount: false,
})(SignIn);
