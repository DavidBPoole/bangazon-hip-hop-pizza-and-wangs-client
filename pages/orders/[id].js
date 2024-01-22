/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Alert } from 'react-bootstrap';
import ItemSelectionModal from '../../components/ItemModal';
import PaymentModal from '../../components/PaymentModal';
import { getSingleOrder, removeOrderItem } from '../../utils/data/OrderData';

function OrderDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const isMounted = useRef(true);

  const getOrderDetails = () => {
    if (id) {
      getSingleOrder(id)
        .then((data) => {
          if (isMounted.current) {
            setOrder(data);
          }
        })
        .catch((error) => {
          console.error('Error fetching order details:', error);
        });
    }
  };

  const removeItem = (itemId) => {
    // Checks if the order is closed
    if (!order.open) {
      setErrorMessage('Cannot remove an item from a closed order.');
      return;
    }
    removeOrderItem(order.id, itemId).then(() => {
      setErrorMessage(null); // Resets error message
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
    // Check if the order is already closed
    if (!order.open) {
      setErrorMessage('Cannot add an item to a closed order.');
      return;
    }
    // Show the modal when the "Add Item" button is clicked
    setShowModal(true);
  };

  const handleCloseOrder = () => {
    // Check if the order is already closed
    if (!order.open) {
      setErrorMessage('This order is already closed.');
      return;
    }
    // Show the PaymentModal when the "Go To Payment" button is clicked
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    getOrderDetails();
    router.push('/orders');
  };

  useEffect(() => {
    isMounted.current = true;

    const fetchData = async () => {
      try {
        if (id) {
          const data = await getSingleOrder(id);
          if (isMounted.current) {
            setOrder(data);
          }
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchData();

    return () => {
      // Cleanup function to run when component is unmounted
      isMounted.current = false;
    };
  }, [id]);

  return (
    <article className="order-details">
      {order && (
        <>
          <div>
            {/* Render error message as an alert */}
            {errorMessage && (
              <Alert variant="danger" className="text-center" style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>
                {errorMessage}
              </Alert>
            )}
            <h2 className="order-id"><b>Order #: {order.id}</b></h2>
            <h4 className="order-text"><b>Order Name: {order.name}</b></h4>
            <h4 className="order-text"><b>Order Phone: {order.phone}</b></h4>
            <h4 className="order-text"><b>Order Email: {order.email}</b></h4>
            <h4 className="order-text"><b>Order Type: {order.type}</b></h4>
            <h4 className="order-text"><b>Order Status: {order.open ? 'Open 🟢' : 'Closed 🔴'}</b></h4>
            <h2 className="order-total"><b>Total: ${calculateOrderTotal()}</b></h2>
            &nbsp;
            {/* Card below throws a descendant error for h and p tags */}
            {/* <Card style={{ width: '30rem' }}>
              <Card.Body>
                <Card.Title><h1 className="order-id">Order #: {order.id}</h1></Card.Title>
                <Card.Text>
                  <h4 className="order-text"><b>Order Name: {order.name}</b></h4>
                  <h4 className="order-text"><b>Order Phone: {order.phone}</b></h4>
                  <h4 className="order-text"><b>Order Email: {order.email}</b></h4>
                  <h4 className="order-text"><b>Order Type: {order.type}</b></h4>
                  <h4 className="order-text"><b>Order Status: {order.open ? 'Open 🟢' : 'Closed 🔴'}</b></h4>
                </Card.Text>
                <Card.Text>
                  <h2 className="order-total"><b>Total: ${calculateOrderTotal()}</b></h2>
                </Card.Text>
              </Card.Body>
            </Card> */}
            &nbsp;
          </div>
          <div>
            <Button variant="primary" onClick={handleAddItem}>
              Add Item
            </Button>
            &nbsp;
            &nbsp;
            <Button variant="success" onClick={handleCloseOrder}>
              Go To Payment
            </Button>
          </div>
          <div className="item-cards">
            {order.items && order.items.map((item) => (
              <Card key={item.id} className="item-card" style={{ width: '18rem', marginBottom: '10px' }}>
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
          {/* Render the modal if showModal is true */}
          {showModal && (
            <ItemSelectionModal
              show={showModal}
              onHide={() => setShowModal(false)}
              orderId={order.id}
              onItemAdded={getOrderDetails} // Refresh order details after adding an item
            />
          )}
          {/* Render the PaymentModal if showPaymentModal is true */}
          {showPaymentModal && (
            <PaymentModal
              show={showPaymentModal}
              onHide={() => setShowPaymentModal(false)}
              orderId={order.id}
              onPaymentSuccess={handlePaymentSuccess}
              subtotal={parseFloat(calculateOrderTotal())} // Converts to number
            />
          )}
        </>
      )}
    </article>
  );
}

export default OrderDetails;
