import React from "react";
import ReactFormValidation, { Lang } from "react-form-input-validation";
import "./Form.css";

class ValidationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        customer_name: "",
        email_address: "",
        password: "",
        password_confirmation: "",
        phone_number: "",
        pickup_time: "",
        taxi: "",
        pickup_place: "",
        comments: "",
        dropoff_place: "",
        extras: []
      },
      errors: {}
    };
    this.form = new ReactFormValidation(this, { locale: "en" });
    this.form.useRules({
      customer_name: "required|username_available",
      email_address: "required|email",
      password: "required|confirmed",
      password_confirmation: "required|same:password",
      phone_number: "required|numeric|digits_between:10,12",
      pickup_time: "required|date",
      taxi: "required",
      pickup_place: "required",
      comments: "required|max:20",
      dropoff_place: "required",
      extras: "required|array"
    });

    this.form.onformsubmit = (fields) => {
      console.log(fields);
    }

    ReactFormValidation.registerAsync('username_available', function(username, attribute, req, passes) {
      setTimeout(() => {
        if (username === "foo")
          passes(false, 'Username has already been taken.'); // if username is not available
        else
          passes();
      }, 1000);
    });
    let messages = ReactFormValidation.getMessages(Lang.en);
    console.log(messages);
    /* messages.required = 'Whoops, :attribute field is required.';
    ReactFormValidation.setMessages('en', messages);
    console.log(Lang)
    ReactFormValidation.useLang(Lang.fr) */
  }

  render() {
    return (
        <div style={{maxWidth: "600px", margin: "0 auto"}}>
          <h3>React Form Input Validation</h3>
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
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.customer_name}
                  // To override the attribute name
                  data-attribute-name="Customer Name"
                  data-async
                />
              </label>
              <label className="error">
                {this.state.errors.customer_name
                  ? this.state.errors.customer_name
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
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.phone_number}
                />
              </label>
              <label className="error">
                {this.state.errors.phone_number
                  ? this.state.errors.phone_number
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
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.email_address}
                />
              </label>
              <label className="error">
                {this.state.errors.email_address
                  ? this.state.errors.email_address
                  : ""}
              </label>
            </p>

            <p>
              <label>
                Password
                <input
                  type="text"
                  name="password"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.password}
                />
              </label>
              <label className="error">
                {this.state.errors.password
                  ? this.state.errors.password
                  : ""}
              </label>
            </p>

            <p>
              <label>
                Confirm Password
                <input
                  type="text"
                  name="password_confirmation"
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.password_confirmation}
                />
              </label>
              <label className="error">
                {this.state.errors.password_confirmation
                  ? this.state.errors.password_confirmation
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
                    onChange={this.form.handleChangeEvent}
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
                    onChange={this.form.handleChangeEvent}
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
                    onChange={this.form.handleChangeEvent}
                    value="tuk tuk"
                  />{" "}
                  Tuk Tuk{" "}
                </label>
              </p>
              <label className="error">
                {this.state.errors.taxi
                  ? this.state.errors.taxi
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
                    onChange={this.form.handleChangeEvent}
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
                    onChange={this.form.handleChangeEvent}
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
                    onChange={this.form.handleChangeEvent}
                    value="tip"
                  />{" "}
                  Stock Tip{" "}
                </label>
              </p>
              <label className="error">
                {this.state.errors.extras
                  ? this.state.errors.extras
                  : ""}
              </label>
            </fieldset>

            <p>
              <label>
                Pickup Date
                <input
                  type="date"
                  name="pickup_time"
                  onChange={this.form.handleChangeEvent}
                  // onBlur={this.form.handleBlurEvent}
                  value={this.state.fields.pickup_time}
                />
              </label>
              <label className="error">
                {this.state.errors.pickup_time
                  ? this.state.errors.pickup_time
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
                  onChange={this.form.handleChangeEvent}
                  onBlur={this.form.handleBlurEvent}
                >
                  <option value="">Select One</option>
                  <option value="office">Taxi Office</option>
                  <option value="town_hall">Town Hall</option>
                  <option value="telepathy">We'll Guess!</option>
                </select>
              </label>
              <label className="error">
                {this.state.errors.pickup_place
                  ? this.state.errors.pickup_place
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
                  onChange={this.form.handleChangeEvent}
                  onBlur={this.form.handleBlurEvent}
                  list="destinations"
                />
              </label>

              <datalist id="destinations">
                <option value="Airport" />
                <option value="Beach" />
                <option value="Fred Flinstone's House" />
              </datalist>
              <label className="error">
                {this.state.errors.dropoff_place
                  ? this.state.errors.dropoff_place
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
                  onChange={this.form.handleChangeEvent}
                  onBlur={this.form.handleBlurEvent}
                ></textarea>
              </label>
              <label className="error">
                {this.state.errors.comments
                  ? this.state.errors.comments
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
