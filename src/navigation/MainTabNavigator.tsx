import * as React from 'react';
import { Ionicons, Entypo } from '@expo/vector-icons';
import {
    createBottomTabNavigator,
    NavigationScreenProps,
} from 'react-navigation';
import {Map} from '../screens/Map/Map';
import {Messenger} from '../screens/Messenger/Messenger';
import {Friends} from '../screens/Friends/Friends';
import CustomBottomTabNavigation from '../components/BottomTabNav/BottomTabNav';
import global from '../shared/styles/global.styles';
import { AddButtonWrapper } from './Navigation.styles';

export const MainTabNavigator = createBottomTabNavigator({
        Map: {
            screen: Map,
            path: '/map',
            navigationOptions: (navParams: NavigationScreenProps) => {
                const { navigation: { state: { routeName }, navigate } } = navParams;

                return ({
                    title: 'Map',
                    showLabel: false,
                    tabBarIcon: ({ focused, tintColor }: any) =>
                        <Ionicons name='md-map' size={ 25 } focused={ focused } color={ tintColor } />,
                });
            },

        },
        Home: {
            screen: Messenger,
            path: '/home',
            navigationOptions: () => ({
                title: 'Home',
                showLabel: false,
                tabBarIcon: ({ focused, tintColor }: any) =>
                    <Entypo name='home' size={ 25 } focused={ focused } color={ tintColor } />,
                }),
        },
        Info: {
            screen: Friends,
            path: '/information',
            navigationOptions: () => ({
                title: 'Info',
                showLabel: false,
                tabBarIcon: ({ focused, tintColor }: any) =>
            <Entypo name='info' size={ 25 } focused={ focused } color={ tintColor } />,
            }),
        },
    },
    {
        navigationOptions: () => {
            return {
                tabBarVisible: true,
                tabBarComponent: CustomBottomTabNavigation,
            };
        },
        initialRouteName: 'Map',
        tabBarOptions: {
            activeBackgroundColor: global.colours.secondary,
            inactiveBackgroundColor: global.colours.dark,
            activeTintColor: global.colours.dark,
            inactiveTintColor: global.colours.secondary,
            showLabel: false,
        },
    },
);
