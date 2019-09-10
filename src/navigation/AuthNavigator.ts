import { createStackNavigator } from 'react-navigation';

import { SignIn } from '../screens/Authentication/SignIn/SignIn';
import { SignUp } from '../screens/Authentication/SignUp/SignUp';

export const AuthNavigator = createStackNavigator({
    SignIn: {
        screen: SignIn,
        path: 'auth/signin',
    },
    SignUp: {
        screen: SignUp,
        path: 'auth/signup/:step',
        params: {
            step: undefined,
        },
    },
},
    {
        initialRouteName: 'SignIn',
        headerMode: 'none',
    },
);
