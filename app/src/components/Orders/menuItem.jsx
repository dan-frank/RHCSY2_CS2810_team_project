import React, { Component, Fragment } from "react";
import { fetchMenuItem } from "../../helpers";

class MenuItem extends Component {
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
    const menuItem = await fetchMenuItem(this.props.orderedItem.menu_item_id);
    this.setState({ menuItem });
  }
  render() {
    const { orderedItem } = this.props;
    const { menuItem } = this.state;

    return (
      <Fragment>
        <span className="has-text-weight-bold">
          {orderedItem.item_count}x&nbsp;
        </span>
        {menuItem.title}
      </Fragment>
    );
  }
}

export default MenuItem;
