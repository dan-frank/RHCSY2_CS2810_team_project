import React, { Component } from "react";
import { fetchMenuItem } from "../../helpers";

class MenuItems extends Component {
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
    const menuItem = await fetchMenuItem(this.props.id);
    this.setState({ menuItem });
  }

  render() {
    const { menuItem } = this.state;
    return <div>{menuItem.title}</div>;
  }
}

export default MenuItems;
