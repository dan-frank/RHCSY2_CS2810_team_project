import React, { Component } from "react";
import { fetchAllMenuItems } from "../../helpers";
import WaiterMenuItem from "./waiterMenuItem";

class Waiter extends Component {
  state = {
    menuItems: [],
  };

  async componentDidMount() {
    const menuItems = await fetchAllMenuItems();
    this.setState({ menuItems });
  }

  render() {
    let { menuItems } = this.state;

    return (
      <div>
        {menuItems.map((menuItem) => (
          <WaiterMenuItem key={menuItem.id} menuItem={menuItem} />
        ))}
      </div>
    );
  }
}

export default Waiter;
