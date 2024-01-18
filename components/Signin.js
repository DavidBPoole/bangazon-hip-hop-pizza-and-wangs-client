/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        margin: '0 auto',
        zIndex: 1,
        minHeight: '25rem',
        width: '100%',
        minWidth: '30rem',
        paddingBlock: '0 5rem',
      }}
    >
      <div className="signin-logo">
        <img src="/HHPWLogo.png" style={{ marginBottom: 20 }} width="20%" height="auto" alt="icon" className="nav-logo" />
      </div>
      <Button type="button" size="lg" className="signin-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
