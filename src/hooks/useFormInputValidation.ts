/**
 * @module Hooks
 */
import React, { useCallback, useState, useMemo, useRef } from "react";
import {
  IDynamicKeyValues,
  Lang,
} from "../specs/react-form-input-validator.spec";
import {
  getCheckboxValues,
  getRadioButtonValues,
  invalidateErrors,
  fillErrors,
} from "../utils/utils";
import * as Validator from "validatorjs";

/**
 * Structure of the Fields Object
 */
export interface FieldsObject {
  /**
   * Key denotes input field name and the value can be any.
   */
  [key: string]: string | number | boolean | Array<any> | object | any;
}

/**
 * Structure of the Fields Object
 */
export interface ErrorsObject {
  /**
   * Key denotes input field name and the value will always string.
   */
  [key: string]: string;
}
/**
 * Structure of the Rules Object
 */
export interface RulesObject {
  /**
   * Key denotes input field name and the value will always string.
   */
  [key: string]: string;
}
/**
 * Hook form instance
 */
export interface FormInstance {
  /**
   * Denotes the form is valid or not
   *
   * @example
   * ```js
   * import { useFormInputValidation } from "react-form-input-validation";
   *
   * const [fields, errors, form] = useFormInputValidation({ email: "", password: "" });
   *
   * useEffect(() => {
   *   if (form.isValidForm) {
   *     console.log(fields, errors, form);
   *     // Perform the api call here
   *   }
   * }, []);
   *
   * <form onSubmit={form.handleSubmit}>
   * </form>
   * ```
   */
  isValidForm: boolean;

  /**
   * Set the validation rules for form fields.
   * Find the available [rules](https://github.com/gokulakannant/react-form-input-validation/blob/master/Rules.md#available-rules) here.
   *
   * @param rules The rules to validate.
   * @example
   * ```js
   *
   * import { useFormInputValidation } from "react-form-input-validation";
   *
   * const [fields, errors, form] = useFormInputValidation({ email: "", password: "" });
   * form.useRules({
   *      email: "required|email",
   *      password: "required"
   * });
   * ```
   */
  useRules(rules): void;

  /**
   * Set the locale string for error messages.
   *
   * @param locale
   * @example
   * ```js
   * import { Lang, useFormInputValidation } from "react-form-input-validation";
   *
   * const [fields, errors, form] = useFormInputValidation({ name: "" });
   * form.useLang(Lang.en);
   * ```
   */
  useLang(locale: string): void;

  /**
   * Register Custom Validation Rules.
   *
   * @param name The name of the rule.
   * @param callbackFn Returns a boolean to represent a successful or failed validation.
   * @param errorMessage An optional string where you can specify a custom error message.
   * :attribute inside errorMessage will be replaced with the attribute name.
   * @example
   * ```js
   * import { useFormInputValidation } from "react-form-input-validation";
   *
   * const [fields, errors, form] = useFormInputValidation({ phone: "required|telephone" });
   * form.register('telephone', function(value, requirement, attribute) {
   *      return value.match(/^\d{3}-\d{3}-\d{4}$/);
   * }, 'The :attribute phone number is not in the format XXX-XXX-XXXX.');
   *
   * ```
   * @see Example in [Code Sandbox](https://codesandbox.io/s/register-h4d4be)
   */
  register(
    name: string,
    callbackFn: Validator.RegisterCallback,
    errorMessage: string
  ): void;

  /**
   * Register an asynchronous rule which accepts a passes callback.
   * The `data-async` custom attribute should be added in the html element.
   *
   * @param name The name of the rule.
   * @param callbackFn
   * @param errorMessage An optional string where you can specify a custom error message.
   * :attribute inside errorMessage will be replaced with the attribute name.
   * @example
   * ```js
   * import { useFormInputValidation } from "react-form-input-validation";
   *
   * const [fields, errors, form] = useFormInputValidation({ customer_name: "" }, { customer_name: "required|username_available" });
   *
   * form.registerAsync('username_available', function(username, attribute, req, passes) {
   *      // do your database/api checks here etc
   *      // then call the `passes` method where appropriate:
   *      passes(); // if username is available
   *      passes(false, 'Username has already been taken.'); // if username is not available
   * });
   * ```
   * ```html
   * <input
   *      type="text"
   *      name="customer_name"
   *      onChange={form.handleChangeEvent}
   *      onBlur={form.handleBlurEvent}
   *      value={fields.customer_name}
   *      data-async
   * >
   * ```
   * @see Example in [Code Sandbox](https://codesandbox.io/s/registerasync-ge8vbe).
   */
  registerAsync(
    name: string,
    callbackFn: Validator.RegisterAsyncCallback,
    errorMessage: string
  ): void;

  /**
   * You can also add your own custom language by calling setMessages.
   *
   * @param langCode Override {@link Lang} code validation error messages.
   * @param values A error messages object.
   * @example
   * ```js
   *
   * import { Lang, useFormInputValidation } from "react-form-input-validation";
   *
   * const [fields, errors, form] = useFormInputValidation({ customer_name: "" }, { customer_name: "required" });
   *
   * form.setMessages(Lang.en, {
   *  required: 'The :attribute can't be empty.'
   * });
   * ```
   * @see Example in [Code Sandbox](https://codesandbox.io/s/setmessages-16zx2w?file=/src/App.js).
   */
  setMessages(langCode: Lang, values: object): void;

