import * as React from 'react';
import { connect } from '../../shared/types/ReduxConnect';
import { RootState } from '../../modules';
import { bindActionCreators, Dispatch } from 'redux';
import { change, FormStateMap } from 'redux-form';
import { NavigationScreenProps } from 'react-navigation';
import { ScreenWrapper } from '../../components/_layout/ScreenWrapper/ScreenWrapper';
import { Home } from '../../screens/Home/Home';

export namespace HomeContainer {
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
    (state: RootState):Pick<HomeContainer.Props, 'forms'> => ({
        forms: state.form,
    }),
    (dispatch:Dispatch):Pick<HomeContainer.Props, 'actions'> => ({
        actions: bindActionCreators({
            updateForm: (form, field, value, touch, persistentSubmitErrors) =>
                change(form, field, value, touch, persistentSubmitErrors),
        }, dispatch),
    }),
)
export class HomeContainer extends React.Component<HomeContainer.Props> {
    public render() {
        const {
            navigation,
        } = this.props;

        return (
            <ScreenWrapper
                noHeaderLogo
                navigation={ navigation }>
                <Home
                    navigate={ navigation.navigate }/>
            </ScreenWrapper>
        );
    }
}
