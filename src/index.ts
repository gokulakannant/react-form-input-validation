const Validator = require("validatorjs");
import { IReactComponent, IOptions, IValidatorErrors, IDynamicKeyValues, ReactFormSubmitEventHandler,
    ReactFormInputValidation as BaseValidator } from "./specs/react-form-input-validator.spec";

class ReactFormInputValidation extends BaseValidator {
    private component: IReactComponent;
    private rules: object = {};
    private errors: IValidatorErrors = {};
    private _onreactformsubmit: ReactFormSubmitEventHandler;

    constructor(component: IReactComponent, options?: IOptions) {
        super(component, options);
        ReactFormInputValidation.useLang((options && options.locale) ? options.locale : "en");
        this.component = component;
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlurEvent = this.handleBlurEvent.bind(this);
    }

    static useLang(locale: string): void {
        Validator.useLang(locale);
    }

    static register(name: string, callbackFn: Function, errorMessage: string): void {
        Validator.register(name, callbackFn, errorMessage);
    }

    static registerAsync(name: string, callbackFn: Function): void {
        Validator.registerAsync(name, callbackFn);
    }

    static setMessages(name: string, values: object): void {
        Validator.setMessages(name, values);
    }

    static getMessages(name: string): object {
        return Validator.getMessages(name);
    }

    static getDefaultLang(): string {
        return Validator.getDefaultLang();
    }

    static setAttributeFormatter(callbackFn: Function): void {
        Validator.setAttributeFormatter(callbackFn);
    }

    public set onreactformsubmit(callback: ReactFormSubmitEventHandler) {
        if (this._onreactformsubmit) {
            super.removeListener("reactformsubmit", this._onreactformsubmit);
        }

        this._onreactformsubmit = callback;
        super.addListener("reactformsubmit", this._onreactformsubmit);
    }

    public get onreactformsubmit(): ReactFormSubmitEventHandler {
        return this._onreactformsubmit;
    }

    public addEventListener(event: string, callback: (...args: Array<any>) => void): this {
        super.addListener(event, callback);
        return this;
    }

    public removeEventListener(event: string, callback: (...args: Array<any>) => void): this {
        super.removeListener(event, callback);
        return this;
    }

    public useRules(rules): void {
        this.rules = rules;
    }

    public handleChangeEvent(event: React.ChangeEvent<HTMLInputElement>) {
        const name: string = event.target.name;
        if (this.component && name) {
            const fields = Object.assign({}, this.component.state.fields);
            fields[name] = (event.target.type === "checkbox") ? this.getCheckboxValues(event.target) :
                            (event.target.type === "radio") ? this.getRadioButtonValues(event.target) :
                            event.target.value;
            this.component.setState({ fields: fields, isValidatorUpdate: true });
        }
    }

    public handleBlurEvent(event: React.FocusEvent<HTMLInputElement>) {
        const element: HTMLInputElement = event.target;
        this.validate(element).then((inputErrors) => {
            if (this.component && this.component.hasOwnProperty("state")) {
                this.errors = Object.assign(this.errors, inputErrors);
                this.component.setState({ errors: this.errors, isValidatorUpdate: true });
            }
        }).catch(error => console.error(error));
    }

    public handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (this.validateForm(event.target)) {
            super.emit(this.getEvent(this.component.state.fields));
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
                errors: {}
            };
        }

        form.querySelectorAll("textarea,select,input:not([type='submit']):not([type='file']):not([data-ignore-validation])")
            .forEach((element) => {
            this.validate(element).then((inputErrors) => {
                this.errors = Object.assign(this.errors, inputErrors);
                this.component.setState({
                    errors: this.errors,
                    isValidatorUpdate: true
                });
            }).catch(error => console.error(error));
        });

        if (Object.keys(this.component.state.errors)[0] &&
            form.querySelector(`[name="${Object.keys(this.component.state.errors)[0]}"]`)) {
            form.querySelector(`[name="${Object.keys(this.component.state.errors)[0]}"]`).focus();
        }

        return Object.keys(this.component.state.errors).length === 0;
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
     * @param element HTMLInputElement or HTMLSelectElement
     */
    private getValueFromHtmlNode(element: HTMLInputElement | HTMLSelectElement): any {
        switch (element.tagName) {
            case "INPUT":
                if (element.type === "radio") {
                    return this.getRadioButtonValues(element as HTMLInputElement);
                }

                if (element.type === "checkbox") {
                    return this.getCheckboxValues(element as HTMLInputElement);
                }

                return element.getAttribute("value");
            case "SELECT":
                return (<HTMLSelectElement> element).options[(<HTMLSelectElement> element).selectedIndex].value;
            case "TEXTAREA":
                return element.value;
            default:
                return element.getAttribute("value");
        }
    }

    /**
     * Validate the single input element and return validation errors;
     *
     * @param element HTMLInputElement
     */
    private validate(element: HTMLInputElement): Promise<IDynamicKeyValues> {
        return new Promise((resolve, reject) => {
            const errors = {};
            const name = element.getAttribute("name");
            const data = {
                [name]: this.getValueFromHtmlNode(element)
            };

            const rule = {};
            rule[name] = this.rules[name];

            if (!rule[name]) {
                return resolve(errors);
            }

            const validate = new Validator(data, rule);

            if (element.hasAttribute("data-attribute-name")) {
                validate.setAttributeNames({
                    [name]: element.getAttribute("data-attribute-name")
                });
            }

            if (element.hasAttribute("data-async")) {
                const passes: Function = () => {
                    delete this.errors[name];
                    resolve(errors);
                };

                const fails: Function = () => {
                    const errMessage: string = validate.errors.first(name);
                    errors[name] = errMessage;
                    resolve(errors);
                };

                validate.checkAsync(passes, fails);
                return;
            }

            if (validate.fails()) {
                const errMessage: string = validate.errors.first(name);
                errors[name] = errMessage;
                return resolve(errors);
            }

            delete this.errors[name];
            return resolve(errors);
        });
    }

    /**
     * Creating custom event to send form data.
     *
     * @param details The form fields to send in the event
     */
    private getEvent(details: any): CustomEvent {
        return new CustomEvent("reactformsubmit", {
            detail: details
        });
    }
}

export default ReactFormInputValidation;
