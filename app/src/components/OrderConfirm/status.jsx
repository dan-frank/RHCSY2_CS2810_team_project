import React, { Component, Fragment } from "react";
import { updatedOrderStatus } from "../../socketIo";
class Status extends Component {
  state = {
    orderStatusId: -1,
  };

  componentDidMount() {
    const { orderStatusId } = this.props;
    this.setState({ orderStatusId });
  }
  componentDidUpdate() {
    /**
     * Sets passed order status id to state.
     * Recieves from socket.io handler whenever emitted from API.
     *
     * @param {Object[]} err Errors object
     * @param {number} orderStatusId Order Status ID
     * @returns {void}
     */
    updatedOrderStatus((err, orderStatusId) => {
      setTimeout(
        function () {
          this.setState({ orderStatusId });
        }.bind(this),
        1000
      );
    });
  }

  statusSwitch = (orderStatus) => {
    switch (orderStatus) {
      case 1:
        return "Your order is being prepared!";
      case 2:
        return "Your order has been prepared will be arriving shortly...";
      case 3:
        return "Your order has been delivered!";
      case 4:
        return "Your order has been cancelled.";
      default:
        return "Contacting staff about order status...";
    }
  };
  render() {
    const { orderStatusId } = this.state;

    return (
      <Fragment>
        <div className="order_meta">
          <div className="order_status__title">
            <h2 className="title is-3 mb-2">Your Order Status:</h2>
            <p>{this.statusSwitch(orderStatusId)}</p>
          </div>
        </div>
        <hr />
      </Fragment>
    );
  }
}

export default Status;
