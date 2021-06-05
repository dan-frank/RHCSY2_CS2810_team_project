import React, { Component, Fragment } from "react";
import MenuItem from "./menuItem";
import moment from "moment";
import { fetchAllOrderedItems } from "../../helpers";

class Order extends Component {
  state = {
    orderedItems: [],
    editedOrderStatus: -1,
    responses: [],
    responseStatus: "",
  };

  async componentDidMount() {
    const orderedItems = await fetchAllOrderedItems(this.props.order.id);
    this.setState({ orderedItems });
  }

  render() {
    const {
      order,
      onCompleteOrder,
      orderStatus,
      allOrderStatus,
      editable,
    } = this.props;
    const { orderedItems, editedOrderStatus } = this.state;

    return (
      <div className="content">
        <h2 className="title is-4 mb-4">
          &nbsp;Order #{order.id}{" "}
          <small>{"<" + moment(order.ordered_at).fromNow() + ">"}</small>
        </h2>

        <ul className="mt-0">
          {orderedItems.map((orderedItem) => {
            return (
              <li key={orderedItem.id}>
                <MenuItem orderedItem={orderedItem} />
              </li>
            );
          })}
        </ul>
        <p className="has-text-weight-bold mb-2">Order Comments</p>
        <p>{'"' + order.comment + '"'}</p>

        {!!orderStatus && (
          <button
            className="button is-primary"
            onClick={() => onCompleteOrder(order.id)}
          >
            {this.getButtonText(orderStatus)}
          </button>
        )}

        {!!editable && (
          <Fragment>
            {allOrderStatus.length > 0 && (
              <div className="select mr-2">
                <select onChange={this.handleOrderStatusEditChange}>
                  <option value="-1">Edit Order Status</option>
                  {allOrderStatus.map((status) => {
                    return (
                      <option key={status.id} value={status.id}>
                        {"- " + status.status}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
            <button
              className="button is-warning"
              onClick={() => this.handleEditOrder(order.id, editedOrderStatus)}
            >
              Edit
            </button>
          </Fragment>
        )}
        <hr />
      </div>
    );
  }

  /**
   * Get's appropriate button text.
   *
   * @param {number} orderStatus Status ID of current order
   * @returns {string} Button text
   */
  getButtonText = (orderStatus) => {
    let respone = "";
    switch (orderStatus) {
      case 1:
        respone = "Cooked Order";
        break;
      case 2:
        respone = "Delivered Order";
        break;
      default:
        break;
    }
    return respone;
  };

  /**
   * Updates editedOrderStatus state value when form field changes.
   *
   * @param {Object[]} e Event object from form
   * @returns {void}
   */
  handleOrderStatusEditChange = (e) => {
    const { value } = e.target;
    const editedOrderStatus = value;
    this.setState({ editedOrderStatus });
  };

  /**
   * Checks orderStatus has been set before completing order.
   *
   * @param {*} id Current order's ID
   * @param {*} editedOrderStatus Order status to change to.
   * @returns {void}
   */
  handleEditOrder = (id, editedOrderStatus = -1) => {
    const { onCompleteOrder } = this.props;
    if (editedOrderStatus === -1) {
      alert("Select a status before trying to edit!");
      return;
    }
    onCompleteOrder(id, editedOrderStatus);
  };
}
export default Order;
