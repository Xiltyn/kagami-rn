import { WrappedFieldProps } from 'redux-form';
import * as React from 'react';
import { IconWrapper, InputContainer, InputField, Underline } from './CustomField.style';
import global from '../../../shared/styles/global.styles';
import { NativeSyntheticEvent, StyleProp, TextInputFocusEventData, ViewStyle } from 'react-native';
import * as Icons from 'expo-vector-icons';
import { Color, FlexDirectionProperty } from 'csstype';
import { IconSets } from '../Button/Button';

export namespace CustomField {
    export interface Props extends WrappedFieldProps  {
        iconSet?: IconSets;
        iconName?: string;
        iconColor?: Color;
        autofocus?: boolean;
        color?: Color;
        placeholder?: string;
        secureTextEntry?: boolean;
        secureTextSwitch?: () => void;
        multiline?: boolean;
        containerProps: ContainerProps;
        containerStyle?: StyleProp<ViewStyle>;
        maxLength?: number;
    }

    export interface State {
        isFocused: boolean;
    }

    export interface ContainerProps {
        width?: string;
        height?: string;
        withoutRadius?: boolean;
        row?: FlexDirectionProperty;
    }
}

export class CustomField extends React.Component<CustomField.Props, CustomField.State> {
    public static defaultProps: Partial<CustomField.Props> = {
        iconColor: global.colours.grey,
        secureTextEntry: false,
        containerProps: {
            width: undefined,
            row: 'row',
        },
    };

    public state: CustomField.State = {
        isFocused: false,
    };

    public componentDidCatch(error:Error, errorInfo:React.ErrorInfo):void {
        console.log(this.props);
        console.log(error);
        console.log(errorInfo);
    }

    private handleFocus = (evt: NativeSyntheticEvent<TextInputFocusEventData>) => {
        const { target } = evt;

        if(target) {
            this.setState({
                isFocused: true,
            });
        }
    };

    private handleBlur = (evt: NativeSyntheticEvent<TextInputFocusEventData>) => {
        const { target } = evt;

        if(target) {
            this.setState({
                isFocused: false,
            });
        }
    };

    public render() {
        const {
            input: { onChange, value },
            iconSet,
            iconName,
            iconColor,
            autofocus,
            containerProps,
            containerStyle,
            color,
            secureTextSwitch,
            secureTextEntry,
            multiline,
            placeholder,
        } = this.props;
        const {
            isFocused,
        } = this.state;

        const Icon = iconSet && Icons[iconSet];

        return (
            <InputContainer
                width={ containerProps.width }
                height={ containerProps.height }
                withoutRadius={ containerProps.withoutRadius }
                style={ containerStyle }>
                <InputField
                    {...this.props.input}
                    secureTextEntry={ secureTextEntry }
                    placeholderTextColor={ color }
                    style={ { color: color } }
                    onChangeText={onChange}
                    multiline={ multiline }
                    onBlur={this.handleBlur}
                    onFocus={ evt => {
                        this.props.input.onFocus(evt as any);
                        this.handleFocus(evt);
                    }}
                    value={value}
                    placeholder={ placeholder }
                    autoFocus={ autofocus }
                />
                {
                    Icon &&
                        <IconWrapper>
                            <Icon
                            name={ iconName }
                            color={ iconColor }
                            size={25}
                            onPress={ secureTextSwitch }/>
                        </IconWrapper>
                }
                {
                    isFocused &&
                    <Underline colors={ [ global.colours.primary, global.colours.secondary ] }
                               start={ [ 0.0, 0.5 ] } end={ [ 1.0, 0.5 ] }
                    />
                }
            </InputContainer>
        );
    }
};
