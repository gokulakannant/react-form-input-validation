import { Component } from "react";

export interface IDynamicKeyValues extends Object {
    [key: string]: any;
}
interface IAppState {
    /**
     * Denotes input errors in the current form component.
     */
    errors?: IValidatorErrors;
    /**
     * Containing form field input values.
     */
    fields?: IDynamicKeyValues;
    /**
     * A flag that denotes the setState is happening inside the react-form-input-validation.
     * We can avoid the component rerender by using `isValidatorUpdate` flag.
     */
    isValidatorUpdate?: boolean;
}
interface IAppProps { }
export interface IReactComponent extends Component<IAppProps, IAppState> { }
/**
 * The available locales are mensioned in {@link Lang}.
 */
export enum Lang {
    ar = "ar",
    az = "az",
    be = "be",
    bg = "bg",
    bs = "bs",
    ca = "ca",
    cs = "cs",
    cy = "cy",
    da = "da",
    de = "de",
    el = "el",
    en = "en",
    es = "es",
    et = "et",
    eu = "eu",
    fa = "fa",
    fi = "fi",
    fr = "fr",
    hr = "hr",
    hu = "hu",
    id = "id",
    it = "it",
    ja = "ja",
    ka = "ka",
    ko = "ko",
    It = "It",
    Iv = "Iv",
    mk = "mk",
    mn = "mn",
    ms = "ms",
    nb_NO = "nb_NO",
    nl = "nl",
    pl = "pl",
    pt = "pt",
    pt_BR = "pt_BR",
    ro = "ro",
    ru = "ru",
    se = "se",
    sl = "sl",
    sq = "sq",
    sr = "sr",
    sv = "sv",
    tr = "tr",
    ua = "ua",
    uk = "uk",
    vi = "vi",
    zh = "zh",
    zh_TW = "zh_TW",
}
/**
 * A dictionary object to have options
 * @example
 * ```js
 * let options = {
 *      locale: "en"
 * }
 * ```
 */
export interface IOptions {
    /**
     * The supported languages are {@link Lang}
     */
    locale: Lang;
    verbose: boolean;
}
/**
 * A dictionary object.
 * @example
 * ```js
 * {
 *      has: true,
 *      message: "The name field is required"
 * }
 * ```
 */
interface IError {
    /**
     * Denotes has error
     */
    has: boolean;
    /**
     * Denotes corresponding error message
     */
    message: string;
}

export interface IValidatorErrors {
    /**
     * Denotes all input errors
     */
    [key: string]: IError;
}

/**
 * Event callback function for onreactformsubmit.
 */
export type ReactFormSubmitEventHandler = (fields: any) => void;

export type EventListener = (data?: any) => void;
export type ErrorEventListener = (error: Error) => void;

abstract class EventTarget {
    addEventListener(
        eventName: string,
        eventListener: EventListener,
        errorEventListener?: ErrorEventListener,
        options?: any): void {}

    removeEventListener(
        eventName: string,
        eventListener: EventListener,
        errorEventListener?: ErrorEventListener,
        options?: any): void {}
}

// tslint:disable-next-line:prefer-const
let _: any;

export abstract class ReactFormInputValidation extends EventTarget {
    /**
     * Event registered to notify the onreactformsubmit in {@link ReactFormInputValidation}.
     * @returns A callback function {@link ReactFormSubmitEventHandler}.
     * @example
     * ```js
     *
     *  // Refer "ReactFormInputValidation Interface" for react input form validator object creation
     *
     * this.form.addEventListener("onreactformsubmit", (fields) => {
     *      // Make your ajax calls here.
     * });
     * // or
     * this.form.onreactformsubmit = (fields) => {
     *      // Make your ajax calls here.
     * }
     * ```
     */
    public onreactformsubmit: ReactFormSubmitEventHandler;
    /**
     * Construct the React Input Form Validator instance.
     * Find the available [rules](https://www.npmjs.com/package/validatorjs#available-rules) here.
     *
     * @param component {@link ReactComponent}
     * @param rules object
     * @param callback Function
     * @param options {@link Options}
     * @example
     * ```js
     *
     * // Recommanded to do this in constructor of the form component.
     * this.form = new ReactFormInputValidation(this,
     *                                   {
     *                                      locale: 'en'
     *                                   })
     * ```
     */
    constructor(component: IReactComponent, options?: IOptions) {
        super();
    }

