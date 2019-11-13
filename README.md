# React Input Form Validation

A customized validatorjs library to validate the react forms. This library is extended version of [validatorjs](https://www.npmjs.com/package/validatorjs).

* [Supported Rules](https://www.npmjs.com/package/validatorjs#available-rules) (It is supports all validatorjs rules)
* [Documentation](https://gokulakannant.github.io/react-form-input-validation/index.html)

## Usage

A example form has given below for basic usages. View all available apis in documentation

```js
import React from "react";
import ReactFormValidation from "react-form-input-validation";

class ValidationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        name: "",
        email: "",
        phone_number: ""
      },
      inputErrors: {}
    };
    this.form = new ReactFormValidation(
      this,
      {
        name: "required",
        email: "required|email",
        phone_number: "required|numeric|digits_between:10,12",
      },
      (fields) => {
        alert(JSON.stringify(fields));
      }
    );
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
                  onChange={this.form.handleFieldsChange}
                  value={this.state.fields.name}
                />
              </label>
              <label className="error">
                {this.state.inputErrors.name ? this.state.inputErrors.name.message : ""}
              </label>
            </p>

            <p>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleFieldsChange}
                  value={this.state.fields.email}
                />
              </label>
              <label className="error">
                {this.state.inputErrors.email ? this.state.inputErrors.email.message : ""}
              </label>
            </p>

            <p>
              <label>
                Phone
                <input
                  type="tel"
                  name="phone_number"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleFieldsChange}
                  value={this.state.fields.phone_number}
                />
              </label>
              <label className="error">
                {this.state.inputErrors.phone_number ? this.state.inputErrors.phone_number.message : ""}
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

> **Note:**
> This package is fully compatible with libraries like [Material UI](https://material-ui.com/), etc.

## Custom attribute name

Refer the below example to override the attribute name

```html
    <input
        type="text"
        name="name"
        onBlur={this.form.handleBlurEvent}
        onChange={this.form.handleFieldsChange}
        value={this.state.fields.name}
        data-attribute-name="USER NAME"
    />
```

The output will be like, "The USER NAME field is required."

## License

This project is licensed under the GPLv3 License - see the [LICENSE.md](LICENSE.md) file for details
