import React, { useEffect, useState } from 'react';
import OrderCard from '../../components/OrderCard';
import { getOrders } from '../../utils/data/OrderData';

function Orders() {
  const [orders, setOrders] = useState([]);

  const getAllOrders = () => {
    getOrders().then((data) => setOrders(data));
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="order-cards-container">
      <article className="orders">
        {orders.map((order) => (
          <section key={`order--${order.id}`} className="order">
            <OrderCard orderObj={order} onUpdate={getAllOrders} />
          </section>
        ))}
      </article>
    </div>
  );
}

export default Orders;
