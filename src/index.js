import React from 'react';
import ReactDOM from 'react-dom';
import App from './React/App';
import './index.css';
import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline>
            <App />
        </CssBaseline>
    </React.StrictMode>,
    document.getElementById('root')
);
