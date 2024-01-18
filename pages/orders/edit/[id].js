import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleOrder } from '../../../utils/data/OrderData';
import OrderForm from '../../../components/OrderForm';

export default function EditOrder() {
  const [editOrder, setEditOrder] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleOrder(id).then(setEditOrder);
  }, [id]);

  return (
    <>
      <OrderForm orderObj={editOrder} />
    </>
  );
}
