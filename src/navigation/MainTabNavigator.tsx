import * as React from 'react';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation';
import { Home } from '../screens/Home/Home';
import { Information } from '../screens/Information/Information';
import CustomBottomTabNavigation from '../components/BottomTabNav/BottomTabNav';
import global from '../shared/styles/global.styles';
import { MapContainer } from '../containers/MapContainer/MapContainer';
import { InformationContainer } from '../containers/InformationContainer/InformationContainer';
import { HomeContainer } from '../containers/HomeContainer/HomeContainer';

export const MainTabNavigator = createBottomTabNavigator({
        Home: {
            screen: HomeContainer,
            path: '/home',
            navigationOptions: () => ({
                title: 'Home',
                showLabel: false,
                tabBarIcon: ({ focused, tintColor }: any) =>
                    <Entypo name='home' size={ 25 } focused={ focused } color={ tintColor } />,
                }),
        },
        Map: {
            screen: MapContainer,
            path: '/map',
            navigationOptions: () => ({
                title: 'Map',
                showLabel: false,
                tabBarIcon: ({ focused, tintColor }: any) =>
                    <Ionicons name='md-map' size={ 25 } focused={ focused } color={ tintColor } />,
            }),

        },
        Info: {
            screen: InformationContainer,
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
        navigationOptions: () => ({
            tabBarVisible: true,
            tabBarComponent: CustomBottomTabNavigation,
        }),
        initialRouteName: 'Home',
        tabBarOptions: {
            activeBackgroundColor: global.colours.secondary,
            inactiveBackgroundColor: global.colours.dark,
            activeTintColor: global.colours.dark,
            inactiveTintColor: global.colours.secondary,
            showLabel: false,
        },
    },
);