    /**
     * Set the locale string for error messages
     *
     * @param locale string
     * @example
     * ```js
     *
     * ReactFormInputValidation.useLang("en");
     * ```
     */
    static useLang(locale: string): void {}

    /**
     * Register Custom Validation Rules
     *
     * @param name The name of the rule.
     * @param callbackFn Returns a boolean to represent a successful or failed validation.
     * @param errorMessage An optional string where you can specify a custom error message.
     * :attribute inside errorMessage will be replaced with the attribute name.
     * @example
     * ```js
     *
     * ReactFormInputValidation.register('telephone', function(value, requirement, attribute) {
     *      return value.match(/^\d{3}-\d{3}-\d{4}$/);
     * }, 'The :attribute phone number is not in the format XXX-XXX-XXXX.');
     *
     * ```
     */
    static register(name: string, callbackFn: Function, errorMessage: string): void { }

    /**
     * Register an asynchronous rule which accepts a passes callback
     *
     * @param name The name of the rule.
     * @param callbackFn
     * @example
     * ```js
     *
     * ReactFormInputValidation.registerAsync('username_available', function(username, attribute, req, passes) {
     *      // do your database/api checks here etc
     *      // then call the `passes` method where appropriate:
     *      passes(); // if username is available
     *      passes(false, 'Username has already been taken.'); // if username is not available
     * });
     * ```
     */
    static registerAsync(name: string, callbackFn: Function): void { }

    /**
     * You can also add your own custom language by calling setMessages:
     *
     * @param name The name of the rule.
     * @param values A error messages object
     * @example
     * ```js
     *
     * ReactFormInputValidation.setMessages('lang_code', {
     *  required: 'The :attribute field is required.'
     * });
     * ```
     */
    static setMessages(name: string, values: object): void { }

    /**
     * Get the raw object of messages for the given language
     * @param name The name of the rule
     * @example
     * ```js
     *
     * ReactFormInputValidation.getMessages('lang_code');
     * ```
     */
    static getMessages(name: string): object { return _; }

    /***
     * Get the default language being used
     * @example
     * ```js
     *
     * ReactFormInputValidation.getDefaultLang(); // returns e.g. 'en'
     * ```
     */
    static getDefaultLang(): string { return _; }

    /**
     * You can supply global custom attribute names in your app with the attributes property.
     *
     * @param callbackFn A Callback function to configure the attribute name.
     * @example
     * ```js
     *
     * ReactFormInputValidation.setAttributeFormatter(function(attribute) {
     *      return attribute.replace(/_/g, ' ');
     * });
     * ```
     */
    static setAttributeFormatter(callbackFn: Function): void { }

    /**
     * Set the validation rules for form fields.
     * @param rules The rules to validate.
     * @example
     * ```js
     *
     * this.form.useRules({
     *      email: "required|email",
     *      password: "required"
     * })
     * ```
     */
    public useRules(rules): void { }

    /**
     * Handle onchange event for input fields.
     *
     * @example
     * ```js
     *
     * // Refer "ReactFormInputValidation Interface" for react input form validator object creation
     *
     * <input name="email" onChange={this.form.handleFieldsChange} value={this.state.fields.email}>
     * ```
     */
    public handleFieldsChange(event) { }

    /**
     * A method to handle the react form submission
     *
     * @param event onsubmit event
     * @example
     * ```js
     *
     * // Refer "ReactFormInputValidation Interface" for react input form validator object creation
     *
     * <form onSubmit={form.handleSubmit}>
     * </form>
     * ```
     */
    public handleSubmit(event) { }

    /**
     * A method to handle the onblur event for every input in the form
     *
     * @param event onblur event
     * @example
     * ```js
     *
     * // Refer "ReactFormInputValidation Interface" for react input form validator object creation
     * <input
     *      name="email"
     *      value={this.state.fields.email}
     *      onChange={form.handleFieldsChange}
     *      onBlur={form.handleBlurEvent}
     * >
     * ```
     */
    public handleBlurEvent(event) { }
}
