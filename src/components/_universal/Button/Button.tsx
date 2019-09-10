import * as React from 'react';
import { Color } from 'csstype';
import * as Icons from 'expo-vector-icons';
import { ButtonContainer, Btn, Label } from './Button.styles';
import global from '../../../shared/styles/global.styles';
import { StyleProp, ViewStyle } from 'react-native';

export namespace Button {
    export interface Props {
        options: ButtonRenderOptions;
        onPress?: (...args: any) => void;
        onLongPress?: (...args: any) => void;
    }
}

export type GradientData = {
    from: Color;
    to: Color;
};

export type ButtonRenderOptions = {
    color?: Color;
    label?: string;
    iconName?: string;
    iconSet?: IconSets;
    iconSize?: number;
    background?: Color;
    gradient?: GradientData;
    style?: StyleProp<ViewStyle>;
};

export enum IconSets {
    Zocial = 'Zocial',
    Entypo = 'Entypo',
    Feather = 'Feather',
    Octicons = 'Octicons',
    Ionicons = 'Ionicons',
    EvilIcons = 'EvilIcons',
    AntDesign = 'AntDesign',
    Foundation = 'Foundation',
    FontAwesome = 'FontAwesome',
    FontAwesome5 = 'FontAwesome5',
    MaterialIcons = 'MaterialIcons',
    SimpleLineIcons = 'SimpleLineIcons',
    MaterialCommunityIcons = 'MaterialCommunityIcons',
}

export const Button = (props: Button.Props) => {
    const {
        options,
        onPress,
        onLongPress,
    } = props;

    const Icon = (options && options.iconSet) && Icons[options.iconSet];
    const isGradient = options && (options.gradient && options.gradient.from && options.gradient.to) &&
        [ options.gradient.from, options.gradient.to ];
    const isBackground = options && (options.background) && [ options.background, options.background ];

    return (
        <ButtonContainer
            colors={
                isGradient || isBackground || [ global.colours.light, global.colours.light ]
            }
            height={ Icon ? '40px' : '48px' }
            width={ Icon ? '40px' : '320px' }
            start={ [ 0.0, 0.5 ] }
            end={ [ 1.0, 0.5 ] }
            style={ options.style }>
            <Btn
                onPress={ onPress }
                onLongPress={ onLongPress }>
                {
                    !!Icon &&
                        <Icon
                            name={ options.iconName }
                            size={ options.iconSize || 48 }
                            color={ options.color }/>
                }
                {
                    !!options.label &&
                        <Label color={ options.color || global.colours.primary }>{ options.label }</Label>
                }
            </Btn>
        </ButtonContainer>
    );
};

Button.defaultProps = {
    options: {
        color: global.colours.grey,
        label: 'Click Me!',
        iconName: 'calendar',
        iconSet: IconSets.AntDesign,
        background: global.colours.light,
    },
    onPress: (...args: any) => console.log('default button prop onPress :: ', args),
    onLongPress: (...args: any) => console.log('default button prop onLongPress :: ', args),
};
