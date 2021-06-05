import React, { Component } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import API from "../../api";
import { getPrice } from "../../helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faMapMarker,
  faCashRegister,
} from "@fortawesome/free-solid-svg-icons";
import Response from "../Response";

const CARD_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
};

class Form extends Component {
  state = {
    requesting: false,
    responses: [],
    responseStatus: "",
  };

  render() {
    const { price } = this.props;
    const { responses, responseStatus, requesting } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="columns is-multiline">
          <div className="column is-half">
            <div className="field">
              <label className="label" htmlFor="name">
                Name
              </label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  required
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </div>
            </div>
          </div>

          <div className="column is-half">
            <div className="field">
              <label className="label" htmlFor="email">
                Email
              </label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  required
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </div>
            </div>
          </div>

          <div className="column is-full">
            <div className="field">
              <label className="label" htmlFor="address">
                Address
              </label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Your Address"
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faMapMarker} />
                </span>
              </div>
            </div>
          </div>

          <div className="column is-third">
            <div className="field">
              <label className="label" htmlFor="city">
                City
              </label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  name="city"
                  id="city"
                  placeholder="Your City"
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faMapMarker} />
                </span>
              </div>
            </div>
          </div>

          <div className="column is-third">
            <div className="field">
              <label className="label" htmlFor="county">
                County
              </label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  name="county"
                  id="county"
                  placeholder="Your County"
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faMapMarker} />
                </span>
              </div>
            </div>
          </div>

          <div className="column is-third">
            <div className="field">
              <label className="label" htmlFor="post_code">
                Post Code
              </label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  name="post_code"
                  id="post_code"
                  placeholder="Your Post Code"
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faMapMarker} />
                </span>
              </div>
            </div>
          </div>

          <div className="column is-full">
            <div className="field">
              <label className="label" htmlFor="cardnumber">
                Card Information
              </label>
              <CardElement options={CARD_OPTIONS} />
            </div>
          </div>

          <div className="column is-full">
            <Response responses={responses} responseStatus={responseStatus} />

            {responseStatus !== "success" && (
              <div className="field has-text-centered">
                <button
                  type="submit"
                  disabled={requesting}
                  className={
                    "button is-primary" + (requesting ? " is-loading" : "")
                  }
                >
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faCashRegister} />
                  </span>
                  <span>Pay {getPrice(price)}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    );
  }

  /**
   * Completes a payment using Stripes API.
   *
   * @param {object[]} e Event object sent by form
   * @returns {void} Only returns to prevent further execution of method
   */
  handleFormSubmit = async (e) => {
    e.preventDefault();

    this.setState({ requesting: true });

    const { stripe, elements, orderId, price, onOrderPayed } = this.props;
    const { error } = this.state;
    let responses = [];

    if (!stripe || !elements) return;

    if (error) {
      elements.getElement("card").focus();
      return;
    }

    // Get's billing details from form
    const billingDetails = {
      name: e.target.name.value,
      email: e.target.email.value,
      address: {
        city: e.target.city.value,
        line1: e.target.address.value,
        state: e.target.county.value,
        postal_code: e.target.post_code.value,
      },
    };

    if (!billingDetails.name || billingDetails.name === "")
      responses.push("No name provided");
    if (!billingDetails.email || billingDetails.email === "")
      responses.push("No email provided");

    if (responses.length === 0) {
      // Creates client secret key
      const { data: clientSecret } = await API.post("/checkout/", null, {
        params: { amount: price },
      });
      if (
        !clientSecret.client_secret ||
        clientSecret.client_secret === "" ||
        clientSecret.statusCode === 500
      )
        responses.push("Unable to generate client secret");

      // Get's card information
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) responses.push("Unable to gather card information");

      // Creates stripe payment method id
      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails,
      });
      if (!paymentMethodReq.paymentMethod)
        responses.push(
          "Unable to generate payment method id, please check your card information"
        );

      if (responses.length === 0) {
        // Finalises transaction
        const confirmedCardPayment = await stripe.confirmCardPayment(
          clientSecret.client_secret,
          {
            payment_method: paymentMethodReq.paymentMethod.id,
          }
        );

        // Sends payment information to database
        await API.post("/order_payments/", null, {
          params: {
            orderId,
            paymentIntentId: confirmedCardPayment.paymentIntent.id,
            paymentIntentStatus: confirmedCardPayment.paymentIntent.status,
          },
        });
      }
    }

    this.setState({ requesting: false });

    // Handles responses
    if (responses.length !== 0) {
      this.setState({
        responses,
        responseStatus: "fail",
      });
      onOrderPayed(false);
      return;
    }

    this.setState({
      responses: ["Thank you, payment has been made successfully!"],
      responseStatus: "success",
    });
    onOrderPayed(true);
  };
}

export default Form;
