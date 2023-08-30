import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { RoomContextProvider } from './store/RoomContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <RoomContextProvider>
      <App />
    </RoomContextProvider>
  </BrowserRouter>
);
