import API from "./api";

/**
 * Converts pennies to human readable currency.
 * Currently only supports GBP.
 *
 * @param {number} price Price in pennies
 * @returns {string} Human readable price
 */
export function getPrice(price) {
  price = price / 100;
  return (
    "£" +
    (Number(price) || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  );
}

/**
 * Fetches all allergies from the API.
 *
 * @returns {array[]} List of allergy objects
 */
export async function fetchAllergyByMenuItemId(id = -1) {
  return await API.get(`/allergies/${id}`)
    .then((response) => {
      const allergies = response.data;
      return allergies;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

/**
 * Fetches all categories from the API.
 *
 * @returns {array[]} List of category objects
 */
export async function fetchAllCategories() {
  return await API.get("/categories/")
    .then((response) => {
      const categories = response.data;
      return categories;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

/**
 * Fetches all menu items from the API.
 *
 * @param {boolean} showDeleted True to view deleted menu items
 * @returns {array[]} List of menu item objects
 */
export async function fetchAllMenuItems(showDeleted = false) {
  return await API.get("/menu_items/", {
    params: { deleted: showDeleted },
  })
    .then((response) => {
      const menuItems = response.data;
      return menuItems;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

/**
 * Fetches menu item from the API.
 *
 * @param {number} id Menu item ID to fetch
 * @returns {object[]} Menu item object
 */
export async function fetchMenuItem(id = -1) {
  return await API.get(`/menu_items/${id}`)
    .then((response) => {
      const menuItem = response.data;
      return menuItem;
    })
    .catch((error) => {
      console.log(error);
      return {
        id: 0,
        title: "",
        category_name: "",
        category_slug: "",
        description: "",
        price: "",
        calories: "",
      };
    });
}

/**
 * Fetches all ordered items that match order id from the API.
 *
 * @param {number} id Order ID to find related ordered items
 * @returns {object[]} Menu item object
 */
export async function fetchAllOrderedItems(id = -1) {
  return await API.get(`/ordered_items/${id}`)
    .then((response) => {
      const orderedItems = response.data;
      return orderedItems;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

/**
 * Fetches order payment information from API.
 *
 * @param {number} id Order to find related payment
 * @returns {boolean} True if payment succeeded
 */
export async function fetchLatestOrderPayment(id = -1) {
  return await API.get(`/order_payments/order/${id}`)
    .then((response) => {
      const orderPayment = response.data;
      if (orderPayment.payment_intent_status === "succeeded") return true;
      else return false;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

/**
 * Fetches all orders from the API.
 *
 * @param {number} orderStatus Order status ID to filter returned orders
 * @returns {array[]} List of order objects
 */
export async function fetchAllOrders(orderStatus) {
  return await API.get("/orders/", {
    params: { orderStatus },
  })
    .then((response) => {
      const orders = response.data;
      return orders;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

/**
 * Fetches order from the API.
 *
 * @param {number} id Order to find
 * @returns {object[]} Order object
 */
export async function fetchOrder(id = -1) {
  return await API.get(`/orders/${id}`)
    .then((response) => {
      const order = response.data;
      return order;
    })
    .catch((error) => {
      console.log(error);
      return {};
    });
}

/**
 * Makes a request to the API to update an orders status.
 *
 * @param {number} orderId Order ID to update with
 * @param {number} orderStatus Order status to on update order ID
 * @returns {object[]} Object containing order ID and status
 */
export async function updateOrderStatus(orderId, orderStatus) {
  return await API.put("/orders/order_status/", null, {
    params: { orderId, orderStatus },
  })
    .then((response) => {
      return {
        orderId: response.data.orderId,
        status: response.status,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        status: 404,
      };
    });
}

/**
 * Fetches all order statuses from the API and updates state.
 *
 * @returns {array[]} List of order status objects
 */
export async function fetchAllOrderStatus() {
  return await API.get("/order_status/")
    .then((response) => {
      const allOrderStatus = response.data;
      return allOrderStatus;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

/**
 * Fetches all order from the API and updates state.
 *
 * @returns {array[]} List of order objects
 */
export async function fetchOrders() {
  return await API.get(`/orders/`)
    .then((response) => {
      const orders = response.data;
      return orders;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};

/**
 * Fetches all waiters and their sales numbers from the API.
 *
 * @returns {array[]} List of waiter objects
 */
export async function fetchAllWaiters() {
  return await API.get("/waiters/")
    .then((response) => {
      const waiters = response.data;
      return waiters;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};
