import React, { Component, Fragment } from "react";
import API from "../../api";

class CallWaiter extends Component {
  state = {
    count: 0,
  };

  render() {
    return (
      <Fragment>
        <div className="buttons">
          <button
            className={"button is-info"}
            onClick={() => {
              this.handleCallWaiter();
            }}
          >
            Call Waiter
          </button>
        </div>

        <p className="mb-2">{this.handleCountMessage()}</p>
      </Fragment>
    );
  }

  /**
   * Returns different message if waiter has been called or hasn't.
   *
   * @returns {string} Call waiter message
   */
  handleCountMessage = () => {
    const { count } = this.state;
    return count === 0
      ? "Customer not called"
      : "Customer has called for a waiter";
  };

  /**
   * Calls for waiter.
   * Makes request to API to emit socket.io
   */
  handleCallWaiter = async () => {
    alert("A waiter will be with you shortly");
    let count = this.state.count;
    count += 1;
    this.setState({ count });

    await API.get(`/callWaiter`).catch((error) => {
      console.log(error);
    });
  };
}

export default CallWaiter;
