
/**
 * Get the checked values from the checkbox group and return the values as array
 * @param element {@link HTMLInputElement}
 */
const getCheckboxValues = (element: HTMLInputElement): Array<any> => {
    const checkboxes: any = document.getElementsByName(element.name);
    const checkedBoxes = [...checkboxes].filter((eachCheckBox) => eachCheckBox.checked === true);
    const values = [];
    checkedBoxes.forEach(eachCheckBox => values.push(eachCheckBox.value));
    return values;
};

/**
 * Get the value from the radio button group
 * @param element Radio button element
 */
const getRadioButtonValues = (element: HTMLInputElement): string | boolean => {
    const radios: any = document.getElementsByName(element.name);
    const checkedRadioButton = [...radios].filter((val) => val.checked === true);
    return (checkedRadioButton[0]) ? checkedRadioButton[0].value : "";
};

/**
 * Invalidate valid input field errors.
 *
 * @param data
 */
const invalidateErrors = (data, errors) => {
    // const clone = {...errors};
    Object.keys(data).forEach(fieldName => {
        delete errors[fieldName];
    });
    // return clone;
};

/**
 * Prepare error object to store the errors into the react state.
 *
 * @param validator
 */
const fillErrors = (validator): object => {
    const errors = {};
    Object.keys(validator.errors.all()).forEach(field => {
        errors[field] = validator.errors.first(field);
    });
    return errors;
};

export {
    getCheckboxValues,
    getRadioButtonValues,
    invalidateErrors,
    fillErrors
};
