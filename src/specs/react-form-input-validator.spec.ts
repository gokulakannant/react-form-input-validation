import { Component } from "react";
/**
 * A dictionary object, that consists dynamic key value pairs.
 */
export interface IDynamicKeyValues {
    [key: string]: any;
}
/**
 * The following states are controlled by {@link ReactFormInputValidation}.
 */
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
/**
 * There are no props will send to react component by {@link ReactFormInputValidation}
 */
interface IAppProps { }
/**
 * A supported react component should be looks like {@link IReactComponent}
 */
export interface IReactComponent extends Component<IAppProps, IAppState> { }
/**
 * The available locales are mentioned in {@link Lang}.
 */
export enum Lang {
    /**
     * Denotes `Arabic`.
     */
    ar = "ar",
    /**
     * Denotes `Azeri`.
     */
    az = "az",
    /**
     * Denotes `Belarusian`.
     */
    be = "be",
    /**
     * Denotes `Bulgarian`.
     */
    bg = "bg",
    /**
     * Denotes `Bosnian`.
     */
    bs = "bs",
    /**
     * Denotes `Catalan`.
     */
    ca = "ca",
    /**
     * Denotes `Czech`.
     */
    cs = "cs",
    /**
     * Denotes `Welsh`.
     */
    cy = "cy",
    /**
     * Denotes `Danish`.
     */
    da = "da",
    /**
     * Denotes `German`.
     */
    de = "de",
    /**
     * Denotes `Greek`.
     */
    el = "el",
    /**
     * Denotes `English`.
     */
    en = "en",
    /**
     * Denotes `Spanish`.
     */
    es = "es",
    /**
     * Denotes `Estonian`.
     */
    et = "et",
    /**
     * Denotes `Basque`.
     */
    eu = "eu",
    /**
     * Denotes `Farsi`.
     */
    fa = "fa",
    /**
     * Denotes `Finnish`.
     */
    fi = "fi",
    /**
     * Denotes `French`.
     */
    fr = "fr",
    /**
     * Denotes `Croatian`.
     */
    hr = "hr",
    /**
     * Denotes `Hungarian`.
     */
    hu = "hu",
    /**
     * Denotes `Indonesian`.
     */
    id = "id",
    /**
     * Denotes `Italian - Switzerland`.
     */
    it = "it",
    /**
     * Denotes `Japanese`.
     */
    ja = "ja",
    /**
     * Denotes `Georgian`.
     */
    ka = "ka",
    /**
     * Denotes `Korean`.
     */
    ko = "ko",
    /**
     * Denotes `Italian - Italy`.
     */
    It = "It",
    Iv = "Iv",
    /**
     * Denotes `FYRO Macedonia`.
     */
    mk = "mk",
    /**
     * Denotes `Mongolian`.
     */
    mn = "mn",
    /**
     * Denotes `Malay`.
     */
    ms = "ms",
    /**
     * Denotes `Norwegian - Bokml`.
     */
    nb_NO = "nb_NO",
    /**
     * Denotes `Dutch`.
     */
    nl = "nl",
    /**
     * Denotes `Polish`.
     */
    pl = "pl",
    /**
     * Denotes `Portuguese - Portugal`.
     */
    pt = "pt",
    /**
     * Denotes `Portuguese - Brazil`.
     */
    pt_BR = "pt_BR",
    /**
     * Denotes `Romanian`.
     */
    ro = "ro",
    /**
     * Denotes `Russian`.
     */
    ru = "ru",
    se = "se",
    /**
     * Denotes `Slovenian`.
     */
    sl = "sl",
    /**
     * Denotes `Albanian`.
     */
    sq = "sq",
    /**
     * Denotes `Serbian`.
     */
    sr = "sr",
    /**
     * Denotes `Swedish`.
     */
    sv = "sv",
    /**
     * Denotes `Turkish`.
     */
    tr = "tr",
    ua = "ua",
    /**
     * Denotes `Ukrainian`.
     */
    uk = "uk",
    /**
     * Denotes `Vietnamese`.
     */
    vi = "vi",
    /**
     * Denotes `Chinese`.
     */
    zh = "zh",
    /**
     * Denotes `Chinese - Taiwan`.
     */
    zh_TW = "zh_TW",
}
/**
 * A dictionary object to have React Form Input Validation options.
 * @example
 * ```js
 *
 * let options = {
 *      locale: "en"
 * }
 * ```
 */
