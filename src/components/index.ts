// LAYOUT
import { AppBg } from './_layout/AppBg/AppBg';
import { Logotype } from './_layout/Logotype/Logotype';
import { FullScreenModal } from './_layout/FullScreenModal/FullScreenModal';

// UNIVERSAL
import { Button } from './_universal/Button/Button';
import { CustomField } from './_universal/CustomField/CustomField';
import { WrappedField } from './_universal/WrappedField/WrappedField';
import { WrappedSwitch } from './_universal/WrappedSwitch/WrappedSwitch';
import { InputValidation } from './_universal/InputValidation/InputValidation';
import BottomTabNav from './BottomTabNav/BottomTabNav';
import { ContentLoader } from './ContentLoader/ContentLoader';
import { SignInForm } from './SignInForm/SignInForm';
import { SignUpForm } from './SignUpForm/SignUpForm';

// REST

export const Layout = {
    FullScreenModal,
    Logotype,
    AppBg,
};

export const Universal = {
    Button,
    CustomField,
    WrappedField,
    WrappedSwitch,
    InputValidation,
};

export const Functional = {
    BottomTabNav,
    ContentLoader,
    SignInForm,
    SignUpForm,
};
