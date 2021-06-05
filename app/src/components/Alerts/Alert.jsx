import React, { Component } from "react";

class Alert extends Component {
  render() {
    const { index, alert, onDelete } = this.props;

    return (
      <div className="notification is-primary">
        <button className="delete" onClick={() => onDelete(index)}></button>
        <p>{alert}</p>
      </div>
    );
  }
}

export default Alert;
