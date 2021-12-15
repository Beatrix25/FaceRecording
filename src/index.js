import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './FaceCounter/serviceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';

ReactDOM.render(    
    <Router> 
        <App />
    </Router>,
    document.getElementById('root')
    );

    serviceWorker.unregister();