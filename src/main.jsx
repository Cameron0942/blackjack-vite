//? REACT
// import React from 'react'
import ReactDOM from 'react-dom/client';

//? COMPONENTS
// import App from './App.jsx'
import Page from './Components/Page.jsx';

//? REDUX
import { store } from './store/store.js';
import { Provider } from 'react-redux';

//? STYLES
import './index.css';

// const store = configureStore();

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <Page />
    </Provider>
  </>
)