export interface IOptions {
    /**
     * The supported languages are in {@link Lang} enum.
     */
    locale: Lang;
}
/**
 * A dictionary object.
 * @example
 * ```js
 *
 * {
 *      name: "The name field is required"
 * }
 * ```
 */
export interface IValidatorErrors {
    /**
     * Denotes all input errors
     */
    [key: string]: string;
}

/**
 * Event callback function for onformsubmit.
 * @param fields A valid form fields data.
 */
export type ReactFormSubmitEventHandler = (fields: any) => void;

type EventListener = (data?: any) => void;

abstract class EventTarget {
    private listeners = {};

    protected addListener(type: string, callback: EventListener) {
        if (!(type in this.listeners)) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(callback);
    }

    protected removeListener(type: string, callback: EventListener) {
        if (!(type in this.listeners)) {
            return;
        }
        const stack = this.listeners[type];
        for (let i = 0, l = stack.length; i < l; i++) {
            if (stack[i] === callback) {
                stack.splice(i, 1);
                return;
            }
        }
    }

    protected emit(event: CustomEvent) {
        if (!(event.type in this.listeners)) {
            return true;
        }
        const stack = this.listeners[event.type].slice();
        for (let i = 0, l = stack.length; i < l; i++) {
            stack[i].call(this, event.detail);
        }
        return !event.defaultPrevented;
    }
}

// tslint:disable-next-line:prefer-const
let _: any;

export abstract class ReactFormInputValidation extends EventTarget {
    /**
     * Event registered to notify the form submission in {@link ReactFormInputValidation}.
     * After successfull validation it will emit the valid data.
     *
     * @event
     * @returns A callback function {@link ReactFormSubmitEventHandler}.
     * @example
     * ```js
     *
     * // Refer "ReactFormInputValidation Interface" for react form input validator object creation
     *
     * this.form.addEventListener("formsubmit", (fields) => {
     *      // Make your ajax calls here.
     * });
     * // or
     * this.form.onformsubmit = (fields) => {
     *      // Make your ajax calls here.
     * }
     * ```
     * @see Example in [Code Sandbox](https://codesandbox.io/s/react-form-input-validationonformsubmit-ctkcn).
     */
    public onformsubmit: ReactFormSubmitEventHandler;
    /**
     * Construct the React Form Input Validator instance.
     *
     * @param component A required parameter to pass the current context of the {@link IReactComponent}.
     * @param options A optional parameter to set initial validator locale.
     * @example
     * ```js
     *
     * import ReactFormInputValidation from "react-form-input-validation";
     * // Recommanded to do this in constructor or componentDidMount of the form component.
     * this.form = new ReactFormInputValidation(this, { locale: 'en' });
     * ```
     */
    constructor(component: IReactComponent, options?: IOptions) {
        super();
    }

    /**
     * Set the locale string for error messages.
     *
     * @param locale
     * @example
     * ```js
     *
     * ReactFormInputValidation.useLang("en");
     * ```
     * @see Example in [Code Sandbox](https://codesandbox.io/s/react-form-input-validationlocale-rhz6w).
     */
    static useLang(locale: string): void { }

    /**
     * Register Custom Validation Rules.
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
     * @see Example in [Code Sandbox](https://codesandbox.io/s/react-form-input-validationregister-yobct)
     */
    static register(name: string, callbackFn: Function, errorMessage: string): void { }

    /**
     * Register an asynchronous rule which accepts a passes callback.
     * The `data-async` custom attribute should be added in the html element.
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
     * ```html
     * <input
     *      type="text"
     *      name="email"
     *      onChange={this.form.handleChangeEvent}
     *      onBlur={this.form.handleBlurEvent}
     *      value={this.state.fields.email}
     *      data-async
     * >
     * ```
     * @see Example in [Code Sandbox](https://codesandbox.io/s/react-form-input-validationregisterasync-hzp8b).
     */
    static registerAsync(name: string, callbackFn: Function): void { }

