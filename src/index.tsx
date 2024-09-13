import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'mobx-react';
import { meterStore } from './stores/MeterStore';
import addressStore from './stores/AddressStore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider meterStore={meterStore} addressStore={addressStore}>
    <App />
  </Provider>
);
