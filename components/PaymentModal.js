/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import DateObject from 'react-date-object';
import { getSingleOrder, updateOrder } from '../utils/data/OrderData';
import { createRevenue } from '../utils/data/RevenueData';

const PaymentModal = ({
  show, onHide, orderId, onPaymentSuccess, subtotal,
}) => {
  const [paymentType, setPaymentType] = useState('');
  const [tipAmount, setTipAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  const date = new DateObject({
    date: new Date(),
    format: 'YYYY-MM-DD',
  });

  // Function to potentially be used to take order grand total
  // function calculateTotalAmount() {
  //   if (orderDetails && orderDetails.items && orderDetails.items.length > 0) {
  //     const itemsTotal = orderDetails.items.reduce((acc, item) => acc + parseFloat(item.price), 0);
  //     const tipTotal = orderDetails.tip || 0;
  //     return (itemsTotal + tipTotal).toFixed(2);
  //   }
  //   return '0.00';
  // }

  const handlePayment = () => {
    // Fetch the current order details
    getSingleOrder(orderId)
      .then((currentOrder) => {
        // Validate payment details before updating the order
        if (!paymentType) {
          setErrorMessage('Please select a payment type.');
          return;
        }

        // Assuming tipAmount is optional, set it to 0 if not provided
        const tip = parseFloat(tipAmount);

        // Prepare the updated order data
        const updatedOrder = {
          ...currentOrder, // Retain existing order values
          date: date.format(),
          paymentType,
          subtotal,
          tip,
          open: false,
        };

        // Update the order with payment details and closes it
        updateOrder(updatedOrder)
          .then(() => {
            // Creates a new revenue entry
            const revenueData = {
              orderId: currentOrder.id,
              tip,
              subtotal: Number(subtotal),
              total: tip + parseFloat(subtotal),
              paymentType,
              date: date.format(),
            };
            console.warn(revenueData);
            createRevenue(revenueData)
              .then(() => {
                setErrorMessage(null); // Reset error message
                onPaymentSuccess(); // Callback to handle any logic after successful payment
                onHide(); // Close the modal
              })
              .catch((error) => {
                console.error('Error creating revenue entry:', error);
                setErrorMessage('An error occurred while creating the revenue entry.');
              });
          })
          .catch((error) => {
            console.error('Error updating order:', error);
            setErrorMessage('An error occurred while updating the order.');
          });
      })
      .catch((error) => {
        console.error('Error fetching current order details:', error);
        setErrorMessage('An error occurred while fetching current order details.');
      });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Payment Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="paymentTypeSelect">
            <Form.Label>Select Payment Type</Form.Label>
            <Form.Select onChange={(e) => setPaymentType(e.target.value)} required>
              <option value="">Select Payment Type</option>
              <option value="cash">Cash</option>
              <option value="credit">Credit</option>
              <option value="credit">Debit</option>
              <option value="credit">Mobile</option>
              <option value="credit">Check</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="tipAmountInput">
            <Form.Label>Tip Amount</Form.Label>
            <Form.Control
              // type="number"
              placeholder="Enter tip amount"
              value={tipAmount}
              onChange={(e) => setTipAmount(e.target.value)}
            />
          </Form.Group>
        </Form>
        {/* Render error message as an alert */}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handlePayment}>
          Process Payment
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

PaymentModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  orderId: PropTypes.number.isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
  subtotal: PropTypes.number.isRequired,
};

export default PaymentModal;
