import React, { Component } from "react";
import { fetchAllWaiters } from "../helpers";
import Waiter from "../components/Waiter";

class ManagerWaiter extends Component {
  state = {
    waiters: [],
  };

  async componentDidMount() {
    const waiters = await fetchAllWaiters();
    this.setState({ waiters });
  }

  render() {
    const { waiters } = this.state;

    return (
      <section className="section">
        <div className="container">
          <h1 className="title is-2">Manager Area</h1>
          <h2 className="title is-3">View Waiter Data</h2>
          <div className="columns is-multiline">
            {waiters.map((waiter) => {
              return <Waiter key={waiter.id} waiter={waiter} />;
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default ManagerWaiter;
