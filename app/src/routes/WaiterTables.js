import React, { Component } from "react";
import Orders from "../components/WaiterTables";

class WaiterTables extends Component {
  render() {
    return (
      <div className="section">
        <div className="container">
          <Orders />
        </div>
      </div>
    );
  }
}

export default WaiterTables;
