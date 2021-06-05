import React, { Component } from "react";
import { getPrice } from "../../helpers";
import { fetchMenuItem } from "../../helpers";

class OrderItem extends Component {
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
    const menuItem = await fetchMenuItem(this.props.orderItem.menu_item_id);
    this.setState({ menuItem });
  }

  render() {
    const { orderItem } = this.props;
    const { menuItem } = this.state;

    return (
      <React.Fragment>
        <div className={"orderItem"}>
          <div className="orderItem__meta">
            <h2 className="title is-4 mb-0">
              {menuItem.title} <sup>x{orderItem.item_count}</sup>
            </h2>
          </div>
          <div className="orderItem__price">
            {getPrice(menuItem.price * orderItem.item_count)}
          </div>
        </div>
        <hr />
      </React.Fragment>
    );
  }
}

export default OrderItem;
