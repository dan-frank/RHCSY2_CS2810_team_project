import React, { Component } from "react";
import Response from "../Response";

class Checkout extends Component {
  state = {
    tableNo: -1,
  };

  render() {
    const { onTableChange, onCheckout, responses, responseStatus } = this.props;

    return (
      <div className="cart__checkout">
        <Response responses={responses} responseStatus={responseStatus} />
        <input
          className="input mb-2"
          type="number"
          name="tableNumber"
          placeholder="Table Number"
          onChange={onTableChange}
        />
        <button className="button is-primary is-fullwidth" onClick={onCheckout}>
          Checkout
        </button>
      </div>
    );
  }
}

export default Checkout;
