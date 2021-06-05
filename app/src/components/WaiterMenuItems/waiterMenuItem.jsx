import React, { Component } from "react";
import { getPrice } from "../../helpers";
import API from "../../api";

class WaiterMenuItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textColor: "black",
      backgroundColor: "cyan",
      toggleOn: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { menuItem } = this.props;
    this.setState({ toggleOn: menuItem.disabling });
  }

  /**
   * Changes the state of toggleOn when handleClick function is called
   *
   * @param {*} id ID of menu item
   */
  handleClick = async (id) => {
    this.setState((state) => ({
      toggleOn: !state.toggleOn,
    }));
    await API.put(`/menu_items/disable/${id}`, null, {
      params: { disable: this.state.toggleOn },
    }).catch((error) => {
      console.log(error);
      return {
        status: 404,
      };
    });
  };

  render() {
    const { menuItem } = this.props;
    const { toggleOn } = this.state;

    return (
      <React.Fragment>
        <div className={"menuItem menuItem--" + " my-2 mx-2"}>
          <div className="menuItem__meta">
            <h2 className="title is-4 mb-0">
              #{menuItem.id} {menuItem.title}
            </h2>
            <p className="ml-2 mb-0">{menuItem.calories} kcal</p>
            <p className="menuItem__meta__description mt-4 pr-3">
              {menuItem.description}
            </p>
          </div>
          <div className="menuItem__purchase">
            <p>{getPrice(menuItem.price)}</p>
          </div>
          <button
            className="button is-primary"
            onClick={() => {
              this.handleClick(menuItem.id);
            }}
            style={{
              backgroundColor: toggleOn ? "red" : "cyan",
              color: "black",
              margin: 4,
            }}
          >
            Set {this.state.toggleOn ? "Unavailable" : "Available"}
          </button>
        </div>
        <hr />
      </React.Fragment>
    );
  }
}

export default WaiterMenuItem;
