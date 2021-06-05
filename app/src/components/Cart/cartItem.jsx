import React, { Component } from "react";
import { getPrice } from "../../helpers";
import ControlButtons from "./controlButtons";
import { fetchMenuItem } from "../../helpers";

class CartItem extends Component {
  state = {
    menuItem: {
      id: 0,
      title: "",
      category_name: "",
      category_slug: "",
      description: "",
      price: "",
      calories: "",
    },
  };

  async componentDidMount() {
    const menuItem = await fetchMenuItem(this.props.menuItem.id);
    this.setState({ menuItem });
  }

  render() {
    const { menuItem } = this.state;
    const { count } = this.props.menuItem;
    const { cartId, onCartItemIncrement, onCartItemDecrement } = this.props;

    return (
      <div className={"cart__item"}>
        <h3 className="title is-5 mb-2">{menuItem.title}</h3>
        <table className="cart__item__meta">
          <tbody>
            <tr>
              <td>Price</td>
              <td>Amount</td>
            </tr>
            <tr>
              <td>{getPrice(menuItem.price)}</td>
              <td>x{count}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>Total:</td>
              <td>{this.getTotalPrice(menuItem.price, count)}</td>
            </tr>
          </tfoot>
        </table>
        <ControlButtons
          cartId={cartId}
          onCartItemIncrement={onCartItemIncrement}
          onCartItemDecrement={onCartItemDecrement}
          menuItemId={menuItem.id}
        />
      </div>
    );
  }

  /**
   * Calculates and formats total price of menu items.
   *
   * @param {number} price Cost of menu item in pennies
   * @param {number} count Number of times menu item will be ordered
   * @returns {number} Formatted cost of menu item
   */
  getTotalPrice(price, count) {
    return getPrice(price * count);
  }
}

export default CartItem;
