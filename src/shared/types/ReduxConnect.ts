import {
    connect as originalConnect, MapDispatchToPropsParam, MapStateToPropsParam, MergeProps, Options,
} from 'react-redux';
import * as React from 'react';

export interface InferableComponentEnhancerWithProps<TInjectedProps, TNeedsProps> {
    <TComponent extends React.ComponentType<TInjectedProps & TNeedsProps>>(component: TComponent): TComponent;
}

interface UpdatedConnect {
    <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}>(
        mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps, any>,
        mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
    ): InferableComponentEnhancerWithProps<TStateProps & TDispatchProps, any>;

    <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, TMergedProps = {}>(
        mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps, any>,
        mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
        mergeProps?: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>,
        options?: Options<TStateProps, TOwnProps, TMergedProps>,
    ): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>;

}

export const connect = originalConnect as UpdatedConnect;
