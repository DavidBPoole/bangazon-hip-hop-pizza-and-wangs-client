import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '50%',
        margin: '0 auto',
      }}
    >
      <h1 id="welcome-msg">Hello {user.fbUser.displayName}! </h1>
      <Link href="/orders" passHref>
        <Button variant="success" type="button" size="lg" className="home-btn">
          View Orders
        </Button>
      </Link>
      <Link href="/orders/new" passHref>
        <Button variant="primary" type="button" size="lg" className="home-btn">
          Create Order
        </Button>
      </Link>
      {/* <Link href="/revenue" passHref> */}
      <Button variant="warning" type="button" size="lg" className="home-btn">
        View Revenue
      </Button>
      {/* </Link> */}
    </div>
  );
}

export default Home;
