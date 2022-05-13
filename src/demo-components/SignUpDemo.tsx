import React from 'react';
import SignUpCard from '../components/SignUpCard';

function SignUpDemo() {
  const handleSubmit = () => {};
  const goToLogin = () => {};

  return <SignUpCard onSubmit={handleSubmit} onGoToLogin={goToLogin} />;
}

export default SignUpDemo;
