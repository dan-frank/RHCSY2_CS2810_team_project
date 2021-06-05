import React, { Component } from "react";
import {
  fetchAllOrderedItems,
  fetchOrder,
  fetchLatestOrderPayment,
} from "../helpers";
import OrderItem from "../components/OrderConfirm/orderItem";
import Meta from "../components/OrderConfirm/meta";
import Status from "../components/OrderConfirm/status";
import TotalPrice from "../components/OrderConfirm/total";
import Popup from "reactjs-popup";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../components/PaymentForm";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

class OrderItems extends Component {
  state = {
    orderItems: [],
    order: {},
    orderPayed: false,
  };

  async componentDidMount() {
    const orderItems = await fetchAllOrderedItems(this.props.match.params.id);
    const order = await fetchOrder(this.props.match.params.id);
    const orderPayed = await fetchLatestOrderPayment(
      this.props.match.params.id
    );
    this.setState({ orderItems, order, orderPayed });
  }

  render() {
    const { orderItems, order, orderPayed } = this.state;
    const id = this.props.match.params.id;

    return (
      <div className="section">
        <div className="container">
          <Meta order={order} />
          <Status order={order} orderStatusId={order.order_status_id} />

          {orderItems.map((orderItem) => (
            <OrderItem key={orderItem.id} orderItem={orderItem} />
          ))}
          <TotalPrice total={order} />

          {!orderPayed && (
            <div className="has-text-centered">
              <Popup
                trigger={
                  <button className="button is-primary">Checkout Now</button>
                }
                modal
              >
                <Elements stripe={stripePromise}>
                  <ElementsConsumer>
                    {({ stripe, elements }) => (
                      <PaymentForm
                        stripe={stripe}
                        elements={elements}
                        orderId={id}
                        price={order.final_price}
                        onOrderPayed={this.handleOrderPayed}
                      />
                    )}
                  </ElementsConsumer>
                </Elements>
              </Popup>
            </div>
          )}
        </div>
      </div>
    );
  }

  /**
   * Updates orderPayed in state after 3 second delay.
   *
   * @param {boolean} orderPayed true if order has been paid
   */
  handleOrderPayed = (orderPayed) => {
    setTimeout(() => {
      this.setState({ orderPayed });
    }, 3000);
  };
}

export default OrderItems;
