import React from "react";
import ReactFormValidation from "react-form-validation";
import "./Form.css";

class ValidationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        customer_name: "",
        email_address: "",
        phone_number: "",
        pickup_time: "",
        taxi: "",
        pickup_place: "",
        comments: "",
        dropoff_place: "",
        extras: []
      },
      inputErrors: {}
    };
    this.form = new ReactFormValidation(
      this,
      {
        customer_name: "required",
        email_address: "required|email",
        phone_number: "required|numeric|digits_between:10,12",
        pickup_time: "required|date",
        taxi: "required",
        pickup_place: "required",
        comments: "required|max:20",
        dropoff_place: "required",
        extras: "required|array"
      },
      (fields) => {
        // Place to dispatch the form submit actions
        alert(JSON.stringify(fields));
      }
    );
    /* let messages = ReactFormValidation.getMessages('en');
    messages.required = 'Whoops, :attribute field is required.';
    ReactFormValidation.setMessages('en', messages);
    ReactFormValidation.useLang('en') */
  }

  render() {
    return (
        <div style={{maxWidth: "600px", margin: "0 auto"}}>
          <h3>React Input Form Validation</h3>
          <form
            className="myForm"
            noValidate
            autoComplete="off"
            onSubmit={this.form.handleSubmit}
          >
            <p>
              <label>
                Name
                <input
                  type="text"
                  name="customer_name"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleFieldsChange}
                  value={this.state.fields.customer_name}
                  // To override the attribute name
                  data-attribute-name="CUSTOMER NAME"
                />
              </label>
              <label className="error">
                {this.state.inputErrors.customer_name
                  ? this.state.inputErrors.customer_name.message
                  : ""}
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
                {this.state.inputErrors.phone_number
                  ? this.state.inputErrors.phone_number.message
                  : ""}
              </label>
            </p>

            <p>
              <label>
                Email
                <input
                  type="email"
                  name="email_address"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleFieldsChange}
                  value={this.state.fields.email_address}
                />
              </label>
              <label className="error">
                {this.state.inputErrors.email_address
                  ? this.state.inputErrors.email_address.message
                  : ""}
              </label>
            </p>

            <fieldset>
              <legend>Which taxi do you require?</legend>
              <p>
                <label className="choice">
                  {" "}
                  <input
                    type="radio"
                    name="taxi"
                    onChange={this.form.handleFieldsChange}
                    value="car"
                  />{" "}
                  Car{" "}
                </label>
              </p>
              <p>
                <label className="choice">
                  {" "}
                  <input
                    type="radio"
                    name="taxi"
                    onChange={this.form.handleFieldsChange}
                    value="van"
                  />{" "}
                  Van{" "}
                </label>
              </p>
              <p>
                <label className="choice">
                  {" "}
                  <input
                    type="radio"
                    name="taxi"
                    onChange={this.form.handleFieldsChange}
                    value="tuk tuk"
                  />{" "}
                  Tuk Tuk{" "}
                </label>
              </p>
              <label className="error">
                {this.state.inputErrors.taxi
                  ? this.state.inputErrors.taxi.message
                  : ""}
              </label>
            </fieldset>

            <fieldset>
              <legend>Extras</legend>
              <p>
                <label className="choice">
                  {" "}
                  <input
                    type="checkbox"
                    name="extras"
                    onChange={this.form.handleFieldsChange}
                    value="baby"
                  />{" "}
                  Baby Seat{" "}
                </label>
              </p>
              <p>
                <label className="choice">
                  {" "}
                  <input
                    type="checkbox"
                    name="extras"
                    onChange={this.form.handleFieldsChange}
                    value="wheelchair"
                  />{" "}
                  Wheelchair Access{" "}
                </label>
              </p>
              <p>
                <label className="choice">
                  {" "}
                  <input
                    type="checkbox"
                    name="extras"
                    onChange={this.form.handleFieldsChange}
                    value="tip"
                  />{" "}
                  Stock Tip{" "}
                </label>
              </p>
              <label className="error">
                {this.state.inputErrors.extras
                  ? this.state.inputErrors.extras.message
                  : ""}
              </label>
            </fieldset>

            <p>
              <label>
                Pickup Date/Time
                <input
                  type="date"
                  name="pickup_time"
                  onChange={this.form.handleFieldsChange}
                  value={this.state.fields.pickup_time}
                />
              </label>
              <label className="error">
                {this.state.inputErrors.pickup_time
                  ? this.state.inputErrors.pickup_time.message
                  : ""}
              </label>
            </p>

            <p>
              <label>
                Pickup Place
                <select
                  id="pickup_place"
                  name="pickup_place"
                  value={this.state.fields.pickup_place}
                  onChange={this.form.handleFieldsChange}
                >
                  <option value="">Select One</option>
                  <option value="office">Taxi Office</option>
                  <option value="town_hall">Town Hall</option>
                  <option value="telepathy">We'll Guess!</option>
                </select>
              </label>
              <label className="error">
                {this.state.inputErrors.pickup_place
                  ? this.state.inputErrors.pickup_place.message
                  : ""}
              </label>
            </p>

            <p>
              <label>
                Dropoff Place
                <input
                  type="text"
                  name="dropoff_place"
                  value={this.state.fields.dropoff_place}
                  onChange={this.form.handleFieldsChange}
                  list="destinations"
                />
              </label>

              <datalist id="destinations">
                <option value="Airport" />
                <option value="Beach" />
                <option value="Fred Flinstone's House" />
              </datalist>
              <label className="error">
                {this.state.inputErrors.dropoff_place
                  ? this.state.inputErrors.dropoff_place.message
                  : ""}
              </label>
            </p>

            <p>
              <label>
                Special Instructions
                <textarea
                  name="comments"
                  maxLength="20"
                  value={this.state.fields.comments}
                  onChange={this.form.handleFieldsChange}
                  onBlur={this.form.handleBlurEvent}
                ></textarea>
              </label>
              <label className="error">
                {this.state.inputErrors.comments
                  ? this.state.inputErrors.comments.message
                  : ""}
              </label>
            </p>

            <p>
              <button type="submit">Submit Booking</button>
            </p>
          </form>
        </div>
    );
  }
}

export default ValidationForm;
