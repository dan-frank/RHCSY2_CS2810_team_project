import React, { Component } from "react";
import API from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import CartItem from "./cartItem";
import MiniCart from "./miniCart";
import Checkout from "./checkout";

class Cart extends Component {
  state = {
    showCart: false,
    tableNumber: -1,
    responses: [],
    responseStatus: "",
  };

  /**
   * Checks out customer.
   * Creates new order and then using returned orderId creates
   * ordered_items for each menu item ordered.
   *
   * @author dan-frank
   * @returns {void}
   */
  handleCheckoutRequest = async () => {
    const { tableNumber } = this.state;
    const orderOrdered = 1;
    const menuItemIds = this.props.menuItems.map((a) => a.id);
    const menuItemCounts = this.props.menuItems.map((a) => a.count);

    // Sends add order request to API
    await API.post(`/orders/`, null, {
      params: { tableNumber, orderStatus: orderOrdered },
    })
      .then(async (response) => {
        const orderId = response.data.id;

        // Sends add ordered items request to API
        await API.post(`/ordered_items/${orderId}`, null, {
          params: { menuItemIds, menuItemCounts },
        })
          .then((response) => {
            this.setState({
              responses: [
                "Successfully added order items",
                "Loading order confirmation...",
              ],
              responseStatus: "success",
            });

            // Redirects to order confirm page after 2 seconds
            setTimeout(function () {
              window.location.href = `/order_confirm/${orderId}`;
            }, 2000);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { menuItems, onCartItemIncrement, onCartItemDecrement } = this.props;
    const { orderId, showCart, responses, responseStatus } = this.state;

    return (
      <React.Fragment>
        <div className={"cart" + (showCart ? " cart--active" : "")}>
          <div className="cart__top">
            <div className="cart__toggle" onClick={this.handleToggleCart}>
              <FontAwesomeIcon icon={faTimesCircle} />
            </div>
          </div>
          <div className="cart__middle">
            {menuItems.map((menuItem, index) => (
              <CartItem
                key={menuItem.id}
                cartId={index}
                menuItem={menuItem}
                onCartItemIncrement={onCartItemIncrement}
                onCartItemDecrement={onCartItemDecrement}
              />
            ))}
          </div>
          <div className="cart__bottom">
            <Checkout
              orderId={orderId}
              onTableChange={this.handleTableChange}
              onCheckout={this.handleCheckout}
              responses={responses}
              responseStatus={responseStatus}
            />
          </div>
        </div>
        <MiniCart
          onToggle={this.handleToggleCart}
          totalItems={menuItems.map((a) => a.count).reduce((a, b) => a + b, 0)}
        />
      </React.Fragment>
    );
  }

  /**
   * Shows or hides cart when clicked
   *
   * @author dan-frank
   * @returns {void}
   */
  handleToggleCart = () => {
    this.setState((prevState) => ({ showCart: !prevState.showCart }));
  };

  /**
   * Updates state table number with value of input field.
   * Is run when table number input field changes.
   *
   * @author dan-frank
   * @param {event} e Event object sent by form
   * @returns {void}
   */
  handleTableChange = (e) => {
    const { value } = e.target;
    if (Number.isNaN(value)) {
      alert("Must input numbers");
      return;
    }

    this.setState({ tableNumber: e.target.value });
  };

  /**
   * Handles checkout validation.
   * Sends errors to user if no table number or menu items provided,
   * otherwise calls checkout method.
   *
   * @author dan-frank
   * @returns {void}
   */
  handleCheckout = () => {
    const { menuItems } = this.props;
    const { tableNumber } = this.state;
    let responses = [];

    if (tableNumber === -1 || !tableNumber)
      responses.push("No table has been selected");
    if (menuItems.length < 1)
      responses.push("No menu items have been added to cart");
    if (responses.length > 0) {
      this.setState({ responses, responseStatus: "fail" });
      return;
    }

    this.setState({ responses: [], responseStatus: "" });
    this.handleCheckoutRequest();
  };
}

export default Cart;
