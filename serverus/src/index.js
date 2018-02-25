//React | Redux | Router
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import {store, persistor } from './features/configStore';
import {history} from './features/history/historyAPI';

//Persist
import { PersistGate } from 'redux-persist/lib/integration/react'

//Components
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <Provider store = {store}>
        <PersistGate persistor = {persistor} loading = {<div>hi</div>}>
            <ConnectedRouter history = {history}>
                <div>
                    <App/>
                </div>
            </ConnectedRouter>
        </PersistGate>
    </Provider>, 

document.getElementById('root'));
registerServiceWorker();