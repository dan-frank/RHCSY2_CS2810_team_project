import React, { Component } from "react";

class Waiter extends Component {
  render() {
    const { waiter } = this.props;

    return (
      <div className="column is-4">
        <div className="box content">
          <h2 className="title is-4">
            #{waiter.id}&nbsp;{waiter.name}&nbsp;
            <small>
              &#60;
              <a href={"mailto:" + waiter.email}>{waiter.email}</a>
              &#62;
            </small>
          </h2>
          <ul>
            <li>{waiter.age} years old</li>
            <li>Lives at {waiter.address}</li>
            <li>
              Has made <b>{waiter.sales} total sales!</b>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Waiter;
