import React, { Component } from "react";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="section">
        <div className="container">
          <h1 className="title is-1 has-text-centered">Error 404</h1>
          <p className="title is-4 has-text-centered">
            Page not found, please return to home
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
