import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

class MiniCart extends Component {
  render() {
    const { onToggle, totalItems } = this.props;

    return (
      <div className="cart_toggle" onClick={onToggle}>
        <FontAwesomeIcon icon={faShoppingCart} />
        <div className="cart_toggle__total">{totalItems}</div>
      </div>
    );
  }
}

export default MiniCart;
