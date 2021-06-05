import React, { Component } from "react";

class TotalPrice extends Component {
  render() {
    const { total } = this.props;
    return (
      <React.Fragment>
        <div className={"total"}>
          <div className="total__price">
            <p className="title is-4 mb-0">Total: {total.final_price / 100}</p>
          </div>
        </div>
        <hr />
      </React.Fragment>
    );
  }
}

export default TotalPrice;
