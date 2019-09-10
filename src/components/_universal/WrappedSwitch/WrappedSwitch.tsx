import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';
import { Switch } from 'react-native';
import global from '../../../shared/styles/global.styles';

export namespace WrappedSwitch {
    export interface Props extends WrappedFieldProps {
        onValueChange: (value: boolean) => void;
        initialValue?: boolean;
    }

    export interface State {
        value: boolean;
    }
}

export class WrappedSwitch extends React.Component<WrappedSwitch.Props> {
    public state: Partial<WrappedSwitch.State> = {
        value: false,
    };

    public componentDidMount():void {
        const { initialValue } = this.props;

        if(initialValue) {
            this.setState({
                value: initialValue,
            });
        }
    }

    private handleValueChange = () => {
        const { value } = this.state;

        this.setState({
            value: !value,
        });

        return !value;
    };

    public render() {
        const { input: { onChange } } = this.props;
        const { value } = this.state;

        return (
            <Switch
                value={ value }
                { ...this.props.input }
                trackColor={ { false: global.colours.error, true: global.colours.success } }
                onValueChange={ () => onChange(this.handleValueChange) }
            />
        );
    }
}
