import React, { Component } from "react";
import Order from "./order";
import { updateOrderStatus } from "../../helpers";
import { addedOrder } from "../../socketIo";
import Response from "../Response";
import { fetchAllOrders, fetchAllOrderStatus } from "../../helpers";

class Orders extends Component {
  state = {
    orderedItems: [],
    orders: [],
    allOrderStatus: [],
    responses: [],
    responseStatus: "",
  };

  async componentDidMount() {
    const orders = await fetchAllOrders(this.props.orderStatus);
    const allOrderStatus = await fetchAllOrderStatus();
    this.setState({ orders, allOrderStatus });
  }

  componentDidUpdate() {
    /**
     * Adds passed order to list of orders.
     * Recieves order from socket.io handler whenever emitted from API.
     *
     * @param {Object[]} err Errors object
     * @param {Object[]} order Order object
     * @returns {void}
     */
    addedOrder((err, order) => {
      const { orderStatus } = this.props;
      if (order.order_status_id === orderStatus) {
        let orders = [...this.state.orders];
        orders.push(order);
        setTimeout(
          function () {
            this.setState({ orders });
          }.bind(this),
          1000
        );
      }
    });
  }

  render() {
    const { orders, allOrderStatus, responses, responseStatus } = this.state;
    const { orderStatus, editable } = this.props;

    return (
      <div>
        {orders.map((order) => {
          return (
            <Order
              key={order.id}
              order={order}
              onCompleteOrder={this.handleCompletedOrder}
              orderStatus={orderStatus}
              allOrderStatus={allOrderStatus}
              editable={editable}
              responses={responses}
              responseStatus={responseStatus}
            />
          );
        })}
        <Response responses={responses} responseStatus={responseStatus} />
      </div>
    );
  }

  /**
   * Updates an orders status.
   * Increments order status by one or by passed number in editedOrderStatus.
   *
   * @param {number} id orderId to manipulate
   * @param {number} editedOrderStatus orderStatus to update
   * @returns {void}
   */
  handleCompletedOrder = async (id, editedOrderStatus = -1) => {
    let orderStatus = this.props.orderStatus + 1;
    if (editedOrderStatus !== -1) orderStatus = editedOrderStatus;
    const orderStatusResponse = await updateOrderStatus(id, orderStatus);
    if (orderStatusResponse.status === 200) {
      let responses = [...this.state.responses];
      responses.push("Successfully updated order status.");
      this.setState({
        responses,
        responseStatus: "success",
      });
    }

    if (editedOrderStatus === -1) {
      let orders = [...this.state.orders];
      orders = orders.filter((c) => c.id !== id);
      this.setState({ orders });
    }
  };
}

export default Orders;
