import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/reset.css';
import { garfishInit } from './garfish/init'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const render = () => {
  garfishInit()
  return root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
render()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
