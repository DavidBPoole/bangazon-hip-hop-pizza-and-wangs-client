import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createOrder, updateOrder } from '../utils/data/OrderData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  // id: 0,
  name: '',
  phone: '',
  email: '',
  type: '',
  open: true,
  user: '',
};

const OrderForm = ({ orderObj }) => {
  const [currentOrder, setCurrentOrder] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  // const [submissionError, setSubmissionError] = useState(null);

  useEffect(() => {
    if (orderObj.id) {
      setCurrentOrder({
        id: orderObj.id,
        name: orderObj.name,
        phone: orderObj.phone,
        email: orderObj.email,
        type: orderObj.type,
        open: orderObj.open,
        user: user.id,
      });
    }
  }, [orderObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Validation check for order type
  //     if (!currentOrder.type) {
  //       setSubmissionError('Please select an order type.');
  //       return;
  //     }

  //     if (orderObj.id) {
  //       await updateOrder(currentOrder, user.uid);
  //     } else {
  //       const createdOrder = await createOrder(currentOrder, user.uid);
  //       const orderId = createdOrder.id;
  //       router.push(`/orders/${orderId}`);
  //     }
  //     // Fetch order details after the order is updated or created
  //     getSingleOrder(orderObj);
  //     setSubmissionError(null); // Reset error state on successful submission
  //   } catch (error) {
  //     console.error('Error submitting the order:', error);
  //     setSubmissionError('An error occurred while submitting the order. Please try again.');
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderObj.id) {
      const payload = {
        id: currentOrder.id,
        name: currentOrder.name,
        phone: currentOrder.phone,
        email: currentOrder.email,
        type: currentOrder.type,
        open: orderObj.open,
        user: user.id,
      };
      updateOrder(payload, user.uid)
        .then(() => router.push('/orders'));
    } else {
      const payload = { ...currentOrder, user: user.id };
      createOrder(payload)
        .then(() => router.push('/orders'));
    }
  };

  return (
    <>
      <h3>{orderObj.id ? 'Update Order' : 'Create Order'}</h3>
      {/* {submissionError && <p className="text-danger">{submissionError}</p>} Render error message if exists */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Customer Name / Order Name</Form.Label>
          <Form.Control name="name" required value={currentOrder.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Customer Phone</Form.Label>
          <Form.Control name="phone" required value={currentOrder.phone} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Customer Email</Form.Label>
          <Form.Control name="email" required value={currentOrder.email} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Order Type</Form.Label>
          <Form.Select name="type" required value={currentOrder.type} onChange={handleChange}>
            <option value="">Select Order Type</option>
            <option value="In-Person">In-Person</option>
            <option value="Phone">Phone</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          {orderObj.id ? 'Update Order' : 'Create Order'}
        </Button>
      </Form>
    </>
  );
};

OrderForm.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    type: PropTypes.string,
    open: PropTypes.bool,
  }),
};

OrderForm.defaultProps = {
  orderObj: initialState,
};

export default OrderForm;
