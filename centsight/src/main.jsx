import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { persistor, store } from './store/index.js';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { ConfigProvider } from 'antd';
import { PrimeReactProvider } from 'primereact/api';
import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ConfigProvider
    theme={{
      components: {
        Select: {
          zIndexPopup: 9999,
        },
      },
    }}
  >
    <PrimeReactProvider>
      <ChakraProvider>
        <NextUIProvider>
          <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <main className="dark text-foreground bg-background">
              <App />
              <ToastContainer />
            </main>
            </PersistGate>
          </Provider>
        </NextUIProvider>
      </ChakraProvider>
    </PrimeReactProvider>
  </ConfigProvider>
  //</React.StrictMode>
);
