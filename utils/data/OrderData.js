import { clientCredentials } from '../client';

// Error handling:
const handleResponse = (response) => {
  if (!response.ok) {
    throw new Error('Network Response Error');
  }
  return response.json();
};

const handleError = (error) => {
  console.error('API Error:', error);
  throw error;
};

// API calls:
const getOrders = () => fetch(`${clientCredentials.databaseURL}/orders`)
  .then(handleResponse)
  .catch(handleError);

const getSingleOrder = (id) => fetch(`${clientCredentials.databaseURL}/orders/${id}`)
  .then(handleResponse)
  .catch(handleError);

const createOrder = async (order, userId) => {
  const payload = {
    ...order,
    user: userId,
  };
  try {
    const response = await fetch(`${clientCredentials.databaseURL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const updateOrder = async (payload, uid) => {
  const updatedPayload = {
    ...payload,
    user: payload.user || uid,
  };
  try {
    const response = await fetch(`${clientCredentials.databaseURL}/orders/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${uid}`,
      },
      body: JSON.stringify(updatedPayload),
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const deleteOrder = (id) => fetch(`${clientCredentials.databaseURL}/orders/${id}`, {
  method: 'DELETE',
})
  .then(() => {})
  .catch(handleError);

// Functions to add to and remove items from an order:
const addOrderItem = (orderId, itemId) => fetch(`${clientCredentials.databaseURL}/orders/${orderId}/add_order_item/${itemId}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then(handleResponse)
  .catch(handleError);

const removeOrderItem = (orderId, orderItemId) => fetch(`${clientCredentials.databaseURL}/orders/${orderId}/remove_order_item/${orderItemId}`, {
  method: 'DELETE',
})
  .then(() => {})
  .catch(handleError);

export {
  getOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  addOrderItem,
  removeOrderItem,
};
