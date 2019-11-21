# React Input Form Validation

[![Build Status](https://api.travis-ci.org/gokulakannant/react-form-input-validation.png?branch=master)](https://travis-ci.org/gokulakannant/react-form-input-validation)
[![GitHub license](https://img.shields.io/github/license/gokulakannant/react-form-input-validation.svg)](https://github.com/gokulakannant/react-form-input-validation/blob/master/LICENSE.md)

A customized [validatorjs](https://www.npmjs.com/package/validatorjs) library to validate the react forms.

* [Supported Rules](https://www.npmjs.com/package/validatorjs#available-rules) (It is supports all validatorjs rules)
* [Documentation](https://gokulakannant.github.io/react-form-input-validation/v2.0.0/index.html)
* [Demo](https://codesandbox.io/s/react-form-input-validation-demp-hyuju?fontsize=14&hidenavigation=1&theme=dark) (in CodeSandbox)

## Why use react-form-input-validation?

* JQuery Free.
* Auto Controlled State.
* Compatible with libraries like [Material UI](https://material-ui.com/), and etc.
* Readable and declarative validation rules which is inspired by laravel framework.
* Error messages with multilingual support.

## Usage

A example form has given below. View all available apis in [documentation](https://gokulakannant.github.io/react-form-input-validation/v2.0.0/index.html).

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

## Custom attribute name

Refer the below example to override the attribute name,

```html
    <input
        type="text"
        name="name"
        onBlur={this.form.handleBlurEvent}
        onChange={this.form.handleChangeEvent}
        value={this.state.fields.name}
        data-attribute-name="USER NAME"
    />
```

The output will be like, "The USER NAME field is required.".

## Supported form fields

## Versions

Latest Version: 2.0.0. For more versions refer [VERSIONS.md](VERSIONS.md).

## Changelog

Recently Updated? Please read the [changelog](CHANGELOG.md).

## License

This project is licensed under the GPLv3 License - see the [LICENSE.md](LICENSE.md) file for details.
