import React, { Component } from "react";

class Response extends Component {
  render() {
    const { responses, responseStatus } = this.props;
    return (
      <div
        className={
          "response" + (responseStatus ? " response--" + responseStatus : "")
        }
      >
        <ul className="response__list">
          {responses.map((response, index) => (
            <li key={index} className="response__item">
              {response}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Response;
