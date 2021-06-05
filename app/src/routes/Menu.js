import React, { Component } from "react";
import CallWaiter from "../components/CallWaiter";
import CategoryButtons from "../components/CategoryButtons";
import MenuItems from "../components/MenuItems";
import Cart from "../components/Cart";

class Menu extends Component {
  state = {
    menuItems: [],
    category: "",
  };

  /**
   * Add's passed menu item to array of cart items.
   *
   * @param {number} id ID of menu item to add to cart
   */
  handleAddMenuItemToCart = (id) => {
    const menuItems = [...this.state.menuItems];
    const index = menuItems.findIndex((x) => x.id === id);
    if (index !== -1) {
      menuItems[index].count = menuItems[index].count + 1;
    } else {
      menuItems.push({ id, count: 1 });
    }
    this.setState({ menuItems });
  };

  render() {
    const { menuItems } = this.state;

    return (
      <div className="section">
        <div className="container">
          <CallWaiter />
          <CategoryButtons
            handleCategoryButtonClick={this.handleCategoryButtonClick}
          />
          <MenuItems
            category={this.state.category}
            onAddMenuItemToCart={this.handleAddMenuItemToCart}
          />
          <Cart
            menuItems={menuItems}
            onCartItemIncrement={this.handleCartItemIncrement}
            onCartItemDecrement={this.handleCartItemDecrement}
          />
        </div>
      </div>
    );
  }

  /**
   * Updates category state.
   * This state is used to filter categories.
   *
   * @param {string} category String of category to filter by
   */
  handleCategoryButtonClick = (category) => {
    this.setState({ category });
  };

  /**
   * Increments cart item.
   *
   * @param {number} cartId Index of menu item in cart
   */
  handleCartItemIncrement = (cartId) => {
    const menuItems = [...this.state.menuItems];
    menuItems[cartId].count = menuItems[cartId].count + 1;
    this.setState({ menuItems });
  };

  /**
   * Decrements cart item.
   *
   * @param {number} cartId Index of menu item in cart
   */
  handleCartItemDecrement = (cartId) => {
    let menuItems = [...this.state.menuItems];
    const currentCount = menuItems[cartId].count;
    menuItems[cartId].count = currentCount - 1;
    if (currentCount === 1) {
      if (cartId > -1) {
        menuItems.splice(cartId, 1);
      }
    }
    this.setState({ menuItems });
  };
}

export default Menu;
