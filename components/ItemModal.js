import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Button, Form, Alert,
} from 'react-bootstrap';
import getItems from '../utils/data/ItemData';
import { addOrderItem, getSingleOrder } from '../utils/data/OrderData';

const ItemSelectionModal = ({
  show,
  onHide,
  orderId,
  onItemAdded,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleItemChange = (event) => {
    const itemId = parseInt(event.target.value, 10);
    const newlySelected = items.find((item) => item.id === itemId);
    setSelectedItem(newlySelected);
  };

  const handleAddItem = () => {
    if (selectedItem) {
      // Fetch order details to check if it's open or closed
      getSingleOrder(orderId).then((orderDetails) => {
        if (!orderDetails.open) {
          setErrorMessage('Cannot add an item to a closed order.');
          return;
        }
        addOrderItem(orderId, selectedItem.id).then(() => {
          onItemAdded();
          setSelectedItem(null);
          onHide();
        });
      });
    }
  };

  useEffect(() => {
    if (show) {
      getItems().then(setItems);
    }
  }, [show]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Hip Hop Pizza & Wangs Menu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="itemSelect">
            <Form.Label>Select Item</Form.Label>
            <Form.Control as="select" onChange={handleItemChange}>
              <option value="">-- Select Item --</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} - ${item.price}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* Render error message as an alert */}
        {errorMessage && (
          <Alert variant="danger" className="text-center">
            {errorMessage}
          </Alert>
        )}
        <Button variant="secondary" onClick={onHide}>
          Exit
        </Button>
        <Button variant="primary" onClick={handleAddItem}>
          Add Item
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ItemSelectionModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  orderId: PropTypes.number.isRequired,
  onItemAdded: PropTypes.func.isRequired,
};

export default ItemSelectionModal;
