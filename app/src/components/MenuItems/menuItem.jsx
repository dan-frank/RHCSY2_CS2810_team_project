import React, { Component } from "react";
import { getPrice, fetchAllergyByMenuItemId } from "../../helpers";

class MenuItem extends Component {
  state = {
    allergies: [],
  };

  async componentDidMount() {
    const { menuItem } = this.props;
    const allergies = await fetchAllergyByMenuItemId(menuItem.id);
    this.setState({ allergies });
  }

  render() {
    const { onAddMenuItemToCart, menuItem } = this.props;
    const { allergies } = this.state;

    return (
      <React.Fragment>
        <div
          className={
            "menuItem menuItem--" +
            menuItem.category_slug +
            (menuItem.disabling ? " menuItem--disabled" : "") +
            " my-2 mx-2"
          }
        >
          <div className="menuItem__image">
            <div className="image is-4by3">
              <img src={`./images/${menuItem.title}.jpg`} alt="" />
            </div>
          </div>
          <div className="menuItem__content">
            <h2 className="title is-3 mb-2">
              #{menuItem.id} {menuItem.title}
            </h2>
            <p className="my-2">{menuItem.description}</p>
            <p className="has-text-weight-semibold mt-2">
              {menuItem.calories} kcal
            </p>
            {allergies.length > 0 && (
              <p className="has-text-weight-light allergies">
                Contains:&nbsp;
                {allergies.map((allergy) => {
                  return (
                    <span className="allergy" key={allergy.id}>
                      {allergy.name}
                    </span>
                  );
                })}
              </p>
            )}
          </div>
          <div className="menuItem__button">
            <p>{getPrice(menuItem.price)}</p>
            <button
              className={"button button--" + menuItem.category_slug + " mt-4"}
              onClick={() => onAddMenuItemToCart(menuItem.id)}
              disabled={menuItem.disabling}
            >
              Add To Cart
            </button>
          </div>
        </div>
        <hr />
      </React.Fragment>
    );
  }
}

export default MenuItem;
