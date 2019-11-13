import { Component } from "react";

export interface IDynamicKeyValues extends Object {
    [key: string]: any;
}
interface IAppState {
    inputErrors?: Object;
    fields?: any;
    isOwnUpdate?: boolean;
}
interface IAppProps { }
export interface IReactComponent extends Component<IAppProps, IAppState> {

}
export interface IOptions {
    locale: string;
}
interface IError {
    has: boolean;
    message: string;
}

export interface IInputErrors {
    [key: string]: IError;
}