  /**
   * Get the raw object of messages for the given language.
   *
   * @param langCode Retrive {@link Lang} code validation error messages.
   * @example
   * ```js
   *
   * import { Lang, useFormInputValidation } from "react-form-input-validation";
   *
   * const [fields, errors, form] = useFormInputValidation({ customer_name: "" });
   * const messages = form.getMessages(Lang.en); (i.e) 'en'
   * console.log(messages);
   * ```
   * @see Example in [Code Sandbox](https://codesandbox.io/s/getmessages-erm3l0).
   */
  getMessages(langCode: Lang): object;

  /***
   * Get the default language being used.
   * @example
   * ```js
   * import { useFormInputValidation } from "react-form-input-validation";
   *
   * const [fields, errors, form] = useFormInputValidation({ customer_name: "" });
   * form.getDefaultLang(); // returns e.g. 'en'
   * ```
   */
  getDefaultLang(): string;

  /**
   * You can supply global custom attribute names in your app with the attributes property.
   *
   * @param callbackFn A Callback function to configure the attribute name.
   * @example
   * ```js
   * import { useFormInputValidation } from "react-form-input-validation";
   *
   * const [fields, errors, form] = useFormInputValidation({ customer_name: "" });
   * form.setAttributeFormatter(function(attribute) {
   *      return attribute.replace(/_/g, ' ');
   * });
   * ```
   * @see Example in [Code Sandbox](https://codesandbox.io/s/setattributeformatter-e10ruy).
   */
  setAttributeFormatter(callbackFn: Function): void;

  /**
   * Handle onchange event for input fields.
   *
   * @param event
   * @example
   * ```html
   *
   * import { useFormInputValidation } from "react-form-input-validation";
   *
   * const [fields, errors, form] = useFormInputValidation({ email: "" });
   *
   * <input
   *      type="text"
   *      name="email"
   *      onChange={form.handleChangeEvent}
   *      value={fields.email}
   * >
   * ```
   */
  handleChangeEvent(event: React.ChangeEvent<HTMLInputElement>): void;

  /**
   * A method to handle the onblur event for input in the form.
   *
   * @param event
   * @example
   * ```html
   *
   * import { useFormInputValidation } from "react-form-input-validation";
   *
   * const [fields, errors, form] = useFormInputValidation({ email: "" });
   *
   * <input
   *      type="text"
   *      name="email"
   *      value={fields.email}
   *      onChange={form.handleChangeEvent}
   *      onBlur={form.handleBlurEvent}
   * >
   * ```
   */
  handleBlurEvent(event: React.FocusEvent<HTMLInputElement>): void;

  /**
   * A method to handle the react form submission.
   *
   * @param event
   * @example
   * ```html
   *
   * import { useFormInputValidation } from "react-form-input-validation";
   *
   * const [fields, errors, form] = useFormInputValidation({ email: "", password: "" });
   *
   * <form onSubmit={form.handleSubmit}>
   * </form>
   * ```
   */
  handleSubmit(event: React.FormEvent): void;

  /**
   * The validate method is used to trigger the validator manually.
   * It returns a promise function, it will resolve with boolean value.
   * If the form doesn't have any errors it will resolve with true.
   *
   * @param event
   * @example
   * ```js
   *
   * import { useFormInputValidation } from "react-form-input-validation";
   *
   * const [fields, errors, form] = useFormInputValidation({ email: "", password: "" });
   *
   * const onSubmit = async (event) => {
   *   const isValid = await form.validate(event);
   *   if (isValid) {
   *      console.log(fields, errors);
   *      // Perform the api call here
   *   }
   * }
   *
   * <form onSubmit={onSubmit}>
   * </form>
   * ```
   * @see Example in [Code Sandbox](https://codesandbox.io/s/validate-yjseiv).
   *
   */
  validate(event: React.FormEvent): Promise<boolean>;
}
/**
 * A simple and effective validation hook used to validate the html forms.
 *
 * @example
 * ```js
 * import { useFormInputValidation } from "react-form-input-validation";
 *
 * const [fields, errors, form] = useFormInputValidation({ email: "", password: "" });
 *
 * ```
 *
 * @see Example in [Code Sandbox](https://codesandbox.io/s/useforminputvalidation-kn0xe3).
 */
