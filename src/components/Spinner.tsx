import React from 'react';

export const Spinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
    <div className="spinner-grow text-secondary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);
