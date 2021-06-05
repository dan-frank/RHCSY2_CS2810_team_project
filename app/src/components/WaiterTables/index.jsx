import React, { Component } from "react";
import Order from "./order";
import { fetchOrders } from "../../helpers"

class Orders extends Component {
  state = {
    order: [],
  };

  async componentDidMount() {
    const order = await fetchOrders();
    this.setState({ order });
  }

  render() {
    const { order } = this.state;

    return (
      <div>
        {order.map((orders) => (
          <Order key={orders.id} order={orders} />
        ))}
      </div>
    );
  }
}


export default Orders;
