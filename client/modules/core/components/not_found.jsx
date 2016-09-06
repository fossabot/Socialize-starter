import React from 'react';
import Helmet from 'react-helmet';

const NotFound = () => (
  <div>
    <Helmet
      title="Page not found"
    />
    <h1>404</h1>
    <p className="flow-text">Page not found</p>
  </div>
);

export default NotFound;
