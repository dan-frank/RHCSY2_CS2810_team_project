import React, { Component } from "react";
import Orders from "../components/Orders";

class WaiterOrders extends Component {
  render() {
    return (
      <div className="section">
        <div className="container">
          <Orders editable={true} />
        </div>
      </div>
    );
  }
}

export default WaiterOrders;
