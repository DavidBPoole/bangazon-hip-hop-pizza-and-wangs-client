import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { getRevenues } from '../utils/data/RevenueData';

function Revenue() {
  const [revenue, setRevenue] = useState([]);

  const showRevenue = () => {
    getRevenues().then((data) => setRevenue(data));
  };

  useEffect(() => {
    showRevenue();
  }, []);

  const calculateTotalRevenue = () => {
    const total = revenue.reduce((acc, item) => acc + parseFloat(item.total), 0);
    return total.toFixed(2);
  };

  const calculateTotalTip = () => {
    const total = revenue.reduce((acc, item) => acc + parseFloat(item.tip), 0);
    return total.toFixed(2);
  };

  return (
    <>
      <Head>
        <title>Total Revenue</title>
      </Head>
      <div className="revenue-cont">
        <br />
        <h1 className="revenue-text">Revenue</h1>
        <hr className="new" />
        <br />
        <h3 className="revenue-text">Total Revenue</h3>
        <h6 className="revenue-text">{calculateTotalRevenue()}</h6>
        <br />
        <h3 className="revenue-text">Total Tips</h3>
        <h6 className="revenue-text">{calculateTotalTip()}</h6>
      </div>
    </>
  );
}

export default Revenue;
