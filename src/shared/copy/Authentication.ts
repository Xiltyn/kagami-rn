export enum authKeys {
    login_btn_title = 'login_btn_title',
    email_placeholder = 'email_placeholder',
    password_placeholder = 'password_placeholder',
    password_confirm_placeholder = 'password_confirm_placeholder',
    signin_header = 'signin_header',
    signin_signup_btn_label = 'signin_signup_btn_label',
    signup_header = 'signup_header',
    signup_btn_label = 'signup_btn_label',
    signup_btn_go_to_login = 'signup_btn_go_to_login',
    signup_email_btn_label = 'signup_email_btn_label',
    signup_mail_header = 'signup_mail_header',
    signup_mail_placeholder_email = 'signup_mail_placeholder_email',
    signup_mail_placeholder_password = 'signup_mail_placeholder_password',
    signup_mail_placeholder_password_confirm = 'signup_mail_placeholder_password_confirm',
}

export type authCopy = {[key in authKeys]: string};

export const en: authCopy = {
    signin_header: 'Good to see you again!',
    signin_signup_btn_label: 'Create new account',
    signup_btn_label: 'Sign up',
    signup_header: 'Sign up now!',
    signup_btn_go_to_login: 'Have an account? Sign In!',
    signup_email_btn_label: 'Sign up with your e-mail',
    login_btn_title: 'Sign In',
    password_placeholder: 'Password',
    password_confirm_placeholder: 'Repeat password',
    email_placeholder: 'Email',
    signup_mail_header: 'Add you email and password below',
    signup_mail_placeholder_email: '',
    signup_mail_placeholder_password: '',
    signup_mail_placeholder_password_confirm: '',
};

export const pl: authCopy = {
    signin_signup_btn_label: 'Zarejestruj się',
    signin_header: 'Miło Cię widzieć ponownie!',
    signup_btn_label: 'Zarejestruj się',
    signup_header: 'Zarejestruj się już teraz!',
    signup_btn_go_to_login: 'Masz konto? Zaloguj się!',
    signup_email_btn_label: 'Zarejestruj za pomoca adresu e-mail',
    login_btn_title: 'Zaloguj się',
    password_placeholder: 'Hasło',
    password_confirm_placeholder: 'Powtórz hasło',
    email_placeholder: 'Adres email',
    signup_mail_header: 'Podaj email oraz hasło!',
    signup_mail_placeholder_email: '',
    signup_mail_placeholder_password: '',
    signup_mail_placeholder_password_confirm: '',
};
