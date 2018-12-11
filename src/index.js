import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// Service Worker Registration
if(navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js').then(() => {
        console.log('ServiceWorker Successfully Registered');
    }).catch((error) => {
        console.error(error);
        console.log('ServiceWorker Not Registered');
    });
}
