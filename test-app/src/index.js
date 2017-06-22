import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {App, Signin, CustomGrid, StockHeader, StockList} from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<div> <StockHeader /> <CustomGrid /> </div>, document.getElementById('root'));
registerServiceWorker();
