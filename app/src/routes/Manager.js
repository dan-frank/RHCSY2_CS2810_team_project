import React, { Component } from "react";
import CategoryButtons from "../components/CategoryButtons";
import MenuItems from "../components/MenuItems";
import MenuItemInput from "../components/MenuItems/menuItemInput";
import Popup from "reactjs-popup";
import { fetchAllCategories } from "../helpers";

class Manager extends Component {
  state = {
    category: "",
    categories: [],
  };

  async componentDidMount() {
    let categories = await fetchAllCategories();
    this.setState({ categories });
  }

  render() {
    const { category, categories } = this.state;

    return (
      <section className="section">
        <div className="container">
          <h1 className="title is-2">Manager Area</h1>
          <h2 className="title is-3 mb-2">Create Menu Items</h2>
          <Popup
            trigger={
              <button className="button is-primary">Add Menu Item</button>
            }
            modal
          >
            <div>
              <MenuItemInput
                addItem={true}
                menuItem={{}}
                categories={categories}
              />
            </div>
          </Popup>

          <hr />

          <h2 className="title is-3 mb-2">Edit Menu Items</h2>
          <CategoryButtons
            handleCategoryButtonClick={this.handleCategoryButtonClick}
          />
          <MenuItems category={category} editMode={!0} showDeleted={true} />
        </div>
      </section>
    );
  }

  /**
   * Updates category state.
   * This state is used to filter categories.
   *
   * @param {string} category String of category to filter by
   */
  handleCategoryButtonClick = (category) => {
    this.setState({ category });
  };
}

export default Manager;
