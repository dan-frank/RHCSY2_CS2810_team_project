import React, { Component } from "react";

class CategoryButton extends Component {
  render() {
    const { button, onClick } = this.props;
    return (
      <React.Fragment>
        <button
          className={"button button--" + button.slug}
          onClick={() => {
            onClick(button.name);
          }}
        >
          Filter {button.name}
        </button>
      </React.Fragment>
    );
  }
}

export default CategoryButton;
