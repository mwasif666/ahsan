import React from 'react';
import ReactDOM from 'react-dom/client';

// Bootstrap first, then the design system so our tokens win the cascade.
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
