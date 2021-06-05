import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3000");

/**
 * Listens for "updatedOrderStatusPrepared" emit from API and catches data.
 */
let updatedOrderStatusPreparedFlag = false;
function updatedOrderStatusPrepared(cb) {
  if (!updatedOrderStatusPreparedFlag) {
    socket.on("updatedOrderStatusPrepared", (orderId) => cb(null, orderId));
    updatedOrderStatusPreparedFlag = true;
  }
}

/**
 * Listens for "updatedOrderStatus" emit from API and catches data.
 */
let updatedOrderStatusFlag = false;
function updatedOrderStatus(cb) {
  if (!updatedOrderStatusFlag) {
    socket.on("updatedOrderStatus", (orderStatusId) => cb(null, orderStatusId));
    updatedOrderStatusFlag = true;
  }
}

/**
 * Listens for "addedOrder" emit from API and catches data.
 */
let addedOrderFlag = false;
function addedOrder(cb) {
  if (!addedOrderFlag) {
    socket.on("addedOrder", (order) => cb(null, order));
    addedOrderFlag = true;
  }
}

/**
 * Listens for "toggleAvailability" emit from API and catches data.
 */
let toggleAvailabilityFlag = false;
function toggleAvailability(cb) {
  if (!toggleAvailabilityFlag) {
    socket.on("toggleAvailability", (menuItem) => cb(null, menuItem));
    toggleAvailabilityFlag = true;
  }
}

/**
 * Listens for "callWaiterCalled" emit from API and catches data.
 */
let callWaiterFlag = false;
function callWaiterCalled(cb) {
  if (!callWaiterFlag) {
    socket.on("callWaiterCalled", (orderId) => cb(null, orderId));
    callWaiterFlag = true;
  }
}

export {
  updatedOrderStatusPrepared,
  updatedOrderStatus,
  addedOrder,
  toggleAvailability,
  callWaiterCalled,
};
