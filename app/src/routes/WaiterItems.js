import React, { Component } from "react";
import WaiterMenuItems from "../components/WaiterMenuItems";

class WaiterItems extends Component {
  render() {
    return (
      <div className="section">
        <div className="container">
          <WaiterMenuItems />
        </div>
      </div>
    );
  }
}

export default WaiterItems;
