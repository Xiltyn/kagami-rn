import { createStackNavigator } from 'react-navigation';
import { AuthenticationContainer } from '../containers/AuthenticationContainer/AuthenticationContainer';

export const AuthNavigator = createStackNavigator({
    Auth: {
        screen: AuthenticationContainer,
        path: 'auth/:view/:step',
        params: {
            view: undefined,
            step: undefined,
        },
    },
},
    {
        initialRouteName: 'Auth',
        initialRouteParams: {
            view: 'login',
            step: undefined,
        },
        headerMode: 'none',
    },
);
