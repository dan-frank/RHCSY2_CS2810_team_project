import React, { Component } from "react";

class ControlButtons extends Component {
  state = {};
  render() {
    const { cartId, onCartItemIncrement, onCartItemDecrement } = this.props;

    return (
      <div className="cart__item__controls">
        <button
          className="cart__item__control button is-danger"
          onClick={() => onCartItemDecrement(cartId)}
        >
          -
        </button>
        <button
          className="cart__item__control button is-success"
          onClick={() => onCartItemIncrement(cartId)}
        >
          +
        </button>
      </div>
    );
  }
}

export default ControlButtons;
