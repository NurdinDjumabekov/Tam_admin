import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';

import App from './App';

import { store, persistor } from 'store';
import { Bounce, ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

////// datepicker
import 'react-datepicker/dist/react-datepicker.css';

import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/700.css';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

////// style
import 'assets/scss/style.scss';
import './index.scss';
import reportWebVitals from 'reportWebVitals';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <App />
      </PersistGate>
    </Provider>
  );
}

reportWebVitals();
