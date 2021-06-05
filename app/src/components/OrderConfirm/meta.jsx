import React, { Component, Fragment } from "react";

class OrdConfirm extends Component {
  render() {
    const { order } = this.props;

    return (
      <Fragment>
        <div className="order_meta mb-6">
          <div className="order_meta__title">
            <span>&#10004;</span>
            <h1 className="title is-1">Thank you for your order!</h1>
          </div>
          <div className="order_meta__order_number">
            <h3>Your order number is #{order.id}</h3>
            <h4>Table number: {order.table_number}</h4>
          </div>
        </div>
        <hr />
      </Fragment>
    );
  }
}

export default OrdConfirm;
