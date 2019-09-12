import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation';

import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';

export const createAppNavigation = (isSignedIn?:boolean) => createAppContainer(createSwitchNavigator({
    Main: MainTabNavigator,
    Auth: AuthNavigator,
}, {
    initialRouteName: isSignedIn ? 'Main' : 'Auth',
}));
