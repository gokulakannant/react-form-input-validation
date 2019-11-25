# Introduction

Documentation of React Form Input Validation API's for use of web developers validating React Forms.

## Changelog

All notable changes to React Form Input Validation APIs will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [2.0.1] - 25/11/2019

### Fixed

- Fixed `onformsubmit` event is received with empty values.

## [2.0.0] - 22/11/2019

### Added

- Added the following new API's
    - [`useRules`](https://gokulakannant.github.io/react-form-input-validation/v2.0.0/classes/reactforminputvalidation.html#userules)
    - [`registerAsync`](https://gokulakannant.github.io/react-form-input-validation/v2.0.0/classes/reactforminputvalidation.html#registerasync)
    - [`setAttributeFormatter`](https://gokulakannant.github.io/react-form-input-validation/v2.0.0/classes/reactforminputvalidation.html#setattributeformatter)
    - [`addEventListener`](https://gokulakannant.github.io/react-form-input-validation/v2.0.0/classes/reactforminputvalidation.html#addeventlistener)
    - [`removeEventListener`](https://gokulakannant.github.io/react-form-input-validation/v2.0.0/classes/reactforminputvalidation.html#removeeventlistener)
- A new custom event is introduced to provide validated form data.
    -  [`onformsubmit`](https://gokulakannant.github.io/react-form-input-validation/v2.0.0/classes/reactforminputvalidation.html#onformsubmit)
- A custom attribute `data-async` introduced to denotes async validation form field.
  It should be mentioned in form field, if the form field has async validation. Refer [`registerAsync`](https://gokulakannant.github.io/react-form-input-validation/v2.0.0/classes/reactforminputvalidation.html#registerasync) API for more details.

### Modified

- API Documentation contents has improved.
- More Code Sandbox examples are added in the API document.
- Modified API name from `handleFieldsChange` to [`handleChangeEvent`](https://gokulakannant.github.io/react-form-input-validation/v2.0.0/classes/reactforminputvalidation.html#handlechangeevent).
- Error message containing state `inputErrors` is renamed to `errors`.
- Accessing error message in state is modified from `state.inputErrors.{form field name}.message` to `state.errors.{form field name}`.

### Removed

- [Contructor](https://gokulakannant.github.io/react-form-input-validation/v2.0.0/classes/reactforminputvalidation.html#constructor) arguments reduced.
    - Rules passing in consturctor is removed. And the alternate is [`useRules`](https://gokulakannant.github.io/react-form-input-validation/v2.0.0/classes/reactforminputvalidation.html#userules).
    - Handle submit callback in constructor removed. And the alternate is [`onformsubmit`](https://gokulakannant.github.io/react-form-input-validation/v2.0.0/classes/reactforminputvalidation.html#onformsubmit) event.

## [1.0.1] - 14/11/2019

### Added

- A limited featured package has published.