    /**
     * You can also add your own custom language by calling setMessages.
     *
     * @param langCode Override {@link Lang} code validation error messages.
     * @param values A error messages object.
     * @example
     * ```js
     *
     * import ReactFormInputValidation, { Lang } from "react-form-input-validation";
     *
     * ReactFormInputValidation.setMessages(Lang.en, {
     *  required: 'The :attribute field is required.'
     * });
     * ```
     * @see Example in [Code Sandbox](https://codesandbox.io/s/react-form-input-validationattribute-formattors-bfomi).
     */
    static setMessages(langCode: Lang, values: object): void { }

    /**
     * Get the raw object of messages for the given language.
     *
     * @param langCode Retrive {@link Lang} code validation error messages.
     * @example
     * ```js
     *
     * import ReactFormInputValidation, { Lang } from "react-form-input-validation";
     * ReactFormInputValidation.getMessages(Lang.en); (i.e) 'en'
     * ```
     * @see Example in [Code Sandbox](https://codesandbox.io/s/react-form-input-validationattribute-formattors-bfomi).
     */
    static getMessages(langCode: Lang): object { return _; }

    /***
     * Get the default language being used.
     * @example
     * ```js
     *
     * ReactFormInputValidation.getDefaultLang(); // returns e.g. 'en'
     * ```
     * @see Example in [Code Sandbox](https://codesandbox.io/s/react-form-input-validationlocale-rhz6w).
     */
    static getDefaultLang(): Lang { return _; }

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
     * @see Example in [Code Sandbox](https://codesandbox.io/s/react-form-input-validationattribute-formattors-bfomi).
     */
    static setAttributeFormatter(callbackFn: Function): void { }

    /**
     * Used to subscribe the event.
     *
     * @param event Name of the event.
     * @param callback Event listener for the corresponding event
     * @see Example in [Code Sandbox](https://codesandbox.io/s/react-form-input-validationonformsubmit-ctkcn).
     */
    public addEventListener(event: string, callback: (...args: Array<any>) => void): this { return _; }

    /**
     * Used to unsubscribe the event.
     *
     * @param event Name of the event to unsubscribe.
     * @param callback Exact event listener needs to be passed which is used to subscribe.
     * @see Example in [Code Sandbox](https://codesandbox.io/s/react-form-input-validationonformsubmit-ctkcn).
     */
    public removeEventListener(event: string, callback: (...args: Array<any>) => void): this { return _; }

    /**
     * Set the validation rules for form fields.
     * Find the available [rules](https://www.npmjs.com/package/validatorjs#available-rules) here.
     *
     * @param rules The rules to validate.
     * @example
     * ```js
     *
     * this.form.useRules({
     *      email: "required|email",
     *      password: "required"
     * });
     * ```
     */
    public useRules(rules): void { }

    /**
     * Handle onchange event for input fields.
     *
     * @param event
     * @example
     * ```html
     *
     * // Refer "ReactFormInputValidation Interface" for react form input validator object creation
     *
     * <input
     *      type="text"
     *      name="email"
     *      onChange={this.form.handleChangeEvent}
     *      value={this.state.fields.email}
     * >
     * ```
     */
    public handleChangeEvent(event: React.ChangeEvent<HTMLInputElement>): void { }

    /**
     * A method to handle the onblur event for input in the form.
     *
     * @param event
     * @example
     * ```html
     *
     * // Refer "ReactFormInputValidation Interface" for react form input validator object creation
     * <input
     *      type="text"
     *      name="email"
     *      value={this.state.fields.email}
     *      onChange={this.form.handleChangeEvent}
     *      onBlur={this.form.handleBlurEvent}
     * >
     * ```
     */
    public handleBlurEvent(event: React.FocusEvent<HTMLInputElement>): void { }

    /**
     * A method to handle the react form submission.
     *
     * @param event
     * @example
     * ```html
     *
     * // Refer "ReactFormInputValidation Interface" for react form input validator object creation
     * <form onSubmit={this.form.handleSubmit}>
     * </form>
     * ```
     */
    public handleSubmit(event: React.FormEvent): void { }
}
