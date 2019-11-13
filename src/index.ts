const Validator = require("validatorjs");
import { IReactComponent, IOptions, IInputErrors } from "./types/ReactTypes";

class ReactFormValidator {
    private component: IReactComponent;
    private submitCallback: Function;
    private rules: object = {};
    private errors: IInputErrors = {};

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
     * let form = new ReactFormValidator(this,
     *                                   {
     *                                      email: "required|email",
     *                                   },
     *                                   (fields) => {
     *                                      // Make ajax request here to send data to server
     *                                   },
     *                                   {
     *                                      locale: 'en'
     *                                   })
     * ```
     */
    constructor(component: IReactComponent, rules: object, callback: Function, options?: IOptions) {
        ReactFormValidator.useLang((options && options.locale) ? options.locale : "en");
        this.component = component;
        this.rules = rules;
        this.submitCallback = callback;
        this.handleFieldsChange = this.handleFieldsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlurEvent = this.handleBlurEvent.bind(this);
    }

    /**
     * Set the locale string for error messages
     *
     * @param locale string
     * @example
     * ```js
     * import ReactInputFormValidator from "react-input-form-validator";
     *
     * ReactInputFormValidator.useLang("en");
     * ```
     */
    static useLang(locale: string): void {
        Validator.useLang(locale);
    }

    /**
     * Register Custom Validation Rules
     *
     * @param name The name of the rule.
     * @param callbackFn Returns a boolean to represent a successful or failed validation.
     * @param errorMessage An optional string where you can specify a custom error message.
     * :attribute inside errorMessage will be replaced with the attribute name.
     * @example
     * ```js
     * ReactInputFormValidator.register('telephone', function(value, requirement, attribute) {
     *      return value.match(/^\d{3}-\d{3}-\d{4}$/);
     * }, 'The :attribute phone number is not in the format XXX-XXX-XXXX.');
     *
     * ```
     */
    static register(name: string, callbackFn: Function, errorMessage: string): void {
        Validator.register(name, callbackFn, errorMessage);
    }

    /**
     * You can also add your own custom language by calling setMessages:
     *
     * @param name The name of the rule.
     * @param values A error messages object
     * @example
     * ```js
     *
     * ReactInputFormValidator.setMessages('lang_code', {
     *  required: 'The :attribute field is required.'
     * });
     * ```
     */
    static setMessages(name: string, values: object): void {
        Validator.setMessages(name, values);
    }

    /**
     * Get the raw object of messages for the given language
     * @param name The name of the rule
     * @example
     * ```js
     * ReactInputFormValidator.getMessages('lang_code');
     * ```
     */
    static getMessages(name: string): object {
        return Validator.getMessages(name);
    }

    /***
     * Get the default language being used
     * @example
     * ```js
     * ReactInputFormValidator.getDefaultLang(); // returns e.g. 'en'
     * ```
     */
    static getDefaultLang(): string {
        return Validator.getDefaultLang();
    }

    /**
     * Handle onchange event for input fields.
     *
     * @example
     * ```js
     * // Refer "ReactFormValidator Interface" for react input form validator object creation
     *
     * <input name="email" onChange={form.handleFieldsChange} value={this.state.fields.email}>
     * ```
     */
    public handleFieldsChange(event) {
        const name = event.target.name;
        if (this.component && name) {
            const fields = Object.assign({}, this.component.state.fields);
            fields[name] = (event.target.type === "checkbox") ? this.getCheckboxValues(event.target) :
                            (event.target.type === "radio") ? this.getRadioButtonValues(event.target) :
                            event.target.value;
            this.component.setState({ fields: fields, isOwnUpdate: true });
        }
    }

    /**
     * A method to handle the react form submission
     *
     * @param event onsubmit event
     * @example
     * ```js
     * // Refer "ReactFormValidator Interface" for react input form validator object creation
     *
     * <form onSubmit={form.handleSubmit}>
     * </form>
     * ```
     */
    public handleSubmit(event) {
        event.preventDefault();
        if (this.validateForm(event.target) && this.submitCallback) {
            this.submitCallback(this.component.state.fields);
        }
    }

    /**
     * A method to handle the onblur event for every input in the form
     *
     * @param event onblur event
     * @example
     * ```js
     * // Refer "ReactFormValidator Interface" for react input form validator object creation
     * <input
     *      name="email"
     *      value={this.state.fields.email}
     *      onChange={form.handleFieldsChange}
     *      onBlur={form.handleBlurEvent}
     * >
     * ```
     */
    public handleBlurEvent(event) {
        const element: HTMLInputElement = event.target;

        const initValidator = () => {
            const inputErrors = this.validate(element);
            if (this.component && this.component.hasOwnProperty("state")) {
                this.errors = this.getErrorMessage(inputErrors as Array<any>,
                                this.component.state.inputErrors ? this.component.state.inputErrors : {});
                this.component.setState({ inputErrors: this.errors });
            }
        };

        if ((element.dataset !== undefined && element.dataset.hasOwnProperty("datepicker")) ||
            element.getAttribute("data-datepicker")) {
            setTimeout(initValidator, 200);
        } else {
            initValidator();
        }
    }

    /**
     * Validate the entire html form on submit.
     *
     * @param form Html form
     */
    private validateForm(form): boolean {
        if (!this.component || !this.component.state) {
            this.component.state = {
                inputErrors: {}
            };
        }

        form.querySelectorAll("textarea,select,input:not([type='submit']):not([type='file']):not([data-ignore-validation]):not([data-unique])")
            .forEach((elem) => {
            const inputErrors = this.validate(elem);
            Object.assign(this.component.state.inputErrors,
                            this.getErrorMessage(inputErrors as Array<any>, this.component.state.inputErrors));
        });

        this.component.setState({
            inputErrors: this.component.state.inputErrors
        });

        if (Object.keys(this.component.state.inputErrors)[0] &&
            form.querySelector(`[name="${Object.keys(this.component.state.inputErrors)[0]}"]`)) {
            form.querySelector(`[name="${Object.keys(this.component.state.inputErrors)[0]}"]`).focus();
        }

        return Object.keys(this.component.state.inputErrors).length === 0;
    }

    /**
     * Get the value from the radio button group
     * @param element Radio button element
     */
    private getRadioButtonValues(element: HTMLInputElement): string | boolean {
        const radios: any = document.getElementsByName(element.name);
        const checkedRadioButton = [...radios].filter((val) => val.checked === true);
        return (checkedRadioButton[0]) ? checkedRadioButton[0].value : "";
    }

    /**
     * Get the checked values from the checkbox group and return the values as array
     * @param element {@link HTMLInputElement}
     */
    private getCheckboxValues(element: HTMLInputElement): Array<any> {
        const checkboxes: any = document.getElementsByName(element.name);
        const checkedBoxes = [...checkboxes].filter((eachCheckBox) => eachCheckBox.checked === true);
        const values = [];
        checkedBoxes.forEach(eachCheckBox => values.push(eachCheckBox.value));
        return values;
    }

    /**
     * Parse the input element base on the element type get its value and return it.
     *
     * @param elem HTMLInputElement or HTMLSelectElement
     */
    private getValueFromHtmlNode(elem: HTMLInputElement | HTMLSelectElement): any {
        switch (elem.tagName) {
            case "INPUT":
                if (elem.type === "radio") {
                    return this.getRadioButtonValues(elem as HTMLInputElement);
                }

                if (elem.type === "checkbox") {
                    return this.getCheckboxValues(elem as HTMLInputElement);
                }

                return elem.getAttribute("value");
            case "SELECT":
                return (<HTMLSelectElement> elem).options[(<HTMLSelectElement> elem).selectedIndex].value;
            case "TEXTAREA":
                return elem.value;
            default:
                return elem.getAttribute("value");
        }
    }

    /**
     * Validate the single input element and return validation errors;
     *
     * @param element HTMLInputElement
     */
    private validate(element: HTMLInputElement): object {
        const errors = {};
        const name = element.getAttribute("name");
        const data = {
            [name]: this.getValueFromHtmlNode(element)
        };

        const rule = {};
        rule[name] = this.rules[name];

        if (!rule[name]) {
            return errors;
        }

        const validate = new Validator(data, rule);

        if (element.hasAttribute("data-attribute-name")) {
            validate.setAttributeNames({
                [name]: element.getAttribute("data-attribute-name")
            });
        }

        if (validate.fails()) {
            const errMessage: string = validate.errors.first(name);
            errors[name] = errMessage;
            return errors;
        }
        delete this.errors[name];
        return errors;
    }

    /**
     * Format the error message from validatorjs error to {@link IInputErrors}
     *
     * @param inputErrors Array of error strings
     * @param errors Errors
     */
    private getErrorMessage(inputErrors: Array<any>, errors: any): IInputErrors {
        Object.keys(inputErrors).forEach((field) => {
            const msg = inputErrors[field];
            if (msg) {
                errors[field] = {
                    has: true,
                    message: msg
                };
            }
        });
        return errors;
    }
}

export default ReactFormValidator;