export function useFormInputValidation(
  fieldsObject: FieldsObject = {},
  rulesObject?: RulesObject
): Array<FieldsObject | ErrorsObject | FormInstance> {
  const fieldsRef = useRef(fieldsObject);
  const errorsRef = useRef({});
  const [rules, setRules] = useState(rulesObject || {});
  const [fields, setFields] = useState<object>(fieldsRef.current);
  const [errors, setErrors] = useState<object>(errorsRef.current);
  const [isValidForm, setIsValidForm] = useState(false);

  /**
   * this is sample doc
   * @category Function
   */
  const useRules = useCallback((rules) => {
    setRules(rules);
  }, []);

  const useLang = useCallback((locale: string) => {
    Validator.useLang(locale);
  }, []);

  const register = useCallback(
    (
      name: string,
      callbackFn: Validator.RegisterCallback,
      errorMessage: string
    ) => {
      Validator.register(name, callbackFn, errorMessage);
    },
    []
  );

  const registerAsync = useCallback(
    (
      name: string,
      callbackFn: Validator.RegisterAsyncCallback,
      errorMessage: string
    ) => {
      Validator.registerAsync(name, callbackFn, errorMessage);
    },
    []
  );

  const setMessages = useCallback(
    (langCode: Lang, values: Validator.ErrorMessages) => {
      Validator.setMessages(langCode, values);
    },
    []
  );

  const getMessages = useCallback((langCode: Lang) => {
    return Validator.getMessages(langCode);
  }, []);

  const getDefaultLang = useCallback(() => {
    return Validator.getDefaultLang();
  }, []);

  const setAttributeFormatter = useCallback(
    (callbackFn: Validator.AttributeFormatter) => {
      Validator.setAttributeFormatter(callbackFn);
    },
    []
  );

  const handleChangeEvent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const name: string = event.target.name;
      if (name) {
        const value =
          event.target.type === "checkbox"
            ? getCheckboxValues(event.target)
            : event.target.type === "radio"
            ? getRadioButtonValues(event.target)
            : event.target.value;
        fieldsRef.current[name] = value;
        setFields((currentValues) => ({
          ...currentValues,
          [name]: value,
        }));
      }
    },
    []
  );

  const validate = (
    elements: Array<HTMLInputElement>
  ): Promise<IDynamicKeyValues> => {
    return new Promise((resolve) => {
      const data = {};
      const rule = {};
      const customAttributes = {};
      let hasAsync: boolean = false;

      elements.forEach((element) => {
        const name = element.getAttribute("name");
        data[name] = fields[name];

        rule[name] = rules[name];

        if (!rule[name]) {
          console.warn(`Rule is not defind for ${name}`);
          rule[name] = "";
        }

        if (name.endsWith("_confirmation")) {
          const original = name.slice(0, name.indexOf("_confirmation"));
          data[original] = fields[original];
        }

        if (element.hasAttribute("data-attribute-name")) {
          customAttributes[name] = element.getAttribute("data-attribute-name");
        }

        if (element.hasAttribute("data-async")) {
          hasAsync = true;
        }
      });

      const validator = new Validator(data, rule);
      validator.setAttributeNames(customAttributes);

      if (hasAsync) {
        const passes: Function = () => {
          invalidateErrors(data, errorsRef.current);
          resolve(errorsRef.current);
        };

        const fails: Function = () => {
          const issues = fillErrors(validator);
          resolve({ ...errors, ...issues });
        };

        validator.checkAsync(passes, fails);
        return;
      }

      if (validator.fails()) {
        const issues = fillErrors(validator);
        return resolve({ ...errors, ...issues });
      }
      invalidateErrors(data, errorsRef.current);
      return resolve(errorsRef.current);
    });
  };

  const validateForm = (form): Promise<boolean> => {
    const elements = [];
    form
      .querySelectorAll(
        "textarea,select,input:not([type='submit']):not([type='file']):not([data-ignore-validation])"
      )
      .forEach((element) => {
        elements.push(element);
      });

    return new Promise((resolve) => {
      validate(elements)
        .then((results) => {
          Object.entries(results).forEach(([key, val]) => {
            errorsRef.current[key] = val;
          });
          setErrors((currentValues) => ({
            ...currentValues,
            ...results,
          }));
          resolve(Object.keys(results).length === 0);
        })
        .catch((errors) => console.log(errors));
    });
  };

  const handleBlurEvent = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const element: HTMLInputElement = event.target;
      validate([element])
        .then((inputErrors) => {
          Object.entries(inputErrors).forEach(([key, val]) => {
            errorsRef.current[key] = val;
          });
          setErrors((currentValues) => ({
            ...currentValues,
            ...inputErrors,
          }));
        })
        .catch((error) => console.error(error));
    },
    []
  );

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    return new Promise((resolve) => {
      validateForm(event.target).then((hasNoError) => {
        if (hasNoError) {
          setIsValidForm(true);
        }
        resolve(hasNoError);
      });
    });
  }, []);

  const fieldsReturns = useMemo(() => fields, []);

  const errorReturns = useMemo(() => errors, []);

  const formInstance = useMemo(
    () => ({
      isValidForm,
      useRules,
      useLang,
      register,
      registerAsync,
      setMessages,
      setAttributeFormatter,
      getMessages,
      getDefaultLang,
      handleChangeEvent,
      handleBlurEvent,
      handleSubmit,
      validate: handleSubmit,
    }),
    [isValidForm]
  );
  return [fieldsReturns, errorReturns, formInstance];
}
