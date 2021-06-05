import React, { Component } from "react";
import Orders from "../components/Orders";

class Kitchen extends Component {
  render() {
    const orderOrdered = 1;

    return (
      <div className="section">
        <div className="container">
          <Orders orderStatus={orderOrdered} />
        </div>
      </div>
    );
  }
}

export default Kitchen;
