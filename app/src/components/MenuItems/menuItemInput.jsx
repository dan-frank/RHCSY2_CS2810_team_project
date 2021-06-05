import React, { Component, Fragment } from "react";
import API from "../../api";
import Response from "../Response";

class MenuItemInput extends Component {
  state = {
    responses: [],
    responseStatus: "",
    deleted: false,
  };

  componentDidMount() {
    const { deleted } = this.props.menuItem;
    this.setState({ deleted });
  }

  render() {
    const { addItem, menuItem, categories } = this.props;
    const { responses, responseStatus } = this.state;

    return (
      <Fragment>
        {!addItem && <hr />}

        <form onSubmit={addItem ? this.handleAdd : this.handleSubmit}>
          <div className="columns is-multiline">
            <div className="column is-half">
              <label className="label" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Menu item title"
                defaultValue={menuItem.title}
                className="input"
              />
            </div>
            <div className="column is-half">
              <label className="label" htmlFor="itemPrice">
                Price
              </label>
              <input
                type="number"
                name="itemPrice"
                id="itemPrice"
                placeholder="Menu item ​price"
                defaultValue={menuItem.price}
                className="input"
              />
            </div>
            <div className="column is-half">
              <label className="label" htmlFor="calories">
                Calories
              </label>
              <input
                type="number"
                name="calories"
                id="calories"
                placeholder="Menu item ​calories"
                defaultValue={menuItem.calories}
                className="input"
              />
            </div>
            <div className="column is-half">
              <label className="label" htmlFor="calories">
                Category
              </label>
              <div className="select is-fullwidth">
                <select name="categoryId" defaultValue={menuItem.category_id}>
                  {categories.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="column is-full">
              <label className="label" htmlFor="description">
                Description
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                placeholder="Menu item description"
                className="textarea"
                defaultValue={menuItem.description}
              />
            </div>
            <div className="column is-full pb-0">
              <input type="hidden" name="menuItemId" value={menuItem.id} />
              <div className="buttons">{this.getButtons()}</div>
            </div>
          </div>

          <Response responses={responses} responseStatus={responseStatus} />
        </form>
      </Fragment>
    );
  }

  /**
   * Get's appropriate buttons for menu item when deleted or not.
   *
   * @returns {component} Appropriate buttons for menu item control
   */
  getButtons = () => {
    const { addItem, menuItem } = this.props;
    const { deleted } = this.state;

    if (addItem) {
      return (
        <button type="submit" className="button is-primary">
          Add
        </button>
      );
    }

    return (
      <Fragment>
        <button type="submit" className="button is-info">
          Update
        </button>
        {deleted ? (
          <button
            type="button"
            className="button is-warning"
            onClick={() => {
              this.handleRestore(menuItem.id);
            }}
          >
            Restore
          </button>
        ) : (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              this.handleDelete(menuItem.id);
            }}
          >
            Delete
          </button>
        )}
      </Fragment>
    );
  };

  /**
   * Updates menu item with API.
   *
   * @param {object[]} e Event object from form
   */
  handleSubmit = async (e) => {
    e.preventDefault();

    const {
      menuItemId,
      title,
      itemPrice,
      calories,
      categoryId,
      description,
    } = e.target;

    await API.put(`/menu_items/${menuItemId.value}`, null, {
      params: {
        title: title.value,
        price: itemPrice.value,
        calories: calories.value,
        categoryId: categoryId.value,
        description: description.value,
      },
    })
      .then((response) => {
        const menuItem = response.data;

        this.setState({
          responses: [`Successfully updated menu item #${menuItem.id}`],
          responseStatus: "success",
        });
      })
      .catch((error) => {
        console.log(error);

        this.setState({
          responses: [`Failed to update menu item...`],
          responseStatus: "fail",
        });
      });
  };

  /**
   * Adds new menu item with API.
   *
   * @param {object[]} e Event object from form
   */
  handleAdd = async (e) => {
    e.preventDefault();

    const { title, itemPrice, calories, categoryId, description } = e.target;

    await API.post(`/menu_items/`, null, {
      params: {
        title: title.value,
        price: itemPrice.value,
        calories: calories.value,
        categoryId: categoryId.value,
        description: description.value,
      },
    })
      .then((response) => {
        const menuItem = response.data;

        this.setState({
          responses: [`Successfully added menu item #${menuItem.id}`],
          responseStatus: "success",
        });
      })
      .catch((error) => {
        console.log(error);

        this.setState({
          responses: [`Failed to add menu item...`],
          responseStatus: "fail",
        });
      });
  };

  /**
   * Deletes menu item with API.
   *
   * @param {object[]} e Event object from form
   */
  handleDelete = async (id) => {
    const deleteMenuItem = window.confirm(`Delete menu item #${id}?`);

    if (deleteMenuItem) {
      await API.delete(`/menu_items/${id}`)
        .then((response) => {
          const menuItem = response.data;
          console.log(menuItem);

          this.setState({
            responses: [`Successfully deleted menu item #${menuItem.id}`],
            responseStatus: "warning",
            deleted: true,
          });
        })
        .catch((error) => {
          console.log(error);

          this.setState({
            responses: [`Failed to delete menu item...`],
            responseStatus: "fail",
            deleted: false,
          });
        });
    } else {
      this.setState({
        responses: [`Did not delete menu item #${id}`],
        responseStatus: "info",
      });
    }
  };

  /**
   * Restores menu item with API.
   *
   * @param {object[]} e Event object from form
   */
  handleRestore = async (id) => {
    await API.put(`/menu_items/${id}`, null, {
      params: {
        deleted: false,
      },
    })
      .then((response) => {
        const menuItem = response.data;

        this.setState({
          responses: [`Successfully updated menu item #${menuItem.id}`],
          responseStatus: "success",
          deleted: false,
        });
      })
      .catch((error) => {
        console.log(error);

        this.setState({
          responses: [`Failed to update menu item...`],
          responseStatus: "fail",
        });
      });
  };
}

export default MenuItemInput;
