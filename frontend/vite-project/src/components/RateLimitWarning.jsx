import React from 'react';

const RateLimitWarning = ({ isLimitReached }) => {
  if (!isLimitReached) {
    return null;
  }

  return (
    <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg shadow-md mx-auto mt-6 max-w-4xl font-sans text-center text-base md:text-lg">
      <strong className="font-bold block mb-1">Rate Limit Exceeded!</strong>
      <span className="block"> You have exceeded the allowable requests. Please try again after some time.</span>
    </div>
  );
};

export default RateLimitWarning;
