# React Form Input Validation

[![npm package](https://img.shields.io/npm/v/react-form-input-validation)](https://www.npmjs.com/package/react-form-input-validation)
[![Build Status](https://api.travis-ci.org/gokulakannant/react-form-input-validation.png?branch=master)](https://travis-ci.org/gokulakannant/react-form-input-validation)
[![GitHub license](https://img.shields.io/github/license/gokulakannant/react-form-input-validation.svg)](https://github.com/gokulakannant/react-form-input-validation/blob/master/LICENSE.md) [![Join the chat at https://gitter.im/react-form-input-validation/community](https://badges.gitter.im/react-form-input-validation/community.svg)](https://gitter.im/react-form-input-validation/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A customized [validatorjs](https://www.npmjs.com/package/validatorjs) library to validate the react forms. It uses the both [Controlled Components](https://reactjs.org/docs/forms.html#controlled-components) and React Hooks approach for validation.

* [Available Rules](Rules.md)
* [Documentation](https://gokulakannant.github.io/react-form-input-validation/index.html)
* [Demo - Class Components](https://codesandbox.io/s/react-form-input-validation-demp-hyuju?fontsize=14&hidenavigation=1&theme=dark) (in CodeSandbox)
* [Demo - Functional Components](https://codesandbox.io/s/useforminputvalidation-kn0xe3) (in CodeSandbox)

## Why use react-form-input-validation?

* JQuery Free.
* Auto Controlled State.
* Able to use in both State and Stateless components.
* Compatible with libraries like [Material UI](https://material-ui.com/), and etc.
* Readable and declarative validation rules which is inspired by laravel framework.
* Error messages with multilingual support.
* Handy to manage multiple forms in same page.

## Installation

To install the stable version:

Using [npm](https://www.npmjs.com/) as your package manager.

```bash
  npm install --save react-form-input-validation
```

Using [yarn](https://yarnpkg.com/en/) as your package manager.

```bash
  yarn add react-form-input-validation
```

## Usage

### Class component

The given below example is for Class component. View all available apis in [documentation](https://gokulakannant.github.io/react-form-input-validation/v2.1.0/classes/ReactFormInputValidation.ReactFormInputValidation.html).

```js
import React from "react";
import ReactFormInputValidation from "react-form-input-validation";

class ValidationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        name: "",
        email: "",
        phone_number: ""
      },
      errors: {}
    };
    this.form = new ReactFormInputValidation(this);
    this.form.useRules({
        name: "required",
        email: "required|email",
        phone_number: "required|numeric|digits_between:10,12",
    });
    this.form.onformsubmit = (fields) => {
      // Do you ajax calls here.
    }
  }

  render() {
    return (<React.Fragment>
        <form onSubmit={this.form.handleSubmit}>
            <p>
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.name}
                />
              </label>
              <label className="error">
                {this.state.errors.name ? this.state.errors.name : ""}
              </label>
            </p>

            <p>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.email}
                />
              </label>
              <label className="error">
                {this.state.errors.email ? this.state.errors.email : ""}
              </label>
            </p>

            <p>
              <label>
                Phone
                <input
                  type="tel"
                  name="phone_number"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.phone_number}
                />
              </label>
              <label className="error">
                {this.state.errors.phone_number ? this.state.errors.phone_number : ""}
              </label>
            </p>
            <p>
              <button type="submit">Submit</button>
            </p>
        </form>
    </React.Fragment>)
  }
}
```

### Functional Component

The given below example is for Functional component with the usage of hooks. View all available apis in [documentation](https://gokulakannant.github.io/react-form-input-validation/v2.1.0/functions/Hooks.useFormInputValidation.html).

#### Example 1

```js
import React from "react";
import { useFormInputValidation } from "react-form-input-validation";

const ValidationForm = () => {
  const [fields, errors, form] = useFormInputValidation({
    customer_name: "",
    email_address: "",
    phone_number: "",
  }, {
    customer_name: "required",
    email_address: "required|email",
    phone_number: "required|numeric|digits_between:10,12"
  });

  const onSubmit = async (event) => {
    const isValid = await form.validate(event);
    if (isValid) {
      // console.log(fields, errors);
      // Perform api call here
    }
  }
  
  return <div style={{maxWidth: "600px", margin: "0 auto"}}>
  <h3>React Form Input Validation - validate</h3>
  <form
    className="myForm"
    noValidate
    autoComplete="off"
    onSubmit={onSubmit}
  >
    <p>
      <label>
        Name
        <input
          type="text"
          name="customer_name"
          onBlur={form.handleBlurEvent}
          onChange={form.handleChangeEvent}
          value={state.fields.customer_name}
      />
      </label>
      <label className="error">
        {errors.customer_name
          ? errors.customer_name
          : ""}
      </label>
    </p>

    <p>
      <label>
        Phone
        <input
          type="tel"
          name="phone_number"
          onBlur={form.handleBlurEvent}
          onChange={form.handleChangeEvent}
          value={fields.phone_number}
        />
      </label>
      <label className="error">
        {errors.phone_number
          ? errors.phone_number
          : ""}
      </label>
    </p>

    <p>
      <label>
        Email
        <input
          type="email"
          name="email_address"
          onBlur={form.handleBlurEvent}
          onChange={form.handleChangeEvent}
          value={fields.email_address}
        />
      </label>
      <label className="error">
        {errors.email_address
          ? errors.email_address
          : ""}
      </label>
    </p>

    <p>
      <button type="submit">Submit</button>
    </p>
  </form>
</div>
}

export default ValidationForm;
```

#### Example 2

```js
import React from "react";
import { useFormInputValidation } from "react-form-input-validation";

const ValidationForm2 = () => {
    const [fields, errors, form] = useFormInputValidation({
      email_address: "",
      password: "",
    }, {
      email_address: "required|email",
      password: "required"
    });
  
    useEffect(() => {
      if (form.isValidForm) {
        // console.log(fields, errors, form);
        // Perform api call here
      }
    }, [])
    
    return <div style={{maxWidth: "600px", margin: "0 auto"}}>
    <h3>React Form Input Validation - usage of form.isValidForm</h3>
    <form
      className="myForm"
      noValidate
      autoComplete="off"
      onSubmit={form.handleSubmit}
    >
      <p>
        <label>
          Email
          <input
            type="email"
            name="email_address"
            onBlur={form.handleBlurEvent}
            onChange={form.handleChangeEvent}
            value={fields.email_address}
          />
        </label>
        <label className="error">
          {errors.email_address
            ? errors.email_address
            : ""}
        </label>
      </p>
  
      <p>
        <label>
          Password
          <input
            type="tel"
            name="password"
            onBlur={form.handleBlurEvent}
            onChange={form.handleChangeEvent}
            value={fields.password}
          />
        </label>
        <label className="error">
          {errors.password
            ? errors.password
            : ""}
        </label>
      </p>
  
      <p>
        <button type="submit">Submit</button>
      </p>
    </form>
  </div>
  }
  
  export default ValidationForm2;
```

## Custom attribute name

Refer the below example to override the attribute name,

```html
    <input
        type="text"
        name="name"
        onBlur={this.form.handleBlurEvent}
        onChange={this.form.handleChangeEvent}
        value={this.state.fields.name}
        data-attribute-name="Username"
    />
```

The output will be like, "The Username field is required.".

## Supported form fields

|Form Fields and Attributes|Supported By Library|
| :-- |:--:|
|text|&#x2611;|
|password|&#x2611;|
|email|&#x2611;|
|url|&#x2611;|
|number|&#x2611;|
|checkbox|&#x2611;|
|radio|&#x2611;|
|search|&#x2611;|
|tel|&#x2611;|
|date|&#x2611;|
|month|&#x2611;|
|week|&#x2611;|
|time|&#x2611;|
|datetime-local|&#x2611;|
|textarea|&#x2611;|
|select|&#x2611;|
|color|&#x2611;|
|Combo Box Fields|&#x2611;|
|file|&#x2612;|
|range|&#x2612;|
|image|&#x2612;|

The input types button, submit, reset, hidden are exceptional from the above list.

## Versions

Latest Version: 2.0.5. For more versions refer [VERSIONS.md](VERSIONS.md).

## Changelog

Recently Updated? Please read the [changelog](CHANGELOG.md).

## License

This project is licensed under the GPLv3 License - see the [LICENSE.md](LICENSE.md) file for details.
