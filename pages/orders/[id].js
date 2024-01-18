/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Alert } from 'react-bootstrap';
import ItemSelectionModal from '../../components/ItemModal';
import { getSingleOrder, removeOrderItem, updateOrder } from '../../utils/data/OrderData';

function OrderDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const getOrderDetails = () => {
    if (id) {
      getSingleOrder(id)
        .then((data) => setOrder(data))
        .catch((error) => {
          console.error('Error fetching order details:', error);
          // Handle error as needed
        });
    }
  };

  const removeItem = (itemId) => {
    // Check if the order is closed
    if (!order.open) {
      setErrorMessage('Cannot remove an item from a closed order.');
      return;
    }
    removeOrderItem(order.id, itemId).then(() => {
      setErrorMessage(null); // Reset error message
      getOrderDetails();
    });
  };

  const calculateOrderTotal = () => {
    if (order && order.items && order.items.length > 0) {
      const total = order.items.reduce((acc, item) => acc + parseFloat(item.price), 0);
      return total.toFixed(2);
    }
    return '0.00';
  };

  const handleAddItem = () => {
    // Show the modal when the "Add Item" button is clicked
    setShowModal(true);
  };

  const handleCloseOrder = () => {
    updateOrder({ ...order, open: false }).then(() => {
      // Navigate to the payment route first
      router.push(`/orders/${order.id}/payment`);
      // Fetch order details after the order is updated
      getOrderDetails();
    });
  };

  useEffect(() => {
    if (id) {
      getOrderDetails();
    }
  }, [id]);

  return (
    <article className="order-details">
      {order && (
        <>
          <div>
            {/* Render error message as an alert */}
            {errorMessage && (
            <Alert variant="danger" className="text-center">
              {errorMessage}
            </Alert>
            )}
            <h2><b>Order #: {order.id}</b></h2>
            <h2><b>Order Name: {order.name}</b></h2>
            <h2><b>Total: ${calculateOrderTotal()}</b></h2>
          </div>
          <div>
            {order.items && order.items.map((item) => (
              <Card key={item.id} style={{ width: '18rem', marginBottom: '10px' }}>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    <span><b>Price:</b> ${parseFloat(item.price).toFixed(2)}</span>
                  </Card.Text>
                  <Button variant="danger" onClick={() => removeItem(item.id)}>
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
          <div>
            <Button variant="primary" onClick={handleAddItem}>
              Add Item
            </Button>
            <Button variant="success" onClick={handleCloseOrder}>
              Go To Payment
            </Button>
          </div>
          {/* Render the modal if showModal is true */}
          {showModal && (
            <ItemSelectionModal
              show={showModal}
              onHide={() => setShowModal(false)}
              orderId={order.id}
              onItemAdded={getOrderDetails} // Refresh order details after adding an item
            />
          )}
        </>
      )}
    </article>
  );
}

export default OrderDetails;
