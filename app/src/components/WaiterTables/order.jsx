import React, { Component } from "react";
import MenuItem from "./menuItem";
import API from "../../api";
import { fetchAllWaiters } from "../../helpers";
import { fetchAllOrderedItems } from "../../helpers";
import { fetchOrder } from "../../helpers"

class Order extends Component {
  state = {
    orderedItems: [],
    waitersList: [],
    waiter: "--",
    tWaiter: "--",
    waiterName: "--",
    curWaiter: "--",
    responese: "",
    responseStatus: "",
  };

  /**
   * Set state whenever the user change the value of the dropdown menu.
   * 
   * @param {Object{}} e Event object from form.
   */
  handleChange = (e) => {
    const { value } = e.target;
    const tWaiter = value;
    this.setState({ tWaiter });
  };

  /**
   * Fetch waiters name from db and set it as state according to the waiter id.
   * 
   * @param {number} id Temporal id of the selected waiter.
   */
  changeIdToName = async (id) => {
    await API.get(`/waiters/${id}`)
      .then((response) => {
        const waiterName = response.data;
        this.setState({ waiterName: waiterName.name });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Change the value of waiter_id in the orders table in db, when the waiter is assigned.
   * 
   * @param {number} tWaiter Temporal id of the selected waiter.
   * @returns {boolean} return false when the assigned waiter is null.
   */
  handleSubmit = async (tWaiter) => {
    if (tWaiter == "--") {
      return false;
    }
    const { order } = this.props;

    this.changeIdToName(tWaiter);
    this.setState({ waiter: this.state.tWaiter });

    await API.put(`/orders/waiters`, null, {
      params: { orderId: order.id, waiterId: tWaiter },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    window.location.reload();
  };

  async componentDidMount() {
    const { order } = this.props;
    const orderedItems = await fetchAllOrderedItems(order.id);
    this.setState({ orderedItems });
    const waitersList = await fetchAllWaiters();
    this.setState({ waitersList });
    const ord = await fetchOrder(order.id);
    const waiterId = ord.waiter_id;
    this.setState({ curWaiter: waiterId })
  }

  /**
   * convert waiter_id into waiter's name. returns "nobody" when the id is null.
   * 
   * @param {number} value Id of the waiter to get the name.
   * @returns {string} name of the waiter.
   */
  assignedOrNot(value) {
    if (value == null) {
      return "nobody";
    } else {
      const waiters = this.state.waitersList;
      var real = value - 1;
      const waiter = waiters[real];

      if (waiter !== undefined) {
        return waiter.name;
      }
    }
  }

  render() {
    const { order } = this.props;
    const { orderedItems, tWaiter, waitersList } = this.state;

    return (
      <React.Fragment>
        <div className="content">
          <h2 className="title is-4 mb-4">Table: {order.table_number} - currently assigned to {this.assignedOrNot(this.state.curWaiter)}</h2>
          
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
          <label>
            Assign this table to:
            <br />
            <div className="select mr-2">
              <select value={this.state.tWaiter} onChange={this.handleChange}>
                <option key="-1" value="--">
                  --
                </option>
                {waitersList.map((waiterList) => {
                  return (
                    <option key={waiterList.id} value={waiterList.id}>
                      {waiterList.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </label>
          <button
            className="button is-primary"
            onClick={() => this.handleSubmit(tWaiter)}
          >
            Assign
          </button>
          <hr />
        </div>
      </React.Fragment>
    );
  }
}
export default Order;
