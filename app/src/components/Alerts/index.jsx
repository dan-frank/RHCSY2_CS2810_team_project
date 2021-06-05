import React, { Component, Fragment } from "react";
import Alert from "./Alert";

class Alerts extends Component {
  render() {
    const { alerts, onDelete } = this.props;

    return (
      <Fragment>
        {alerts.map((alert, index) => {
          return (
            <Alert
              key={index}
              index={index}
              alert={alert}
              onDelete={onDelete}
            />
          );
        })}
      </Fragment>
    );
  }
}

export default Alerts;
