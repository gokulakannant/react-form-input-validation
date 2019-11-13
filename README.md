# React Input Form Validation

A customized validatorjs library to validate the react forms. This library is extended version of [validatorjs](https://www.npmjs.com/package/validatorjs).

* [Supported Rules](https://www.npmjs.com/package/validatorjs#available-rules) (It is supports all validatorjs rules)
* [Documentation](https://gokulakannant.github.io/react-form-input-validation/index.html)
* [Demo](https://gokulakannant.github.io/react-form-input-validation/demo/index.html)

## Usage

[Click here](https://gokulakannant.github.io/react-form-input-validation/classes/reactformvalidator.html) to see the usage and its example

## Custom attribute name

Refer the below example to override the attribute name

```html
    <input
        type="text"
        name="customer_name"
        onBlur={this.form.handleBlurEvent}
        onChange={this.form.handleFieldsChange}
        value={this.state.fields.customer_name}
        data-attribute-name="CUSTOMER NAME"
    />
```

The output will be like, "The CUSTOMER NAME field is required."

## License

This project is licensed under the GPLv3 License - see the [LICENSE.md](LICENSE.md) file for details
