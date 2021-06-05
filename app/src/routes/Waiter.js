import React, { Component } from "react";
import Orders from "../components/Orders";
import Alerts from "../components/Alerts";
import { updatedOrderStatusPrepared, callWaiterCalled } from "../socketIo";

class Waiter extends Component {
  state = {
    updatedOrders: [],
    callWaiter: [],
  };

  componentDidMount() {
    /**
     * Adds passed order id list of order confirmations.
     * Recieves from socket.io handler whenever emitted from API.
     *
     * @param {Object[]} err Errors object
     * @param {number} orderId Order ID
     * @returns {void}
     */
    updatedOrderStatusPrepared((err, orderId) => {
      let updatedOrders = [...this.state.updatedOrders];
      updatedOrders.unshift(`Order #${orderId} has been prepared!`);
      this.setState({ updatedOrders });
    });

    /**
     * Store message to array when emmited from API.
     * Recieves from socket.io handler whenever emitted from API.
     *
     * @param {Object[]} err Errors object
     * @returns {void}
     */
    callWaiterCalled((err) => {
      let callWaiter = [...this.state.callWaiter];
      callWaiter.unshift("Waiter has been called!");
      this.setState({ callWaiter });
    });
  }

  render() {
    const { callWaiter, updatedOrders } = this.state;
    const orderPrepared = 2;

    return (
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-8">
              <h2 className="title is-3">Orders</h2>
              <Orders orderStatus={orderPrepared} />
            </div>
            <div className="column is-2">
              <h2 className="title is-3">Orders Feed</h2>
              <Alerts
                alerts={updatedOrders}
                onDelete={this.handleDeleteUpdatedOrder}
              />
            </div>
            <div className="column is-2">
              <h2 className="title is-3">Waiters Feed</h2>
              <Alerts
                alerts={callWaiter}
                onDelete={this.handleDeletecallWaiter}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Removes alert from alerts array in state.
   *
   * @param {number} index Position in array of alert
   */
  handleDeleteUpdatedOrder = (index) => {
    let updatedOrders = [...this.state.updatedOrders];
    updatedOrders.splice(index, 1);
    this.setState({ updatedOrders });
  };

  /**
   * Removes alert from alerts array in state.
   *
   * @param {number} index Position in array of alert
   */
  handleDeletecallWaiter = (index) => {
    let callWaiter = [...this.state.callWaiter];
    callWaiter.splice(index, 1);
    this.setState({ callWaiter });
  };
}

export default Waiter;
