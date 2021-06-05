import React, { Component } from "react";
import MenuItem from "./menuItem";
import MenuItemInput from "./menuItemInput";
import { fetchAllMenuItems, fetchAllCategories } from "../../helpers";
import { toggleAvailability } from "../../socketIo";

class MenuItems extends Component {
  state = {
    menuItems: [],
    categories: [],
  };

  async componentDidMount() {
    const menuItems = await fetchAllMenuItems(this.props.showDeleted);
    const categories = await fetchAllCategories();
    this.setState({ menuItems, categories });
  }

  componentDidUpdate() {
    /**
     * Creates new array for menu items
     * Compares the the two arrays and replaces the objects in the old array with the new ones
     * Receives from socket.io handler whenever emitted from API.
     *
     * @param {Object[]} err Errors object
     * @param {number} menuItem Item on the menu
     */
    toggleAvailability((err, menuItem) => {
      const newMenuItems = [menuItem];
      let menuItems = [...this.state.menuItems];
      menuItems = menuItems.map(
        (obj) => newMenuItems.find((o) => o.id === obj.id) || obj
      );
      setTimeout(
        function () {
          this.setState({ menuItems });
        }.bind(this),
        1000
      );
    });
  }

  render() {
    const { category } = this.props;
    let { menuItems } = this.state;

    if (category !== "" && category !== "Reset") {
      menuItems = menuItems.filter(
        (menuItem) => menuItem.category_name === category
      );
    }

    return (
      <div>{menuItems.map((menuItem) => this.getFormComponent(menuItem))}</div>
    );
  }

  /**
   * Gets Menuitem, or MenuItemInput when in edit mode.
   *
   * @param {object[]} menuItem Menu item object to pass to component
   * @returns {component} Generated component
   */
  getFormComponent(menuItem) {
    const { categories } = this.state;
    const { editMode, onAddMenuItemToCart } = this.props;

    if (editMode) {
      return (
        <MenuItemInput
          key={menuItem.id}
          menuItem={menuItem}
          categories={categories}
        />
      );
    } else {
      return (
        <MenuItem
          key={menuItem.id}
          onAddMenuItemToCart={onAddMenuItemToCart}
          menuItem={menuItem}
        />
      );
    }
  }
}

export default MenuItems;
