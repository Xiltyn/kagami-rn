import * as React from 'react';
import { connect } from '../../shared/types/ReduxConnect';
import { RootState } from '../../modules';
import { bindActionCreators, Dispatch } from 'redux';
import { change, FormStateMap } from 'redux-form';
import { NavigationScreenProps } from 'react-navigation';
import { ScreenWrapper } from '../../components/_layout/ScreenWrapper/ScreenWrapper';
import { Information } from '../../screens/Information/Information';

export namespace InformationContainer {
    export interface Props extends NavigationScreenProps {
        forms: FormStateMap;
        actions?: mapActions;
    }

    export type mapActions = {
        updateForm: (
            form: string,
            field: string,
            value: any,
            touch?: boolean,
            persistentSubmitErrors?: boolean,
        ) => void;
    };
}

@connect(
    (state: RootState):Pick<InformationContainer.Props, 'forms'> => ({
        forms: state.form,
    }),
    (dispatch:Dispatch):Pick<InformationContainer.Props, 'actions'> => ({
        actions: bindActionCreators({
            updateForm: (form, field, value, touch, persistentSubmitErrors) =>
                change(form, field, value, touch, persistentSubmitErrors),
        }, dispatch),
    }),
)
export class InformationContainer extends React.Component<InformationContainer.Props> {
    public render() {
        const {
            navigation,
        } = this.props;

        return (
            <ScreenWrapper
                navigation={ navigation }>
                <Information />
            </ScreenWrapper>
        );
    }
}
