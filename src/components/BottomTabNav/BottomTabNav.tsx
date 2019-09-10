import * as React from 'react';
import { Animated } from 'react-native';
// @ts-ignore
import { BottomTabBar } from 'react-navigation-tabs';

class BottomTabNav extends React.Component {

    render() {
        return (
            <Animated.View>
                <BottomTabBar {...this.props}/>
            </Animated.View>
        );
    }
}

export default BottomTabNav;
