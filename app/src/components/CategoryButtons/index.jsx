import React, { Component } from "react";
import CategoryButton from "./categoryButton";
import { fetchAllCategories } from "../../helpers";

class CategoryButtons extends Component {
  state = {
    buttons: [],
  };

  async componentDidMount() {
    let categories = await fetchAllCategories();
    categories.push({ id: 0, name: "Reset", slug: "reset" });
    this.setState({ buttons: categories });
  }

  render() {
    let { buttons } = this.state;

    return (
      <div className="buttons">
        {buttons.map((button) => (
          <CategoryButton
            key={button.id}
            button={button}
            onClick={this.props.handleCategoryButtonClick}
          />
        ))}
      </div>
    );
  }
}

export default CategoryButtons;
