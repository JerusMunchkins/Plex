import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from './store'
import App from './app'

// establishes socket connection
// import './socket'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('app')
)
