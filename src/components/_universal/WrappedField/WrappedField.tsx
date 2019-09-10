import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';
import { InputValidation } from '../InputValidation/InputValidation';
import { CustomField } from '../CustomField/CustomField';
import { IconSets } from '../Button/Button';
import { Color } from 'csstype';
import { StyleProp, ViewStyle } from 'react-native';
import global from '../../../shared/styles/global.styles';

export namespace WrappedField {
    export interface Props extends WrappedFieldProps {
        secureTextEntry?: boolean;
        secureTextSwitch?: () => void;
        withoutRadius?: boolean;
        iconSet?: IconSets;
        iconName?: string;
        iconColor?: Color;
        width?: string;
        height?: string;
        color: Color;
        isTextArea?: boolean;
        style?: StyleProp<ViewStyle>;
    }
}

export class WrappedField extends React.Component<WrappedField.Props> {
    public componentDidCatch(error:Error, errorInfo:React.ErrorInfo):void {
        console.log(this.props);
        console.log(error);
        console.log(errorInfo);
    }

    private maybeRenderIcon = (): Partial<CustomField.Props> => {
        const { secureTextEntry, iconSet, iconName, iconColor } = this.props;
        const isSecured = secureTextEntry !== undefined;
        const icnSet = isSecured ? IconSets.Entypo :
            iconSet ? iconSet : undefined;
        const icnName = isSecured ? (secureTextEntry ? 'eye' : 'eye-with-line') :
            iconName ? iconName : undefined;
        const icnColor = iconColor ? iconColor : global.colours.primary;

        return {
            iconSet: icnSet,
            iconColor: icnColor,
            iconName: icnName,
        };
    };

    public render() {
        const {
            secureTextEntry,
            secureTextSwitch,
            withoutRadius,
            width,
            height,
            color,
            isTextArea,
            style,
            input,
            meta,
        } = this.props;

        const {
            iconColor,
            iconName,
            iconSet,
        } = this.maybeRenderIcon();

        return (
            <InputValidation { ...this.props } style={ style }>
                <CustomField
                    {...this.props}
                    meta={ meta }
                    input={ input }
                    color={ color }
                    iconSet={ iconSet }
                    iconName={ iconName }
                    iconColor={ iconColor }
                    multiline={ isTextArea }
                    secureTextEntry={ secureTextEntry }
                    secureTextSwitch={ secureTextSwitch }
                    containerProps={ { withoutRadius, width, height } }/>
            </InputValidation>
        );
    }
}
